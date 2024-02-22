import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CredentialsAuthDto } from 'src/modules/auth/dto/credentials-auth.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const { name, email, password, created_at } = createUserDto;

    try {
      const existingUser = this.findOneByEmail(email);
      if (!existingUser) {
        throw new HttpException(
          'user already existis.',
          HttpStatus.BAD_REQUEST,
        );
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        created_at: created_at || new Date(),
      });
      await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException('Error to create a user', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('User created successfuly', HttpStatus.CREATED);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id_user: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id_user } });
  }

  async singIn(
    credentialsAuthDto: CredentialsAuthDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = credentialsAuthDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        sub: user.id_user,
        email: user.email,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException();
  }
}

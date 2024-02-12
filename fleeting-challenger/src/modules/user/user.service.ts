import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from 'src/repository/userRepository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.create(createUserDto);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneByEmail(email);
  }
}

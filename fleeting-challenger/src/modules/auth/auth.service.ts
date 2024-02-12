import { UserRepository } from '../../repository/userRepository';
import { Injectable } from '@nestjs/common';
import { CredentialsAuthDto } from './dto/credentials-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async singIn(
    credentialsAuthDto: CredentialsAuthDto,
  ): Promise<{ access_token: string }> {
    return this.userRepository.singIn(credentialsAuthDto);
  }
}

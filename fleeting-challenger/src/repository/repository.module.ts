import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './todoRepository';
import { Todo } from 'src/modules/todo/entities/todo.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRepository } from './userRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User])],
  providers: [TodoRepository, UserRepository],
  exports: [TodoRepository, UserRepository],
})
export class RepositoryModule {}

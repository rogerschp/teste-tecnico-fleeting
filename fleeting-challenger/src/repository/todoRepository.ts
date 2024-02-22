import { CreateTodoDto } from '../modules/todo/dto/create-todo.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTodoFilterDto } from 'src/modules/todo/dto/get-todo-filter.dto';
import { UpdateTodoDto } from 'src/modules/todo/dto/update-todo.dto';
import { Todo } from 'src/modules/todo/entities/todo.entity';
import { TodoStatus } from 'src/modules/todo/todo-status-enum';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto, user: string): Promise<Todo> {
    const { title, description } = createTodoDto;
    try {
      const todo = this.todoRepository.create({
        title,
        description,
        status: TodoStatus.OPEN,
        created_at: new Date().toLocaleString('pt-BR'),
        userId: user,
      });
      return await this.todoRepository.save(todo);
    } catch (ex) {
      console.error(ex);
      throw new HttpException('Erro ao criar Todo', HttpStatus.BAD_REQUEST);
    }
  }

  async getTodoFilter(getTodoFilterDto: GetTodoFilterDto) {
    const { title, description, status, limit, skip } = getTodoFilterDto;
    const recordsToSkip = (skip - 1) * limit;
    const where = {
      ...(title ? { title: ILike(`%${title}%`) } : {}),
      ...(description ? { description: ILike(`%${description}%`) } : {}),
      ...(status ? { status: status } : {}),
    };
    const filtered = await this.todoRepository.find({
      where: where,
      take: limit,
      skip: recordsToSkip,
      relations: [`user`],
    });
    return filtered;
  }

  async getTodoById(id_Todo: string, userId: string): Promise<Todo> {
    const todoById = await this.todoRepository.findOne({
      where: { id_Todo, userId },
    });

    if (!todoById) {
      throw new NotFoundException(`Task with ID "${id_Todo}" not found`);
    }
    return todoById;
  }
  async updateTodo(updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const { id_Todo, status, title, description, userId } = updateTodoDto;
    const todo = await this.getTodoById(id_Todo, userId);
    todo.status = status;
    todo.title = title;
    todo.description = description;
    todo.updated_at = new Date();
    return await this.todoRepository.save(todo);
  }

  async softDelete(id: string, userId: string): Promise<void> {
    const todo = await this.getTodoById(id, userId);
    if (!todo) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    todo.deletedAt = new Date();
    await this.todoRepository.save(todo);
  }
}

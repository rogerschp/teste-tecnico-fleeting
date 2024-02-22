import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';
import { TodoRepository } from 'src/repository/todoRepository';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async createTodo(createTodoDto: CreateTodoDto, user: string): Promise<Todo> {
    return this.todoRepository.createTodo(createTodoDto, user);
  }

  async getTodoById(id_Todo: string, userId: string): Promise<Todo> {
    return this.todoRepository.getTodoById(id_Todo, userId);
  }

  async getTodoFilter(getTodoFilterDto: GetTodoFilterDto): Promise<Todo[]> {
    const data = [];
    const table = await this.todoRepository.getTodoFilter(getTodoFilterDto);

    table.forEach((item) => {
      data.push({
        id: item.id_Todo,
        title: item.title,
        description: item.description,
        status: item.status,
        created_at: item.created_at,
        updated_at: item.updated_at,
        user: item.user.name,
      });
    });

    return data;
  }

  async updateTodo(updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoRepository.updateTodo(updateTodoDto);
  }

  async softDelete(id: string, userId: string): Promise<void> {
    return this.todoRepository.softDelete(id, userId);
  }
}

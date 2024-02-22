import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { GetUser } from 'src/modules/auth/get-user.decorator';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/interfaces/jwt-payload.interfaces';

@Controller('todo')
@ApiTags('Todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: JwtPayload,
  ): Promise<Todo> {
    return this.todoService.createTodo(createTodoDto, user.sub); // Pass the user ID to the service method
  }

  @UseGuards(AuthGuard)
  @Get('filter')
  async GetTodoFilter(@Query() filterDto: GetTodoFilterDto) {
    return this.todoService.getTodoFilter(filterDto);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  getTodoById(
    @Param('id') id_Todo: string,
    @GetUser() user: JwtPayload,
  ): Promise<Todo> {
    return this.todoService.getTodoById(id_Todo, user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  update(
    @Param('id') id_Todo: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateTodo(updateTodoDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  softDelete(@Param('id') id: string) {
    return this.todoService.softDelete(id);
  }
}

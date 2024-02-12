import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TodoStatus } from '../todo-status-enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetTodoFilterDto {
  @IsNumber()
  skip: number;
  @IsNumber()
  limit: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string;

  @IsEnum(TodoStatus)
  @ApiPropertyOptional()
  status: TodoStatus;

  @IsString()
  userId;
}

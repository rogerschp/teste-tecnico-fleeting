import { IsEnum, IsString } from 'class-validator';
import { TodoStatus } from '../todo-status-enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTodoDto {
  @IsString()
  @ApiProperty()
  id_Todo: string;

  @IsEnum(TodoStatus)
  @ApiPropertyOptional()
  status: TodoStatus;

  @IsString()
  @ApiPropertyOptional()
  title: string;

  @IsString()
  @ApiPropertyOptional()
  description: string;

  @IsString()
  @ApiPropertyOptional()
  userId: string;
}

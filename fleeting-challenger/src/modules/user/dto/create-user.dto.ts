import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(5)
  @MaxLength(15)
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;

  @MinLength(8)
  @MaxLength(32)
  @IsString()
  @ApiProperty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @IsDate()
  created_at: Date;
}

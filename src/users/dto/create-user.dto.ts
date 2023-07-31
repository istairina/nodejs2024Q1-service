import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: "user" })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ example: "password" })
  @IsNotEmpty()
  @IsString()
  password: string;
}

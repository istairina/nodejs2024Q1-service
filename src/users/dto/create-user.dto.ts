import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: "user" })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ default: "password" })
  @IsNotEmpty()
  @IsString()
  password: string;
}

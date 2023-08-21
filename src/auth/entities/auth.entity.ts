import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Auth {
  @ApiProperty({ example: 'user' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

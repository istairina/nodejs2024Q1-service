import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'password' })
  oldPassword: string;

  @ApiProperty({ example: 'newpassword' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends CreateUserDto {
  @ApiProperty({ example: 'b2a0661b-20e9-4597-9c55-48105e4fa196' })
  id: string;

  @ApiProperty({ example: 1 })
  version: number; // integer number, increments on update

  @ApiProperty({ example: Date.now() })
  createdAt: Date; // timestamp of creation

  @ApiProperty({ example: Date.now() })
  updatedAt: Date; // timestamp of last update
}

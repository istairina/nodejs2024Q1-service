import { ApiProperty } from '@nestjs/swagger';

export class PasswordUserDto {
  @ApiProperty()
  password: string;
}

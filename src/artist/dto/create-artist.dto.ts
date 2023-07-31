import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ default: "The Cranberries" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ default: false })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

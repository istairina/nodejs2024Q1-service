import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ default: "No Need to Argue" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ default: 1994 })
  @IsNotEmpty()
  @IsInt()
  year: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(4)
  artistId?: string | null;
}

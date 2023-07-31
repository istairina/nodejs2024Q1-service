import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ example: "No Need to Argue" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1994 })
  @IsNotEmpty()
  @IsInt()
  year: number;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  @IsUUID(4)
  artistId?: string | null;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ example: 'Zombie' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 307 })
  @IsNotEmpty()
  @IsInt()
  duration: number;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  @IsUUID(4)
  artistId?: string | null;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  @IsUUID(4)
  albumId?: string | null;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ default: "Zombie" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ default: 307 })
  @IsNotEmpty()
  @IsInt()
  duration: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(4)
  artistId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(4)
  albumId?: string | null;
}

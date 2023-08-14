import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @ApiProperty({ example: '5fba5a9f-4c8d-44e4-807f-afc89d2dab66' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'The Cranberries' })
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  @IsBoolean()
  @Column()
  grammy: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @Column({ default: false })
  isFavArtist?: boolean;
}

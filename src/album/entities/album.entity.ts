import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Artist } from 'src/artist/entities/artist.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Album {
  @ApiProperty({ example: 'd8e625a1-cd53-4a12-94c0-9b6b253877ab' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'No Need to Argue' })
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty({ example: 1994 })
  @IsNotEmpty()
  @IsInt()
  @Column()
  year: number;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  @OneToOne(() => Artist, (artistId) => artistId.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  artistId?: string | null;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  @Column({ default: false })
  isFavAlbum?: boolean;
}

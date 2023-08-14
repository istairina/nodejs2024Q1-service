import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Track {
  @ApiProperty({ example: 'd598c59f-2bfc-465e-8d57-58eccb649b14' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Zombie' })
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty({ example: 307 })
  @IsNotEmpty()
  @IsInt()
  @Column()
  duration: number;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  @IsUUID(4)
  @OneToOne(() => Artist, (artistId) => artistId.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  artistId?: string | null;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  @IsUUID(4)
  @OneToOne(() => Album, (albumId) => albumId.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  albumId?: string | null;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @Column({ default: false })
  isFavTrack?: boolean;
}

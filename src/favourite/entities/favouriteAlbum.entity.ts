import { Album } from 'src/album/entities/album.entity';

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('album-favourite')
export class AlbumFavourite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  albumId: string | null;

  @OneToOne(() => Album, (album) => album.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  album: Album;
}

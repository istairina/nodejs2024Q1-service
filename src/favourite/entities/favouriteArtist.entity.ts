import { Artist } from 'src/artist/entities/artist.entity';

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artist-favourite')
export class ArtistFavourite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  artistId: string | null;

  @OneToOne(() => Artist, (artist) => artist.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  artist: Artist;
}

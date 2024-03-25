import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Favourite {
  @PrimaryColumn({ default: 0 })
  id: string;

  @ApiProperty()
  @ManyToOne(() => Artist)
  @JoinTable()
  artist: Artist;

  @ApiProperty()
  @ManyToOne(() => Album)
  @JoinTable()
  album: Album;

  @ApiProperty()
  @ManyToOne(() => Track)
  @JoinTable()
  track: Track;
}

export interface FavoriteResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

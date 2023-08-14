import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { ManyToOne } from 'typeorm';

export class Favourite {
  @ApiProperty()
  @ManyToOne(() => Artist, (artists) => artists.id)
  artists: Artist[];

  @ApiProperty()
  @ManyToOne(() => Album, (albums) => albums.id)
  albums: Album[];

  @ApiProperty()
  @ManyToOne(() => Track, (tracks) => tracks.id)
  tracks: Track[];
}

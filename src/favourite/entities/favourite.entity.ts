import { ApiProperty } from '@nestjs/swagger';
import { AlbumDto } from 'src/album/dto/album.dto';
import { ArtistDto } from 'src/artist/dto/artist.dto';
import { TrackDto } from 'src/track/dto/track.dto';

export class Favourite {
  @ApiProperty()
  artists: { [key: string]: ArtistDto };

  @ApiProperty()
  albums: { [key: string]: AlbumDto };

  @ApiProperty()
  tracks: { [key: string]: TrackDto };
}

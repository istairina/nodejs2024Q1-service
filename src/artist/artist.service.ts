import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { DatabaseService } from 'src/database/database.service';
import { v4 as uuid } from 'uuid';
import { TrackDto } from 'src/track/dto/track.dto';
import { AlbumDto } from 'src/album/dto/album.dto';

@Injectable()
export class ArtistService {
  constructor(private databaseService: DatabaseService) {}

  create({ name, grammy }: CreateArtistDto) {
    const newData = {
      id: uuid(),
      name: name,
      grammy: grammy,
    };
    return this.databaseService.artists.create(newData);
  }

  getAll() {
    return this.databaseService.artists.getAll();
  }

  getById(id: string) {
    return this.databaseService.artists.getById(id);
  }

  update(id: string, { name, grammy }: UpdateArtistDto) {
    const artist = this.getById(id);
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    const newData = {
      ...artist,
      name: name,
      grammy: grammy,
    };
    return this.databaseService.artists.update(id, newData);
  }

  remove(id: string) {
    const artist = this.getById(id);
    if (!artist)
      throw new HttpException("Artist don't found", HttpStatus.NOT_FOUND);

    const allTracks: TrackDto[] = this.databaseService.tracks.getAll();
    allTracks.forEach((track) => {
      if (track.artistId === id) {
        this.databaseService.tracks.update(track.id, {
          ...track,
          artistId: null,
        });
      }
    });

    const allAlbums: AlbumDto[] = this.databaseService.albums.getAll();
    allAlbums.forEach((album) => {
      if (album.artistId === id) {
        this.databaseService.albums.update(album.id, {
          ...album,
          artistId: null,
        });
      }
    });

    if (this.databaseService.favorites.artists.has(id))
      this.databaseService.favorites.artists.delete(id);

    return this.databaseService.artists.delete(id);
  }
}

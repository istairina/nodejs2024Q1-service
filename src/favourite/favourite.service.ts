import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavouriteService {
  constructor(private databaseService: DatabaseService) {}

  findAll() {
    const artistsFavDb = this.databaseService.favorites.artists;
    const artists = Array.from(artistsFavDb.values());

    const albumsFavDb = this.databaseService.favorites.albums;
    const albums = Array.from(albumsFavDb.values());

    const tracksFavDb = this.databaseService.favorites.tracks;
    const tracks = Array.from(tracksFavDb.values());

    const result = {
      artists: artists,
      albums: albums,
      tracks: tracks,
    };

    return result;
  }

  addAlbum(id: string) {
    const album = this.databaseService.albums.getById(id);
    if (!album)
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.databaseService.favorites.albums.set(id, album);
    return `This action adds a new favourite`;
  }

  addTrack(id: string) {
    const track = this.databaseService.tracks.getById(id);
    if (!track)
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.databaseService.favorites.tracks.set(id, track);
    return `This action adds a new favourite ${id}`;
  }

  addArtist(id: string) {
    const artist = this.databaseService.artists.getById(id);
    if (!artist)
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this.databaseService.favorites.artists.set(id, artist);
  }

  removeArtist(id: string) {
    if (!this.databaseService.favorites.artists.has(id))
      throw new HttpException(
        "There's no such id in favourite artists",
        HttpStatus.NOT_FOUND,
      );
    this.databaseService.favorites.artists.delete(id);
    throw new HttpException(
      'The atrist has been removed',
      HttpStatus.NO_CONTENT,
    );
  }

  removeTrack(id: string) {
    if (!this.databaseService.favorites.tracks.has(id))
      throw new HttpException(
        "There's no such id in favourite tracks",
        HttpStatus.NOT_FOUND,
      );
    this.databaseService.favorites.tracks.delete(id);
    throw new HttpException(
      'The track has been removed',
      HttpStatus.NO_CONTENT,
    );
  }

  removeAlbum(id: string) {
    if (!this.databaseService.favorites.albums.has(id))
      throw new HttpException(
        "There's no such id in favourite albums",
        HttpStatus.NOT_FOUND,
      );
    this.databaseService.favorites.albums.delete(id);
    throw new HttpException(
      'The album has been removed',
      HttpStatus.NO_CONTENT,
    );
  }
}

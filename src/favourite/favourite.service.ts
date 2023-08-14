import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favourite } from './entities/favourite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectRepository(Favourite)
    private favouritesRepository: Repository<Favourite>,
  ) {}

  findAll() {
    // const artistsFavDb = this.favouritesRepository.find(artists);
    // const artists = Array.from(artistsFavDb.values());
    // const albumsFavDb = this.favouritesRepository.albums;
    // const albums = Array.from(albumsFavDb.values());
    // const tracksFavDb = this.favouritesRepository.tracks;
    // const tracks = Array.from(tracksFavDb.values());
    // const result = {
    //   artists: artists,
    //   albums: albums,
    //   tracks: tracks,
    // };
    // return result;
  }

  addAlbum(id: string) {
    // const album = this..albums.getById(id);
    // if (!album)
    //   throw new HttpException(
    //     'Album not found',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // this.favouritesRepository.albums.set(id, album);
    return `This action adds a new favourite`;
  }

  addTrack(id: string) {
    // const track = this.databaseService.tracks.getById(id);
    // if (!track)
    //   throw new HttpException(
    //     'Album not found',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // this.favouritesRepository.tracks.set(id, track);
    return `This action adds a new favourite ${id}`;
  }

  addArtist(id: string) {
    // const artist = this.databaseService.artists.getById(id);
    // if (!artist)
    //   throw new HttpException(
    //     'Album not found',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // this.favouritesRepository.artists.set(id, artist);
  }

  removeArtist(id: string) {
    // if (!this.favouritesRepository.artists.has(id))
    //   throw new HttpException(
    //     "There's no such id in favourite artists",
    //     HttpStatus.NOT_FOUND,
    //   );
    // this.favouritesRepository.artists.delete(id);
    // throw new HttpException(
    //   'The atrist has been removed',
    //   HttpStatus.NO_CONTENT,
    // );
  }

  removeTrack(id: string) {
    // if (!this.favouritesRepository.tracks.has(id))
    //   throw new HttpException(
    //     "There's no such id in favourite tracks",
    //     HttpStatus.NOT_FOUND,
    //   );
    // this.favouritesRepository.tracks.delete(id);
    // throw new HttpException(
    //   'The track has been removed',
    //   HttpStatus.NO_CONTENT,
    // );
  }

  removeAlbum(id: string) {
    // if (!this.favouritesRepository.albums.has(id))
    //   throw new HttpException(
    //     "There's no such id in favourite albums",
    //     HttpStatus.NOT_FOUND,
    //   );
    // this.favouritesRepository.albums.delete(id);
    // throw new HttpException(
    //   'The album has been removed',
    //   HttpStatus.NO_CONTENT,
    // );
  }
}

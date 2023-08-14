import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Favourite } from './entities/favourite.entity';
import { DataSource, Repository } from 'typeorm';
import { Track } from 'src/track/entities/track.entity';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async findAll() {
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
    // const allTracks = await this.trackRepository
    //   .createQueryBuilder('track')
    //   .select('track.isFavTrack', 'true')
    //   .getMany();
    // const res = await this.dataSource.getRepository("order") .createQueryBuilder("order") .where(order.status @> '[{"status": "Closed"}]') .getMany()
    // console.log('allTracks', allTracks);
    // return await this.favouritesRepository.find();
  }

  async addAlbum(id: string) {
    // const album = this.albums.getById(id);
    // if (!album)
    //   throw new HttpException(
    //     'Album not found',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // this.favouritesRepository.albums.set(id, album);
    // await this.favouritesRepository
    //   .createQueryBuilder()
    //   .update(Favourite)
    //   .set({ albums: () => `array_append("albums", ${id})` })
    //   .execute();

    return `This action adds a new favourite`;
  }

  async addTrack(id: string) {
    // const track = this.databaseService.tracks.getById(id);

    const track = await this.trackRepository
      .createQueryBuilder('track')
      .select('track.id', id)
      .getOne();

    // console.log('trackGet', track);

    if (!track)
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    await this.trackRepository
      .createQueryBuilder()
      .update(Track)
      .set({ isFavTrack: true })
      .where('id = :id', { id: id })
      .execute();

    return `This action adds a new favourite ${id}`;
  }

  async addArtist(id: string) {
    // const artist = this.databaseService.artists.getById(id);
    // if (!artist)
    //   throw new HttpException(
    //     'Album not found',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // this.favouritesRepository.artists.set(id, artist);
    // await this.favouritesRepository
    //   .createQueryBuilder()
    //   .update(Favourite)
    //   .set({ artists: () => `array_append("artists", ${id})` })
    //   .execute();
  }

  async removeArtist(id: string) {
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
    // await this.favouritesRepository
    //   .createQueryBuilder()
    //   .update(Favourite)
    //   .set({ artists: () => `array_remove("artists", ${id})` })
    //   .execute();
  }

  async removeTrack(id: string) {
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
    // await this.favouritesRepository
    //   .createQueryBuilder()
    //   .update(Favourite)
    //   .set({ tracks: () => `array_remove("tracks", ${id})` })
    //   .execute();
  }

  async removeAlbum(id: string) {
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
    // await this.favouritesRepository
    //   .createQueryBuilder()
    //   .update(Favourite)
    //   .set({ albums: () => `array_remove("albums", ${id})` })
    //   .execute();
  }
}

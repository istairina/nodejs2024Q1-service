import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create({ name, grammy }: CreateArtistDto) {
    const newData = {
      id: uuid(),
      name: name,
      grammy: grammy,
    };
    const createdArtist = this.artistsRepository.create(newData);
    return this.artistsRepository.save(createdArtist);
  }

  async getAll() {
    return this.artistsRepository.find();
  }

  async getById(id: string) {
    return this.artistsRepository.findOne({ where: { id } });
  }

  async update(id: string, { name, grammy }: UpdateArtistDto) {
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    const newData = {
      ...artist,
      name: name,
      grammy: grammy,
    };
    await this.artistsRepository.update(id, newData);
    return this.artistsRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist)
      throw new HttpException("Artist don't found", HttpStatus.NOT_FOUND);

    // const allTracks: TrackDto[] = this.databaseService.tracks.getAll();
    // allTracks.forEach((track) => {
    //   if (track.artistId === id) {
    //     this.databaseService.tracks.update(track.id, {
    //       ...track,
    //       artistId: null,
    //     });
    //   }
    // });

    // const allAlbums: AlbumDto[] = this.databaseService.albums.getAll();
    // allAlbums.forEach((album) => {
    //   if (album.artistId === id) {
    //     this.databaseService.albums.update(album.id, {
    //       ...album,
    //       artistId: null,
    //     });
    //   }
    // });

    // if (this.databaseService.favorites.artists.has(id))
    //   this.databaseService.favorites.artists.delete(id);

    await this.artistsRepository.delete(id);
  }
}

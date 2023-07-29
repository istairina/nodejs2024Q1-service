import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { DatabaseService } from 'src/database/database.service';
import { v4 as uuid } from 'uuid';

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
    return this.databaseService.artists.delete(id);
  }
}

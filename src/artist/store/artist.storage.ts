import { Injectable } from '@nestjs/common';
import { ArtistStore } from '../interfaces/artist-storage.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistDto } from '../dto/artist.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
class InMemoryArtistStore implements ArtistStore {
  private artistsDb: ArtistDto[];

  constructor(artists: ArtistDto[]) {
    this.artistsDb = artists;
  }

  getAll = (): ArtistDto[] => this.artistsDb;

  getById = (id: string): ArtistDto =>
    this.artistsDb.find((artist) => artist.id === id);

  delete = (id: string): void => {
    const artistIndex = this.artistsDb.findIndex((artist) => artist.id === id);
    this.artistsDb.splice(artistIndex, 1);
  };

  create = (params: CreateArtistDto): ArtistDto => {
    const newArtist = {
      id: uuid(),
      name: params.name,
      grammy: params.grammy,
    };
    this.artistsDb.push(newArtist);
    return newArtist;
  };

  update = (id: string, params: UpdateArtistDto): ArtistDto => {
    const newData = {
      name: params.name,
      grammy: params.grammy,
    };
    Object.assign(this.getById(id), newData);
    return this.getById(id);
  };
}

export default InMemoryArtistStore;

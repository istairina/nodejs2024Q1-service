import { Injectable } from '@nestjs/common';
import { AlbumStore } from '../interfaces/album-storage.interface';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumDto } from '../dto/album.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
class InMemoryAlbumStore implements AlbumStore {
  private albumsDb: AlbumDto[];

  constructor(albums: AlbumDto[]) {
    this.albumsDb = albums;
  }

  getAll = (): AlbumDto[] => this.albumsDb;

  getById = (id: string): AlbumDto =>
    this.albumsDb.find((album) => album.id === id);

  delete = (id: string): void => {
    const albumIndex = this.albumsDb.findIndex((album) => album.id === id);
    this.albumsDb.splice(albumIndex, 1);
  };

  create = (params: CreateAlbumDto): AlbumDto => {
    const newAlbum = {
      id: uuid(),
      name: params.name,
      year: params.year,
      artistId: params.artistId || null,
    };
    this.albumsDb.push(newAlbum);
    return newAlbum;
  };

  update = (id: string, params: UpdateAlbumDto): AlbumDto => {
    const newData = {
      name: params.name,
      artistId: params.artistId || null,
      year: params.year,
    };
    Object.assign(this.getById(id), newData);
    return this.getById(id);
  };
}

export default InMemoryAlbumStore;

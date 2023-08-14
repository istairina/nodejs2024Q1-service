import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuid } from 'uuid';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async create({ name, year, artistId }: CreateAlbumDto) {
    const newAlbum = {
      id: uuid(),
      name: name,
      year: year,
      artistId: artistId || null,
    };
    const createdUser = this.albumsRepository.create(newAlbum);
    return this.albumsRepository.save(createdUser);
  }

  async getAll() {
    return this.albumsRepository.find();
  }

  async getById(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    return this.albumsRepository.findOne({ where: { id } });
  }

  async update(id: string, { name, year, artistId }: UpdateAlbumDto) {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    const updatedAlbum = {
      id: id,
      name: name,
      year: year,
      artistId: artistId || null,
    };
    await this.albumsRepository.update(id, updatedAlbum);
    return this.albumsRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    // const allTracks: TrackDto[] = this.databaseService.tracks.getAll();
    // allTracks.forEach((track) => {
    //   if (track.albumId === id) {
    //     this.databaseService.tracks.update(track.id, {
    //       ...track,
    //       albumId: null,
    //     });
    //   }
    // });
    // if (this.databaseService.favorites.albums.has(id))
    // this.databaseService.favorites.albums.delete(id);
    await this.albumsRepository.delete(id);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuid } from 'uuid';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from 'src/track/entities/track.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
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
    return album;
  }

  async update(id: string, { name, year, artistId }: UpdateAlbumDto) {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    if (artistId) {
      const artist = await this.artistRepository.findOne({
        where: { id: artistId },
      });
      if (!artist) {
        throw new HttpException(
          'There is no artist with such ID',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (name) {
      album.name = name;
    }
    if (year) {
      album.year = year;
    }
    if (artistId) {
      album.artistId = artistId;
    }
    return this.albumsRepository.save(album);
  }

  async remove(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);

    await this.trackRepository.update({ albumId: id }, { albumId: null });

    await this.albumsRepository.delete(id);
  }
}

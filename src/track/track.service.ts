import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create({
    name,
    duration,
    artistId,
    albumId,
  }: CreateTrackDto): Promise<Track> {
    const newTrack = {
      id: uuid(),
      name: name,
      duration: duration,
      artistId: artistId || null,
      albumId: albumId || null,
    };
    const createdTrack = this.tracksRepository.create(newTrack);
    return this.tracksRepository.save(createdTrack);
  }

  async getAll(): Promise<Track[]> {
    return this.tracksRepository.find();
  }

  async getById(id: string): Promise<Track> {
    if (!this.tracksRepository.findOne({ where: { id } }))
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    return this.tracksRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    { name, duration, artistId, albumId }: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track)
      throw new HttpException("Track don't found", HttpStatus.NOT_FOUND);

    const updatedTrack = {
      id: id,
      name: name,
      duration: duration,
      artistId: artistId || null,
      albumId: albumId || null,
    };
    await this.tracksRepository.update(id, updatedTrack);
    return this.tracksRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track)
      throw new HttpException("Track don't found", HttpStatus.NOT_FOUND);
    // if (this.databaseService.favorites.tracks.has(id))
    //   this.databaseService.favorites.tracks.delete(id);
    await this.tracksRepository.delete(id);
  }
}

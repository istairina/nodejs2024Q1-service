import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private databaseService: DatabaseService) {}

  create({ name, duration, artistId, albumId }: CreateTrackDto) {
    const newTrack = {
      id: uuid(),
      name: name,
      duration: duration,
      artistId: artistId || null,
      albumId: albumId || null,
    };
    return this.databaseService.tracks.create(newTrack);
  }

  getAll() {
    return this.databaseService.tracks.getAll();
  }

  getById(id: string) {
    if (!this.getById(id))
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    return this.databaseService.tracks.getById(id);
  }

  update(id: string, { name, duration, artistId, albumId }: UpdateTrackDto) {
    const track = this.getById(id);
    if (!track)
      throw new HttpException("Track don't found", HttpStatus.NOT_FOUND);

    const updatedTrack = {
      id: id,
      name: name,
      duration: duration,
      artistId: artistId || null,
      albumId: albumId || null,
    };

    return this.databaseService.tracks.update(id, updatedTrack);
  }

  remove(id: string) {
    const track = this.getById(id);
    if (!track)
      throw new HttpException("Track don't found", HttpStatus.NOT_FOUND);
    return this.databaseService.tracks.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { TrackStore } from '../interfaces/track-storage.interface';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackDto } from '../dto/track.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
class InMemoryTrackStore implements TrackStore {
  private tracksDb: TrackDto[];

  constructor(tracks: TrackDto[]) {
    this.tracksDb = tracks;
  }

  getAll = (): TrackDto[] => this.tracksDb;

  getById = (id: string): TrackDto =>
    this.tracksDb.find((track) => track.id === id);

  delete = (id: string): void => {
    const trackIndex = this.tracksDb.findIndex((track) => track.id === id);
    this.tracksDb.splice(trackIndex, 1);
  };

  create = (params: CreateTrackDto): TrackDto => {
    const newTrack = {
      id: uuid(),
      name: params.name,
      duration: params.duration,
      albumId: params.albumId || null,
      artistId: params.artistId || null,
    };
    this.tracksDb.push(newTrack);
    return newTrack;
  };

  update = (id: string, params: UpdateTrackDto): TrackDto => {
    const newData = {
      name: params.name,
      artistId: params.albumId || null,
      duration: params.duration,
      albumId: params.albumId || null,
    };
    Object.assign(this.getById(id), newData);
    return this.getById(id);
  };
}

export default InMemoryTrackStore;

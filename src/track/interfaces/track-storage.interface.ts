import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackDto } from '../dto/track.dto';

export interface TrackStore {
  getAll: () => TrackDto[];
  getById: (id: string) => TrackDto | undefined;
  create: (params: CreateTrackDto) => TrackDto;
  update: (id: string, params: UpdateTrackDto) => TrackDto;
  delete: (id: string) => void;
}

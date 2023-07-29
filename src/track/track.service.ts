import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import InMemoryTrackStore from './store/track.storage';

@Injectable()
export class TrackService {
  private storage = new InMemoryTrackStore([]);

  create(createTrackDto: CreateTrackDto) {
    return this.storage.create(createTrackDto);
  }

  getAll() {
    return this.storage.getAll();
  }

  getById(id: string) {
    return this.storage.getById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.storage.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import InMemoryArtistStore from './store/artist.storage';

@Injectable()
export class ArtistService {
  private storage = new InMemoryArtistStore([]);

  create(createArtistDto: CreateArtistDto) {
    return this.storage.create(createArtistDto);
  }

  getAll() {
    return this.storage.getAll();
  }

  getById(id: string) {
    return this.storage.getById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.storage.update(id, updateArtistDto);
  }

  remove(id: string) {
    return this.storage.delete(id);
  }
}

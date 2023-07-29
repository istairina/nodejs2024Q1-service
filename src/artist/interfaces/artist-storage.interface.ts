import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistDto } from '../dto/artist.dto';

export interface ArtistStore {
  getAll: () => ArtistDto[];
  getById: (id: string) => ArtistDto | undefined;
  create: (params: CreateArtistDto) => ArtistDto;
  update: (id: string, params: UpdateArtistDto) => ArtistDto;
  delete: (id: string) => void;
}

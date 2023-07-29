import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumDto } from '../dto/album.dto';

export interface AlbumStore {
  getAll: () => AlbumDto[];
  getById: (id: string) => AlbumDto | undefined;
  create: (params: CreateAlbumDto) => AlbumDto;
  update: (id: string, params: UpdateAlbumDto) => AlbumDto;
  delete: (id: string) => void;
}

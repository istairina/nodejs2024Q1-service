import { UserDto } from 'src/users/dto/user.dto';
import { Database } from '../store/database.instance';
import { ArtistDto } from 'src/artist/dto/artist.dto';
import { TrackDto } from 'src/track/dto/track.dto';
import { AlbumDto } from 'src/album/dto/album.dto';

let db = null;

export const createInstance = () => {
  if (db === null) {
    db = {
      users: new Database<UserDto>(),
      artists: new Database<ArtistDto>(),
      tracks: new Database<TrackDto>(),
      albums: new Database<AlbumDto>(),
      favorites: {
        artists: new Map<string, ArtistDto>(),
        tracks: new Map<string, TrackDto>(),
        albums: new Map<string, AlbumDto>(),
      },
    };
  }

  return db;
};

export const databaseFactory = {
  createInstance,
};

export type DatabaseInstance = ReturnType<typeof createInstance>;

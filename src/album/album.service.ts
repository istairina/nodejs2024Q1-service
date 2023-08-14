import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
// import { DatabaseService } from 'src/database/database.service';
import { v4 as uuid } from 'uuid';
import { TrackDto } from 'src/track/dto/track.dto';

@Injectable()
export class AlbumService {
  // constructor(private databaseService: DatabaseService) {}
  // create({ name, year, artistId }: CreateAlbumDto) {
  //   const newAlbum = {
  //     id: uuid(),
  //     name: name,
  //     year: year,
  //     artistId: artistId || null,
  //   };
  //   return this.databaseService.albums.create(newAlbum);
  // }
  // getAll() {
  //   return this.databaseService.albums.getAll();
  // }
  // getById(id: string) {
  //   if (!this.databaseService.albums.getById(id))
  //     throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
  //   return this.databaseService.albums.getById(id);
  // }
  // update(id: string, { name, year, artistId }: UpdateAlbumDto) {
  //   const album = this.getById(id);
  //   if (!album)
  //     throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
  //   const updatedAlbum = {
  //     id: id,
  //     name: name,
  //     year: year,
  //     artistId: artistId || null,
  //   };
  //   return this.databaseService.albums.update(id, updatedAlbum);
  // }
  // remove(id: string) {
  //   const album = this.getById(id);
  //   if (!album)
  //     throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
  //   const allTracks: TrackDto[] = this.databaseService.tracks.getAll();
  //   allTracks.forEach((track) => {
  //     if (track.albumId === id) {
  //       this.databaseService.tracks.update(track.id, {
  //         ...track,
  //         albumId: null,
  //       });
  //     }
  //   });
  //   if (this.databaseService.favorites.albums.has(id))
  //     this.databaseService.favorites.albums.delete(id);
  //   return this.databaseService.albums.delete(id);
  // }
}

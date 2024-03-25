import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { AlbumFavourite } from './entities/favouriteAlbum.entity';
import { ArtistFavourite } from './entities/favouriteArtist.entity';
import { TrackFavourite } from './entities/favouriteTrack.entity';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(TrackFavourite)
    private trackFavourite: Repository<TrackFavourite>,

    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(AlbumFavourite)
    private albumFavourite: Repository<AlbumFavourite>,

    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(ArtistFavourite)
    private artistFavourite: Repository<ArtistFavourite>,
  ) {}

  async findAll() {
    const artistFavs = await this.artistFavourite.find({
      relations: { artist: true },
    });
    const artists = artistFavs.map((artistFav) => artistFav.artist);

    const albumsFavs = await this.albumFavourite.find({
      relations: { album: true },
    });
    const albums = albumsFavs.map((albumFav) => albumFav.album);

    const tracksFavs = await this.trackFavourite.find({
      relations: { track: true },
    });
    const tracks = tracksFavs.map((track) => track.track);

    return { artists, albums, tracks };
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const albumFav = new AlbumFavourite();
    albumFav.album = album;

    await this.albumFavourite.save(albumFav);
  }

  async addTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const trackFav = new TrackFavourite();
    trackFav.track = track;

    await this.trackFavourite.save(trackFav);
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const artistFav = new ArtistFavourite();
    artistFav.artist = artist;

    await this.artistFavourite.save(artistFav);
  }

  async removeArtist(artistId: string) {
    const artist = await this.artistFavourite.findOne({ where: { artistId } });

    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);

    await this.artistRepository.delete(artist.id);
  }

  async removeTrack(trackId: string) {
    const track = await this.trackFavourite.findOne({ where: { trackId } });

    if (!track)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);

    await this.trackRepository.delete(track.id);
  }

  async removeAlbum(albumId: string) {
    const album = await this.albumFavourite.findOne({ where: { albumId } });

    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);

    await this.albumRepository.delete(album.id);
  }
}

import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouriteController } from './favourite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favourite } from './entities/favourite.entity';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { AlbumFavourite } from './entities/favouriteAlbum.entity';
import { ArtistFavourite } from './entities/favouriteArtist.entity';
import { TrackFavourite } from './entities/favouriteTrack.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Favourite,
      Track,
      Album,
      Artist,
      ArtistFavourite,
      AlbumFavourite,
      TrackFavourite,
    ]),
  ],
  controllers: [FavouriteController],
  providers: [FavouriteService],
})
export class FavouriteModule {}

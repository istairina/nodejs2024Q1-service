import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavouriteModule } from './favourite/favourite.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavouriteModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
  ],
})
export class AppModule {}

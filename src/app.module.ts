import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database/database.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavouriteModule } from './favourite/favourite.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    UserModule,
    DatabaseModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavouriteModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}

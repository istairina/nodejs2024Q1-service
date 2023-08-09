import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database/database.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavouriteModule } from './favourite/favourite.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavouriteModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'pgdb',
      username: 'admin',
      password: 'admin',
      // entities: [],
      synchronize: true,
      autoLoadEntities: true,
      // ssl: true,
      // extra: {
      //   ssl: {
      //     rejectUnauthorized: false,
      //   },
      // },
      // useFactory: async (config: ConfigService) => ({
      //   type: config.get<'aurora-data-api'>('TYPEORM_CONNECTION'),
      // }),
    }),
  ],
})
export class AppModule {}

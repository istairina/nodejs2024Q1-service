import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouriteController } from './favourite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favourite } from './entities/favourite.entity';
import { Track } from 'src/track/entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  controllers: [FavouriteController],
  providers: [FavouriteService],
})
export class FavouriteModule {}

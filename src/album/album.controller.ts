import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { idGEt } from 'src/common/dto/id.dto';

@Controller('album')
export class AlbumController {
  // private albumsService: AlbumsService;

  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  findOne(@Param() { id }: idGEt) {
    return this.albumService.getById(id);
  }

  @Put(':id')
  update(@Param() { id }: idGEt, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: idGEt) {
    return this.albumService.remove(id);
  }
}

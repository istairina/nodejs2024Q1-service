import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { idGEt } from 'src/common/dto/id.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  // private artistsService: ArtistsService;

  constructor(private readonly artistService: ArtistService) { }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  findOne(@Param() { id }: idGEt) {
    if (!this.artistService.getById(id))
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return this.artistService.getById(id);
  }

  @Put(':id')
  update(@Param() { id }: idGEt, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: idGEt) {
    return this.artistService.remove(id);
  }
}

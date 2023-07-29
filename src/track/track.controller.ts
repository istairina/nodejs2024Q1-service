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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { idGEt } from 'src/common/dto/id.dto';

@Controller('track')
export class TrackController {
  // private tracksService: TracksService;

  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  findOne(@Param() { id }: idGEt) {
    if (!this.trackService.getById(id))
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    return this.trackService.getById(id);
  }

  @Put(':id')
  update(@Param() { id }: idGEt, @Body() updateTrackDto: UpdateTrackDto) {
    const track = this.trackService.getById(id);
    if (!track)
      throw new HttpException("Track don't found", HttpStatus.NOT_FOUND);
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: idGEt) {
    const track = this.trackService.getById(id);
    if (!track)
      throw new HttpException("Track don't found", HttpStatus.NOT_FOUND);
    return this.trackService.remove(id);
  }
}

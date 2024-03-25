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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { idGEt } from 'src/common/dto/id.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TrackDto } from './dto/track.dto';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({ summary: 'Create a new track' })
  @ApiCreatedResponse({
    description: 'The track has been created',
    type: TrackDto,
  })
  @ApiBadRequestResponse({
    description:
      'Bad request: some required fields are empty or it has wrong data',
  })
  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @ApiOperation({ summary: 'Get list of all tracks' })
  @ApiOkResponse({
    description: 'Tracks have been got',
    type: TrackDto,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.trackService.getAll();
  }

  @ApiOperation({ summary: 'Get a track by ID' })
  @ApiParam({
    name: 'id',
    description: 'Put id',
  })
  @ApiOkResponse({ description: 'Track has been got', type: TrackDto })
  @ApiBadRequestResponse({ description: 'Bad request: trackID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Get(':id')
  findOne(@Param() { id }: idGEt) {
    return this.trackService.getById(id);
  }

  @ApiOperation({ summary: 'Change data of the track' })
  @ApiParam({
    name: 'id',
    description: 'Put id',
  })
  @ApiOkResponse({ description: 'User has been updated', type: TrackDto })
  @ApiBadRequestResponse({ description: 'Bad request: trackID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Put(':id')
  update(@Param() { id }: idGEt, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @ApiOperation({ summary: 'Delete the track' })
  @ApiParam({
    name: 'id',
    description: 'Put id',
  })
  @ApiNoContentResponse({ description: 'No content: track has been deleted' })
  @ApiBadRequestResponse({ description: 'Bad request: trackID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: idGEt) {
    return await this.trackService.remove(id);
  }
}

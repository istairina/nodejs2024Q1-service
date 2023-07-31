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
import { ArtistDto } from './dto/artist.dto';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOperation({ summary: 'Create a new artist' })
  @ApiCreatedResponse({
    description: 'The artist has been created',
    type: ArtistDto,
  })
  @ApiBadRequestResponse({
    description:
      'Bad request: some required fields are empty or it has wrong data',
  })
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @ApiOperation({ summary: 'Get list of all artists' })
  @ApiOkResponse({
    description: 'Artists have been got',
    type: ArtistDto,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.artistService.getAll();
  }

  @ApiOperation({ summary: 'Get an artist by ID' })
  @ApiParam({
    name: 'id',
    description: 'Put id',
  })
  @ApiOkResponse({ description: 'Album has been got', type: ArtistDto })
  @ApiBadRequestResponse({ description: 'Bad request: artistID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Get(':id')
  findOne(@Param() { id }: idGEt) {
    if (!this.artistService.getById(id))
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return this.artistService.getById(id);
  }

  @ApiOperation({ summary: 'Change data of the artist' })
  @ApiParam({
    name: 'id',
    description: 'Put id',
  })
  @ApiOkResponse({ description: 'User has been updated', type: ArtistDto })
  @ApiBadRequestResponse({ description: 'Bad request: artistID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Put(':id')
  update(@Param() { id }: idGEt, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @ApiOperation({ summary: 'Delete the artist' })
  @ApiParam({
    name: 'id',
    description: 'Put id',
  })
  @ApiNoContentResponse({ description: 'No content: artist has been deleted' })
  @ApiBadRequestResponse({ description: 'Bad request: artistID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: idGEt) {
    return this.artistService.remove(id);
  }
}

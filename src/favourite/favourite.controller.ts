import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Favourite } from './entities/favourite.entity';
import { idGEt } from 'src/common/dto/id.dto';

@ApiTags('favourite')
@Controller('favs')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @ApiOperation({ summary: 'Get list of all favourites' })
  @ApiOkResponse({
    description: 'All favourites have been got',
    type: Favourite,
  })
  @Get()
  findAll() {
    return this.favouriteService.findAll();
  }

  @ApiOperation({ summary: 'Add a new track to favourite' })
  @ApiParam({
    name: 'id',
    description: 'Put a track id',
  })
  @ApiCreatedResponse({
    description: 'The track has been added to favourites',
  })
  @ApiBadRequestResponse({ description: 'Bad request: trackID is invalid' })
  @ApiUnprocessableEntityResponse({ description: "TrackID doesn't exist" })
  @Post('/track/:id')
  addTrack(@Param() { id }: idGEt) {
    return this.favouriteService.addTrack(id);
  }

  @ApiOperation({ summary: 'Add a new album to favourite' })
  @ApiParam({
    name: 'id',
    description: 'Put an album id',
  })
  @ApiCreatedResponse({
    description: 'The album has been added to favourites',
  })
  @ApiBadRequestResponse({ description: 'Bad request: album ID is invalid' })
  @ApiUnprocessableEntityResponse({ description: "AlbumID doesn't exist" })
  @Post('/album/:id')
  addAlbum(@Param() { id }: idGEt) {
    return this.favouriteService.addAlbum(id);
  }

  @ApiOperation({ summary: 'Add a new artist to favourite' })
  @ApiParam({
    name: 'id',
    description: 'Put an artist id',
  })
  @ApiCreatedResponse({
    description: 'The artist has been added to favourites',
  })
  @ApiBadRequestResponse({ description: 'Bad request: artistID is invalid' })
  @ApiUnprocessableEntityResponse({ description: "ArtistID doesn't exist" })
  @Post('/artist/:id')
  addArtist(@Param() { id }: idGEt) {
    return this.favouriteService.addArtist(id);
  }

  @ApiOperation({ summary: 'Delete an artist from favourites' })
  @ApiParam({
    name: 'id',
    description: 'Put id',
  })
  @ApiNoContentResponse({
    description: 'No content: an item by the ID has been deleted',
  })
  @ApiBadRequestResponse({ description: 'Bad request: artistID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Delete('/artist/:id')
  removeArtist(@Param() { id }: idGEt) {
    return this.favouriteService.removeArtist(id);
  }

  @ApiOperation({ summary: 'Delete an album from favourites' })
  @ApiParam({
    name: 'id',
    description: 'Put id',
  })
  @ApiNoContentResponse({
    description: 'No content: an item by the ID has been deleted',
  })
  @ApiBadRequestResponse({ description: 'Bad request: albumID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Delete('/album/:id')
  removeAlbum(@Param() { id }: idGEt) {
    return this.favouriteService.removeAlbum(id);
  }

  @ApiOperation({ summary: 'Delete a track from favourites' })
  @ApiParam({
    name: 'id',
    description: 'Put id',
  })
  @ApiNoContentResponse({
    description: 'No content: an item by the ID has been deleted',
  })
  @ApiBadRequestResponse({ description: 'Bad request: trackID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Delete('/track/:id')
  removeTrack(@Param() { id }: idGEt) {
    return this.favouriteService.removeTrack(id);
  }
}

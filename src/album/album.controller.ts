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
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AlbumDto } from './dto/album.dto';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  // private albumsService: AlbumsService;

  constructor(private readonly albumService: AlbumService) { }

  @ApiOperation({ summary: "Create a new album" })
  @ApiCreatedResponse({ description: 'The album has been created', type: AlbumDto })
  @ApiBadRequestResponse({ description: 'Bad request: some required fields are empty or it has wrong data' })
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @ApiOperation({ summary: "Get list of all albums" })
  @ApiOkResponse({ description: 'Albums have been got', type: AlbumDto, isArray: true })
  @Get()
  findAll() {
    return this.albumService.getAll();
  }

  @ApiOperation({ summary: "Get an album by ID" })
  @ApiOkResponse({ description: 'Album has been got', type: AlbumDto })
  @ApiBadRequestResponse({ description: 'Bad request: albumID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Get(':id')
  findOne(@Param() { id }: idGEt) {
    return this.albumService.getById(id);
  }

  @ApiOperation({ summary: "Change data of the album" })
  @ApiOkResponse({ description: 'User has been updated', type: AlbumDto })
  @ApiBadRequestResponse({ description: 'Bad request: albumID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Put(':id')
  update(@Param() { id }: idGEt, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @ApiOperation({ summary: "Delete the album" })
  @ApiNoContentResponse({ description: 'No content: album has been deleted' })
  @ApiBadRequestResponse({ description: 'Bad request: albumID is invalid' })
  @ApiNotFoundResponse({ description: "ID doesn't exist in the database" })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: idGEt) {
    return this.albumService.remove(id);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { CreateAlbumDto } from './create-album.dto';

export class AlbumDto extends CreateAlbumDto {
  @ApiProperty({ example: "d8e625a1-cd53-4a12-94c0-9b6b253877ab" })
  id: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { CreateArtistDto } from './create-artist.dto';

export class ArtistDto extends CreateArtistDto {
  @ApiProperty({ example: "5fba5a9f-4c8d-44e4-807f-afc89d2dab66" })
  id: string;
}

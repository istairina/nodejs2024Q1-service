import { ApiProperty } from '@nestjs/swagger';
import { CreateTrackDto } from './create-track.dto';

export class TrackDto extends CreateTrackDto {
  @ApiProperty({ example: 'd598c59f-2bfc-465e-8d57-58eccb649b14' })
  id: string;
}

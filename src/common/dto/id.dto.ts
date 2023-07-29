import { IsUUID } from 'class-validator';

export class id {
  @IsUUID(4)
  id: string;
}

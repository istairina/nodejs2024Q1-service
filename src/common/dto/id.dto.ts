import { IsUUID } from 'class-validator';

export class idGEt {
  @IsUUID(4)
  id: string;
}

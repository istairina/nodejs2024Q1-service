import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @ApiProperty({ example: '5fba5a9f-4c8d-44e4-807f-afc89d2dab66' })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ example: 'The Cranberries' })
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  @IsBoolean()
  @Column()
  grammy: boolean;
}

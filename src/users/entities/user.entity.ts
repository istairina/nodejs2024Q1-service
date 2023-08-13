import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 'b2a0661b-20e9-4597-9c55-48105e4fa196' })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ example: 'user' })
  @IsNotEmpty()
  @IsString()
  @Column()
  login: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  password: string;

  @ApiProperty({ example: 1 })
  @Column()
  version: number;

  @ApiProperty({ example: Date.now() })
  @Column()
  createdAt: number;

  @ApiProperty({ example: Date.now() })
  @Column()
  updatedAt: number;
}

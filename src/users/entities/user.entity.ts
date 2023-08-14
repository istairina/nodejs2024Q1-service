import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 'b2a0661b-20e9-4597-9c55-48105e4fa196' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user' })
  @IsNotEmpty()
  @IsString()
  @Column()
  login: string;

  @IsNotEmpty()
  @IsString()
  @Column({ select: false })
  password: string;

  @ApiProperty({ example: 1 })
  @VersionColumn()
  version: number;

  @ApiProperty({ example: Date.now() })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: Date.now() })
  @UpdateDateColumn()
  updatedAt: Date;
}

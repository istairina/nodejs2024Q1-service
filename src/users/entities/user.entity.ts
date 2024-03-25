import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

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

  @ApiProperty({ required: true, example: Date.now() })
  @IsNotEmpty()
  @Column('bigint', {
    transformer: {
      from(value: string): number {
        return parseInt(value, 10);
      },
      to(value: number): string {
        return value.toString();
      },
    },
  })
  createdAt: number;

  @ApiProperty({ required: true, example: Date.now() })
  @Column('bigint', {
    transformer: {
      from(value: string): number {
        return parseInt(value, 10);
      },
      to(value: number): string {
        return value.toString();
      },
    },
  })
  updatedAt: number;
}

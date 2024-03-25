import { Track } from 'src/track/entities/track.entity';

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('track-favourite')
export class TrackFavourite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  trackId: string | null;

  @OneToOne(() => Track, (track) => track.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  track: Track;
}

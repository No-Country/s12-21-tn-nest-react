import { Mentor } from 'src/mentor/models/mentor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { State } from './state.entity';

@Entity('availability')
export class Availability {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  startDate: string;
  @Column()
  endDate: string;
  @Column()
  dayWeek: string;
  @ManyToMany(() => Mentor, (mentor) => mentor.availables)
  mentors: Mentor[];
  @ManyToOne(() => State, (state) => state.availabilities)
  @JoinColumn({ name: 'availabilityId' })
  state: State;
}

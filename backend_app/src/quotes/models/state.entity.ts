import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Availability } from './availability.entity';
@Entity({ name: 'state' })
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => Availability, (availability) => availability.state)
  availabilities: Availability[];
}

import { Mentor } from 'src/mentor/models/mentor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
@Entity({ name: 'state' })
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToMany(() => Mentor, (mentor) => mentor.stateMentor)
  state: Mentor[];
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Mentor } from './mentor.entity';
@Entity('speciality')
export class Speciality {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @OneToMany(() => Mentor, (mentor) => mentor.speciality)
  mentor: Mentor[];
}

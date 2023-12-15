import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('scheduler')
export class Scheduler {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
}

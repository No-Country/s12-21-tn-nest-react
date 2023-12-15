import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({ name: 'state' })
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
}

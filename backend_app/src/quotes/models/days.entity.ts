import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('days')
export class Days {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
}

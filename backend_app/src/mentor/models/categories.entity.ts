import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Mentor } from './mentor.entity';
@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  image: string;
  @ManyToMany(() => Mentor, (mentor) => mentor.categories)
  mentors: Mentor[];
}

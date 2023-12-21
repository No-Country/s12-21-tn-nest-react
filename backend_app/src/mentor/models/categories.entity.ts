import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Mentor } from './mentor.entity';
import { Alumn } from 'src/alunm/models/alumn.entity';
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
  @ManyToMany(() => Alumn, (alumn) => alumn.categories)
  alumn: Alumn[];
}

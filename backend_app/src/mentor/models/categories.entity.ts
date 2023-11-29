import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Mentor } from './mentor.entity';
import { AlumnHireMentor } from 'src/alunm/models/alumnHireMentor.entity';
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
  @OneToMany(
    () => AlumnHireMentor,
    (AlumnHireMentor) => AlumnHireMentor.categoryjoin,
  )
  AlumnHireMentors: AlumnHireMentor[];

  @ManyToMany(() => Alumn, (alumn) => alumn.categories)
  alumn: Alumn[];
}

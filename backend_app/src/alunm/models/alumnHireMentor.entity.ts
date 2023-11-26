import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Alumn } from './alumn.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';

@Entity({ name: 'alumn_hire_mentor' })
export class AlumnHireMentor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Alumn, (Alumn) => Alumn.AlumnHireMentors)
  alumnJoin: Alumn;

  @Column({ default: null, nullable: true })
  calification: 1 | 2 | 3 | 4 | 5;

  @ManyToOne(() => Mentor, (Mentor) => Mentor.AlumnHireMentors)
  mentorJoin: Mentor;

  @Column()
  date: Date;

  //for the moment we are going to use a string
  //TODO: change this to a relation
  @Column()
  categoryId: string;
}

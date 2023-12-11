import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Alumn } from './alumn.entity';
import { Mentor } from '../../mentor/models/mentor.entity';
import { Category } from '../../mentor/models/categories.entity';
import { BaseEntity } from '../../common/base/entity';

@Entity({ name: 'alumn_hire_mentor' })
export class AlumnHireMentor extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Alumn, (Alumn) => Alumn.AlumnHireMentors)
  alumnJoin: Alumn;

  @Column({ default: null, nullable: true })
  calification: number;

  @ManyToOne(() => Mentor, (Mentor) => Mentor.AlumnHireMentors)
  mentorJoin: Mentor;

  @Column()
  date: Date;

  @Column({ default: false })
  finished: boolean;

  @ManyToOne(() => Category, (Category) => Category.AlumnHireMentors)
  categoryjoin: Category;
}

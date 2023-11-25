import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

import { Mentor } from './mentor.entity';
import { Category } from './categories.entity';

@Entity({ name: 'mentorCategory' })
export class MentorCategory {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public descriptionCategories: string;

  @ManyToOne(() => Mentor, (mentor) => mentor.MentorsCategorys)
  @JoinColumn({ name: 'mentorId' })
  public mentorJoin: Mentor;

  @ManyToOne(() => Category, (category) => category.MentorsCategorys)
  @JoinColumn({ name: 'categoriesId' })
  public categoryJoin: Category;
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MentorCategory } from './mentorCategories.entity';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  image: string;
  @OneToMany(
    () => MentorCategory,
    (MentorCategory) => MentorCategory.categoryJoin,
  )
  public MentorsCategorys: MentorCategory[];
}

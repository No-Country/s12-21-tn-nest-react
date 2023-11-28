import { MentorCategory } from './mentorCategories.entity';
import { AlumnHireMentor } from 'src/alunm/models/alumnHireMentor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './categories.entity';
import { Speciality } from './especializaciones';

@Entity({ name: 'mentor' })
export class Mentor {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', nullable: true })
  mentorDescription: string;
  @Column({
    default:
      'https://s3.ppllstatics.com/elnortedecastilla/www/pre2017/multimedia/noticias/201501/12/media/cortadas/facebook-profile-picture-no-pic-avatar--575x323.jpg',
  })
  image: string;
  @Column()
  price: string;
  @Column({ type: 'text', nullable: true })
  aboutMe: string;
  @Column()
  birthdate: Date;
  @OneToMany(
    () => MentorCategory,
    (MentorCategory) => MentorCategory.mentorJoin,
  )
  public MentorsCategorys: MentorCategory[];

  @OneToMany(
    () => AlumnHireMentor,
    (AlumnHireMentor) => AlumnHireMentor.mentorJoin,
  )
  public AlumnHireMentors: AlumnHireMentor[];
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
  @ManyToMany(() => Category, (category) => category.mentors)
  @JoinTable({
    name: 'mentors_categories',
    joinColumn: {
      name: 'mentors_id',
    },
    inverseJoinColumn: {
      name: 'categories_id',
    },
  })
  categories: Category[];

  @ManyToOne(() => Speciality, (speciality) => speciality.mentor)
  speciality: Speciality;
}

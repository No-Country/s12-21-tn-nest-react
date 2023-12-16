import { BaseEntity } from '../../common/base/entity';
import { AlumnHireMentor } from 'src/alunm/models/alumnHireMentor.entity';
import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './categories.entity';
import { Speciality } from './especializaciones';
import { User } from 'src/auth/user/entities/user.entity';
import { Availability } from 'src/quotes/models/availability.entity';

@Entity({ name: 'mentor' })
export class Mentor extends BaseEntity {
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
    () => AlumnHireMentor,
    (AlumnHireMentor) => AlumnHireMentor.mentorJoin,
  )
  public AlumnHireMentors: AlumnHireMentor[];

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

  @OneToOne(() => User, (user) => user.mentor, { eager: true })
  @JoinColumn({
    name: 'user',
  })
  userId: User;
  @ManyToMany(() => Availability, (availability) => availability.mentors)
  @JoinTable({
    name: 'mentors_availability',
    joinColumn: {
      name: 'mentors_id',
    },
    inverseJoinColumn: {
      name: 'availability_id',
    },
  })
  availables: Availability[];
}

import { Entity, Column, OneToMany } from 'typeorm';
import { MentorCategory } from './mentorCategories.entity';
import { BaseEntity } from '../../common/base/entity';

@Entity({ name: 'mentor' })
export class Mentor extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  description: string;
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
}

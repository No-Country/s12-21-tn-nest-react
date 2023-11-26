import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AlumnHireMentor } from './alumnHireMentor.entity';

@Entity({ name: 'alumn' })
export class Alumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // for the moment we are going to use a string
  //TODO: change this to a relation
  @Column()
  userId: string;

  @Column({
    default:
      'https://s3.ppllstatics.com/elnortedecastilla/www/pre2017/multimedia/noticias/201501/12/media/cortadas/facebook-profile-picture-no-pic-avatar--575x323.jpg',
  })
  profileImg: string;

  @OneToMany(
    () => AlumnHireMentor,
    (AlumnHireMentor) => AlumnHireMentor.alumnJoin,
  )
  AlumnHireMentors: AlumnHireMentor[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;
}

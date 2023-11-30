import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AlumnHireMentor } from './alumnHireMentor.entity';
import { Category } from 'src/mentor/models/categories.entity';
import { Message } from 'src/gateway/models/gateway.entity';

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

  @ManyToMany(() => Category, (category) => category)
  @JoinTable({
    name: 'alumns_categories',
    joinColumn: {
      name: 'alumn_id',
    },
    inverseJoinColumn: {
      name: 'categories_id',
    },
  })
  categories: Category[];
  @OneToMany(() => Message, (message) => message.alunm)
  message: Message;
}

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AlumnHireMentor } from './alumnHireMentor.entity';
import { Category } from 'src/mentor/models/categories.entity';
import { Message } from 'src/messages/models/gateway.entity';
import { BaseEntity } from 'src/common/base/entity';
import { User } from 'src/auth/user/entities/user.entity';

@Entity({ name: 'alumn' })
export class Alumn extends BaseEntity {
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

  @OneToMany(() => Message, (message) => message.alumn)
  message: Message[];

  @OneToOne(() => User, (user) => user.alumn, { eager: true })
  @JoinColumn({
    name: 'user',
  })
  user: User;
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Alumn } from './alumn.entity';
import { Mentor } from '../../mentor/models/mentor.entity';
import { Category } from '../../mentor/models/categories.entity';
import { BaseEntity } from '../../common/base/entity';
import { Mpago } from 'src/mpago/entities/mpago.entity';
import { Stripe } from 'src/stripe/entities/stripe.entity';
import { Paypal } from 'src/paypal/entities/paypal.entity';

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

  //@Column({ default: false })
  //finished: boolean;

  @Column()
  comment: string;

  @ManyToOne(() => Category, (Category) => Category.AlumnHireMentors)
  categoryjoin: Category;

  @OneToOne(() => Mpago, (payment) => payment.mentorship, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'mpago_payment',
  })
  mpago_payment: Mpago;

  @OneToOne(() => Stripe, (payment) => payment.mentorship, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'stripe_payment',
  })
  stripe_payment: Stripe;

  @OneToOne(() => Paypal, (payment) => payment.mentorship, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'paypal_payment',
  })
  paypal_payment: Paypal;
}

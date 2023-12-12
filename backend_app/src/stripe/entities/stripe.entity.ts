import { AlumnHireMentor } from 'src/alunm/models/alumnHireMentor.entity';
import { BaseEntity } from 'src/common/base/entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'sripe_payments' })
export class Stripe extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  stripe_session_id: string;

  @Column({ type: 'text', nullable: false })
  status: string;

  @Column({ type: 'text', nullable: false })
  payment_status: string;

  @Column({ type: 'text', nullable: true })
  url: string;

  @OneToOne(() => AlumnHireMentor, (mentorship) => mentorship.payment, {
    eager: true,
  })
  @JoinColumn({
    name: 'mentorship',
  })
  mentorship: string;
}

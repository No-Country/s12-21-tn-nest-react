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
  /*
    @OneToOne(() => Mentorship, (mentorship) => mentorship.payment, { eager: true })
    @JoinColumn({
      name: 'mentorship',
    })
  */
  @Column({ type: 'text', nullable: false })
  mentorship: string;
  @Column({ type: 'text', nullable: true })
  url: string;
}

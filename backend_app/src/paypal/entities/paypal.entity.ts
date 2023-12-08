import { BaseEntity } from 'src/common/base/entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'paypal_payments' })
export class Paypal extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  paypal_id: string;
  @Column({ type: 'text', nullable: false })
  status: string;
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

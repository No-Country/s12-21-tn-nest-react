import { AlumnHireMentor } from 'src/alunm/models/alumnHireMentor.entity';
import { BaseEntity } from 'src/common/base/entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'paypal_payments' })
export class Paypal extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  paypal_id: string;

  @Column({ type: 'text', nullable: false })
  status: string;

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

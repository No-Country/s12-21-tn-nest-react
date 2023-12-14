import { AlumnHireMentor } from 'src/alunm/models/alumnHireMentor.entity';
import { BaseEntity } from 'src/common/base/entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'mpago_payments' })
export class Mpago extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  mpago_preference_id: string;

  @Column({ type: 'text', nullable: false })
  status: string;

  @Column({ type: 'text', nullable: false })
  status_detail: string;

  @Column({ type: 'text', nullable: true })
  url: string;

  @OneToOne(() => AlumnHireMentor, (mentorship) => mentorship.mpago_payment)
  @JoinColumn({
    name: 'mentorship',
  })
  mentorship: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('consulta')
export class Consulta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'boolean', default: false })
  status: boolean;
}

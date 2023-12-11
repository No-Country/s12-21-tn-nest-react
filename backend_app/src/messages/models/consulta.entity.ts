import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Message } from './gateway.entity';

@Entity('consulta')
export class Consulta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @OneToMany(() => Message, (message) => message.consultaId)
  messages: Message[];
}

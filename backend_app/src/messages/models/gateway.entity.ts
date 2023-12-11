import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Consulta } from './consulta.entity';
import { Alumn } from 'src/alunm/models/alumn.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';
@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @ManyToOne(() => Alumn, (alumn) => alumn.message)
  @JoinColumn()
  alumn: Alumn;

  @ManyToOne(() => Mentor, (mentor) => mentor.id)
  mentor: Mentor;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ nullable: true, default: 'unread' })
  status: string;

  @ManyToOne(() => Consulta, (consulta) => consulta.messages)
  @JoinColumn()
  consultaId: Consulta;
}

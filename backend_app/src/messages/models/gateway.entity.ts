import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Consulta } from './consulta.entity';
import { Alumn } from 'src/alunm/models/alumn.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';
@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => Alumn, (alumn) => alumn.id)
  @JoinColumn()
  alunm: Alumn;
  //Alumno que envia el mensaje
  @Column()
  sender: string;
  //Mentor que recibe el mensaje
  @Column()
  receiver: string;
  @ManyToOne(() => Mentor, (mentor) => mentor.id)
  mentor: Mentor;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ nullable: true, default: 'unread' })
  status: string;

  @ManyToOne(() => Consulta)
  @JoinColumn()
  consulta: Consulta;
}

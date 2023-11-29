import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Consulta } from './consulta.entity';
@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;
  //Alumno que envia el mensaje
  @Column()
  sender: string;
  //Mentor que recibe el mensaje
  @Column()
  receiver: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ nullable: true, default: 'unread' })
  status: string;

  @OneToOne(() => Consulta)
  @JoinColumn()
  consulta: Consulta;

  constructor(
    id: number,
    message: string,
    sender: string,
    receiver: string,
    date: Date,
    status: string,
  ) {
    this.id = id;
    this.message = message;
    this.sender = sender;
    this.receiver = receiver;
    this.date = date;
    this.status = status;
  }
}

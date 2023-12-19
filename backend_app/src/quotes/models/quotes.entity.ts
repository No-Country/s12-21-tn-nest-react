import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { State } from './state.entity';
import { Mentor } from 'src/mentor/models/mentor.entity';
import { Alumn } from 'src/alunm/models/alumn.entity';
@Entity('quotes')
export class Quotes {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  appointmentDate: Date;
  @Column({ nullable: true })
  textTime: string;
  @Column({ type: 'text', nullable: true })
  textRejection: string;
  @ManyToOne(() => State, (state) => state.quotes)
  state: State;
  @ManyToOne(() => Mentor, (mentor) => mentor.quotes)
  public mentor: Mentor;
  @ManyToOne(() => Alumn, (alumn) => alumn.quotes)
  public alumn: Alumn;
}

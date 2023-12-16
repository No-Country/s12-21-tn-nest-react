import { Mentor } from 'src/mentor/models/mentor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('availability')
export class Availability {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  startDate: string;
  @Column()
  endDate: string;
  @Column()
  dayWeek: string;
  @ManyToOne(() => Mentor, (mentor) => mentor.availables)
  mentor: Mentor;
}

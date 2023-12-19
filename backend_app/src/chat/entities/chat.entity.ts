import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from 'src/auth/user/entities/user.entity';

@Entity({ name: 'chat' })
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  alumnId: string;

  @Column()
  mentorId: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'alumnId' })
  alumn: User;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'mentorId' })
  mentor: User;
  // todo: change relationship to chat

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

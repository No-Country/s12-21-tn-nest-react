import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from 'src/auth/user/entities/user.entity';

@Entity({ name: 'chat' })
export class Chat {
  @Column()
  id: string;

  @PrimaryColumn()
  alumnId: string;

  @PrimaryColumn()
  mentorId: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'alumnId' })
  alumn: User;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'mentorId' })
  mentor: User;
  // todo: change relationship to chat
  @OneToMany(() => Message, (message) => message.id)
  message: string[];

  @OneToMany(() => Message, (message) => message.chat)
  message: Message[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

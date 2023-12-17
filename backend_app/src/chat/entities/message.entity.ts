import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import { User } from '../../auth/user/entities/user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @ManyToOne(() => Chat, (chat) => chat.message)
  chat: string;

  @ManyToOne(() => User, (user) => user)
  sender: User;

  @ManyToOne(() => User, (user) => user)
  receiver: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

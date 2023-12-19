import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import { User } from '../../auth/user/entities/user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  message: string;

  @Column({ default: false })
  chatId: string;

  @ManyToOne(() => Chat, (chat) => chat)
  @JoinColumn({ name: 'chatId' })
  chat: Chat;

  @Column({ default: false })
  senderId: string;
  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

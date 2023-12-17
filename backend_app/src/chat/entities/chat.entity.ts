import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
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

  @OneToMany(() => Message, (message) => message.id)
  message: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
function GeneratedColumn(
  arg0: string,
): (target: Chat, propertyKey: 'id') => void {
  throw new Error('Function not implemented.');
}

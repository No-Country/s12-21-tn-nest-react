import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Quotes } from './quotes.entity';
@Entity({ name: 'state' })
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => Quotes, (quotes) => quotes.state)
  quotes: Quotes[];
}

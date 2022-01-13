import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

export enum TaskState {
  AWAITING_COMPLETION = 'awaiting',
  AWAITING_REVIEW = 'review',
  FULFILLED = 'fulfilled',
  UNFULFILLED = 'unfulfilled',
}

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskState,
    default: TaskState.AWAITING_COMPLETION,
  })
  taskState: TaskState;

  @Column({ nullable: true })
  fromUserId: number;

  @ManyToOne(() => User, (user) => user.sentTasks)
  fromUser: User;

  @Column({ nullable: true })
  toUserId: number;

  @ManyToOne(() => User, (user) => user.recievedTasks)
  toUser: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

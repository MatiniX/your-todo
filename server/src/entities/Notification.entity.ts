import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FriendRequest } from './FriendRequest.entity';
import { Task } from './Task.entity';
import { User } from './User.entity';

export enum NotificationType {
  NEW_FRIEND_REQUEST = 'new_friend_request',
  NEW_TASK = 'new_task',
  FRIEND_REQUEST_ACCEPTED = 'friend_request_accepted',
  FRIEND_REQUEST_REJECTED = 'friend_request_rejected',
  TASK_COMPLETED = 'task_completed',
  TASK_REJECTED = 'task_rejected',
  TASK_ACCEPTED = 'task_accepted',
  FRIENDSHIP_CANCELED = 'friendship_canceled',
}

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column()
  message: string;

  @Column({ default: false })
  seen: boolean;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @Column({ nullable: true })
  taskId: number;

  @ManyToOne(() => Task, { nullable: true })
  task;

  @Column({ nullable: true })
  friendRequestId: number;

  @ManyToOne(() => FriendRequest, { nullable: true })
  friendRequest: FriendRequest;

  @CreateDateColumn()
  createdAt: Date;
}

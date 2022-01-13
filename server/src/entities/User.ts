import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FriendRequest } from './FriendRequest';
import { Task } from './Task';
import { Notification } from './Notification';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: 0 })
  trustPoints: number;

  @ManyToMany(() => User, { cascade: false })
  @JoinTable()
  friends: User[];

  @OneToMany(() => FriendRequest, (request) => request.fromUser)
  sentFriendRequests: FriendRequest[];

  @OneToMany(() => FriendRequest, (request) => request.toUser)
  recievedFriendRequests: FriendRequest[];

  @OneToMany(() => Task, (task) => task.fromUser)
  sentTasks: Task[];

  @OneToMany(() => Task, (task) => task.toUser)
  recievedTasks: Task[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

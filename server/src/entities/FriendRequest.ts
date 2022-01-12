import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

export enum FriendRequestState {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@Entity()
export class FriendRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  seen: boolean;

  @Column({
    type: 'enum',
    enum: FriendRequestState,
    default: FriendRequestState.PENDING,
  })
  state: FriendRequestState;

  @ManyToOne(() => User, (user) => user.sentFriendRequests)
  fromUser: User;

  @ManyToOne(() => User, (user) => user.recievedFriendRequests)
  toUser: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

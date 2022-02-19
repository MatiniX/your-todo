import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';

export enum FriendRequestState {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@Entity()
export class FriendRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: FriendRequestState,
    default: FriendRequestState.PENDING,
  })
  state: FriendRequestState;

  @Column({ nullable: true })
  fromUserId: number;

  @ManyToOne(() => User, (user) => user.sentFriendRequests)
  fromUser: User;

  @Column({ nullable: true })
  toUserId: number;

  @ManyToOne(() => User, (user) => user.recievedFriendRequests)
  toUser: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

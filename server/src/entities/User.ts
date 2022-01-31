import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  getConnection,
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

  static async getFriends(userId: number) {
    // custom sql query ktorá vráti list priateľov len s id a username
    const friends: User[] = await getConnection().query(
      `
    select "friend"."id" as "id", "friend"."username" as "username", "friend"."trustPoints" as "trustPoints" from "user"
    left join "user_friends_user" on "user_friends_user"."userId_1"="user"."id"
    left join "user" "friend" on "friend"."id"="user_friends_user"."userId_2"
    where "user"."id"=$1`,
      [userId],
    );

    if (friends[0].id === null) return null;

    return friends;
  }
}

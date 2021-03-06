import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import * as argon2 from 'argon2';
import {
  FriendRequest,
  FriendRequestState,
} from 'src/entities/FriendRequest.entity';
import { getConnection } from 'typeorm';
import { NotificationService } from 'src/services/notification.service';
import { Task, TaskState } from 'src/entities/Task.entity';

@Injectable()
export class UserService {
  constructor(private readonly notificationService: NotificationService) {}

  async createUser(userDetails: { username; email; password }) {
    const newUser = new User();

    const hashedPassword = await argon2.hash(userDetails.password);
    newUser.username = userDetails.username;
    newUser.email = userDetails.email;
    newUser.password = hashedPassword;

    try {
      const { password, ...user } = await newUser.save();
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @description
   * Ak nie je potrebné všetky atribúty User entity,
   * tak použiť User.findOne() metódu namiesto tejto
   * @returns
   * Navráti PLNE hydratovanú User entitu!
   */
  async findByIdFull(id: number) {
    return await User.findOne(id, {
      relations: [
        'friends',
        'sentFriendRequests',
        'recievedFriendRequests',
        'sentTasks',
        'recievedTasks',
        'notifications',
      ],
    });
  }

  async findById(id: number) {
    return await User.findOne(id, {
      select: ['id', 'username', 'password', 'email'],
    });
  }

  async findByUsername(username: string) {
    return await User.findOne({
      where: { username: username },
      select: ['id', 'password', 'username', 'email'],
    });
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: { email: email },
      select: ['id', 'password', 'username', 'email'],
    });
  }

  async updatePassword(id: number, newPassword: string) {
    const hashedPassword = await argon2.hash(newPassword);
    await User.update({ id }, { password: hashedPassword });
  }

  getUserDetails(userId: number) {
    return User.findOne(userId, {
      select: ['id', 'email', 'username', 'createdAt'],
    });
  }

  async getFriends(userId: number) {
    return User.getFriends(userId);
  }

  async getFriendDetails(friendId: number) {
    const friend = await User.findOne(friendId, {
      select: ['username', 'trustPoints', 'createdAt'],
    });

    const tasksSent = await Task.createQueryBuilder('task')
      .where('task.fromUserId = :friendId', { friendId })
      .getCount();
    const tasksRecieved = await Task.createQueryBuilder('task')
      .where('task.toUserId = :friendId', { friendId })
      .getCount();

    return {
      username: friend.username,
      trustPoints: friend.trustPoints,
      memberSince: friend.createdAt,
      tasksSent,
      tasksRecieved,
    };
  }

  async getUserStats(userId: number) {
    const user = await await User.findOne(userId, {
      relations: ['sentTasks', 'recievedTasks', 'friends'],
    });

    const tasksCompleted = await Task.find({
      where: { taskState: TaskState.FULFILLED, toUserId: userId },
    });

    const tasksFailed = await Task.find({
      where: { taskState: TaskState.UNFULFILLED, toUserId: userId },
    });

    return {
      trustPoints: user.trustPoints,
      tasksCompleted: tasksCompleted.length,
      tasksFailed: tasksFailed.length,
      friends: user.friends.length,
      tasksSent: user.sentTasks.length,
      tasksRecieved: user.recievedTasks.length,
    };
  }

  async getLeaderboard() {
    const top = await User.find({
      order: { trustPoints: 'DESC' },
      take: 10,
      select: ['id', 'trustPoints', 'username'],
    });

    return top;
  }

  async getIndexStats(userId: number) {
    const myPlacement: Array<any> = await getConnection().query(
      `
    WITH "all" AS (
      SELECT "id", "username", "trustPoints",
      ROW_NUMBER() OVER(ORDER BY "user"."trustPoints" DESC) as "rank"
      FROM "user"
    )
    SELECT
    "rank"
    FROM "all"
    WHERE "all"."id" = $1`,
      [userId],
    );
    const myRank = myPlacement[0].rank; // vyjme iba rank z navrátenej query

    const taskToComplete = await Task.count({
      where: { toUserId: userId, taskState: TaskState.AWAITING_COMPLETION },
    });
    const taskToReview = await Task.count({
      where: { fromUserId: userId, taskState: TaskState.AWAITING_REVIEW },
    });

    return { myRank, taskToComplete, taskToReview };
  }

  /**
   * Friend requests
   */

  async sendFriendRequest(from: number, to: number) {
    const friendRequest = new FriendRequest();
    const fromUser = await User.findOne(from);
    if (!fromUser) {
      throw new BadRequestException(`User with id: ${from} does not exists!`);
    }
    const toUser = await User.findOne(to);
    if (!toUser) {
      throw new BadRequestException(`This user does not exists!`);
    }

    friendRequest.fromUser = fromUser;
    friendRequest.toUser = toUser;

    await friendRequest.save();
    await this.notificationService.newFriendRequest(friendRequest);

    return friendRequest;
  }

  async makeFriends(first: number, second: number) {
    const firstUser = await User.findOne(first, { relations: ['friends'] });
    if (!firstUser) {
      throw new BadRequestException(`User with id: ${first} does not exists`);
    }
    const secondUser = await User.findOne(second, { relations: ['friends'] });
    if (!secondUser) {
      throw new BadRequestException(`User with id: ${second} does not exists`);
    }

    firstUser.friends = [...firstUser.friends, secondUser];
    secondUser.friends = [...secondUser.friends, firstUser];

    await firstUser.save();
    await secondUser.save();
  }

  async cancelFriendship(first: number, second: number) {
    if (first === second) {
      throw new BadRequestException("You can't unfriend yourself");
    }

    const firstUser = await User.findOne(first, { relations: ['friends'] });
    if (!firstUser) {
      throw new BadRequestException(`User with id: ${first} does not exists`);
    }
    const secondUser = await User.findOne(second, { relations: ['friends'] });
    if (!secondUser) {
      throw new BadRequestException(`User with id: ${second} does not exists`);
    }

    const firstUserFriends = firstUser.friends.filter(
      (friend) => friend.id !== second,
    );
    const secondUserFriends = secondUser.friends.filter(
      (friend) => friend.id !== first,
    );

    firstUser.friends = firstUserFriends;
    secondUser.friends = secondUserFriends;

    await firstUser.save();
    await secondUser.save();

    await this.notificationService.friendshipCanceled(firstUser, secondUser);

    return firstUserFriends;
  }

  async acceptFriendRequest(id: number) {
    const friendRequest = await FriendRequest.findOne(id, {
      relations: ['fromUser', 'toUser'],
    });
    if (!friendRequest) {
      throw new BadRequestException('This friend request does not exists!');
    }

    await this.makeFriends(friendRequest.fromUser.id, friendRequest.toUser.id);

    friendRequest.state = FriendRequestState.ACCEPTED;
    await friendRequest.save();

    await this.notificationService.friendRequestAccepted(friendRequest);

    return friendRequest;
  }

  async rejectFriendRequest(id: number) {
    const friendRequest = await FriendRequest.findOne(id, {
      relations: ['fromUser', 'toUser'],
    });
    if (!friendRequest) {
      throw new BadRequestException('Friend request does not exists!');
    }

    friendRequest.state = FriendRequestState.REJECTED;
    await friendRequest.save();

    await this.notificationService.friendRequestRejected(friendRequest);

    return friendRequest;
  }

  async areFriends(first: number, second: number) {
    const result: Array<any> = await getConnection().query(
      `
    select * from "user_friends_user"
    where "userId_1" = $1 and "userId_2" = $2;
    `,
      [first, second],
    );
    return result.length > 0;
  }

  async getFriendRequests(userId: number) {
    return FriendRequest.find({
      where: { toUserId: userId, state: FriendRequestState.PENDING },
      relations: ['fromUser'],
    });
  }
}

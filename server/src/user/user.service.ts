import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/entities/User';
import * as argon2 from 'argon2';
import { FriendRequest, FriendRequestState } from 'src/entities/FriendRequest';
import { getConnection } from 'typeorm';
import { NotificationDto, NotificationType } from './models/notification.dto';
import { request } from 'express';
import { Task, TaskState } from 'src/entities/Task';

@Injectable()
export class UserService {
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
  async findById(id: number) {
    return await User.findOne(id, {
      relations: [
        'friends',
        'sentFriendRequests',
        'recievedFriendRequests',
        'sentTasks',
        'recievedTasks',
      ],
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

    return await friendRequest.save();
  }

  async makeFriends(first: number, second: number) {
    const firstUser = await this.findById(first);
    if (!firstUser) {
      throw new BadRequestException(`User with id: ${first} does not exists`);
    }
    const secondUser = await this.findById(second);
    if (!secondUser) {
      throw new BadRequestException(`User with id: ${second} does not exists`);
    }

    firstUser.friends = [...firstUser.friends, secondUser];
    secondUser.friends = [...secondUser.friends, firstUser];

    await firstUser.save();
    await secondUser.save();
  }

  async cancelFriendship(first: number, second: number) {
    const firstUser = await this.findById(first);
    if (!firstUser) {
      throw new BadRequestException(`User with id: ${first} does not exists`);
    }
    const secondUser = await this.findById(second);
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
  }

  // Refaktorizovať! Použiť queryBuilder pre lepšie SQL, error checking a handling
  async acceptFriendRequest(id: number) {
    const friendRequest = await FriendRequest.findOne(id, {
      relations: ['fromUser', 'toUser'],
    });
    if (!friendRequest) {
      throw new BadRequestException('This friend request does not exists!');
    }

    await this.makeFriends(friendRequest.fromUser.id, friendRequest.toUser.id);

    friendRequest.state = FriendRequestState.ACCEPTED;
    return await friendRequest.save();
  }

  async rejectFriendRequest(id: number) {
    const friendRequest = await FriendRequest.findOne(id);
    if (!friendRequest) {
      throw new BadRequestException('Friend request does not exists!');
    }

    friendRequest.state = FriendRequestState.REJECTED;
    return await friendRequest.save();
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

  // Dokončiť!
  async getNotifications(userId: number) {
    const user = await User.findOne(userId, {
      relations: [
        'sentFriendRequests',
        'recievedFriendRequests',
        'sentTasks',
        'recievedTasks',
      ],
    });

    // prettier-ignore
    const friendRequestNotifications = await this.getFriendRequestNotifications(user);
    const taskNotifications = await this.getTaskNotifications(user);
  }

  getTaskNotifications(user: User) {
    const sentTasks = user.sentTasks.filter(
      (task) =>
        task.seen === false && task.taskState === TaskState.AWAITING_REVIEW,
    );

    const recievedTasks = user.recievedTasks.filter(
      (task) =>
        task.seen === false &&
        (task.taskState === TaskState.AWAITING_COMPLETION ||
          task.taskState === TaskState.FULFILLED ||
          task.taskState === TaskState.UNFULFILLED),
    );

    return this.createTaskNotifications(sentTasks, recievedTasks);
  }

  /**
   * Zmapuje tasky na vhodné notifikácie
   */
  createTaskNotifications(sentTasks: Task[], recievedTasks: Task[]) {
    const sentNotification = sentTasks.map((task) => {
      const notifiaction = new NotificationDto();
      notifiaction.type = NotificationType.TASK_COMPLETED;
      notifiaction.message = 'User claims to complete given task';
      notifiaction.date = task.updatedAt;
      return notifiaction;
    });

    const recievedNotifications = recievedTasks.map((task) => {
      const notifiaction = new NotificationDto();
      if (task.taskState === TaskState.AWAITING_COMPLETION) {
        notifiaction.type = NotificationType.NEW_TASK;
        notifiaction.message = 'You have a new task!';
        notifiaction.date = task.createdAt;
      } else if (task.taskState === TaskState.FULFILLED) {
        notifiaction.type = NotificationType.TASK_ACCEPTED;
        notifiaction.message = 'Your task was accepted!';
        notifiaction.date = task.updatedAt;
      } else {
        notifiaction.type = NotificationType.TASK_REJECTED;
        notifiaction.message = 'Your task was rejected!';
        notifiaction.date = task.updatedAt;
      }
      return notifiaction;
    });

    return [...sentNotification, ...recievedNotifications];
  }

  getFriendRequestNotifications(user: User) {
    // všetky friend requesty, ktoré úžívateľ poslal, a ktoré zmenili state a uživateľ ich ešte nevidel
    const sentRequests = user.sentFriendRequests.filter(
      (request) =>
        request.seen === false &&
        (request.state === FriendRequestState.ACCEPTED ||
          request.state === FriendRequestState.REJECTED),
    );

    // všetky nové friend requesty
    const recievedRequests = user.recievedFriendRequests.filter(
      (request) =>
        request.seen === false && request.state === FriendRequestState.PENDING,
    );

    return this.createFriendRequestNotifications(
      sentRequests,
      recievedRequests,
    );
  }

  /**
   * Zmapuje friend requesty na vhodné notifikácie
   */
  createFriendRequestNotifications(
    sentRequests: FriendRequest[],
    recievedRequests: FriendRequest[],
  ) {
    const sentNotifications = sentRequests.map((request) => {
      const notification = new NotificationDto();
      if ((request.state = FriendRequestState.ACCEPTED)) {
        notification.type = NotificationType.FRIEND_REQUEST_ACCEPTED;
        notification.message = 'Friend reuqest was accepted';
        notification.date = request.updatedAt;
      } else {
        notification.type = NotificationType.FRIEND_REQUEST_REJECTED;
        notification.message = 'Friend reuqest was rejected';
        notification.date = request.updatedAt;
      }
      return notification;
    });

    const recievedNotifications = recievedRequests.map((request) => {
      const notification = new NotificationDto();
      notification.type = NotificationType.NEW_FRIEND_REQUEST;
      notification.message = 'You have new friend request!';
      notification.date = request.createdAt;
      return notification;
    });

    return [...sentNotifications, ...recievedNotifications];
  }
}

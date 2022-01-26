import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/entities/User';
import * as argon2 from 'argon2';
import { FriendRequest, FriendRequestState } from 'src/entities/FriendRequest';
import { getConnection } from 'typeorm';
import { NotificationService } from 'src/services/notification.service';

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
  async findById(id: number) {
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

  async getFriends(userId: number) {
    return User.getFriends(userId);
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
    if (first === second) {
      throw new BadRequestException("You can't unfriend yourself");
    }

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

    await this.notificationService.friendshipCanceled(firstUser, secondUser);
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
}

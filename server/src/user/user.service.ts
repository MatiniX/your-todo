import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/User';
import * as argon2 from 'argon2';
import { FriendRequest, FriendRequestState } from 'src/entities/FriendRequest';

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

  async findById(id: number) {
    return await User.findOne(id, {
      relations: ['friends', 'sentFriendRequests', 'recievedFriendRequests'],
    });
  }

  async findByUsername(username: string) {
    return await User.findOne({ where: { username: username } });
  }

  async findByEmail(email: string) {
    return await User.findOne({ where: { email: email } });
  }

  async updatePassword(id: number, newPassword: string) {
    const hashedPassword = await argon2.hash(newPassword);
    await User.update({ id }, { password: hashedPassword });
  }

  async sendFriendRequest(from: number, to: number) {
    const friendRequest = new FriendRequest();
    const fromUser = await User.findOne(from);
    const toUser = await User.findOne(to);

    friendRequest.fromUser = fromUser;
    friendRequest.toUser = toUser;

    await friendRequest.save();
  }

  // Refaktorizovať! Použiť queryBuilder pre lepšie SQL, error checking a handling
  async acceptFriendRequest(id: number) {
    const friendRequest = await FriendRequest.findOne(id, {
      relations: ['fromUser', 'toUser'],
    });

    const fromUser = await this.findById(friendRequest.fromUser.id);
    const toUser = await this.findById(friendRequest.toUser.id);

    fromUser.friends = [...fromUser.friends, toUser];
    toUser.friends = [...toUser.friends, fromUser];

    await fromUser.save();
    await toUser.save();

    friendRequest.state = FriendRequestState.ACCEPTED;
    await friendRequest.save();
  }

  async rejectFriendRequest(id: number) {
    const friendRequest = await FriendRequest.findOne(id);

    friendRequest.state = FriendRequestState.REJECTED;
    await friendRequest.save();
  }
}

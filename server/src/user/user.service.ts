import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/User';
import * as argon2 from 'argon2';

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
    return await User.findOne(id);
  }

  // Rozdeliť na separátne funkcie findByEmail a findByUsername
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
}

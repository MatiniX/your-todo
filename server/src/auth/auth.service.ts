import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './models/login-user.dto';
import { RegisterUserDto } from './models/register-user.dto';
import * as argon2 from 'argon2';
import { v4 } from 'uuid';
import { REDIS } from 'redis/redis.constants';
import { Redis } from 'ioredis';
import { FORGET_PASSWORD_PREFIX } from 'src/constants';
import { sendEmail } from 'src/utils/sendEmail';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(REDIS) private readonly redis: Redis,
  ) {}

  async validateUser(user: LoginUserDto) {
    const foundUser = await this.userService.findByEmailOrUsername(
      user.usernameOrEmail,
    );
    const comparePasswords = await argon2.verify(
      foundUser.password,
      user.password,
    );

    if (!foundUser || !comparePasswords) {
      throw new UnauthorizedException('Incorrect username or password!');
    }

    const { password: _, ...retUser } = foundUser;
    return retUser;
  }

  // Validácia hesiel!
  async registerUser(user: RegisterUserDto) {
    const existingUser = await this.userService.findByEmailOrUsername(
      user.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email already in use!');
    }
    if (user.password !== user.confirmationPassword) {
      throw new BadRequestException(
        'Password does not match confirmation password',
      );
    }

    const { confirmationPassword: _, ...userDetails } = user;
    const newUser = await this.userService.createUser(userDetails);

    return newUser;
  }

  async generateChangePasswordToken(email: string) {
    const user = await this.userService.findByEmailOrUsername(email);
    if (!user) {
      return false;
    }

    const token = v4();
    await this.redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      'ex',
      1000 * 60 * 60 * 24,
    );
    await sendEmail(email, `<h1>${token}</h1>`);
    return true;
  }

  async changePassword(token: string, newPassword: string) {
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await this.redis.get(key);
    if (!userId) {
      throw new BadRequestException('Your token is expired!');
    }

    const id = Number(userId);
    await this.userService.updatePassword(id, newPassword);
    await this.redis.del(key);
    return true;
  }
}

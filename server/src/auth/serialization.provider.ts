import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/entities/User.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(
    user: User,
    done: (err: Error, user: { id: number; username: string }) => void,
  ) {
    done(null, { username: user.username, id: user.id });
  }
  async deserializeUser(
    payload: number,
    done: (err: Error, user: Omit<User, 'password'>) => void,
  ) {
    const user = await this.userService.findById(payload);
    done(null, user);
  }
}

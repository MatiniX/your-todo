import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as session from 'express-session';
import { REDIS } from 'redis/redis.constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as RedisStore from 'connect-redis';
import { RedisModule } from 'redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as passport from 'passport';
import { User } from './entities/User';
import { AuthController } from './auth/auth.controller';
import { FriendRequest } from './entities/FriendRequest';
import { Task } from './entities/Task';
import { TaskModule } from './task/task.module';
import { Notification } from './entities/Notification';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'your-todo-dev',
      entities: [User, FriendRequest, Task, Notification],
      synchronize: true,
      logging: true,
    }),
    RedisModule,
    AuthModule,
    UserModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: 'mysecret',
          resave: false,
          cookie: {
            sameSite: 'lax',
            httpOnly: false,
            maxAge: 1000 * 60 * 60 * 24 * 365 * 1,
            secure: false,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}

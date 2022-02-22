import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as session from 'express-session';
import { REDIS } from 'redis/redis.constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as RedisStore from 'connect-redis';
import { RedisModule } from 'redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as passport from 'passport';
import { TaskModule } from './task/task.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { __prod__ } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule,
    AuthModule,
    UserModule,
    TaskModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(REDIS) private readonly redis,
    private readonly configService: ConfigService,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: this.configService.get('SESSION_SECRET'),
          resave: false,
          cookie: {
            sameSite: 'none',
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365 * 1,
            secure: __prod__,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}

import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthSerializer } from './serialization.provider';
import { RedisModule } from 'redis/redis.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ session: true }),
    RedisModule,
  ],
  providers: [AuthService, LocalStrategy, AuthSerializer, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}

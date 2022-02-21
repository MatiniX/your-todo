import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Redis from 'ioredis';

import { REDIS } from './redis.constants';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        new Redis(configService.get('REDIS_URL')),
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}

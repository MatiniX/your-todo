import { Module } from '@nestjs/common';
import * as Redis from 'ioredis';

import { REDIS } from './redis.constants';

@Module({
  providers: [
    {
      provide: REDIS,
      useValue: new Redis(),
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}

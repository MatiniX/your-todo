import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { NotificationService } from 'src/services/notification.service';

@Module({
  providers: [UserService, NotificationService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

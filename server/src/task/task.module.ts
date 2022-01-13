import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { NotificationService } from 'src/services/notification.service';

@Module({
  imports: [UserModule, AuthModule],
  providers: [TaskService, NotificationService],
  controllers: [TaskController],
})
export class TaskModule {}

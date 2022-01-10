import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [UserModule, AuthModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}

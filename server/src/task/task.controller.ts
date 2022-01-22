import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoggedInGuard } from 'src/guards/logged-in.guard';
import { UserService } from 'src/user/user.service';
import { CreateTaskDto } from './models/create-task.dto';
import { TaskService } from './task.service';

@UseGuards(LoggedInGuard)
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

  @Get('mine')
  getMyTasks(@Req() req) {
    return this.taskService.getAllRecieved(req.session.passport.user.id);
  }

  @Get('to-complete')
  getTasksForCompletion(@Req() req) {
    return this.taskService.getAllUncomplete(req.session.passport.user.id);
  }

  @Get('review')
  getTasksForReview(@Req() req) {
    return this.taskService.getAllForReview(req.session.passport.user.id);
  }

  @Get('archived')
  getArchivedTasks(@Req() req) {
    return this.taskService.getAllArchived(req.session.passport.user.id);
  }

  @Get(':id')
  getTask(@Param('id', new ParseIntPipe()) id) {
    return this.taskService.getById(id);
  }

  @Post('create')
  createTask(@Req() req, @Body() task: CreateTaskDto) {
    const fromUserId = req.session.passport.user.id;
    task.fromUserId = fromUserId;

    const areFriends = this.userService.areFriends(
      task.fromUserId,
      task.toUserId,
    );
    if (!areFriends) {
      throw new BadRequestException('You can only send task to your friends!');
    }
    return this.taskService.createTask(task);
  }

  @Patch('complete/:id')
  markTaskComplete(@Param('id', new ParseIntPipe()) id) {
    return this.taskService.setForReview(id);
  }

  @Patch('accept/:id')
  acceptTaskCompletion(@Param('id', new ParseIntPipe()) id) {
    return this.taskService.acceptTaskCompletion(id);
  }

  @Patch('reject/:id')
  rejectTaskCompletion(@Param('id', new ParseIntPipe()) id) {
    return this.taskService.rejectTaskCompletion(id);
  }

  @Delete(':id')
  deleteTask(@Param('id', new ParseIntPipe()) id) {
    return this.taskService.deleteTask(id);
  }
}

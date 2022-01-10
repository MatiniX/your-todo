import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoggedInGuard } from 'src/guards/logged-in.guard';
import { CreateTaskDto } from './models/create-task.dto';
import { TaskService } from './task.service';

@UseGuards(LoggedInGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('mine')
  getMyTasks(@Req() req) {
    return this.taskService.getAllByToUserId(req.session.passport.user.id);
  }

  @Post('create')
  createTask(@Body() task: CreateTaskDto) {
    return this.taskService.createTask(task);
  }

  @Get(':id')
  getTask(@Param('id', new ParseIntPipe()) id) {
    return this.taskService.getById(id);
  }

  @Delete(':id')
  deleteTask(@Param('id', new ParseIntPipe()) id) {
    return this.taskService.deleteTask(id);
  }

  @Patch('complete/:id')
  completeTask(@Param('id', new ParseIntPipe()) id) {
    return this.taskService.setComplete(id);
  }
}

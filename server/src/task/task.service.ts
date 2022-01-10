import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from 'src/entities/Task';
import { User } from 'src/entities/User';
import { CreateTaskDto } from './models/create-task.dto';
import { UpdateTaskDto } from './models/update-task.dto';

@Injectable()
export class TaskService {
  async findById(id: number) {
    return await Task.findOne(id, { relations: ['toUser', 'fromUser'] });
  }

  async getAllByToUserId(toUserId: number) {
    const allTasks = await Task.find({
      where: { toUser: toUserId },
      relations: ['fromUser', 'toUser'],
    });

    return allTasks;
  }

  async getAllByFromUserId(fromUserId: number) {
    const allTasks = await Task.find({
      where: { fromUser: fromUserId },
      relations: ['fromUser', 'toUser'],
    });

    return allTasks;
  }

  async getById(taskId: number) {
    return await Task.findOne(taskId, {
      relations: ['fromUser', 'toUser'],
    });
  }

  async createTask(task: CreateTaskDto) {
    const newTask = new Task();
    const fromUser = await User.findOne(task.fromUserId, {
      select: ['id', 'username'],
    });
    if (!fromUser) {
      throw new BadRequestException(
        `User with id: ${task.fromUserId} does not exists!`,
      );
    }
    const toUser = await User.findOne(task.toUserId, {
      select: ['id', 'username'],
    });
    if (!toUser) {
      throw new BadRequestException(
        `User with id: ${task.toUserId} does not exists!`,
      );
    }

    newTask.title = task.title;
    newTask.fromUser = fromUser;
    newTask.toUser = toUser;
    if (task.description) {
      newTask.description = task.description;
    }

    return await newTask.save();
  }

  async updateTask(task: UpdateTaskDto) {
    return await Task.update(
      { id: task.id },
      { title: task.title, description: task.description },
    );
  }

  async deleteTask(taskId: number) {
    return await Task.delete(taskId);
  }

  async setComplete(taskId: number) {
    return await Task.update(taskId, { completed: true });
  }
}

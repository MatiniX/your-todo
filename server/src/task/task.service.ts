import { BadRequestException, Injectable } from '@nestjs/common';
import { Task, TaskState } from 'src/entities/Task';
import { User } from 'src/entities/User';
import { CreateTaskDto } from './models/create-task.dto';
import { UpdateTaskDto } from './models/update-task.dto';

@Injectable()
export class TaskService {
  /**
   * @returns all tasks that user with toUserId has recieved
   */
  async getAllRecieved(toUserId: number) {
    const allTasks = await Task.find({
      where: { toUser: toUserId },
      relations: ['fromUser'],
    });

    return allTasks;
  }

  /**
   * @returns all tasks that user with toUserId has sent
   */
  async getAllSent(fromUserId: number) {
    const allTasks = await Task.find({
      where: { fromUser: fromUserId },
      relations: ['toUser'],
    });

    return allTasks;
  }

  /**
   * @returns all task that user with toUserId has to complete
   */
  async getAllUncomplete(toUserId: number) {
    const allTasks = await Task.find({
      where: { toUser: toUserId, taskState: TaskState.AWAITING_COMPLETION },
      relations: ['fromUser'],
    });

    return allTasks;
  }

  /**
   * @returns all task that user with fromUserId has to review
   */
  async getAllForReview(fromUserId: number) {
    const allTasks = await Task.find({
      where: { fromUser: fromUserId, taskState: TaskState.AWAITING_REVIEW },
      relations: ['toUser'],
    });

    return allTasks;
  }

  async getById(taskId: number) {
    const task = await Task.findOne(taskId, {
      relations: ['fromUser', 'toUser'],
    });
    if (!task) {
      throw new BadRequestException(`Task with id: ${taskId} does not exists!`);
    }
    return task;
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

    const existingTask = await Task.findOne({
      where: { toUser: toUser.id, fromUser: fromUser.id },
    });
    if (existingTask) {
      // prettier-ignore
      const existingTaskCreateDate = existingTask.createdAt.setHours(0, 0, 0, 0);
      const newTaskCreateDate = new Date().setHours(0, 0, 0, 0);

      if (existingTaskCreateDate === newTaskCreateDate) {
        throw new BadRequestException(
          'You only set one task per day for your friend ;)',
        );
      }
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

  async setForReview(taskId: number) {
    return await Task.update(taskId, { taskState: TaskState.AWAITING_REVIEW });
  }

  async acceptTaskCompletion(taskId: number) {
    return await Task.update(taskId, { taskState: TaskState.FULFILLED });
  }

  async rejectTaskCompletion(taskId: number) {
    return await Task.update(taskId, { taskState: TaskState.UNFULFILLED });
  }

  async deleteTask(taskId: number) {
    return await Task.delete(taskId);
  }
}

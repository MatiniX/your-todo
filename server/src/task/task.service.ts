import { BadRequestException, Injectable } from '@nestjs/common';
import { Task, TaskState } from 'src/entities/Task';
import { User } from 'src/entities/User';
import { NotificationService } from 'src/services/notification.service';
import { getConnection } from 'typeorm';
import { CreateTaskDto } from './models/create-task.dto';
import { UpdateTaskDto } from './models/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly notificationService: NotificationService) {}
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
    const allTasks = await Task.createQueryBuilder('task')
      .leftJoinAndSelect('task.fromUser', 'fromUser')
      .where('task.toUser = :toUserId', { toUserId })
      .andWhere('task.taskState = :state', {
        state: TaskState.AWAITING_COMPLETION,
      })
      .select([
        'task.id',
        'task.title',
        'task.description',
        'task.taskState',
        'task.createdAt',
        'task.updatedAt',
        'task.id',
        'fromUser.id',
        'fromUser.username',
      ])
      .getMany();

    return allTasks;
  }

  /**
   * @returns all task that user with fromUserId has to review
   */
  async getAllForReview(fromUserId: number) {
    const allTasks = await Task.createQueryBuilder('task')
      .leftJoinAndSelect('task.toUser', 'toUser')
      .where('task.fromUser = :fromUserId', { fromUserId })
      .andWhere('task.taskState = :state', {
        state: TaskState.AWAITING_REVIEW,
      })
      .select([
        'task.id',
        'task.title',
        'task.description',
        'task.taskState',
        'task.createdAt',
        'task.updatedAt',
        'task.id',
        'toUser.id',
        'toUser.username',
      ])
      .getMany();

    return allTasks;
  }

  async getAllArchived(toUserId: number) {
    const allTasks = await Task.createQueryBuilder('task')
      .leftJoinAndSelect('task.fromUser', 'fromUser')
      .where('task.toUser = :toUserId', { toUserId })
      .andWhere(
        'task.taskState = :unfulfilled or task.taskState = :fulfilled',
        {
          unfulfilled: TaskState.UNFULFILLED,
          fulfilled: TaskState.FULFILLED,
        },
      )
      .select([
        'task.id',
        'task.title',
        'task.description',
        'task.taskState',
        'task.createdAt',
        'task.updatedAt',
        'task.id',
        'fromUser.id',
        'fromUser.username',
      ])
      .getMany();

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
    if (task.fromUserId === task.toUserId) {
      throw new BadRequestException("You can't send task to yourself!");
    }

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
      where: { toUserId: toUser.id, fromUserId: fromUser.id },
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

    await newTask.save();
    await this.notificationService.newTask(newTask);

    return newTask;
  }

  async updateTask(task: UpdateTaskDto) {
    return await Task.update(
      { id: task.id },
      { title: task.title, description: task.description },
    );
  }

  async setForReview(taskId: number) {
    const task = await this.getById(taskId);
    task.taskState = TaskState.AWAITING_REVIEW;

    task.save();
    console.log(await this.notificationService.taskReview(task));
  }

  async acceptTaskCompletion(taskId: number) {
    const updatedTask = await getConnection().transaction(async (tm) => {
      const task = await tm.findOne(Task, taskId, {
        select: ['id', 'taskState', 'toUser'],
        relations: ['toUser'],
      });
      task.taskState = TaskState.FULFILLED;
      task.toUser.trustPoints += 10;

      task.toUser.save();
      return await task.save();
    });

    console.log(await this.notificationService.taskAccepted(updatedTask));
  }

  async rejectTaskCompletion(taskId: number) {
    const updatedTask = await getConnection().transaction(async (tm) => {
      const task = await tm.findOne(Task, taskId, {
        select: ['id', 'taskState', 'toUser'],
        relations: ['toUser'],
      });
      task.taskState = TaskState.UNFULFILLED;
      task.toUser.trustPoints -= 10;

      task.toUser.save();
      return await task.save();
    });

    console.log(await this.notificationService.taskRejected(updatedTask));
  }

  async deleteTask(taskId: number) {
    return await Task.delete(taskId);
  }
}

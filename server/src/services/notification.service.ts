import { Injectable } from '@nestjs/common';
import { FriendRequest } from 'src/entities/FriendRequest';
import { Notification, NotificationType } from 'src/entities/Notification';
import { Task } from 'src/entities/Task';
import { User } from 'src/entities/User';

@Injectable()
export class NotificationService {
  async getUserNotifications(userId: number) {
    return await Notification.find({
      where: { userId, seen: false },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsSeen(ids: number[]) {
    return await Notification.update(ids, { seen: true });
  }

  async newFriendRequest(request: FriendRequest) {
    const notification = new Notification();
    notification.type = NotificationType.NEW_FRIEND_REQUEST;
    notification.user = request.toUser;
    notification.friendRequest = request;
    notification.message = `You have new friend request from ${request.fromUser.username}`;

    return await notification.save();
  }

  async friendRequestRejected(request: FriendRequest) {
    const notification = new Notification();
    notification.type = NotificationType.FRIEND_REQUEST_REJECTED;
    notification.user = request.fromUser;
    notification.friendRequest = request;
    notification.message = `${request.toUser.username} has rejected your friend request`;

    return await notification.save();
  }

  async friendRequestAccepted(request: FriendRequest) {
    const notification = new Notification();
    notification.type = NotificationType.FRIEND_REQUEST_ACCEPTED;
    notification.user = request.fromUser;
    notification.friendRequest = request;
    notification.message = `${request.toUser.username} has accepted your friend request`;

    return await notification.save();
  }

  async newTask(task: Task) {
    const notification = new Notification();
    notification.type = NotificationType.NEW_TASK;
    notification.user = task.toUser;
    notification.task = task;
    notification.message = `You have new task from ${task.fromUser.username}`;

    return await notification.save();
  }

  async taskReview(task: Task) {
    const notification = new Notification();
    notification.type = NotificationType.TASK_COMPLETED;
    notification.user = task.fromUser;
    notification.task = task;
    notification.message = `${task.toUser.username} has finished his task: ${task.title}.`;

    return await notification.save();
  }

  async taskAccepted(task: Task) {
    const notification = new Notification();
    notification.type = NotificationType.TASK_ACCEPTED;
    notification.user = task.toUser;
    notification.task = task;
    notification.message = `${task.fromUser.username} accepted your task: ${task.title}.`;

    return await notification.save();
  }

  async taskRejected(task: Task) {
    const notification = new Notification();
    notification.type = NotificationType.TASK_REJECTED;
    notification.user = task.toUser;
    notification.task = task;
    notification.message = `${task.fromUser.username} rejected your task: ${task.title}.`;

    return await notification.save();
  }

  async friendshipCanceled(first: User, second: User) {
    const firstNotification = new Notification();
    firstNotification.type = NotificationType.FRIENDSHIP_CANCELED;
    firstNotification.user = first;
    firstNotification.message = `You are no longer friend with ${second.username}`;

    const secondNotification = new Notification();
    secondNotification.type = NotificationType.FRIENDSHIP_CANCELED;
    secondNotification.user = second;
    secondNotification.message = `${first.username} is no longer your friend`;

    await firstNotification.save();
    await secondNotification.save();
  }
}

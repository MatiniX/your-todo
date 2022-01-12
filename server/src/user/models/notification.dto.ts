export enum NotificationType {
  NEW_FRIEND_REQUEST = 'new_friend_request',
  NEW_TASK = 'new_task',
  FRIEND_REQUEST_ACCEPTED = 'friend_request_accepted',
  FRIEND_REQUEST_REJECTED = 'friend_request_rejected',
  TASK_COMPLETED = 'task_completed',
  TASK_REJECTED = 'task_rejected',
  TASK_ACCEPTED = 'task_accepted',
}

export class NotificationDto {
  type: NotificationType;
  message: string;
  date: Date;
}

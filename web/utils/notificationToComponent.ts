import NewFriendRequestNotification from "../components/NewFriendRequestNotification";
import { Notification } from "../data/useNotifications";

const notificationToComponent = (notification: Notification) => {
  switch (notification.type) {
    case "friend_request_accepted":
      return notification.message;
    case "friend_request_rejected":
      return notification.message;
    case "new_friend_request":
      return NewFriendRequestNotification;
    case "new_task":
      return notification.message;
    case "task_accepted":
      return notification.message;
    case "task_completed":
      return notification.message;
    case "task_rejected":
      return notification.message;
  }
};

export { notificationToComponent };

import React from "react";
import { Notification } from "../data/useNotifications";
import NewFriendRequestNotification from "./NewFriendRequestNotification";
import NewTaskNotification from "./NewTaskNotification";

interface GenericNotificationProps {
  notification: Notification;
}

const GenericNotification = ({ notification }: GenericNotificationProps) => {
  switch (notification.type) {
    case "new_friend_request":
      return <NewFriendRequestNotification notification={notification} />;
    case "new_task":
      return <NewTaskNotification notification={notification} />;
    default:
      return <div>Not implemented</div>;
  }
};

export default GenericNotification;

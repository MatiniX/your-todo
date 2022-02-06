import React, { SetStateAction } from "react";
import { Notification } from "../data/useNotifications";
import NewFriendRequestNotification from "./NewFriendRequestNotification";
import NewTaskNotification from "./NewTaskNotification";

interface GenericNotificationProps {
  notification: Notification;
  closePopover: () => void;
}

const GenericNotification = ({ notification, closePopover }: GenericNotificationProps) => {
  switch (notification.type) {
    case "new_friend_request":
      return (
        <NewFriendRequestNotification notification={notification} closePopover={closePopover} />
      );
    case "new_task":
      return <NewTaskNotification notification={notification} closePopover={closePopover} />;
    default:
      return <div>Not implemented</div>;
  }
};

export default GenericNotification;

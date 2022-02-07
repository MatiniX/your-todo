import React, { SetStateAction } from "react";
import { Notification } from "../../data/useNotifications";
import FriendRequestAcceptedNotifications from "./FriendRequestAcceptedNotifications";
import FriendRequestRejectedNotification from "./FriendRequestRejectedNotification";
import FriendshipCanceledNotification from "./FriendshipCanceledNotification";
import NewFriendRequestNotification from "./NewFriendRequestNotification";
import NewTaskNotification from "./NewTaskNotification";
import TaskAcceptedNotification from "./TaskAcceptedNotification";
import TaskCompletedNotification from "./TaskCompletedNotification";
import TaskRejectedNotification from "./TaskRejectedNotification";

export interface GenericNotificationProps {
  notification: Notification;
  closePopover: () => void;
}

const GenericNotification = ({ notification, closePopover }: GenericNotificationProps) => {
  switch (notification.type) {
    case "new_friend_request":
      return (
        <NewFriendRequestNotification notification={notification} closePopover={closePopover} />
      );

    case "friend_request_accepted":
      return (
        <FriendRequestAcceptedNotifications
          notification={notification}
          closePopover={closePopover}
        />
      );
    case "friend_request_rejected":
      return (
        <FriendRequestRejectedNotification
          notification={notification}
          closePopover={closePopover}
        />
      );
    case "friendship_canceled":
      return (
        <FriendshipCanceledNotification notification={notification} closePopover={closePopover} />
      );

    case "new_task":
      return <NewTaskNotification notification={notification} closePopover={closePopover} />;
    case "task_completed":
      return <TaskCompletedNotification notification={notification} closePopover={closePopover} />;
    case "task_rejected":
      return <TaskRejectedNotification notification={notification} closePopover={closePopover} />;
    case "task_accepted":
      return <TaskAcceptedNotification notification={notification} closePopover={closePopover} />;
    default:
      return <div>Not implemented</div>;
  }
};

export default GenericNotification;

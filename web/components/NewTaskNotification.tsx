import { DocumentAddIcon } from "@heroicons/react/outline";
import React from "react";
import { Notification } from "../data/useNotifications";

interface NewTaskNotificationProps {
  notification: Notification;
}

const NewTaskNotification = ({ notification }: NewTaskNotificationProps) => {
  return (
    <div className="flex p-2 -m-3 items-center gap-2 hover:bg-sky-50 rounded-lg cursor-pointer">
      <i className="p-2 text-white bg-green-500 rounded-full">
        <DocumentAddIcon className="w-5" />
      </i>

      <p className="text-gray-800">{notification.message}</p>
      <span className="ml-auto text-gray-500">
        {new Date(notification.createdAt).toLocaleDateString("en-GB", {
          month: "short",
          day: "numeric",
        })}
      </span>
    </div>
  );
};

export default NewTaskNotification;

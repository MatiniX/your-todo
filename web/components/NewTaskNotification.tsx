import { DocumentAddIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { SetStateAction } from "react";
import { mutate } from "swr";
import { Notification } from "../data/useNotifications";
import { markAsSeen } from "../utils/notifications";

interface NewTaskNotificationProps {
  notification: Notification;
  closePopover: () => void;
}

const NewTaskNotification = ({ notification, closePopover }: NewTaskNotificationProps) => {
  const router = useRouter();

  return (
    <div
      className="flex p-2 -m-3 items-center gap-2 hover:bg-sky-50 rounded-lg cursor-pointer"
      onClick={async () => {
        await markAsSeen([notification.id]);
        mutate("user/notifications");
        router.replace("/tasks");
        closePopover();
      }}
    >
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

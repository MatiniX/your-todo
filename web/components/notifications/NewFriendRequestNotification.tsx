import { UserAddIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { SetStateAction } from "react";
import { markAsSeen } from "../../utils/notifications";
import { GenericNotificationProps } from "./GenericNotification";
import NotificationDate from "./NotificationDate";

const NewFriendRequestNotification = ({ notification, closePopover }: GenericNotificationProps) => {
  const router = useRouter();
  return (
    <div
      className="flex p-2 -m-3 items-center gap-2 hover:bg-sky-50 rounded-lg cursor-pointer"
      onClick={async () => {
        await markAsSeen([notification.id]);
        router.replace("/friends");
        closePopover();
      }}
    >
      <i className="p-2 text-white bg-green-500 rounded-full">
        <UserAddIcon className="w-5" />
      </i>

      <p className="text-gray-800">{notification.message}</p>
      <NotificationDate date={notification.createdAt} />
    </div>
  );
};

export default NewFriendRequestNotification;

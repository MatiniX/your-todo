import React from "react";
import useUser from "../data/useUser";
import { BsBell } from "react-icons/bs";
import { Popover } from "@headlessui/react";
import { useNotifications } from "../data/useNotifications";
import GenericNotification from "./notifications/GenericNotification";
import { markAsSeen } from "../utils/notifications";

const TopNav = () => {
  const { user } = useUser();
  const { notifications, mutate } = useNotifications();

  return (
    <div className="relative flex items-center w-full h-16 bg-white shadow z-10">
      <div className="flex items-center ml-auto mr-8">
        <Popover className="relative">
          <div className="flex items-center">
            <Popover.Button className="mr-4">
              <BsBell className="w-6 h-6 text-gray-600" />
            </Popover.Button>
          </div>

          <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-full  left-1/2 sm:px-0 lg:max-w-lg ">
            {({ close }) => (
              <div className="overflow-auto rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 max-h-96 ">
                <div className="relative grid gap-8 bg-white p-7">
                  {notifications?.map((notification) => (
                    <GenericNotification
                      key={notification.id}
                      notification={notification}
                      closePopover={close}
                    />
                  ))}
                  {notifications!.length > 0 ? (
                    <button
                      className="mx-40 -my-3 py-1 bg-sky-100 text-sky-700 hover:bg-sky-200 hover:text-sky-800 rounded-lg"
                      onClick={async () => {
                        const notificationsIds = notifications?.map((n) => n.id);
                        await markAsSeen(notificationsIds!);
                        mutate();
                      }}
                    >
                      Mark as seen
                    </button>
                  ) : (
                    <p className="text-center p-2 -m-3">No new notifications</p>
                  )}
                </div>
              </div>
            )}
          </Popover.Panel>
        </Popover>

        <h2 className=" text-lg text-gray-600 font-medium">
          {user ? user.username : "loading..."}
        </h2>
      </div>
    </div>
  );
};

export default TopNav;

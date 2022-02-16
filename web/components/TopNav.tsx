import React from "react";
import useUser from "../data/useUser";
import { Popover } from "@headlessui/react";
import { useNotifications } from "../data/useNotifications";
import GenericNotification from "./notifications/GenericNotification";
import { markAsSeen } from "../utils/notifications";
import { BellIcon } from "@heroicons/react/outline";

const TopNav = () => {
  const { user } = useUser();
  const { notifications, hasNew, mutate } = useNotifications();

  return (
    <div className="hidden relative md:flex items-center w-full h-16 bg-white shadow z-10">
      <div className="flex items-center ml-auto mr-8">
        <Popover className="relative">
          <div className="relative flex items-center">
            <Popover.Button className="mr-4">
              <BellIcon className="w-8 text-gray-600 hover:text-gray-800 transition" />
              {hasNew && (
                <span className="absolute inline-flex h-2 w-2 rounded-full bg-red-500 outline outline-white top-0 left-5"></span>
              )}
            </Popover.Button>
          </div>

          <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-full  left-1/2 sm:px-0 lg:max-w-lg ">
            {({ close }) => (
              <div className="overflow-auto rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 max-h-96 ">
                <div className="relative flex flex-col gap-8 bg-white p-7">
                  {notifications?.map((notification) => (
                    <GenericNotification
                      key={notification.id}
                      notification={notification}
                      closePopover={close}
                    />
                  ))}
                  {notifications!.length > 0 ? (
                    <button
                      className="mx-auto px-4 py-2 text-sm font-medium 
                  text-sky-900 bg-sky-100 border border-transparent rounded-md 
                  hover:bg-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
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

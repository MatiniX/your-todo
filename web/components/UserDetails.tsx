import { Transition, Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import React, { Fragment, SetStateAction, useEffect } from "react";
import { useUserInfo } from "../data/useUserInfo";

interface UserDetailsProps {
  id: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const UserDetails = ({ id, isOpen, setIsOpen }: UserDetailsProps) => {
  const { userInfo, isLoading, mutate } = useUserInfo(id);

  useEffect(() => {
    mutate();
  }, [id, mutate]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => setIsOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative flex flex-col w-1/3 h-[50vh] mx-auto px-8 py-4 bg-white rounded">
              <button
                className="absolute top-2 right-2 w-6 text-gray-500"
                onClick={() => setIsOpen(false)}
              >
                <XIcon />
              </button>
              <div className="mb-2">
                <h2 className="text-lg font-medium text-gray-500">Username:</h2>
                <Dialog.Title className="text-2xl font-bold text-gray-800">
                  {isLoading ? (
                    <div className="w-full pr-4">
                      <div className="animate-pulse w-full h-6 bg-gray-300 rounded"></div>
                    </div>
                  ) : (
                    userInfo?.username
                  )}
                </Dialog.Title>
              </div>
              <span className="border-b-2 border-gray-300"></span>
              <div className="grid grid-cols-2 h-full items-center">
                <div>
                  <h3 className="text-gray-500 text-lg">Trust Points:</h3>
                  {isLoading ? (
                    <div className="w-full pr-4">
                      <div className="animate-pulse w-full h-6 bg-gray-300 rounded"></div>
                    </div>
                  ) : (
                    <span className="text-gray-800 text-xl font-bold">{userInfo?.trustPoints}</span>
                  )}
                </div>
                <div>
                  <h3 className="text-gray-500 text-lg">Member since:</h3>
                  {isLoading ? (
                    <div className="w-full pr-4">
                      <div className="animate-pulse w-full h-6 bg-gray-300 rounded"></div>
                    </div>
                  ) : (
                    <span className="text-gray-800 text-xl font-bold">
                      {new Date(userInfo!.memberSince).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-gray-500 text-lg">Tasks Sent:</h3>
                  {isLoading ? (
                    <div className="w-full pr-4">
                      <div className="animate-pulse w-full h-6 bg-gray-300 rounded"></div>
                    </div>
                  ) : (
                    <span className="text-gray-800 text-xl font-bold">{userInfo?.tasksSent}</span>
                  )}
                </div>
                <div>
                  <h3 className="text-gray-500 text-lg">Tasks Recieved:</h3>
                  {isLoading ? (
                    <div className="w-full pr-4">
                      <div className="animate-pulse w-full h-6 bg-gray-300 rounded"></div>
                    </div>
                  ) : (
                    <span className="text-gray-800 text-xl font-bold">
                      {userInfo?.tasksRecieved}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UserDetails;

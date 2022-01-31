import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import React, { Fragment, useEffect, useState } from "react";
import useFriendDetails from "../data/useFriendDetails";
import { removeFriend } from "../utils/friendsUtils";

interface FriendDetailsProps {
  id: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FriendDetails = ({ isOpen, setIsOpen, id }: FriendDetailsProps) => {
  const { friendDetails, error, loading, mutate } = useFriendDetails(id);

  useEffect(() => {
    mutate();
  }, [id]);

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
                  {loading || error ? "loading..." : friendDetails?.username}
                </Dialog.Title>
              </div>
              <span className="border-b-2 border-gray-300"></span>
              <div className="grid grid-cols-2 h-full items-center">
                <div>
                  <h3 className="text-gray-500 text-lg">Trust Points:</h3>
                  <span className="text-gray-800 text-xl font-bold">
                    {loading || error ? "loading..." : friendDetails?.trustPoints}
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-500 text-lg">Memebr since:</h3>
                  <span className="text-gray-800 text-xl font-bold">
                    {loading || error
                      ? "loading..."
                      : new Date(friendDetails!.memberSince).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-500 text-lg">Tasks Sent:</h3>
                  <span className="text-gray-800 text-xl font-bold">
                    {loading || error ? "loading..." : friendDetails?.tasksSent}
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-500 text-lg">Tasks Recieved:</h3>
                  <span className="text-gray-800 text-xl font-bold">
                    {loading || error ? "loading..." : friendDetails?.tasksRecieved}
                  </span>
                </div>
              </div>
              <span className="border-b-2 border-gray-300"></span>
              <div className="mt-auto pt-3 flex justify-center gap-2">
                <button
                  className="py-2 px-6 bg-red-500 font-medium text-white rounded hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                  onClick={async () => {
                    const response = await removeFriend(id);
                    console.log(response);
                    setIsOpen(false);
                  }}
                >
                  Remove Friend
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FriendDetails;
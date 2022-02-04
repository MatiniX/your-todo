import { Dialog } from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import React, { SetStateAction } from "react";

interface FriendRequestsProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FriendRequests = ({ isOpen, setIsOpen }: FriendRequestsProps) => {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="flex justify-center items-center min-h-screen ">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-25" />
        <div className="inline-block overflow-auto relative w-full max-w-md max-h-[80vh] p-6 bg-white text-left align-middle rounded-md">
          <Dialog.Title className="mb-4 text-center text-xl text-gray-800 font-bold">
            Incoming Friend Requests
          </Dialog.Title>

          <div className="flex flex-col divide-y-2">
            <div className="flex items-center py-2">
              <h6 className="text-lg text-gray-800 font-medium">
                Username wants to be your friend
              </h6>
              <div className="flex gap-1 ml-auto">
                <button className="text-green-500 hover:text-green-600">
                  <CheckCircleIcon className="w-8" />
                </button>
                <button className="text-red-500 hover:text-red-600">
                  <XCircleIcon className="w-8" />
                </button>
              </div>
            </div>
            <div className="flex items-center py-2">
              <h6 className="text-lg text-gray-800 font-medium">
                Username wants to be your friend
              </h6>
              <div className="flex gap-1 ml-auto">
                <button className="text-green-500">
                  <CheckCircleIcon className="w-8" />
                </button>
                <button className="text-red-500">
                  <XCircleIcon className="w-8" />
                </button>
              </div>
            </div>
            <div className="flex items-center py-2">
              <h6 className="text-lg text-gray-800 font-medium">
                Username wants to be your friend
              </h6>
              <div className="flex gap-1 ml-auto">
                <button className="text-green-500">
                  <CheckCircleIcon className="w-8" />
                </button>
                <button className="text-red-500">
                  <XCircleIcon className="w-8" />
                </button>
              </div>
            </div>
            <div className="flex items-center py-2">
              <h6 className="text-lg text-gray-800 font-medium">
                Username wants to be your friend
              </h6>
              <div className="flex gap-1 ml-auto">
                <button className="text-green-500">
                  <CheckCircleIcon className="w-8" />
                </button>
                <button className="text-red-500">
                  <XCircleIcon className="w-8" />
                </button>
              </div>
            </div>
            <div className="flex items-center py-2">
              <h6 className="text-lg text-gray-800 font-medium">
                Username wants to be your friend
              </h6>
              <div className="flex gap-1 ml-auto">
                <button className="text-green-500">
                  <CheckCircleIcon className="w-8" />
                </button>
                <button className="text-red-500">
                  <XCircleIcon className="w-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FriendRequests;

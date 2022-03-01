import { Dialog } from "@headlessui/react";
import React, { SetStateAction, useEffect } from "react";
import { useFriendRequests } from "../data/useFriendRequests";
import FriendRequestField from "./FriendRequestField";

interface FriendRequestsProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FriendRequests = ({ isOpen, setIsOpen }: FriendRequestsProps) => {
  const { friendRequests, hasRequest } = useFriendRequests();

  useEffect(() => {
    if (!hasRequest) setIsOpen(false);
  }, [hasRequest, setIsOpen]);

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
            {friendRequests?.map((friendRequest) => (
              <FriendRequestField
                key={friendRequest.id}
                id={friendRequest.id}
                username={friendRequest.fromUser.username}
              />
            ))}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FriendRequests;

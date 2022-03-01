import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import React from "react";
import { mutate } from "swr";
import { acceptFriendRequest, rejectFriendRequest } from "../utils/friendsUtils";

interface FriendRequestFieldProps {
  id: number;
  username: string;
}

const FriendRequestField = ({ id, username }: FriendRequestFieldProps) => {
  return (
    <div className="flex items-center py-2">
      <h6 className="text-lg text-gray-800 font-medium">{username} wants to be your friend.</h6>
      <div className="flex gap-1 ml-auto">
        <button
          className="text-green-500 hover:text-green-600"
          onClick={async () => {
            await acceptFriendRequest(id);
            // revalidácia friend requestov a friendov
            await mutate("user/friend-request");
            await mutate("user/friends");
          }}
        >
          <CheckCircleIcon className="w-8" />
        </button>
        <button
          className="text-red-500 hover:text-red-600"
          onClick={async () => {
            await rejectFriendRequest(id);
            // revalidácia friend requestov a friendov
            await mutate("user/friend-request");
            await mutate("user/friends");
          }}
        >
          <XCircleIcon className="w-8" />
        </button>
      </div>
    </div>
  );
};

export default FriendRequestField;

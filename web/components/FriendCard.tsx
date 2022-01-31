import React from "react";
import { UserIcon } from "@heroicons/react/solid";

interface FriendCardProps {
  id: number;
  username: string;
  trustPoints: number;
  setFriendDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFriendId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const FriendCard = ({
  username,
  id,
  trustPoints,
  setFriendId,
  setFriendDetailOpen,
}: FriendCardProps) => {
  return (
    <div
      className="px-4 py-3 w-64 bg-white rounded-md shadow cursor-pointer hover:scale-105 transition"
      onClick={() => {
        setFriendId(id);
        setFriendDetailOpen(true);
      }}
    >
      <div className="flex items-center mb-2 text-gray-800 ">
        <UserIcon className="w-6 mr-1" />
        <h1 className="text-xl font-bold">{username}</h1>
      </div>
      <h2 className="text-gray-500">
        Trust points:{" "}
        <span
          className={
            trustPoints === 0
              ? "text-gray-500"
              : trustPoints > 0
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {trustPoints}
        </span>
      </h2>
    </div>
  );
};

export default FriendCard;

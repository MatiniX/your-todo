import React from "react";
import { BadgeCheckIcon, InformationCircleIcon } from "@heroicons/react/solid";

interface SingleTaskProps {
  id: number;
  title: string;
  fromUser: string;
  setCurrentTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  setCurrentTaskDescritpion: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentTaskAuthor: React.Dispatch<React.SetStateAction<string>>;
  setCurrentTaskId: React.Dispatch<React.SetStateAction<number>>;
  setDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  description: string | null;
}

const SingleTask = ({
  id,
  title,
  fromUser,
  description,
  setCurrentTaskTitle,
  setCurrentTaskDescritpion,
  setCurrentTaskId,
  setCurrentTaskAuthor,
  setDetailsOpen,
  setAlertOpen,
}: SingleTaskProps) => {
  return (
    <div className="pt-2 w-96 bg-white rounded shadow ">
      <div className="divide-y">
        <div className="ml-4 mb-2">
          <h1 className="mb-2 font-bold text-xl text-gray-800">{title}</h1>
          <h2 className="font-medium text-base text-gray-500">From: {fromUser}</h2>
        </div>

        <div className="flex divide-x text-gray-400">
          <button
            className="flex justify-center gap-2 w-full py-2 font-semibold hover:bg-sky-100 hover:text-sky-600"
            onClick={() => {
              setCurrentTaskTitle(title);
              setCurrentTaskAuthor(fromUser);
              setCurrentTaskDescritpion(description);
              setDetailsOpen(true);
            }}
          >
            <InformationCircleIcon className="h-6" />
            <p>Details</p>
          </button>
          <button
            className="flex justify-center gap-2 w-full py-2 font-semibold hover:bg-green-100 hover:text-green-600"
            onClick={() => {
              setCurrentTaskTitle(title);
              setCurrentTaskAuthor(fromUser);
              setCurrentTaskId(id);
              setAlertOpen(true);
            }}
          >
            <BadgeCheckIcon className="h-6" />
            <p>Complete</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;

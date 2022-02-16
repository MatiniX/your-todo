import React from "react";
import { BadgeCheckIcon, InformationCircleIcon } from "@heroicons/react/solid";
import { Task } from "../data/interfaces/Task";
import { useTasksToComplete } from "../data/useTasksToComplete";

interface SingleTaskProps {
  task: Task;
  setDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
}

const SingleTask = ({ setDetailsOpen, setAlertOpen, task, setCurrentTask }: SingleTaskProps) => {
  const { isValidating } = useTasksToComplete();

  return (
    <div className="pt-2 w-full bg-white rounded shadow ">
      <div className="divide-y">
        <div className="ml-4 mb-2">
          <h1 className="mb-2 font-bold text-xl text-gray-800">{task.title}</h1>
          <h2 className="font-medium text-base text-gray-500">From: {task.fromUser?.username}</h2>
        </div>

        <div className="flex divide-x text-gray-400">
          <button
            disabled={isValidating}
            className="flex justify-center gap-2 w-full py-2 
            font-semibold hover:bg-sky-100 hover:text-sky-600 transition"
            onClick={() => {
              setCurrentTask(task);
              setDetailsOpen(true);
            }}
          >
            <InformationCircleIcon className="h-6" />
            <p>Details</p>
          </button>
          <button
            disabled={isValidating}
            className="flex justify-center gap-2 w-full py-2 
            font-semibold hover:bg-green-100 hover:text-green-600 transition"
            onClick={() => {
              setCurrentTask(task);
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

import React from "react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import axiosInstance from "../utils/axiosInstance";
import { KeyedMutator, mutate } from "swr";
import useTasksForReview from "../data/useTasksForReview";

interface ReviewTaskProps {
  id: number;
  title: string;
  username: string;
  completedOn: string;
}

const ReviewTask = ({ id, title, username, completedOn }: ReviewTaskProps) => {
  const date = new Date(completedOn);
  const { tasks, mutate } = useTasksForReview();

  return (
    <div className="w-full bg-white rounded shadow divide-y">
      <div className="mx-3 my-2">
        <h2 className="text-gray-500">
          <span className="font-bold text-gray-800">{username}</span> completed task:
        </h2>
        <h1 className="font-bold text-gray-800 text-lg">{title}</h1>
        <h3 className="text-gray-500">
          Completed on: <span className="font-bold text-gray-800">{date.toLocaleDateString()}</span>{" "}
        </h3>
      </div>

      <div className="flex divide-x-2 text-gray-500">
        <button
          className="flex flex-1 py-2 justify-center hover:text-red-800 hover:bg-red-100"
          onClick={async () => {
            // Update local data without revalidation
            mutate(
              tasks?.filter((task) => task.id != id),
              false
            );
            await axiosInstance.patch(`task/reject/${id}`); // reject task
            // Revalidate data
            mutate();
          }}
        >
          <XIcon className="w-6 mr-1" />
          <p className="font-medium">Reject</p>
        </button>
        <button
          className="flex flex-1 py-2 justify-center hover:text-green-800 hover:bg-green-100"
          onClick={async () => {
            mutate(
              tasks?.filter((task) => task.id != id),
              false
            );
            await axiosInstance.patch(`task/accept/${id}`); // accept task
            mutate();
          }}
        >
          <CheckIcon className="w-6 mr-1" />
          <p className="font-medium">Accept</p>
        </button>
      </div>
    </div>
  );
};

export default ReviewTask;

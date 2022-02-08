import React from "react";
import { Task } from "../data/interfaces/Task";

interface ArchivedTaskCardProps {
  task: Task;
}

const ArchivedTaskCard = ({ task }: ArchivedTaskCardProps) => {
  return (
    <div key={task.id} className="py-3 pl-5 w-80 bg-white rounded shadow">
      <div className="flex flex-col">
        <h3 className="text-xl text-gray-800 font-semibold">{task.title}</h3>
        <p className="text-gray-500">
          From: <span className="text-gray-800 font-medium">{task.fromUser?.username}</span>
        </p>
        <p className="text-gray-500">
          {task.taskState === "fulfilled" ? "Accepted On:" : "Rejected On:"}{" "}
          <span className="text-gray-800 font-medium">
            {new Date(task.updatedAt).toLocaleDateString()}
          </span>
        </p>
        <p className="text-gray-500">
          {task.taskState === "fulfilled" ? "Trust points recieved:" : "Trust points lost:"}{" "}
          <span
            className={`${
              task.taskState === "fulfilled" ? "text-green-500" : "text-red-500"
            } font-medium`}
          >
            {task.taskState === "fulfilled" ? "+10" : "-10"}{" "}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ArchivedTaskCard;

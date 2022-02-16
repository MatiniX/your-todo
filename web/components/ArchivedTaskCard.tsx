import React, { SetStateAction } from "react";
import { Task } from "../data/interfaces/Task";

interface ArchivedTaskCardProps {
  task: Task;
  index: number;
  setTaskDetailOpen: React.Dispatch<SetStateAction<boolean>>;
  setSelectedTaskIdx: React.Dispatch<SetStateAction<number>>;
}

const ArchivedTaskCard = ({
  task,
  index,
  setTaskDetailOpen,
  setSelectedTaskIdx,
}: ArchivedTaskCardProps) => {
  let taskPoints;
  if (task.taskState === "fulfilled") {
    switch (task.taskDifficulty) {
      case "easy":
        taskPoints = 10;
        break;
      case "medium":
        taskPoints = 20;
        break;
      case "hard":
        taskPoints = 30;
        break;
    }
  } else if (task.taskState === "unfulfilled") {
    switch (task.taskDifficulty) {
      case "easy":
        taskPoints = -10;
        break;
      case "medium":
        taskPoints = -15;
        break;
      case "hard":
        taskPoints = -20;
        break;
    }
  }

  return (
    <div
      key={task.id}
      className="py-3 pl-5 w-full bg-white rounded shadow cursor-pointer transition-all hover:scale-105"
      onClick={() => {
        setTaskDetailOpen(true);
        setSelectedTaskIdx(index);
      }}
    >
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
            {taskPoints}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ArchivedTaskCard;

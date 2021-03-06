import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment } from "react";
import { Task } from "../data/interfaces/Task";
import { useTasksToComplete } from "../data/useTasksToComplete";
import axiosInstance from "../utils/axiosInstance";

interface TaskDetailsModalProps {
  isOpen: boolean;
  task: Task | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openErrorDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskDetailsModal = ({ isOpen, setIsOpen, openErrorDialog, task }: TaskDetailsModalProps) => {
  const { mutate } = useTasksToComplete();

  const difficultyColor =
    task?.taskDifficulty === "easy"
      ? "text-green-600"
      : task?.taskDifficulty === "medium"
      ? "text-yellow-600"
      : "text-red-600";
  let taskDifficultyUpper = "";
  if (task) {
    taskDifficultyUpper =
      task.taskDifficulty.charAt(0).toUpperCase() + task.taskDifficulty.slice(1);
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => setIsOpen(false)}
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
            <div className="relative flex flex-col w-10/12 md:w-1/2 h-[80vh] mx-auto px-8 py-4 bg-white rounded divide-y-2">
              <div className="mb-2">
                <h2 className="text-lg font-medium text-gray-500">Task title:</h2>
                <Dialog.Title className="text-2xl font-bold text-gray-800">
                  {task?.title}
                </Dialog.Title>
              </div>
              <div className="pt-2">
                <h4 className="text-gray-400">Description:</h4>
                <Dialog.Description className="mb-4 text-gray-800">
                  {task?.description ? task.description : "There is no description to this task."}
                </Dialog.Description>

                <h4 className="text-gray-400">From:</h4>
                <h3 className="mb-4 font-medium text-gray-800">{task?.fromUser?.username}</h3>

                <h4 className="text-gray-400">Task difficulty:</h4>
                <h3 className={`mb-4 font-medium ${difficultyColor}`}>{taskDifficultyUpper}</h3>

                {task?.taskState === "awaiting" && (
                  <>
                    <h4 className="text-gray-400">Task created on:</h4>
                    <h3 className="font-medium text-gray-800">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </h3>
                  </>
                )}
                {task?.taskState !== "awaiting" && (
                  <>
                    <h4 className="mt-4 font-normal text-gray-400">
                      {task?.taskState === "fulfilled" ? "Task accepted on:" : "Task rejected on:"}
                    </h4>
                    <h3 className="font-medium text-gray-800">
                      {task?.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : null}
                    </h3>
                  </>
                )}
              </div>

              <div className="mt-auto pt-2 flex justify-end gap-2">
                <button
                  className="px-4 py-2 text-sm font-medium 
                  text-sky-900 bg-sky-100 border border-transparent rounded-md 
                  hover:bg-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
                {task?.taskState === "awaiting" ? (
                  <button
                    className="px-4 py-2 text-sm font-medium 
                  text-green-900 bg-green-100 border border-transparent rounded-md 
                  hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                    onClick={async () => {
                      try {
                        await axiosInstance.patch(`task/complete/${task?.id}`);
                        mutate(); // zatial len jednoducha hruba revalidacia
                      } catch (error) {
                        if (axios.isAxiosError(error)) {
                          openErrorDialog(true);
                        }
                      }
                      setIsOpen(false);
                    }}
                  >
                    Complete
                  </button>
                ) : null}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TaskDetailsModal;

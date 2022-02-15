import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";
import { KeyedMutator } from "swr";
import { Task } from "../data/interfaces/Task";
import { useTasksToComplete } from "../data/useTasksToComplete";
import axiosInstance from "../utils/axiosInstance";

interface CompleteTaskAlertProps {
  task: Task | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openErrorDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompleteTaskAlert = ({
  task,
  isOpen,
  setIsOpen,
  openErrorDialog,
}: CompleteTaskAlertProps) => {
  const { mutate } = useTasksToComplete();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Complete task.
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure that you have completed:{" "}
                  <span className="text-gray-800 font-semibold">{task?.title}</span> . Which{" "}
                  <span className="text-gray-800 font-semibold">{task?.fromUser?.username}</span>{" "}
                  gave you?
                </p>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                  onClick={async () => {
                    try {
                      await axiosInstance.patch(`task/complete/${task?.id}`);
                      mutate(); // zatial len jednoducha hruba revalidacia
                    } catch (error) {
                      openErrorDialog(true);
                    }

                    setIsOpen(false);
                  }}
                >
                  Completed
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CompleteTaskAlert;

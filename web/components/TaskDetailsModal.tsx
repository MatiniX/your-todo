import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

interface TaskDetailsModalProps {
  id: number;
  title: string;
  fromUser: string;
  description: string | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskDetailsModal = ({
  id,
  title,
  fromUser,
  description,
  isOpen,
  setIsOpen,
}: TaskDetailsModalProps) => {
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
            <div className="relative flex flex-col w-4/6 h-[80vh] mx-auto px-8 py-4 bg-white rounded divide-y-2">
              <div className="mb-2">
                <h2 className="text-lg font-medium text-gray-500">Task title:</h2>
                <Dialog.Title className="text-2xl font-bold text-gray-800">{title}</Dialog.Title>
              </div>
              <div className="">
                <h4 className="font-normal text-gray-400">Description:</h4>
                <Dialog.Description className="mb-8 font-normal text-gray-800">
                  {description ? description : "There is no description to this task."}
                </Dialog.Description>
                <h4 className="font-normal text-gray-400">From:</h4>
                <h3 className="font-medium text-gray-800">{fromUser}</h3>
              </div>

              <div className="mt-auto pt-2 flex justify-end gap-2">
                <button
                  className="px-3 py-1 w-24 bg-sky-100 text-sky-800 rounded-md hover:bg-sky-200"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
                <button
                  className="px-3 py-1 w-24 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                  onClick={() => setIsOpen(false)}
                >
                  Complete
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TaskDetailsModal;

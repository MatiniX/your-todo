import React from "react";
import { BadgeCheckIcon, InformationCircleIcon } from "@heroicons/react/solid";

interface SingleTaskProps {
  id: number;
  title: string;
  fromUser: string;
  description?: string;
}

const SingleTask = ({ id, title, fromUser, description }: SingleTaskProps) => {
  return (
    <div className="pt-2 w-96 bg-white rounded shadow ">
      <div className="divide-y">
        <div className="ml-4 mb-2">
          <h1 className="mb-2 font-bold text-xl text-gray-800">{title}</h1>
          <h2 className="font-medium text-base text-gray-500">From: {fromUser}</h2>
        </div>

        <div className="flex divide-x text-gray-400">
          <button className="flex justify-center gap-2 w-full py-2 font-semibold hover:bg-sky-100 hover:text-sky-600">
            <InformationCircleIcon className="h-6" />
            <p>Details</p>
          </button>
          <button className="flex justify-center gap-2 w-full py-2 font-semibold hover:bg-green-100 hover:text-green-600">
            <BadgeCheckIcon className="h-6" />
            <p>Complete</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;

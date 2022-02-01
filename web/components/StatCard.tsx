import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: JSX.Element;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div className="px-6 py-8 w-full bg-white shadow-md rounded-md">
      <div className="flex items-center">
        <span className="w-14 p-2 bg-sky-500 text-white rounded-lg">{icon}</span>
        <div className="ml-3">
          <h4 className="font-medium text-gray-500">{title}</h4>
          <h3 className="font-bold text-gray-800 text-4xl">{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default StatCard;

import React from "react";

interface NotificationDateProps {
  date: string;
}

const NotificationDate = ({ date }: NotificationDateProps) => {
  return (
    <span className="ml-auto text-gray-500 whitespace-nowrap">
      {new Date(date).toLocaleDateString("en-GB", {
        month: "short",
        day: "numeric",
      })}
    </span>
  );
};

export default NotificationDate;

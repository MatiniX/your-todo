import React from "react";
import useUser from "../data/useUser";
import { BsBell } from "react-icons/bs";

const TopNav = () => {
  const { user } = useUser();
  return (
    <div className="relative flex items-center w-full h-16 bg-white shadow z-10">
      <div className="flex items-center ml-auto mr-8">
        <BsBell className="w-6 h-6 mr-4 text-gray-600" />
        <h2 className=" text-lg text-gray-600 font-medium">{user.username}</h2>
      </div>
    </div>
  );
};

export default TopNav;

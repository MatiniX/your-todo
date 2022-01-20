import React from "react";
import Router from "next/router";
import Logo from "./Logo";
import SideNavLink from "./SideNavLink";
import {
  BsListTask,
  BsPeople,
  BsPlusCircle,
  BsPerson,
  BsArchive,
  BsAward,
  BsReception4,
  BsBoxArrowLeft,
} from "react-icons/bs";
import { logout } from "../utils/auth";
import useUser from "../data/useUser";

const Sidebar = () => {
  const { mutate } = useUser();

  return (
    <div className="fixed flex flex-col top-0 h-screen w-72 bg-sky-600">
      <Logo />
      <nav className="mt-4 space-y-1">
        <SideNavLink to="/tasks" name="My Tasks" icon={<BsListTask className="w-10 h-10" />} />
        <SideNavLink to="/friends" name="Friends" icon={<BsPeople className="w-10 h-10" />} />
        <SideNavLink
          to="/create-task"
          name="Create task"
          icon={<BsPlusCircle className="w-10 h-10" />}
        />
        <SideNavLink to="/profile" name="Profile" icon={<BsPerson className="w-10 h-10" />} />
        <SideNavLink to="/archive" name="Archive" icon={<BsArchive className="w-10 h-10" />} />
        <SideNavLink to="/review" name="Review" icon={<BsAward className="w-10 h-10" />} />
        <SideNavLink
          to="/leaderboard"
          name="Leaderboard"
          icon={<BsReception4 className="w-10 h-10" />}
        />
      </nav>
      <div className="mt-auto mb-2">
        <div className="mx-1 py-1 flex items-center text-white rounded hover:bg-sky-700">
          <button
            className="flex items-center w-full"
            onClick={async () => {
              await logout();
              await mutate();
              Router.replace("/login");
            }}
          >
            <i className="mx-4">
              <BsBoxArrowLeft className="w-10 h-10" />
            </i>

            <h3 className="text-xl font-medium">Logout</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useEffect } from "react";
import Router from "next/router";
import Logo from "./Logo";
import SideNavLink from "./SideNavLink";
import { logout } from "../utils/auth";
import useUser from "../data/useUser";
import {
  ArchiveIcon,
  ChartBarIcon,
  ClipboardListIcon,
  LogoutIcon,
  PlusCircleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/outline";

const Sidebar = () => {
  const { mutate, loggedOut } = useUser();

  useEffect(() => {
    if (loggedOut) Router.replace("/login");
  }, [loggedOut]);

  return (
    <div className="fixed flex flex-col top-0 h-screen w-72 bg-sky-600">
      <Logo />
      <nav className="mt-4 space-y-1">
        <SideNavLink to="/tasks" name="My Tasks" icon={<ClipboardListIcon className="w-8" />} />
        <SideNavLink to="/friends" name="Friends" icon={<UserGroupIcon className="w-8" />} />
        <SideNavLink
          to="/create-task"
          name="Create task"
          icon={<PlusCircleIcon className="w-8" />}
        />
        <SideNavLink to="/profile" name="Profile" icon={<UserIcon className="w-8" />} />
        <SideNavLink to="/archive" name="Archive" icon={<ArchiveIcon className="w-8" />} />
        <SideNavLink to="/review" name="Review" icon={<ShieldCheckIcon className="w-8" />} />
        <SideNavLink to="/leaderboard" name="Leaderboard" icon={<ChartBarIcon className="w-8" />} />
      </nav>
      <div className="mt-auto mb-2">
        <div className="mx-1 py-1 flex items-center text-white rounded hover:bg-sky-700 transition">
          <button
            className="flex items-center w-full"
            onClick={async () => {
              await logout();
              mutate();
            }}
          >
            <i className="mx-4">
              <LogoutIcon className="w-8" />
            </i>

            <h3 className="text-xl font-medium">Logout</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import { Menu } from "@headlessui/react";
import {
  ArchiveIcon,
  ChartBarIcon,
  ClipboardListIcon,
  MenuIcon,
  PlusCircleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/solid";
import React from "react";
import NextLink from "next/link";
import SideNavLink from "./SideNavLink";

interface MobileNavLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  to: string;
  icon: JSX.Element;
  children: React.ReactNode;
}

const MobileNavLink = ({ to, icon, children, ...rest }: MobileNavLinkProps) => {
  return (
    <NextLink href={to}>
      <a {...rest} className="mx-2 py-3 flex items-center text-sky-500">
        <i className="mx-4">{icon}</i>
        <h3 className="text-xl font-medium">{children}</h3>
      </a>
    </NextLink>
  );
};

const HamburgerMenu = () => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <MenuIcon className="w-8 mr-4 text-white " />
      </Menu.Button>
      <Menu.Items className="absolute flex flex-col right-0 w-screen mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1">
          <Menu.Item>
            {({ active }) => (
              <MobileNavLink to="/tasks" icon={<ClipboardListIcon className="w-8" />}>
                Tasks
              </MobileNavLink>
            )}
          </Menu.Item>
          <Menu.Item>
            <MobileNavLink to="/friends" icon={<UserGroupIcon className="w-8" />}>
              Friends
            </MobileNavLink>
          </Menu.Item>
          <Menu.Item>
            <MobileNavLink to="/create-task" icon={<PlusCircleIcon className="w-8" />}>
              Create Task
            </MobileNavLink>
          </Menu.Item>
          <Menu.Item>
            <MobileNavLink to="/profile" icon={<UserIcon className="w-8" />}>
              Profile
            </MobileNavLink>
          </Menu.Item>
          <Menu.Item>
            <MobileNavLink to="/archive" icon={<ArchiveIcon className="w-8" />}>
              Archive
            </MobileNavLink>
          </Menu.Item>
          <Menu.Item>
            <MobileNavLink to="/review" icon={<ShieldCheckIcon className="w-8" />}>
              Review
            </MobileNavLink>
          </Menu.Item>
          <Menu.Item>
            <MobileNavLink to="/leaderboard" icon={<ChartBarIcon className="w-8" />}>
              Leaderboard
            </MobileNavLink>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default HamburgerMenu;

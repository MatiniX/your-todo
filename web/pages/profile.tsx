import React, { ReactElement } from "react";
import Layout from "../components/Layout";
import {
  ChartBarIcon,
  CheckIcon,
  XIcon,
  UserGroupIcon,
  CloudDownloadIcon,
  CloudUploadIcon,
} from "@heroicons/react/outline";
import StatCard from "../components/StatCard";

const Profile = () => {
  return (
    <>
      <h1 className="page-header mb-8">Your Profile</h1>
      <div className="pr-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="font-medium text-gray-500">Username</h3>
            <h2 className="text-2xl font-bold text-gray-800">Randomuser</h2>
          </div>
          <div>
            <h3 className="font-medium text-gray-500">Email</h3>
            <h2 className="text-2xl font-bold text-gray-800">email@rmail.com</h2>
          </div>
          <div>
            <h3 className="font-medium text-gray-500">Joined On</h3>
            <h2 className="text-2xl font-bold text-gray-800">20. 2. 2022</h2>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-8 gap-8">
          <StatCard title="Trust Points" value={420} icon={<ChartBarIcon />} />
          <StatCard title="Tasks Completed" value={64} icon={<CheckIcon />} />
          <StatCard title="Tasks Failed" value={420} icon={<XIcon />} />
          <StatCard title="Friends" value={64} icon={<UserGroupIcon />} />
          <StatCard title="Tasks Sent" value={420} icon={<CloudUploadIcon />} />
          <StatCard title="Tasks Recieved" value={64} icon={<CloudDownloadIcon />} />
        </div>
      </div>
    </>
  );
};
Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;

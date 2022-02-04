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
import { useUserDetails } from "../data/useUserDetails";
import { useUserStats } from "../data/useUserStats";

const Profile = () => {
  const { userDetails, isValidating: validatingUserDetails } = useUserDetails();
  const { userStats, isValidating: validatingUserStats } = useUserStats();

  return (
    <>
      <h1 className="page-header mb-8">Your Profile</h1>
      <div className="pr-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="font-medium text-gray-500">Username</h3>
            <h2 className="text-2xl font-bold text-gray-800">
              {validatingUserDetails ? "loading" : userDetails?.username}
            </h2>
          </div>
          <div>
            <h3 className="font-medium text-gray-500">Email</h3>
            <h2 className="text-2xl font-bold text-gray-800">
              {validatingUserDetails ? "loading" : userDetails?.email}
            </h2>
          </div>
          <div>
            <h3 className="font-medium text-gray-500">Joined On</h3>
            <h2 className="text-2xl font-bold text-gray-800">
              {validatingUserDetails
                ? "loading"
                : new Date(userDetails!.createdAt).toLocaleDateString()}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-8 gap-8">
          <StatCard
            title="Trust Points"
            value={validatingUserStats ? "%" : userStats!.trustPoints}
            icon={<ChartBarIcon />}
          />
          <StatCard
            title="Tasks Completed"
            value={validatingUserStats ? "%" : userStats!.tasksCompleted}
            icon={<CheckIcon />}
          />
          <StatCard
            title="Tasks Failed"
            value={validatingUserStats ? "%" : userStats!.tasksFailed}
            icon={<XIcon />}
          />
          <StatCard
            title="Friends"
            value={validatingUserStats ? "%" : userStats!.friends}
            icon={<UserGroupIcon />}
          />
          <StatCard
            title="Tasks Sent"
            value={validatingUserStats ? "%" : userStats!.tasksSent}
            icon={<CloudUploadIcon />}
          />
          <StatCard
            title="Tasks Recieved"
            value={validatingUserStats ? "%" : userStats!.tasksRecieved}
            icon={<CloudDownloadIcon />}
          />
        </div>
      </div>
    </>
  );
};
Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;

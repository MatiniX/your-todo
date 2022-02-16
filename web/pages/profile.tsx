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
  const { userDetails, isLoading: loadingUserDetails } = useUserDetails();
  const { userStats, isLoading: loadingUserStats } = useUserStats();

  return (
    <>
      <h1 className="page-header mb-8">Your Profile</h1>
      <div className="pr-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="font-medium text-gray-500">Username</h3>
            {loadingUserDetails ? (
              <div className="animate-pulse w-full h-6 mt-2 bg-gray-300 rounded"></div>
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">{userDetails?.username}</h2>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-500">Email</h3>
            {loadingUserDetails ? (
              <div className="animate-pulse w-full h-6 mt-2 bg-gray-300 rounded"></div>
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">{userDetails?.email}</h2>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-500">Joined On</h3>
            {loadingUserDetails ? (
              <div className="animate-pulse w-full h-6 mt-2 bg-gray-300 rounded"></div>
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">
                {new Date(userDetails!.createdAt).toLocaleDateString()}
              </h2>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 mt-8 gap-8">
          <StatCard
            title="Trust Points"
            value={loadingUserStats ? "%" : userStats!.trustPoints}
            icon={<ChartBarIcon />}
            loading={loadingUserStats}
          />
          <StatCard
            title="Tasks Completed"
            value={loadingUserStats ? "%" : userStats!.tasksCompleted}
            icon={<CheckIcon />}
            loading={loadingUserStats}
          />
          <StatCard
            title="Tasks Failed"
            value={loadingUserStats ? "%" : userStats!.tasksFailed}
            icon={<XIcon />}
            loading={loadingUserStats}
          />
          <StatCard
            title="Friends"
            value={loadingUserStats ? "%" : userStats!.friends}
            icon={<UserGroupIcon />}
            loading={loadingUserStats}
          />
          <StatCard
            title="Tasks Sent"
            value={loadingUserStats ? "%" : userStats!.tasksSent}
            icon={<CloudUploadIcon />}
            loading={loadingUserStats}
          />
          <StatCard
            title="Tasks Recieved"
            value={loadingUserStats ? "%" : userStats!.tasksRecieved}
            icon={<CloudDownloadIcon />}
            loading={loadingUserStats}
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

import React, { ReactElement, useState } from "react";
import Layout from "../components/Layout";
import Leaderboard from "../components/Leaderboard";
import LoadingSpinner from "../components/LoadingSpinner";
import UserDetails from "../components/UserDetails";
import { useLeaderboard } from "../data/useLeaderboard";

const LeaderboardPage = () => {
  const [currUserId, setCurrUserId] = useState<number>();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { isLoading } = useLeaderboard();

  return (
    <>
      <h1 className="page-header text-center">Leaderboard</h1>
      <div className="mt-4">
        {isLoading ? (
          <div className="w-16 h-16 mx-auto mt-32">
            <LoadingSpinner />
          </div>
        ) : (
          <Leaderboard setOpenDetails={setDetailsOpen} setCurrUserId={setCurrUserId} />
        )}
      </div>
      <UserDetails id={currUserId!} isOpen={detailsOpen} setIsOpen={setDetailsOpen} />
    </>
  );
};

LeaderboardPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LeaderboardPage;

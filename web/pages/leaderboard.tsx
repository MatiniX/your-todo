import React, { ReactElement, useState } from "react";
import Layout from "../components/Layout";
import Leaderboard from "../components/Leaderboard";
import UserDetails from "../components/UserDetails";

const LeaderboardPage = () => {
  const [currUserId, setCurrUserId] = useState<number>();
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <h1 className="page-header text-center">Leaderboard</h1>
      <div className="mt-4">
        <Leaderboard setOpenDetails={setDetailsOpen} setCurrUserId={setCurrUserId} />
      </div>
      <UserDetails id={currUserId!} isOpen={detailsOpen} setIsOpen={setDetailsOpen} />
    </>
  );
};

LeaderboardPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LeaderboardPage;

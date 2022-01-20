import React, { ReactElement } from "react";
import Layout from "../components/Layout";

const Leaderboard = () => {
  return <div>leaderboard</div>;
};

Leaderboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Leaderboard;

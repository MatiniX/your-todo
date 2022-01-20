import React, { ReactElement } from "react";
import Layout from "../components/Layout";

const Friends = () => {
  return <div>friends</div>;
};

Friends.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Friends;

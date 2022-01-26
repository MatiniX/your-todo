import React, { ReactElement } from "react";
import Layout from "../components/Layout";

const Friends = () => {
  return (
    <>
      <h1 className="page-header">Friends</h1>
    </>
  );
};

Friends.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Friends;

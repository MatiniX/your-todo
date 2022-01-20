import React, { ReactElement } from "react";
import Layout from "../components/Layout";

const Archive = () => {
  return <div>archive</div>;
};

Archive.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Archive;

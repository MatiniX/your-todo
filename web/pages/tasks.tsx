import React, { ReactElement } from "react";
import Layout from "../components/Layout";

const Tasks = () => {
  return <div>tasks</div>;
};

Tasks.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Tasks;

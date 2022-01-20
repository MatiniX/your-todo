import React, { ReactElement } from "react";
import Layout from "../components/Layout";

const CreateTask = () => {
  return <div>tasks</div>;
};

CreateTask.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CreateTask;

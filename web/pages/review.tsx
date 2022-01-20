import React, { ReactElement } from "react";
import Layout from "../components/Layout";

const Review = () => {
  return <div>review</div>;
};
Review.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Review;

import { ReactElement } from "react";
import Layout from "../components/Layout";

const Home = () => {
  return <>index page</>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

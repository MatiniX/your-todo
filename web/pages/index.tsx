import { ReactElement } from "react";
import Layout from "../components/Layout";

const Home = () => {
  return <main className="h-content bg-gray-50">index page</main>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;

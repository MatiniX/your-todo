import React, { ReactElement } from "react";
import Layout from "../components/Layout";

const Profile = () => {
  return <div>profile</div>;
};
Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;

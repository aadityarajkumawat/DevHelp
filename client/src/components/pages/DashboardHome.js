import React from "react";
import UserPost from "./user-post/UserPost";
import Profile from "./profile/Profile";
import HamMenu from "./HamMenu";

const DashboardHome = ({ routing }) => {
  return (
    <div className="d-flex flex-column user-data-dash">
      <h2>Dashboard</h2>
      <Profile />
      <UserPost routing={routing} />
    </div>
  );
};

export default DashboardHome;

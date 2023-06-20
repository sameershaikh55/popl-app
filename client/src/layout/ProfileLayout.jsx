import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileBar from "./ProfileBar";

const ProfileLayout = ({ children, className }) => {
  return (
    <div className={`profile_container`}>
      <ProfileHeader />
      <br />
      <div className="profile_body d-flex">
        <ProfileBar />
        <div className={`profile_body_content ${className}`}>{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;

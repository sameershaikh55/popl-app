import React from "react";
import back from "../assets/icons/back.svg";
import share from "../assets/icons/share.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileHeader = () => {
  const { card } = useSelector((state) => state.card);
  const pictureURL = process.env.REACT_APP_PICTURE_URL;
  const placeholderPicture = process.env.REACT_APP_PLACEHOLDER_DP;

  return (
    <div className="profile_header_container d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-4">
        <Link to="/">
          <img src={back} alt="" />
        </Link>
        <div className="line"></div>
        <div className="profile_name d-flex align-items-center gap-3">
          <img
            src={
              (card.cardDP && pictureURL + card.cardDP) || placeholderPicture
            }
            alt=""
          />
          <p className="mb-0 f20">{card.name}</p>
        </div>
      </div>
      <div>
        <button className="share_card d-flex align-items-center gap-2 justify-content-center">
          Share Your Card <img src={share} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;

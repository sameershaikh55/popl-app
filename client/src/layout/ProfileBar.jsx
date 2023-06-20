import React from "react";
import { Link, useLocation } from "react-router-dom";
import links from "./constant/ProfileBar";
import { useParams } from "react-router-dom";

const ProfileBar = () => {
  const { id } = useParams();
  const location = useLocation();

  return (
    <div className="profile_sidebar_container">
      <div className="d-flex flex-column gap-5">
        <ul className="list-unstyled d-flex flex-column gap-3">
          {links.map(({ icon, main, page, name, target }, i) => {
            const link = `${main}/${id}${page}`;

            return (
              <Link
                to={link}
                target={target}
                className="nav_link"
                style={{
                  background: (location.pathname === link && "#F7F7F7") || "",
                  borderRadius: "11px",
                }}
                key={i}
              >
                <li className="d-flex align-items-center">
                  <div className="icon">{icon}</div>
                  <p className="f12">{name}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProfileBar;

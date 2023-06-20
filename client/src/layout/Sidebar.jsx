import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import links from "./constant/sidebar";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar_container d-flex flex-column">
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <div className="d-flex flex-column gap-5">
        <ul className="list-unstyled d-flex flex-column gap-3">
          {links.map(({ icon, to, name, target }, i) => {
            return (
              <Link
                to={to}
                target={target}
                style={{
                  background: (location.pathname === to && "#F7F7F7") || "",
                  borderRadius: "11px",
                }}
                className="nav_link"
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

export default Sidebar;

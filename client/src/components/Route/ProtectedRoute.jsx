import React from "react";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";

const Protected = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div className="main_container">
        <Sidebar />
        <div className="main_content">{children}</div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Protected;

import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./component/navbar";
import { AUTH_TOKEN } from "./constants";

const ProtectedRoute = ({ children }) => {
  let navigate = useNavigate();
  const token = localStorage.getItem(AUTH_TOKEN);
  if (!token) {
    navigate("/login");
    return <Navigate to={"/login"} />;
  } else {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }
};

export default ProtectedRoute;

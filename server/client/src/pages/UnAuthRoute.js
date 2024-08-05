import React from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const UnAuthRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("userId"); // Convert value into boolean
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};

export default UnAuthRoute;

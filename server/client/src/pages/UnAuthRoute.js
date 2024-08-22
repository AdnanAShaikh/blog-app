import React from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const UnAuthRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("userId"); // Convert value into boolean
  if (!isLoggedIn) {
    return children;
  }
  return <Navigate to="/blogs" />;
};

export default UnAuthRoute;

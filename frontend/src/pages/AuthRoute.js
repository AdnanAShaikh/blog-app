import React from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("userId"); // Check if user is logged in
  if (!isLoggedIn) {
    toast.error("Please register or login to access this page");
    return <Navigate to="/login" />;
  }
  return children;
};

export default AuthRoute;

import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("userId");

  if (!isLoggedIn) {
    toast.error("Please register or login to access this page");
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthRoute;

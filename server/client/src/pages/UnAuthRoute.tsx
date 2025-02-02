import React from "react";
import { useNavigate } from "react-router-dom";

interface UnAuthRouteProps {
  children: React.ReactNode;
}

const UnAuthRoute: React.FC<UnAuthRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("userId");

  if (isAuthenticated) {
    navigate("/", { replace: true });
    return null;
  }

  return <>{children}</>;
};

export default UnAuthRoute;

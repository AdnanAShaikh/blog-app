import React, { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLogin);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please Register or Login", {
        id: "auth-error",
      });
    }
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthRoute;

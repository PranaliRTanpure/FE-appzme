import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import storageService from "../services/core/storage-service";
import useAuthority from "../hooks/use-authority";

const PrivateRoute = (props: React.PropsWithChildren) => {
  const location = useLocation();

  const isLoggedIn = !!storageService.getToken();

  const { hasRouteAuthority } = useAuthority();

  if (!isLoggedIn) {
    localStorage.setItem("redirectURL", location.pathname);
    return <Navigate to={"/auth/login"} state={{ from: location }} replace />;
  } else {
    localStorage.removeItem("redirectURL");
  }

  return hasRouteAuthority ? (
    props.children
  ) : (
    <Navigate to={"/not-authorized"} state={{ from: location }} replace />
  );
};

export default PrivateRoute;

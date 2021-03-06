import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context.jsx";

const PrivateRoute = ({ path, ...props }) => {
  const { isUserLoggedIn } = useAuth();
  return isUserLoggedIn ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} to="/login" replace />
  );
};

export { PrivateRoute };

// eslint-disable-next-line no-unused-vars
import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function PublicRoute({ children }) {
  const isLoggedIn = useAuth();
  return !isLoggedIn ? children : <Navigate to="/profile" />;
}

export default PublicRoute;

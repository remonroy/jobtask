// eslint-disable-next-line no-unused-vars
import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function PrivetRoute({ children }) {
  const isLoggedIn = useAuth();
  return isLoggedIn ? children : <Navigate to="/" />;
}

export default PrivetRoute;

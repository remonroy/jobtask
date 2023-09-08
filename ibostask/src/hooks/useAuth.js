// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";

export default function useAuth() {
  const auth = useSelector((state) => state.auth);
  if (auth?.user) {
    return true;
  } else {
    return false;
  }
}

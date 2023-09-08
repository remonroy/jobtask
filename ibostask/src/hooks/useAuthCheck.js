/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authCheck, setAuthCheck] = useState(false);
  useEffect(() => {
    const localAuth = localStorage.getItem("auth");
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.user) {
        dispatch(
          userLogin({
            user: auth.user,
          })
        );
      }
    }
    setAuthCheck(true);
  }, [dispatch]);
  return authCheck;
}

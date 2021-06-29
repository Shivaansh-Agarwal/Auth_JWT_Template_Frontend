import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context.jsx";

export const Login = () => {
  const { isLoggedIn, login } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  function loginHandler() {
    login("shivaansh", "agarwal");
    if (state && state.from) {
      navigate(state?.from);
    }
  }

  return (
    <div>
      <h2>This is Login</h2>
      <button disabled={isLoggedIn} onClick={loginHandler}>
        Login
      </button>
    </div>
  );
};

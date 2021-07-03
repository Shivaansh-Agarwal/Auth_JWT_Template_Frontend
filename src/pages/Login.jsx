import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context.jsx";
import "../styles.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    isUserLoggedIn,
    login,
    isLoginCallSuccess,
    setIsLoginCallSuccess
  } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  async function loginHandler(e) {
    e.preventDefault();
    const loginCallStatus = await login(username, password);
    if (loginCallStatus) {
      setUsername("");
      setPassword("");
      if (state && state.from) {
        navigate(state.from);
      } else {
        navigate("/home");
      }
    }
  }

  function handleUsernameInput(e) {
    setUsername(e.target.value);
    setIsLoginCallSuccess(null);
  }
  function handlePasswordInput(e) {
    setPassword(e.target.value);
    setIsLoginCallSuccess(null);
  }

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={loginHandler}>
        {isLoginCallSuccess === false && (
          <div style={{ color: "red" }}>Username or Password is Invalid!</div>
        )}
        <div className="login-username">
          <label htmlFor="username">Username</label>
          <input
            required
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleUsernameInput}
          />
        </div>
        <div className="login-password">
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordInput}
          />
        </div>
        <button disabled={isUserLoggedIn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

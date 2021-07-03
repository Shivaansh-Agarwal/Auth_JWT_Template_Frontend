import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const AuthProvider = function ({ children }) {
  const { isLoggedIn, token: savedToken } = JSON.parse(
    localStorage.getItem("login")
  ) || {
    isLoggedIn: false,
    token: null
  };

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn);
  const [token, setToken] = useState(savedToken);
  const [isLoginCallSuccess, setIsLoginCallSuccess] = useState(null);

  async function login(username, password) {
    try {
      const { data } = await axios.post(
        "https://auth-101.shivaansh98.repl.co/login",
        {
          username: username,
          password: password
        }
      );
      console.log(data);
      if (data.success) {
        setIsUserLoggedIn(true);
        setToken(data.token);
        localStorage.setItem(
          "login",
          JSON.stringify({ isLoggedIn: true, token: data.token })
        );
      }
      setIsLoginCallSuccess(true);
      return true;
    } catch (e) {
      console.error("Invalid Username or Password", e);
      setIsLoginCallSuccess(false);
      return false;
    }
  }

  function logout() {
    // Backend Call for Logout
    if (localStorage?.getItem("login")) {
      localStorage.removeItem("login");
    }
    setIsUserLoggedIn(false);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        login,
        logout,
        token,
        isLoginCallSuccess,
        setIsLoginCallSuccess
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = function () {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useContext must be defined within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };

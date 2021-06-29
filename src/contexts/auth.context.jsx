import React, { createContext, useContext, useEffect, useState } from "react";
import { fakeAuthApi } from "../fakeAuthApi.js";

const AuthContext = createContext(null);

const AuthProvider = function ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    let loginStatus = JSON.parse(localStorage.getItem("login"));
    if (loginStatus?.isLoggedIn) {
      setIsLoggedIn(true);
      setToken(loginStatus.token);
    }
  }, []);

  async function login(username, password) {
    try {
      const response = await fakeAuthApi(username, password);
      if (response.success) {
        setIsLoggedIn(true);
        setToken(response.token);
        localStorage.setItem(
          "login",
          JSON.stringify({ isLoggedIn: true, token: response.token })
        );
      }
    } catch (e) {
      console.error("Wrong Username and Password", e);
    }
  }

  function logout() {
    // Backend Call for Logout
    if (localStorage?.getItem("login")) {
      localStorage.removeItem("login");
    }
    setIsLoggedIn(false);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token }}>
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

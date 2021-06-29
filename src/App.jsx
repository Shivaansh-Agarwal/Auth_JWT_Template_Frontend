import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute.jsx";
import { Login, Home, Cart, Wishlist, Address, Profile } from "./pages";
import { useAuth } from "./contexts/auth.context.jsx";
import "./styles.css";

export default function App() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <div className="App">
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
      </nav>
      <nav>
        <Link to="/address">Address</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <button
        onClick={() => {
          logout();
        }}
        disabled={!isLoggedIn}
      >
        Logout
      </button>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <PrivateRoute path="/address" element={<Address />} />
        <PrivateRoute path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

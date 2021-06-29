import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/auth.context.jsx";

export const Cart = () => {
  const { token } = useAuth();
  console.log(token);
  useEffect(() => {
    login(token);
  }, []);
  return (
    <div>
      <h2>This is Cart</h2>
    </div>
  );
};

async function login(token) {
  try {
    const { data } = await axios.get(
      "https://auth-101.shivaansh98.repl.co/user",
      {
        headers: {
          Authorization: token
        }
      }
    );
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

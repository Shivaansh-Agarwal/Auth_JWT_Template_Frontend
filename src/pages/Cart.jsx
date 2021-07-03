import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/auth.context.jsx";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  console.log(token);
  useEffect(() => {
    fetchUsers(token, navigate);
  }, [navigate, token]);
  return (
    <div>
      <h2>This is Cart</h2>
    </div>
  );
};

async function fetchUsers(token, navigate) {
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
  } catch (error) {
    console.error(`Token is not correct, navigating to Login, LOGS:`);
    if (error.response.status === 401) {
      navigate("/login");
    }
  }
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/auth.context.jsx";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    age: "",
    profession: ""
  });
  const navigate = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    fetchProfile({ navigate, token, setProfileData });
  }, []);
  return (
    <div>
      <h2>Profile (Backend Private Route)</h2>
      <div>Name: {profileData.name}</div>
      <div>Age: {profileData.age}</div>
      <div>Profession: {profileData.profession}</div>
    </div>
  );
};

async function fetchProfile({ navigate, token, setProfileData }) {
  try {
    const { data } = await axios.get(
      "https://auth-101.shivaansh98.repl.co/profile",
      {
        headers: {
          Authorization: token
        }
      }
    );
    setProfileData(data);
  } catch (e) {
    console.error(`Token is not correct, navigating to Login, LOGS:`);
    if (e.response.status === 401) {
      navigate("/login");
    }
  }
}

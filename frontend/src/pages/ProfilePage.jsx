import React from "react";
import { useAuth } from "../context/AuthContext"; // Import Auth Context
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { user } = useAuth(); // Get the logged-in user

  if (!user) {
    return <p>Please log in to access your profile.</p>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <p><strong>Role:</strong> {user.role}</p>
      {/* Add more user details here later */}
    </div>
  );
};

export default ProfilePage;

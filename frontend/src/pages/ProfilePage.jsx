import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { api_private_get } from "../utils/api.js";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api_private_get(
      "/profile",
      (response) => {
        setProfileData(response);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data");
        setLoading(false);
      }
    );
  }, []);

  const handleEditProfile = () => {
    // Implement edit profile logic
    console.log("Edit profile clicked");
  };

  const handleChangePassword = () => {
    // Implement password change logic
    console.log("Change password clicked");
  };

  if (loading) {
    return (
      <div className="profile-page">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <h2 className="error-message">{error}</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          className="profile-avatar"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
        <h2 className="profile-name">{profileData.fullName}</h2>
        <p className="profile-role">Role: {profileData.role}</p>
      </div>

      <div className="profile-info-card">
        <h3>Profile Information</h3>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Bio:</strong> {profileData.bio || "No bio provided"}</p>
      </div>

      <div className="profile-actions">
        <button className="btn-action" onClick={handleEditProfile}>
          Edit Profile
        </button>
        <button className="btn-action" onClick={handleChangePassword}>
          Change Password
        </button>
      </div>

      <div className="profile-footer">
        <p>Member since {new Date(profileData.memberSince).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
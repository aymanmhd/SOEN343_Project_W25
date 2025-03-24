import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // 1) Import useNavigate
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // 2) Initialize navigate

  const [profileData, setProfileData] = useState(null);

  // 3) If user is null (logged out), go to public homepage
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Simulate fetching profile data (replace with real API call)
  useEffect(() => {
    if (user) {
      // BACKEND: Replace with an actual API call to fetch user profile data
      const mockProfile = {
        id: 123,
        name: "Jane Doe",
        email: "jane.doe@example.com",
        role: user.role,
        bio: "Hello, I am Jane. I love attending tech events!",
      };
      setProfileData(mockProfile);
    }
  }, [user]);

  if (!profileData) {
    return (
      <div className="profile-page">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  const handleEditProfile = () => {
    // BACKEND: Replace with call to open a modal or navigate to an edit profile form
    alert("Edit profile clicked (placeholder).");
  };

  const handleChangePassword = () => {
    // BACKEND: Replace with call to change password logic
    alert("Change password clicked (placeholder).");
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          className="profile-avatar"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
        <h2 className="profile-name">{profileData.name}</h2>
        <p className="profile-role">Role: {profileData.role}</p>
      </div>

      <div className="profile-info-card">
        <h3>Profile Information</h3>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Bio:</strong> {profileData.bio}</p>
      </div>

      <div className="profile-actions">
        <button className="btn-action" onClick={handleEditProfile}>Edit Profile</button>
        <button className="btn-action" onClick={handleChangePassword}>Change Password</button>
      </div>

      <div className="profile-footer">
        <p>Member since 2023</p>
      </div>
    </div>
  );
};

export default ProfilePage;

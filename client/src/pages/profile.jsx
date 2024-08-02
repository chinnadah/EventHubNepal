import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/profile.scss";
import { Navbar } from "../components/Navbar";

const UpdateProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateProfile = async () => {
    setSuccessMessage("");  // Reset messages
    setErrorMessage("");    // Reset messages

    try {
      const response = await fetch("http://localhost:3001/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          currentEmail,
          currentPassword,
          newEmail: email !== user.email ? email : undefined,
          newPassword: password ? password : undefined,
          firstName: firstName !== user.firstName ? firstName : undefined,
          lastName: lastName !== user.lastName ? lastName : undefined,
        }),
      });

      if (response.ok) {
        // Profile updated successfully
        const data = await response.json();
        console.log("User profile updated:", data);
        setSuccessMessage("Profile updated successfully!");
      } else {
        // Error updating profile
        const error = await response.json();
        console.error("Error updating user profile:", error.message);
        setErrorMessage("Error updating profile: " + error.message);
      }
    } catch (err) {
      console.error("Error updating user profile:", err.message);
      setErrorMessage("Error updating profile. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
    <div className="update-profile">
      <h2>Update Profile</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Current Email:
          <input
            type="email"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
          />
        </label>
        <label>
          Current Password:
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        <label>
          New Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    </>
  );
};

export default UpdateProfilePage;

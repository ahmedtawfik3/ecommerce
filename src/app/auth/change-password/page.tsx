"use client";
import { useState } from "react";
import { resetPassword } from "../../../services/auth";
import { useAuth } from "@/context/AuthContext";

export default function ChangePasswordPage() {
  const { user } = useAuth(); 
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in");
      return;
    }

    if (newPassword !== rePassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await resetPassword(user.email, newPassword); 
      alert("Password changed successfully");
    } catch (err) {
      console.log(err);
      alert("Change failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Change Password</h1>
      <input
        placeholder="Current Password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        placeholder="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        placeholder="Re-Password"
        type="password"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
      />
      <button type="submit">Change</button>
    </form>
  );
}

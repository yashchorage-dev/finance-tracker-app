import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

function Settings() {
  const [user] = useAuthState(auth);

  // 🧩 Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.info("Logged out successfully!");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <div
      style={{
        padding: "30px 40px",
        background: "#f5f6fa",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ color: "#222", marginBottom: "10px" }}>⚙️ Settings</h1>
      <p style={{ color: "#555", marginBottom: "30px" }}>
        Manage your account information and security.
      </p>

      {/* Profile Section */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginBottom: "25px",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>👤 Profile Information</h2>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Profile Avatar */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #007bff, #00c6ff)",
              color: "white",
              fontSize: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            {user?.displayName?.[0] || user?.email?.[0] || "U"}
          </div>

          {/* User Info */}
          <div>
            <h3 style={{ margin: "5px 0" }}>{user?.displayName || "User"}</h3>
            <p style={{ margin: "5px 0", color: "#555" }}>{user?.email}</p>
            <p style={{ fontSize: "0.85rem", color: "#888" }}>
              UID: {user?.uid}
            </p>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>🔒 Account Actions</h2>

        <button
          onClick={handleLogout}
          style={{
            background: "#ff4d4f",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 25px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#e04343")}
          onMouseOut={(e) => (e.target.style.background = "#ff4d4f")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Settings;

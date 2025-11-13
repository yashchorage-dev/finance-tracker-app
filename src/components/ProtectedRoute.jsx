import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  // 🕐While Firebase is still checking if user is logged in
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem",
          color: "#555",
        }}
      >
        Checking authentication...
      </div>
    );
  }

  // If not logged in — redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the protected content
  return children;
}

export default ProtectedRoute;

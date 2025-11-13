import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { toast } from "react-toastify";
import "./Login.css"; // 👈 import your CSS

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle login
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);

      toast.success("Login successful!");
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid credentials or user not found.");
    }
  }

  //  Hndle forgot password
  async function handleForgotPassword() {
    if (!email) {
      toast.warning("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.info("Password reset link sent! Check your inbox.");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Failed to send reset link. Try again later.");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>Please log in to your Finance Tracker account</p>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          {/* Forgot password link */}
          <div className="forgot-password" onClick={handleForgotPassword}>
            Forgot Password?
          </div>

          <button type="submit">Login</button>
        </form>

        <div className="login-footer">
          <p>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

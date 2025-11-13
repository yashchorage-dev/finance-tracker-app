import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Email validation regex
  const emailRegex = /^[A-Za-z0-9._%+-]{3,}@[A-Za-z0-9.-]{3,}\.[A-Za-z]{2,}$/;

  // Strong password validation regex
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.warning("All fields are required!");
      return;
    }

    // Email Validation
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Strong Password Validation
    if (!strongPasswordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long with uppercase, lowercase, number & symbol."
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });

      toast.success("Signup successful!");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account ✨</h2>
        <p>Join the Finance Tracker community today!</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <button type="submit">Create Account</button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./SignUp.css";

// Images from public folder
const backgroundUrl = `/background.jpg`;
const logoUrl = `/logo.png`;

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const checkboxRef = useRef(null);
  const submitButtonRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleKeyDown = (e, field) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    let valid = true;
    const newErrors = { ...errors };

    if (field === "username" && !formData.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (field === "email" && (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))) {
      newErrors.email = "Valid email required";
      valid = false;
    }

    if (field === "password" && formData.password.length < 6) {
      newErrors.password = "Min 6 characters required";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    if (field === "username") emailRef.current?.focus();
    if (field === "email") passwordRef.current?.focus();
    if (field === "password") confirmPasswordRef.current?.focus();
    if (field === "confirmPassword") checkboxRef.current?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup(
        formData.username,
        formData.email,
        formData.password
      );

      if (result?.success) {
        toast.success("Signup successful! Welcome to Hamro Ghum Gham.");
        navigate("/home");
      } else {
        toast.error(result?.message || "Signup failed");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div
        className="signup-left"
        style={{ "--bg-image": `url(${backgroundUrl})` }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Sign up to</h1>
          <h1 className="hero-brand">Hamro Ghum Gham</h1>
          <p className="hero-subtitle">
            Start your journey with us and explore the beautiful destinations of Nepal
          </p>
        </div>
      </div>

      <div className="signup-right">
        <div className="signup-form-container">
          <Link to="/" className="signup-logo-container">
            <img src={logoUrl} alt="Logo" className="signup-logo" />
          </Link>

          <h2 className="signup-form-title">Create Account</h2>
          <p className="signup-form-subtitle">Fill in your details to get started</p>

          <form onSubmit={handleSubmit} className="signup-form">
            {/* Username */}
            <div className="signup-form-group">
              <label>Username</label>
              <input
                ref={usernameRef}
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, "username")}
                className={`signup-input ${errors.username ? "error" : ""}`}
                placeholder="Enter your username"
              />
              {errors.username && <span className="signup-error-text">⚠ {errors.username}</span>}
            </div>

            {/* Email */}
            <div className="signup-form-group">
              <label>Email</label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, "email")}
                className={`signup-input ${errors.email ? "error" : ""}`}
                placeholder="you@example.com"
              />
              {errors.email && <span className="signup-error-text">⚠ {errors.email}</span>}
            </div>

            {/* Password */}
            <div className="signup-form-group">
              <label>Password</label>
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, "password")}
                className={`signup-input ${errors.password ? "error" : ""}`}
                placeholder="Create a strong password"
              />
              {errors.password && <span className="signup-error-text">⚠ {errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className="signup-form-group">
              <label>Confirm Password</label>
              <input
                ref={confirmPasswordRef}
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, "confirmPassword")}
                className={`signup-input ${errors.confirmPassword ? "error" : ""}`}
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && (
                <span className="signup-error-text">⚠ {errors.confirmPassword}</span>
              )}
            </div>

            {/* Show Password */}
            <div className="show-password-container">
              <input
                ref={checkboxRef}
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <label>Show Password</label>
            </div>

            {/* Submit */}
            <button
              ref={submitButtonRef}
              type="submit"
              disabled={isLoading}
              className="signup-submit-button"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>

            <div className="signup-login-container">
              <span>Already have an account? </span>
              <Link to="/login" className="signup-login-link">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

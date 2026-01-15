import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./SignUp.css";

const backgroundUrl = `/images/background.jpg`;
const logoUrl = `/images/logo.png`;

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

    if (field === "confirmPassword" && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    if (field === "username") emailRef.current?.focus();
    if (field === "email") passwordRef.current?.focus();
    if (field === "password") confirmPasswordRef.current?.focus();
    if (field === "confirmPassword") submitButtonRef.current?.focus();
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
          <div className="signup-logo-container">
            <img
              src={logoUrl}
              alt="Hamro Ghum Gham Logo"
              className="signup-logo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="signup-logo-placeholder" style={{ display: 'none' }}>
              HGG
            </div>
          </div>

          <h2 className="signup-form-title">Create Account</h2>
          <p className="signup-form-subtitle">Fill in your details to get started</p>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signup-form-group">
              <label className="signup-label">Username</label>
              <input
                ref={usernameRef}
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, "username")}
                placeholder="Enter your username"
                className={`signup-input ${errors.username ? 'error' : ''}`}
              />
              {errors.username && (
                <span className="signup-error-text">⚠ {errors.username}</span>
              )}
            </div>

            <div className="signup-form-group">
              <label className="signup-label">Email</label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, "email")}
                placeholder="you@example.com"
                className={`signup-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && (
                <span className="signup-error-text">⚠ {errors.email}</span>
              )}
            </div>

            <div className="signup-form-group">
              <label className="signup-label">Password</label>
              <div className="password-input-wrapper">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, "password")}
                  placeholder="Create a strong password"
                  className={`signup-input ${errors.password ? 'error' : ''}`}
                />
                <button
                  type="button"
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <span className="signup-error-text">⚠ {errors.password}</span>
              )}
            </div>

            <div className="signup-form-group">
              <label className="signup-label">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  ref={confirmPasswordRef}
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, "confirmPassword")}
                  placeholder="Re-enter your password"
                  className={`signup-input ${errors.confirmPassword ? 'error' : ''}`}
                />
                <button
                  type="button"
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="signup-error-text">⚠ {errors.confirmPassword}</span>
              )}
            </div>

            <button
              ref={submitButtonRef}
              type="submit"
              disabled={isLoading}
              className="signup-submit-button"
            >
              {isLoading ? (
                <>
                  <span className="signup-spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>

            <div className="signup-login-container">
              <span className="signup-login-text">Already have an account? </span>
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
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./Login.css";

// Images from public folder
const backgroundUrl = `/background.jpg`;
const logoUrl = `/logo.png`;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const checkboxRef = useRef(null);
  const submitButtonRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Validate individual fields
  const validateField = (field, value) => {
    const newErrors = { ...errors };

    if (field === "email") {
      if (!value) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Email is invalid";
      } else {
        delete newErrors.email;
      }
    }

    if (field === "password") {
      if (!value) {
        newErrors.password = "Password is required";
      } else if (value.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
    return !newErrors[field];
  };

  // Handle Enter key navigation
  const handleKeyDown = (e, field) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    if (field === "email" && validateField("email", email)) {
      passwordRef.current?.focus();
    }

    if (field === "password" && validateField("password", password)) {
      checkboxRef.current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValid = validateField("email", email);
    const passwordValid = validateField("password", password);

    if (!emailValid || !passwordValid) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result?.success) {
        toast.success("Login successful! Welcome back.");
        navigate("/home");
      } else {
        toast.error(result?.message || "Invalid email or password");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="overlay" style={{ opacity: 0.5 }} />

      <div className="login-wrapper">
        <div className="login-card">
          {/* Logo */}
          <div className="text-center mb-4">
            <img
              src={logoUrl}
              alt="Hamro Ghum Gham Logo"
              className="login-logo"
            />
          </div>

          <h4 className="text-center mb-4">
            Login – <span className="brand-name">Hamro Ghum Gham</span>
          </h4>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="form-label">Email</label>
              <input
                ref={emailRef}
                type="email"
                className={`form-control ${errors.email ? "error" : ""}`}
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: null });
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, "email")}
                autoComplete="email"
              />
              {errors.email && (
                <span className="error-text">⚠ {errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                className={`form-control ${errors.password ? "error" : ""}`}
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: null });
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, "password")}
                autoComplete="current-password"
              />
              {errors.password && (
                <span className="error-text">⚠ {errors.password}</span>
              )}
            </div>

            {/* Options */}
            <div className="form-options-row mb-4">
              <div className="show-password-container">
                <input
                  ref={checkboxRef}
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submitButtonRef.current?.focus();
                    }
                  }}
                />
                <label htmlFor="showPassword">Show Password</label>
              </div>

              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              ref={submitButtonRef}
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center">
              <span className="text-muted">Don't have an account? </span>
              <Link to="/signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

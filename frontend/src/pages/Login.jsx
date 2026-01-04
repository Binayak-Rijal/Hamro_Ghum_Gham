import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

// Path to images in public folder
const backgroundUrl = `/bg.jpeg`;
const logoUrl = `/logo.jpeg`;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Create refs for each input field
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const checkboxRef = useRef(null);
  const submitButtonRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validate individual fields
  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'email':
        if (!value) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Email is invalid";
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        } else {
          delete newErrors.password;
        }
        break;
    }

    setErrors(newErrors);
    return !newErrors[field];
  };

  // Handle Enter key press to move to next field
  const handleKeyDown = (e, currentField) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      let isValid = false;

      switch (currentField) {
        case 'email':
          isValid = validateField('email', email);
          if (isValid) {
            passwordRef.current?.focus();
          }
          break;
        case 'password':
          isValid = validateField('password', password);
          if (isValid) {
            checkboxRef.current?.focus();
          }
          break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const emailValid = validateField('email', email);
    const passwordValid = validateField('password', password);

    if (emailValid && passwordValid) {
      console.log("Email:", email, "Password:", password);
      alert("Login successful!");
      // Add your login logic here
    }
  };

  return (
    <div 
      className="login-page"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
      }}
    >
      {/* Overlay with 50% opacity */}
      <div className="overlay" style={{ opacity: 0.5 }}></div>

      {/* Center Wrapper */}
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

          {/* Title */}
          <h4 className="text-center mb-4">
            Login – <span className="brand-name">Hamro Ghum Gham</span>
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label">Email</label>
              <input
                ref={emailRef}
                type="email"
                className={`form-control ${errors.email ? 'error' : ''}`}
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: null });
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, 'email')}
                // ADDED: Autocomplete attribute for email
                autoComplete="email"
              />
              {errors.email && (
                <span className="error-text">⚠ {errors.email}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                className={`form-control ${errors.password ? 'error' : ''}`}
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: null });
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, 'password')}
                // ADDED: Autocomplete attribute for password (use "current-password" for login)
                autoComplete="current-password"
              />
              {errors.password && (
                <span className="error-text">⚠ {errors.password}</span>
              )}
            </div>

            {/* Show Password & Forgot Password in same row */}
            <div className="form-options-row mb-4">
              <div className="show-password-container">
                <input
                  ref={checkboxRef}
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      submitButtonRef.current?.focus();
                    }
                  }}
                  className="show-password-checkbox"
                  // ADDED: Autocomplete attribute for checkbox
                  autoComplete="off"
                />
                <label htmlFor="showPassword" className="show-password-label">
                  Show Password
                </label>
              </div>
              
              <div className="forgot-password-container">
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button 
              ref={submitButtonRef}
              type="submit" 
              className="btn btn-primary w-100 mb-3"
            >
              Login
            </button>

            {/* Optional: Sign up link */}
            <div className="text-center">
              <span className="text-muted">Don't have an account? </span>
              <Link to="/signup" className="signup-link">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
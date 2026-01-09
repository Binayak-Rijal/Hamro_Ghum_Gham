import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { login } from "../api";
import "./Login.css";

const backgroundUrl = `${process.env.PUBLIC_URL}/images/bg.jpg`;
const logoUrl = `${process.env.PUBLIC_URL}/images/logo.png`;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const submitButtonRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            submitButtonRef.current?.focus();
          }
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailValid = validateField('email', email);
    const passwordValid = validateField('password', password);

    if (!emailValid || !passwordValid) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const response = await login({
        email: email,
        password: password
      });

      setSuccessMessage(response.message || "Login successful!");
      console.log("Login successful:", response);
      
      localStorage.setItem('user', JSON.stringify(response.user));

      setTimeout(() => {
        alert(`Welcome back, ${response.user.name}!`);
        // navigate('/dashboard'); // Uncomment when dashboard is ready
      }, 1000);

    } catch (error) {
      setErrors({ general: error });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div 
        className="login-left"
        style={{
          '--bg-image': `url(${backgroundUrl})`
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Welcome back to</h1>
          <h1 className="hero-brand">Hamro Ghum Gham</h1>
          <p className="hero-subtitle">
            Login to continue your journey and explore beautiful destinations
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <div className="login-logo-container">
            <img
              src={logoUrl}
              alt="Hamro Ghum Gham Logo"
              className="login-logo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="login-logo-placeholder" style={{ display: 'none' }}>
              HGG
            </div>
          </div>

          <h2 className="login-form-title">Login</h2>
          <p className="login-form-subtitle">Enter your credentials to access your account</p>

          {successMessage && (
            <div className="message-box success-message">
              ✓ {successMessage}
            </div>
          )}

          {errors.general && (
            <div className="message-box error-message">
              ⚠ {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label className="login-label">Email</label>
              <input
                ref={emailRef}
                type="email"
                className={`login-input ${errors.email ? 'error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: null });
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, 'email')}
              />
              {errors.email && (
                <span className="login-error-text">⚠ {errors.email}</span>
              )}
            </div>

            <div className="login-form-group">
              <label className="login-label">Password</label>
              <div className="password-input-wrapper">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  className={`login-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors({ ...errors, password: null });
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(e, 'password')}
                />
                <button
                  type="button"
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                  tabIndex="-1"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <span className="login-error-text">⚠ {errors.password}</span>
              )}
            </div>

            <div className="login-options-row">
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            <button
              ref={submitButtonRef}
              type="submit"
              disabled={isLoading}
              className="login-submit-button"
            >
              {isLoading ? (
                <>
                  <span className="login-spinner"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>

            <div className="login-signup-container">
              <span className="login-signup-text">Don't have an account? </span>
              <Link to="/signup" className="login-signup-link">
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
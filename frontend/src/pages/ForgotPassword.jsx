// frontend/src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./ForgotPassword.css";

const API_URL = 'http://localhost:3000/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/password/forgot`, {
        email: email.toLowerCase()
      });

      if (response.data.success) {
        toast.success("Password reset code has been sent to your email!");
        
        // Navigate to reset password page with token
        navigate('/reset-password', {
          state: { 
            resetToken: response.data.resetToken,
            email: email 
          }
        });
      }
    } catch (error) {
      // ✅ Show specific error messages
      if (error.response?.status === 404) {
        toast.error("This email is not registered. Please sign up first.");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to send reset email. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-left">
        <div className="hero-content">
          <h1 className="hero-title">Forgot Your Password?</h1>
          <h1 className="hero-brand">Don't Worry!</h1>
          <p className="hero-subtitle">
            We'll send you a verification code to reset your password
          </p>
        </div>
      </div>

      <div className="forgot-password-right">
        <div className="forgot-password-form-container">
          <div className="forgot-password-logo-container">
            <img
              src="/images/logo.png"
              alt="Hamro Ghum Gham Logo"
              className="forgot-password-logo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="forgot-password-logo-placeholder">HGG</div>
          </div>

          <h2 className="forgot-password-form-title">Reset Password</h2>
          <p className="forgot-password-form-subtitle">
            Enter your email address and we'll send you a code to reset your password
          </p>

          <form onSubmit={handleSubmit} className="forgot-password-form">
            <div className="forgot-password-form-group">
              <label className="forgot-password-label">Email Address</label>
              <input
                type="email"
                className="forgot-password-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="forgot-password-submit-button"
            >
              {isLoading ? (
                <>
                  <span className="forgot-password-spinner"></span>
                  Sending Code...
                </>
              ) : (
                'Send Reset Code'
              )}
            </button>

            <div className="forgot-password-back-container">
              <Link to="/login" className="forgot-password-back-link">
                ← Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
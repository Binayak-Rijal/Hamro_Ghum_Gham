// frontend/src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./ResetPassword.css";

const API_URL = 'http://localhost:5000/api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resetTokenFromState = location.state?.resetToken;

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState(resetTokenFromState || "");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!otp || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!resetToken) {
      toast.error("Reset token missing. Please request a new password reset.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/password/reset`, {
        resetToken,
        otp,
        newPassword
      });

      if (response.data.success) {
        toast.success("Password reset successful! You can now login.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  return (
    <div className="reset-password-container">
      <div className="reset-password-left">
        <div className="hero-content">
          <h1 className="hero-title">Create New Password</h1>
          <h1 className="hero-brand">Almost Done!</h1>
          <p className="hero-subtitle">
            Enter the code from your email and set a new password
          </p>
        </div>
      </div>

      <div className="reset-password-right">
        <div className="reset-password-form-container">
          <div className="reset-password-logo-container">
            <img
              src="/images/logo.png"
              alt="Hamro Ghum Gham Logo"
              className="reset-password-logo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="reset-password-logo-placeholder">HGG</div>
          </div>

          <h2 className="reset-password-form-title">Reset Password</h2>
          <p className="reset-password-form-subtitle">
            Enter the 6-digit code sent to your email and choose a new password
          </p>

          <form onSubmit={handleSubmit} className="reset-password-form">
            <div className="reset-password-form-group">
              <label className="reset-password-label">Verification Code (OTP)</label>
              <input
                type="text"
                className="reset-password-input"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength="6"
                autoComplete="off"
                autoFocus
              />
              <small style={{color: '#718096', fontSize: '0.85rem', marginTop: '4px', display: 'block'}}>
                Check your email inbox for the code
              </small>
            </div>

            <div className="reset-password-form-group">
              <label className="reset-password-label">New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="reset-password-input"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="reset-password-form-group">
              <label className="reset-password-label">Confirm New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="reset-password-input"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-icon"
                  onClick={toggleConfirmPasswordVisibility}
                  tabIndex="-1"
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="reset-password-submit-button"
            >
              {isLoading ? (
                <>
                  <span className="reset-password-spinner"></span>
                  Resetting Password...
                </>
              ) : (
                'Reset Password'
              )}
            </button>

            <div className="reset-password-back-container">
              <Link to="/forgot-password" className="reset-password-back-link">
                ← Resend Code
              </Link>
              <span style={{margin: '0 10px', color: '#cbd5e0'}}>•</span>
              <Link to="/login" className="reset-password-back-link">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
// frontend/src/pages/ForgotPassword.jsx
/**
 * ForgotPassword Component
 * Page that allows users to initiate password reset by sending a verification code to email
 * After successful code generation, navigates to ResetPassword page
 * 
 * Features:
 * - Email validation (format and required field)
 * - Integration with backend password reset API
 * - Loading states with spinner animation
 * - Toast notifications for user feedback
 * - Responsive split-screen layout (hero section + form)
 * - Error handling for unregistered emails
 * - Automatic navigation to reset page with token
 */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ScrollToTop from "../components/ScrollToTop";
import axios from "axios";
import "./ForgotPassword.css";

// Backend API base URL
const API_URL = 'http://localhost:3000/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  // State for email input field
  const [email, setEmail] = useState("");
  // State for loading status during API call
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles forgot password form submission
   * Validates email, sends reset code to user's email, and navigates to reset page
   */
  const handleSubmit = async (e) => {
    // Prevent default form submission which would reload the page
    e.preventDefault();

    // Validate email is not empty
    // First validation: check if field has any value
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Validate email format using regex
    // Regex pattern: checks for basic email format (text@text.text)
    // \S+ = one or more non-whitespace characters
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Send POST request to generate reset code
      // Backend will create a token and send email with verification code
      const response = await axios.post(`${API_URL}/password/forgot`, {
        // Convert email to lowercase for case-insensitive comparison
        email: email.toLowerCase()
      });

      if (response.data.success) {
        toast.success("Password reset code has been sent to your email!");
        
        // Navigate to reset password page with token and email
        // Pass data via state object so ResetPassword page can access it
        // resetToken: used to verify reset code from email
        // email: pre-fills email field on reset page
        navigate('/reset-password', {
          state: { 
            resetToken: response.data.resetToken,
            email: email 
          }
        });
      }
    } catch (error) {
      // Show specific error messages based on response status
      // 404 status means email not found in database
      if (error.response?.status === 404) {
        toast.error("This email is not registered. Please sign up first.");
      } else {
        // For other errors, show backend message or generic error
        // Optional chaining (?.) prevents errors if response is undefined
        toast.error(
          error.response?.data?.message || "Failed to send reset email. Please try again."
        );
      }
    } finally {
      // Always reset loading state, regardless of success or failure
      // Ensures button is re-enabled after request completes
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <ScrollToTop />
      <div className="forgot-password-left">
        <div className="hero-content">
          <h1 className="hero-title">Forgot Your Password?</h1>
          <h1 className="hero-brand">Don't Worry!</h1>
          <p className="hero-subtitle">
            We'll send you a verification code to reset your password
          </p>
        </div>
      </div>

      {/* Right side: Form section */}
      <div className="forgot-password-right">
        <div className="forgot-password-form-container">
          {/* Logo with fallback to placeholder */}
          <div className="forgot-password-logo-container">
            <img
              src="/images/logo.png"
              alt="Hamro Ghum Gham Logo"
              className="forgot-password-logo"
              // onError triggers if image fails to load
              // Hides broken image and shows HGG placeholder instead
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Placeholder shown if logo image fails to load */}
            <div className="forgot-password-logo-placeholder">HGG</div>
          </div>

          {/* Form title and description */}
          <h2 className="forgot-password-form-title">Reset Password</h2>
          <p className="forgot-password-form-subtitle">
            Enter your email address and we'll send you a code to reset your password
          </p>

          {/* Password reset form */}
          <form onSubmit={handleSubmit} className="forgot-password-form">
            {/* Email input field */}
            <div className="forgot-password-form-group">
              <label className="forgot-password-label">Email Address</label>
              <input
                type="email"
                className="forgot-password-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // autoComplete helps browsers suggest saved emails
                autoComplete="email"
                // autoFocus puts cursor in field when page loads
                autoFocus
              />
            </div>

            {/* Submit button with loading state */}
            {/* Button is disabled during API call to prevent duplicate submissions */}
            <button
              type="submit"
              disabled={isLoading}
              className="forgot-password-submit-button"
            >
              {/* Conditional rendering: show spinner during loading */}
              {isLoading ? (
                <>
                  {/* Spinner animation for loading feedback */}
                  <span className="forgot-password-spinner"></span>
                  Sending Code...
                </>
              ) : (
                'Send Reset Code'
              )}
            </button>

            {/* Link to navigate back to login page */}
            {/* Allows users to cancel and return to login */}
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
// backend/controllers/passwordController.js
import crypto from 'crypto';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
};

// Test email connection on server start
export const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email server is ready to send emails');
    return true;
  } catch (error) {
    console.error('❌ Email server connection failed:', error.message);
    console.error('⚠️  Please check your EMAIL_USER and EMAIL_APP_PASSWORD in .env file');
    return false;
  }
};

// Store reset tokens temporarily (in production, use Redis or database)
const resetTokens = new Map();

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // ✅ EXPLICIT ERROR: Email not registered
      return res.status(404).json({
        success: false,
        message: 'This email is not registered. Please sign up first.'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with expiration (10 minutes)
    const resetToken = crypto.randomBytes(32).toString('hex');
    resetTokens.set(resetToken, {
      email: user.email,
      otp: otp,
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    // Send email
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Hamro Ghum Gham" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Password Reset Code - Hamro Ghum Gham',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; border: 2px dashed #0d6efd; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
            .otp-code { font-size: 32px; font-weight: bold; color: #0d6efd; letter-spacing: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔒 Password Reset Request</h1>
            </div>
            <div class="content">
              <p>Hello <strong>${user.name}</strong>,</p>
              <p>We received a request to reset your password for your Hamro Ghum Gham account.</p>
              
              <div class="otp-box">
                <p style="margin: 0; color: #6c757d; font-size: 14px;">Your verification code is:</p>
                <div class="otp-code">${otp}</div>
                <p style="margin: 10px 0 0 0; color: #6c757d; font-size: 12px;">Valid for 10 minutes</p>
              </div>

              <div class="warning">
                <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
              </div>

              <p>For security reasons, this code will expire in <strong>10 minutes</strong>.</p>
              
              <p>Best regards,<br><strong>Hamro Ghum Gham Team</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated email. Please do not reply to this message.</p>
              <p>&copy; ${new Date().getFullYear()} Hamro Ghum Gham. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    
    console.log(`📧 Password reset email sent to: ${user.email}`);

    res.json({
      success: true,
      message: 'Password reset code has been sent to your email.',
      resetToken // Send token to frontend for verification
    });

  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send reset email. Please try again later.'
    });
  }
};

// Verify OTP and reset password
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, otp, newPassword } = req.body;

    if (!resetToken || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate password length
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if token exists
    const tokenData = resetTokens.get(resetToken);
    
    if (!tokenData) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token. Please request a new password reset.'
      });
    }

    // Check if token expired
    if (Date.now() > tokenData.expiresAt) {
      resetTokens.delete(resetToken);
      return res.status(400).json({
        success: false,
        message: 'Reset code has expired. Please request a new one.'
      });
    }

    // Verify OTP
    if (tokenData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code. Please check and try again.'
      });
    }

    // Find user and update password
    const user = await User.findOne({ email: tokenData.email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update password (pre-save hook will hash it)
    user.password = newPassword;
    await user.save();

    // Delete used token
    resetTokens.delete(resetToken);
    
    console.log(`✅ Password reset successful for: ${user.email}`);

    // Send confirmation email
    const transporter = createTransporter();
    
    const confirmationMail = {
      from: `"Hamro Ghum Gham" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Password Changed Successfully - Hamro Ghum Gham',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .success-box { background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 15px 0; border-radius: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Password Changed Successfully</h1>
            </div>
            <div class="content">
              <p>Hello <strong>${user.name}</strong>,</p>
              
              <div class="success-box">
                <strong>Your password has been changed successfully!</strong>
              </div>

              <p>You can now log in to your Hamro Ghum Gham account using your new password.</p>
              
              <p>If you did not make this change, please contact us immediately.</p>
              
              <p>Best regards,<br><strong>Hamro Ghum Gham Team</strong></p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Hamro Ghum Gham. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(confirmationMail);

    res.json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.'
    });

  } catch (error) {
    console.error('❌ Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password. Please try again.'
    });
  }
};
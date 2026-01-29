// backend/routes/password.js
import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/passwordController.js';

const router = express.Router();

// POST /api/password/forgot - Send OTP to email
router.post('/forgot', forgotPassword);

// POST /api/password/reset - Verify OTP and reset password
router.post('/reset', resetPassword);

export default router;
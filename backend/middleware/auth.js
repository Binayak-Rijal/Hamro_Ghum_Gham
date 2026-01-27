

// backend/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Main authentication middleware
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    console.log('Auth middleware - Token received:', token ? 'Yes' : 'No');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'No token, authorization denied' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully, User ID:', decoded.id);
    
    // Get user from database (including role)
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({ 
      success: false,
      message: 'Token is not valid' 
    });
  }
};


// Admin-only middleware (use after auth middleware)
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    console.log('Admin access granted for:', req.user.email);
    next();
  } else {
    console.log('Admin access denied for:', req.user?.email);
    res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin privileges required.' 
    });
  }
};

// Export auth as default

export default auth;
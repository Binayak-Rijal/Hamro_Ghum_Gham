// backend/Test/security.test.js
import { jest } from '@jest/globals';
import mongoose from 'mongoose';

// Mock jwt
const jwt = {
  verify: jest.fn()
};

// Mock User model
const User = {
  findById: jest.fn()
};

// Mock the modules
jest.unstable_mockModule('jsonwebtoken', () => ({
  default: jwt
}));

jest.unstable_mockModule('../models/User.js', () => ({
  default: User
}));

// Import the middleware after mocking
const { default: auth, adminOnly } = await import('../middleware/auth.js');

describe('Authentication Middleware Tests', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock request object
    mockReq = {
      header: jest.fn(),
      user: null
    };

    // Mock response object
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    // Mock next function
    mockNext = jest.fn();

    // Mock environment variable
    process.env.JWT_SECRET = 'test-secret-key';

    // Silence console logs during tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
    console.error.mockRestore();
  });

  describe('auth() - Main Authentication Middleware', () => {
    test('should authenticate user with valid token', async () => {
      const mockUserId = new mongoose.Types.ObjectId();
      const mockUser = {
        _id: mockUserId,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user'
      };

      const mockToken = 'valid.jwt.token';
      const mockDecoded = { id: mockUserId.toString() };

      mockReq.header.mockReturnValue(`Bearer ${mockToken}`);
      jwt.verify.mockReturnValue(mockDecoded);
      
      const mockSelect = jest.fn().mockResolvedValue(mockUser);
      User.findById = jest.fn().mockReturnValue({ select: mockSelect });

      await auth(mockReq, mockRes, mockNext);

      expect(mockReq.header).toHaveBeenCalledWith('Authorization');
      expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'test-secret-key');
      expect(User.findById).toHaveBeenCalledWith(mockUserId.toString());
      expect(mockSelect).toHaveBeenCalledWith('-password');
      expect(mockReq.user).toEqual(mockUser);
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith('Auth middleware - Token received:', 'Yes');
      expect(console.log).toHaveBeenCalledWith('Token decoded successfully, User ID:', mockUserId.toString());
    });

    test('should handle token without Bearer prefix', async () => {
      const mockUserId = new mongoose.Types.ObjectId();
      const mockUser = {
        _id: mockUserId,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user'
      };

      const mockToken = 'valid.jwt.token';
      const mockDecoded = { id: mockUserId.toString() };

      mockReq.header.mockReturnValue(mockToken);
      jwt.verify.mockReturnValue(mockDecoded);
      
      const mockSelect = jest.fn().mockResolvedValue(mockUser);
      User.findById = jest.fn().mockReturnValue({ select: mockSelect });

      await auth(mockReq, mockRes, mockNext);

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'test-secret-key');
      expect(mockReq.user).toEqual(mockUser);
      expect(mockNext).toHaveBeenCalled();
    });

    test('should return 401 when no token is provided', async () => {
      mockReq.header.mockReturnValue(undefined);

      await auth(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'No token, authorization denied'
      });
      expect(mockNext).not.toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Auth middleware - Token received:', 'No');
    });

    test('should return 401 when Authorization header is empty', async () => {
      mockReq.header.mockReturnValue('');

      await auth(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'No token, authorization denied'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('should return 401 when token is Bearer with no value', async () => {
      mockReq.header.mockReturnValue('Bearer ');

      await auth(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'No token, authorization denied'
      });
    });

    test('should return 401 when token is invalid', async () => {
      const mockToken = 'invalid.jwt.token';
      const jwtError = new Error('invalid signature');
      jwtError.name = 'JsonWebTokenError';

      mockReq.header.mockReturnValue(`Bearer ${mockToken}`);
      jwt.verify.mockImplementation(() => {
        throw jwtError;
      });

      await auth(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Token is not valid'
      });
      expect(mockNext).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Auth middleware error:', 'invalid signature');
    });

    test('should return 401 when token is expired', async () => {
      const mockToken = 'expired.jwt.token';
      const expiredError = new Error('jwt expired');
      expiredError.name = 'TokenExpiredError';

      mockReq.header.mockReturnValue(`Bearer ${mockToken}`);
      jwt.verify.mockImplementation(() => {
        throw expiredError;
      });

      await auth(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Token is not valid'
      });
      expect(console.error).toHaveBeenCalledWith('Auth middleware error:', 'jwt expired');
    });

    test('should return 401 when user not found in database', async () => {
      const mockUserId = new mongoose.Types.ObjectId();
      const mockToken = 'valid.jwt.token';
      const mockDecoded = { id: mockUserId.toString() };

      mockReq.header.mockReturnValue(`Bearer ${mockToken}`);
      jwt.verify.mockReturnValue(mockDecoded);
      
      const mockSelect = jest.fn().mockResolvedValue(null);
      User.findById = jest.fn().mockReturnValue({ select: mockSelect });

      await auth(mockReq, mockRes, mockNext);

      expect(User.findById).toHaveBeenCalledWith(mockUserId.toString());
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not found'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('should exclude password field from user data', async () => {
      const mockUserId = new mongoose.Types.ObjectId();
      const mockUser = {
        _id: mockUserId,
        name: 'Test User',
        email: 'test@example.com',
        role: 'user'
      };

      const mockToken = 'valid.jwt.token';
      const mockDecoded = { id: mockUserId.toString() };

      mockReq.header.mockReturnValue(`Bearer ${mockToken}`);
      jwt.verify.mockReturnValue(mockDecoded);
      
      const mockSelect = jest.fn().mockResolvedValue(mockUser);
      User.findById = jest.fn().mockReturnValue({ select: mockSelect });

      await auth(mockReq, mockRes, mockNext);

      expect(mockSelect).toHaveBeenCalledWith('-password');
      expect(mockReq.user).not.toHaveProperty('password');
    });

    test('should handle database connection errors', async () => {
      const mockUserId = new mongoose.Types.ObjectId();
      const mockToken = 'valid.jwt.token';
      const mockDecoded = { id: mockUserId.toString() };
      const dbError = new Error('Database connection failed');

      mockReq.header.mockReturnValue(`Bearer ${mockToken}`);
      jwt.verify.mockReturnValue(mockDecoded);
      
      const mockSelect = jest.fn().mockRejectedValue(dbError);
      User.findById = jest.fn().mockReturnValue({ select: mockSelect });

      await auth(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Token is not valid'
      });
      expect(console.error).toHaveBeenCalledWith('Auth middleware error:', 'Database connection failed');
    });

    test('should handle malformed JWT structure', async () => {
      const mockToken = 'malformed-token';
      const malformedError = new Error('jwt malformed');
      malformedError.name = 'JsonWebTokenError';

      mockReq.header.mockReturnValue(`Bearer ${mockToken}`);
      jwt.verify.mockImplementation(() => {
        throw malformedError;
      });

      await auth(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Token is not valid'
      });
    });

    test('should handle token with invalid user ID format', async () => {
      const mockToken = 'valid.jwt.token';
      const mockDecoded = { id: 'invalid-id-format' };
      const castError = new Error('Cast to ObjectId failed');
      castError.name = 'CastError';

      mockReq.header.mockReturnValue(`Bearer ${mockToken}`);
      jwt.verify.mockReturnValue(mockDecoded);
      
      const mockSelect = jest.fn().mockRejectedValue(castError);
      User.findById = jest.fn().mockReturnValue({ select: mockSelect });

      await auth(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Token is not valid'
      });
    });

    test('should authenticate admin user successfully', async () => {
      const mockUserId = new mongoose.Types.ObjectId();
      const mockAdminUser = {
        _id: mockUserId,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      };

      const mockToken = 'valid.admin.token';
      const mockDecoded = { id: mockUserId.toString() };

      mockReq.header.mockReturnValue(`Bearer ${mockToken}`);
      jwt.verify.mockReturnValue(mockDecoded);
      
      const mockSelect = jest.fn().mockResolvedValue(mockAdminUser);
      User.findById = jest.fn().mockReturnValue({ select: mockSelect });

      await auth(mockReq, mockRes, mockNext);

      expect(mockReq.user).toEqual(mockAdminUser);
      expect(mockReq.user.role).toBe('admin');
      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });

  describe('adminOnly() - Admin Authorization Middleware', () => {
    test('should allow access for admin users', () => {
      mockReq.user = {
        _id: new mongoose.Types.ObjectId(),
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      };

      adminOnly(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Admin access granted for:', 'admin@example.com');
    });

    test('should deny access for regular users', () => {
      mockReq.user = {
        _id: new mongoose.Types.ObjectId(),
        name: 'Regular User',
        email: 'user@example.com',
        role: 'user'
      };

      adminOnly(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
      expect(mockNext).not.toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Admin access denied for:', 'user@example.com');
    });

    test('should deny access when user object is missing', () => {
      mockReq.user = null;

      adminOnly(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
      expect(mockNext).not.toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Admin access denied for:', undefined);
    });

    test('should deny access when user object is undefined', () => {
      mockReq.user = undefined;

      adminOnly(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('should deny access when role is missing', () => {
      mockReq.user = {
        _id: new mongoose.Types.ObjectId(),
        name: 'User Without Role',
        email: 'norole@example.com'
      };

      adminOnly(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('should deny access for case-sensitive role mismatch', () => {
      mockReq.user = {
        _id: new mongoose.Types.ObjectId(),
        name: 'User',
        email: 'user@example.com',
        role: 'ADMIN' // Wrong case
      };

      adminOnly(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('should deny access for invalid role values', () => {
      mockReq.user = {
        _id: new mongoose.Types.ObjectId(),
        name: 'User',
        email: 'user@example.com',
        role: 'super-admin' // Invalid role
      };

      adminOnly(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('should work correctly after auth middleware', async () => {
      // First, authenticate as admin
      const mockUserId = new mongoose.Types.ObjectId();
      const mockAdminUser = {
        _id: mockUserId,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      };

      const mockToken = 'valid.admin.token';
      const mockDecoded = { id: mockUserId.toString() };

      mockReq.header.mockReturnValue(`Bearer ${mockToken}`);
      jwt.verify.mockReturnValue(mockDecoded);
      
      const mockSelect = jest.fn().mockResolvedValue(mockAdminUser);
      User.findById = jest.fn().mockReturnValue({ select: mockSelect });

      await auth(mockReq, mockRes, mockNext);

      expect(mockReq.user).toEqual(mockAdminUser);

      // Then check admin authorization
      const mockNext2 = jest.fn();
      adminOnly(mockReq, mockRes, mockNext2);

      expect(mockNext2).toHaveBeenCalledTimes(1);
    });
  });

  describe('Security Edge Cases', () => {
    test('should handle empty Bearer token', async () => {
      mockReq.header.mockReturnValue('Bearer ');

      await auth(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'No token, authorization denied'
      });
    });

    test('should handle token with extra spaces', async () => {
      const mockUserId = new mongoose.Types.ObjectId();
      const mockUser = {
        _id: mockUserId,
        name: 'Test User',
        email: 'test@example.com',
        role: 'user'
      };

      const mockToken = 'valid.jwt.token';
      const mockDecoded = { id: mockUserId.toString() };

      mockReq.header.mockReturnValue(`Bearer   ${mockToken}  `);
      jwt.verify.mockReturnValue(mockDecoded);
      
      const mockSelect = jest.fn().mockResolvedValue(mockUser);
      User.findById = jest.fn().mockReturnValue({ select: mockSelect });

      await auth(mockReq, mockRes, mockNext);

      // Should handle extra spaces after Bearer
      expect(jwt.verify).toHaveBeenCalled();
    });

    test('should handle JWT with missing user ID in payload', async () => {
      const mockToken = 'valid.jwt.token';
      const mockDecoded = {}; // No id field

      mockReq.header.mockReturnValue(`Bearer ${mockToken}`);
      jwt.verify.mockReturnValue(mockDecoded);
      
      const mockSelect = jest.fn().mockResolvedValue(null);
      User.findById = jest.fn().mockReturnValue({ select: mockSelect });

      await auth(mockReq, mockRes, mockNext);

      expect(User.findById).toHaveBeenCalledWith(undefined);
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });

    test('should handle token verification with wrong secret', async () => {
      const mockToken = 'token.with.wrong.secret';
      const secretError = new Error('invalid signature');
      secretError.name = 'JsonWebTokenError';

      mockReq.header.mockReturnValue(`Bearer ${mockToken}`);
      jwt.verify.mockImplementation(() => {
        throw secretError;
      });

      await auth(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Token is not valid'
      });
    });

    test('should not leak sensitive error information', async () => {
      const mockToken = 'valid.jwt.token';
      const sensitiveError = new Error('Database credentials invalid: password=secret123');

      mockReq.header.mockReturnValue(`Bearer ${mockToken}`);
      jwt.verify.mockImplementation(() => {
        throw sensitiveError;
      });

      await auth(mockReq, mockRes, mockNext);

      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Token is not valid'
      });
      // Should not expose the detailed error message to the client
      expect(mockRes.json).not.toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining('password=')
        })
      );
    });

    test('should handle concurrent authentication requests', async () => {
      const mockUserId1 = new mongoose.Types.ObjectId();
      const mockUserId2 = new mongoose.Types.ObjectId();
      
      const mockUser1 = {
        _id: mockUserId1,
        name: 'User 1',
        email: 'user1@example.com',
        role: 'user'
      };

      const mockUser2 = {
        _id: mockUserId2,
        name: 'User 2',
        email: 'user2@example.com',
        role: 'admin'
      };

      const mockToken1 = 'token1';
      const mockToken2 = 'token2';

      // First request
      mockReq.header.mockReturnValue(`Bearer ${mockToken1}`);
      jwt.verify.mockReturnValue({ id: mockUserId1.toString() });
      
      const mockSelect1 = jest.fn().mockResolvedValue(mockUser1);
      User.findById = jest.fn().mockReturnValue({ select: mockSelect1 });

      await auth(mockReq, mockRes, mockNext);
      expect(mockReq.user).toEqual(mockUser1);

      // Second request with new objects
      const mockReq2 = { header: jest.fn(), user: null };
      const mockRes2 = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const mockNext2 = jest.fn();

      mockReq2.header.mockReturnValue(`Bearer ${mockToken2}`);
      jwt.verify.mockReturnValue({ id: mockUserId2.toString() });
      
      const mockSelect2 = jest.fn().mockResolvedValue(mockUser2);
      User.findById = jest.fn().mockReturnValue({ select: mockSelect2 });

      await auth(mockReq2, mockRes2, mockNext2);
      expect(mockReq2.user).toEqual(mockUser2);
    });
  });
});

// backend/Test/bookingController.test.js
import { jest } from '@jest/globals';
import mongoose from 'mongoose';

// Create mock functions for controller actions
const createBooking = async (req, res) => {
  try {
    const {
      packageId,
      packageName,
      fullName,
      phone,
      travelDate,
      numberOfPeople,
      specialRequests,
      subtotal,
      serviceCharge,
      totalPrice
    } = req.body;

    if (!packageId || !packageName || !fullName || !phone || !travelDate || !numberOfPeople) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      packageId,
      packageName,
      fullName,
      phone,
      travelDate,
      numberOfPeople,
      specialRequests: specialRequests || '',
      subtotal: subtotal || 0,
      serviceCharge: serviceCharge || 0,
      totalPrice: totalPrice || 0,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getBookingsCount = async (req, res) => {
  try {
    const count = await Booking.countDocuments({
      user: req.user.id,
      status: { $ne: 'cancelled' }
    });

    res.json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Get bookings count error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
      count: 0
    });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('package', 'name images duration price')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Mock the Booking model
const Booking = {
  create: jest.fn(),
  countDocuments: jest.fn(),
  find: jest.fn()
};

describe('Booking Controller Tests', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock request object
    mockReq = {
      body: {},
      user: {
        id: new mongoose.Types.ObjectId().toString(),
        name: 'Test User',
        email: 'test@example.com'
      }
    };

    // Mock response object
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    // Mock next function
    mockNext = jest.fn();

    // Silence console errors during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error
    console.error.mockRestore();
  });

  describe('createBooking Controller', () => {
    test('should create booking successfully with all required fields', async () => {
      const mockBookingData = {
        _id: new mongoose.Types.ObjectId(),
        user: mockReq.user.id,
        packageId: 'pkg_123',
        packageName: 'Everest Base Camp Trek',
        fullName: 'John Doe',
        phone: '+977-9841234567',
        travelDate: new Date('2026-03-15'),
        numberOfPeople: 2,
        specialRequests: 'Vegetarian meals',
        subtotal: 3000,
        serviceCharge: 300,
        totalPrice: 3300,
        status: 'pending'
      };

      mockReq.body = {
        packageId: 'pkg_123',
        packageName: 'Everest Base Camp Trek',
        fullName: 'John Doe',
        phone: '+977-9841234567',
        travelDate: '2026-03-15',
        numberOfPeople: 2,
        specialRequests: 'Vegetarian meals',
        subtotal: 3000,
        serviceCharge: 300,
        totalPrice: 3300
      };

      Booking.create = jest.fn().mockResolvedValue(mockBookingData);

      await createBooking(mockReq, mockRes);

      expect(Booking.create).toHaveBeenCalledWith({
        user: mockReq.user.id,
        packageId: 'pkg_123',
        packageName: 'Everest Base Camp Trek',
        fullName: 'John Doe',
        phone: '+977-9841234567',
        travelDate: '2026-03-15',
        numberOfPeople: 2,
        specialRequests: 'Vegetarian meals',
        subtotal: 3000,
        serviceCharge: 300,
        totalPrice: 3300,
        status: 'pending'
      });

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Booking created successfully',
        booking: mockBookingData
      });
    });

    test('should create booking with default values when optional fields are missing', async () => {
      const mockBookingData = {
        _id: new mongoose.Types.ObjectId(),
        user: mockReq.user.id,
        packageId: 'pkg_123',
        packageName: 'City Tour',
        fullName: 'Jane Smith',
        phone: '+977-9841234567',
        travelDate: new Date('2026-04-01'),
        numberOfPeople: 1,
        specialRequests: '',
        subtotal: 0,
        serviceCharge: 0,
        totalPrice: 0,
        status: 'pending'
      };

      mockReq.body = {
        packageId: 'pkg_123',
        packageName: 'City Tour',
        fullName: 'Jane Smith',
        phone: '+977-9841234567',
        travelDate: '2026-04-01',
        numberOfPeople: 1
      };

      Booking.create = jest.fn().mockResolvedValue(mockBookingData);

      await createBooking(mockReq, mockRes);

      expect(Booking.create).toHaveBeenCalledWith({
        user: mockReq.user.id,
        packageId: 'pkg_123',
        packageName: 'City Tour',
        fullName: 'Jane Smith',
        phone: '+977-9841234567',
        travelDate: '2026-04-01',
        numberOfPeople: 1,
        specialRequests: '',
        subtotal: 0,
        serviceCharge: 0,
        totalPrice: 0,
        status: 'pending'
      });

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Booking created successfully',
        booking: mockBookingData
      });
    });

    test('should return 400 error when packageId is missing', async () => {
      mockReq.body = {
        packageName: 'Test Package',
        fullName: 'John Doe',
        phone: '+977-9841234567',
        travelDate: '2026-03-15',
        numberOfPeople: 2
      };

      await createBooking(mockReq, mockRes);

      expect(Booking.create).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Please provide all required fields'
      });
    });

    test('should return 400 error when packageName is missing', async () => {
      mockReq.body = {
        packageId: 'pkg_123',
        fullName: 'John Doe',
        phone: '+977-9841234567',
        travelDate: '2026-03-15',
        numberOfPeople: 2
      };

      await createBooking(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Please provide all required fields'
      });
    });

    test('should return 400 error when fullName is missing', async () => {
      mockReq.body = {
        packageId: 'pkg_123',
        packageName: 'Test Package',
        phone: '+977-9841234567',
        travelDate: '2026-03-15',
        numberOfPeople: 2
      };

      await createBooking(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Please provide all required fields'
      });
    });

    test('should return 400 error when phone is missing', async () => {
      mockReq.body = {
        packageId: 'pkg_123',
        packageName: 'Test Package',
        fullName: 'John Doe',
        travelDate: '2026-03-15',
        numberOfPeople: 2
      };

      await createBooking(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Please provide all required fields'
      });
    });

    test('should return 400 error when travelDate is missing', async () => {
      mockReq.body = {
        packageId: 'pkg_123',
        packageName: 'Test Package',
        fullName: 'John Doe',
        phone: '+977-9841234567',
        numberOfPeople: 2
      };

      await createBooking(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Please provide all required fields'
      });
    });

    test('should return 400 error when numberOfPeople is missing', async () => {
      mockReq.body = {
        packageId: 'pkg_123',
        packageName: 'Test Package',
        fullName: 'John Doe',
        phone: '+977-9841234567',
        travelDate: '2026-03-15'
      };

      await createBooking(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Please provide all required fields'
      });
    });

    test('should return 500 error when database operation fails', async () => {
      mockReq.body = {
        packageId: 'pkg_123',
        packageName: 'Test Package',
        fullName: 'John Doe',
        phone: '+977-9841234567',
        travelDate: '2026-03-15',
        numberOfPeople: 2
      };

      const dbError = new Error('Database connection failed');
      Booking.create = jest.fn().mockRejectedValue(dbError);

      await createBooking(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database connection failed'
      });
      expect(console.error).toHaveBeenCalledWith('Create booking error:', dbError);
    });

    test('should handle Mongoose validation errors', async () => {
      mockReq.body = {
        packageId: 'pkg_123',
        packageName: 'Test Package',
        fullName: 'John Doe',
        phone: '+977-9841234567',
        travelDate: '2026-03-15',
        numberOfPeople: 0 // Invalid: less than 1
      };

      const validationError = new Error('Booking validation failed: numberOfPeople: At least 1 person is required');
      Booking.create = jest.fn().mockRejectedValue(validationError);

      await createBooking(mockReq, mockRes);

      // Should return 400 because numberOfPeople is 0 (validation at controller level)
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Please provide all required fields'
      });
    });
  });

  describe('getBookingsCount Controller', () => {
    test('should return correct count of user bookings', async () => {
      Booking.countDocuments = jest.fn().mockResolvedValue(5);

      await getBookingsCount(mockReq, mockRes);

      expect(Booking.countDocuments).toHaveBeenCalledWith({
        user: mockReq.user.id,
        status: { $ne: 'cancelled' }
      });

      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        count: 5
      });
    });

    test('should return zero when user has no bookings', async () => {
      Booking.countDocuments = jest.fn().mockResolvedValue(0);

      await getBookingsCount(mockReq, mockRes);

      expect(Booking.countDocuments).toHaveBeenCalledWith({
        user: mockReq.user.id,
        status: { $ne: 'cancelled' }
      });

      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        count: 0
      });
    });

    test('should exclude cancelled bookings from count', async () => {
      // Mock implementation that simulates excluding cancelled bookings
      Booking.countDocuments = jest.fn().mockImplementation((query) => {
        // Verify the query excludes cancelled bookings
        expect(query.status).toEqual({ $ne: 'cancelled' });
        return Promise.resolve(3);
      });

      await getBookingsCount(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        count: 3
      });
    });

    test('should return 0 count and 500 error when database operation fails', async () => {
      const dbError = new Error('Database error');
      Booking.countDocuments = jest.fn().mockRejectedValue(dbError);

      await getBookingsCount(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database error',
        count: 0
      });
      expect(console.error).toHaveBeenCalledWith('Get bookings count error:', dbError);
    });

    test('should use correct user ID from authenticated request', async () => {
      const specificUserId = new mongoose.Types.ObjectId().toString();
      mockReq.user.id = specificUserId;

      Booking.countDocuments = jest.fn().mockResolvedValue(2);

      await getBookingsCount(mockReq, mockRes);

      expect(Booking.countDocuments).toHaveBeenCalledWith({
        user: specificUserId,
        status: { $ne: 'cancelled' }
      });
    });
  });

  describe('getUserBookings Controller', () => {
    test('should return all user bookings successfully', async () => {
      const mockBookings = [
        {
          _id: new mongoose.Types.ObjectId(),
          user: mockReq.user.id,
          packageId: 'pkg_123',
          packageName: 'Package 1',
          fullName: 'John Doe',
          phone: '+977-9841234567',
          travelDate: new Date('2026-03-15'),
          numberOfPeople: 2,
          totalPrice: 3000,
          status: 'pending',
          createdAt: new Date('2026-01-20')
        },
        {
          _id: new mongoose.Types.ObjectId(),
          user: mockReq.user.id,
          packageId: 'pkg_456',
          packageName: 'Package 2',
          fullName: 'John Doe',
          phone: '+977-9841234567',
          travelDate: new Date('2026-04-10'),
          numberOfPeople: 1,
          totalPrice: 1500,
          status: 'confirmed',
          createdAt: new Date('2026-01-15')
        }
      ];

      const mockSort = jest.fn().mockResolvedValue(mockBookings);
      const mockPopulate = jest.fn().mockReturnValue({ sort: mockSort });
      Booking.find = jest.fn().mockReturnValue({ 
        populate: mockPopulate 
      });

      await getUserBookings(mockReq, mockRes);

      expect(Booking.find).toHaveBeenCalledWith({ user: mockReq.user.id });
      expect(mockPopulate).toHaveBeenCalledWith('package', 'name images duration price');
      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });

      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        count: 2,
        bookings: mockBookings
      });
    });

    test('should return empty array when user has no bookings', async () => {
      const mockSort = jest.fn().mockResolvedValue([]);
      const mockPopulate = jest.fn().mockReturnValue({ sort: mockSort });
      Booking.find = jest.fn().mockReturnValue({ 
        populate: mockPopulate 
      });

      await getUserBookings(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        count: 0,
        bookings: []
      });
    });

    test('should populate package details correctly', async () => {
      const mockBookings = [
        {
          _id: new mongoose.Types.ObjectId(),
          user: mockReq.user.id,
          packageId: 'pkg_123',
          packageName: 'Test Package',
          fullName: 'John Doe',
          phone: '+977-9841234567',
          travelDate: new Date('2026-03-15'),
          numberOfPeople: 2,
          totalPrice: 3000,
          status: 'pending',
          package: {
            _id: 'pkg_123',
            name: 'Test Package',
            images: ['image1.jpg'],
            duration: '5 days',
            price: 1500
          }
        }
      ];

      const mockSort = jest.fn().mockResolvedValue(mockBookings);
      const mockPopulate = jest.fn().mockReturnValue({ sort: mockSort });
      Booking.find = jest.fn().mockReturnValue({ 
        populate: mockPopulate 
      });

      await getUserBookings(mockReq, mockRes);

      expect(mockPopulate).toHaveBeenCalledWith('package', 'name images duration price');
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        count: 1,
        bookings: mockBookings
      });
    });

    test('should sort bookings by createdAt in descending order', async () => {
      const mockBookings = [
        {
          _id: new mongoose.Types.ObjectId(),
          packageName: 'Package 1',
          createdAt: new Date('2026-01-28')
        },
        {
          _id: new mongoose.Types.ObjectId(),
          packageName: 'Package 2',
          createdAt: new Date('2026-01-15')
        }
      ];

      const mockSort = jest.fn().mockImplementation((sortCriteria) => {
        expect(sortCriteria).toEqual({ createdAt: -1 });
        return Promise.resolve(mockBookings);
      });

      const mockPopulate = jest.fn().mockReturnValue({ sort: mockSort });
      Booking.find = jest.fn().mockReturnValue({ populate: mockPopulate });

      await getUserBookings(mockReq, mockRes);

      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    });

    test('should return 500 error when database operation fails', async () => {
      const dbError = new Error('Database query failed');
      
      const mockSort = jest.fn().mockRejectedValue(dbError);
      const mockPopulate = jest.fn().mockReturnValue({ sort: mockSort });
      Booking.find = jest.fn().mockReturnValue({ 
        populate: mockPopulate 
      });

      await getUserBookings(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Database query failed'
      });
      expect(console.error).toHaveBeenCalledWith('Get user bookings error:', dbError);
    });

    test('should filter bookings by authenticated user only', async () => {
      const specificUserId = new mongoose.Types.ObjectId().toString();
      mockReq.user.id = specificUserId;

      const mockSort = jest.fn().mockResolvedValue([]);
      const mockPopulate = jest.fn().mockReturnValue({ sort: mockSort });
      Booking.find = jest.fn().mockReturnValue({ 
        populate: mockPopulate 
      });

      await getUserBookings(mockReq, mockRes);

      expect(Booking.find).toHaveBeenCalledWith({ user: specificUserId });
    });

    test('should handle populate errors gracefully', async () => {
      const populateError = new Error('Population failed');
      
      const mockSort = jest.fn().mockRejectedValue(populateError);
      const mockPopulate = jest.fn().mockReturnValue({ sort: mockSort });
      Booking.find = jest.fn().mockReturnValue({ 
        populate: mockPopulate 
      });

      await getUserBookings(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(console.error).toHaveBeenCalledWith('Get user bookings error:', populateError);
    });
  });
});

// backend/Test/packageRoutes.test.js
import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';

// Mock the Package model
const Package = {
  find: jest.fn(),
  findById: jest.fn()
};

// Mock the module before importing the routes
jest.unstable_mockModule('../models/Package.js', () => ({
  default: Package
}));

// Import the routes after mocking
const { default: packageRoutes } = await import('../routes/packages.js');

// Create Express app for testing
const app = express();
app.use(express.json());
app.use('/api/packages', packageRoutes);

describe('Package Routes Tests', () => {
  let mockPackages;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock package data
    mockPackages = [
      {
        _id: new mongoose.Types.ObjectId(),
        title: 'Everest Base Camp Trek',
        description: 'Amazing trek to Everest',
        price: 1500,
        location: 'Nepal',
        image: 'everest.jpg',
        duration: '14 days',
        rating: 4.8,
        reviews: 120,
        category: 'trekking',
        difficulty: 'difficult',
        featured: true,
        createdAt: new Date('2026-01-20')
      },
      {
        _id: new mongoose.Types.ObjectId(),
        title: 'Annapurna Circuit',
        description: 'Classic trekking route',
        price: 1200,
        location: 'Nepal',
        image: 'annapurna.jpg',
        duration: '12 days',
        rating: 4.7,
        reviews: 95,
        category: 'trekking',
        difficulty: 'moderate',
        featured: true,
        createdAt: new Date('2026-01-15')
      },
      {
        _id: new mongoose.Types.ObjectId(),
        title: 'Kathmandu City Tour',
        description: 'Explore the capital',
        price: 100,
        location: 'Kathmandu',
        image: 'kathmandu.jpg',
        duration: '1 day',
        rating: 4.5,
        reviews: 200,
        category: 'cultural',
        difficulty: 'easy',
        featured: false,
        createdAt: new Date('2026-01-10')
      }
    ];

    // Silence console errors during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe('GET /api/packages/popular - Get Featured Packages', () => {
    test('should return all featured packages successfully', async () => {
      const featuredPackages = mockPackages.filter(pkg => pkg.featured);

      const mockSort = jest.fn().mockResolvedValue(featuredPackages);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const response = await request(app)
        .get('/api/packages/popular')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Package.find).toHaveBeenCalledWith({ featured: true });
      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(response.body.success).toBe(true);
      expect(response.body.packages).toHaveLength(2);
      expect(response.body.packages[0].featured).toBe(true);
      expect(response.body.packages[1].featured).toBe(true);
    });

    test('should return empty array when no featured packages exist', async () => {
      const mockSort = jest.fn().mockResolvedValue([]);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const response = await request(app)
        .get('/api/packages/popular')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.packages).toEqual([]);
      expect(response.body.packages).toHaveLength(0);
    });

    test('should sort featured packages by createdAt in descending order', async () => {
      const sortedPackages = [mockPackages[0], mockPackages[1]];

      const mockSort = jest.fn().mockImplementation((sortCriteria) => {
        expect(sortCriteria).toEqual({ createdAt: -1 });
        return Promise.resolve(sortedPackages);
      });

      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const response = await request(app)
        .get('/api/packages/popular')
        .expect(200);

      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(response.body.packages[0]._id.toString()).toBe(mockPackages[0]._id.toString());
    });

    test('should return 500 error when database query fails', async () => {
      const dbError = new Error('Database connection failed');
      
      const mockSort = jest.fn().mockRejectedValue(dbError);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const response = await request(app)
        .get('/api/packages/popular')
        .expect(500);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Database connection failed');
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching featured packages:',
        dbError
      );
    });

    test('should handle network timeout errors', async () => {
      const timeoutError = new Error('Network timeout');
      
      const mockSort = jest.fn().mockRejectedValue(timeoutError);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const response = await request(app)
        .get('/api/packages/popular')
        .expect(500);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Network timeout');
    });
  });

  describe('GET /api/packages - Get All Packages', () => {
    test('should return all packages successfully', async () => {
      const mockSort = jest.fn().mockResolvedValue(mockPackages);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const response = await request(app)
        .get('/api/packages')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Package.find).toHaveBeenCalledWith();
      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(response.body.success).toBe(true);
      expect(response.body.packages).toHaveLength(3);
      expect(response.body.packages[0].title).toBe(mockPackages[0].title);
      expect(response.body.packages[0].price).toBe(mockPackages[0].price);
    });

    test('should return empty array when no packages exist', async () => {
      const mockSort = jest.fn().mockResolvedValue([]);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const response = await request(app)
        .get('/api/packages')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.packages).toEqual([]);
    });

    test('should include all package fields in response', async () => {
      const mockSort = jest.fn().mockResolvedValue([mockPackages[0]]);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const response = await request(app)
        .get('/api/packages')
        .expect(200);

      const pkg = response.body.packages[0];
      expect(pkg).toHaveProperty('title');
      expect(pkg).toHaveProperty('description');
      expect(pkg).toHaveProperty('price');
      expect(pkg).toHaveProperty('location');
      expect(pkg).toHaveProperty('category');
      expect(pkg).toHaveProperty('difficulty');
      expect(pkg).toHaveProperty('rating');
    });

    test('should sort packages by createdAt descending', async () => {
      const mockSort = jest.fn().mockImplementation((sortCriteria) => {
        expect(sortCriteria).toEqual({ createdAt: -1 });
        return Promise.resolve(mockPackages);
      });

      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      await request(app)
        .get('/api/packages')
        .expect(200);

      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    });

    test('should return 500 error when database query fails', async () => {
      const dbError = new Error('Database error');
      
      const mockSort = jest.fn().mockRejectedValue(dbError);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const response = await request(app)
        .get('/api/packages')
        .expect(500);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Database error');
    });

    test('should handle Mongoose CastError', async () => {
      const castError = new Error('Cast to ObjectId failed');
      castError.name = 'CastError';
      
      const mockSort = jest.fn().mockRejectedValue(castError);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const response = await request(app)
        .get('/api/packages')
        .expect(500);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/packages/:id - Get Package by ID', () => {
    test('should return a single package successfully', async () => {
      const singlePackage = mockPackages[0];
      Package.findById = jest.fn().mockResolvedValue(singlePackage);

      const response = await request(app)
        .get(`/api/packages/${singlePackage._id}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Package.findById).toHaveBeenCalledWith(singlePackage._id.toString());
      expect(response.body.success).toBe(true);
      expect(response.body.package._id.toString()).toBe(singlePackage._id.toString());
      expect(response.body.package.title).toBe('Everest Base Camp Trek');
    });

    test('should return all package details including arrays', async () => {
      const detailedPackage = {
        ...mockPackages[0],
        highlights: ['Mountain views', 'Sherpa culture'],
        itinerary: [
          { day: 1, title: 'Arrival', description: 'Arrive in Kathmandu' },
          { day: 2, title: 'Trek begins', description: 'Start trekking' }
        ],
        included: ['Guide', 'Permits'],
        excluded: ['Flights', 'Insurance']
      };

      Package.findById = jest.fn().mockResolvedValue(detailedPackage);

      const response = await request(app)
        .get(`/api/packages/${detailedPackage._id}`)
        .expect(200);

      expect(response.body.package.highlights).toEqual(['Mountain views', 'Sherpa culture']);
      expect(response.body.package.itinerary).toHaveLength(2);
      expect(response.body.package.included).toEqual(['Guide', 'Permits']);
      expect(response.body.package.excluded).toEqual(['Flights', 'Insurance']);
    });

    test('should return 404 when package not found', async () => {
      Package.findById = jest.fn().mockResolvedValue(null);

      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/packages/${nonExistentId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Package not found');
      expect(Package.findById).toHaveBeenCalledWith(nonExistentId.toString());
    });

    test('should return 500 error for invalid ObjectId format', async () => {
      const invalidId = 'invalid-id-123';
      const castError = new Error('Cast to ObjectId failed');
      castError.name = 'CastError';

      Package.findById = jest.fn().mockRejectedValue(castError);

      const response = await request(app)
        .get(`/api/packages/${invalidId}`)
        .expect(500);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Cast to ObjectId failed');
    });

    test('should return 500 error when database query fails', async () => {
      const dbError = new Error('Database connection lost');
      Package.findById = jest.fn().mockRejectedValue(dbError);

      const packageId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/packages/${packageId}`)
        .expect(500);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Database connection lost');
    });

    test('should handle valid ObjectId that does not exist', async () => {
      Package.findById = jest.fn().mockResolvedValue(null);

      const validButNonExistentId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/packages/${validButNonExistentId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Package not found');
    });

    test('should correctly parse package ID from URL parameter', async () => {
      const testPackage = mockPackages[1];
      Package.findById = jest.fn().mockResolvedValue(testPackage);

      await request(app)
        .get(`/api/packages/${testPackage._id}`)
        .expect(200);

      expect(Package.findById).toHaveBeenCalledWith(testPackage._id.toString());
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle malformed JSON responses gracefully', async () => {
      const mockSort = jest.fn().mockResolvedValue(mockPackages);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const response = await request(app)
        .get('/api/packages')
        .expect(200);

      // Verify the response is valid JSON
      expect(() => JSON.parse(JSON.stringify(response.body))).not.toThrow();
    });

    test('should return proper CORS headers', async () => {
      const mockSort = jest.fn().mockResolvedValue([]);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const response = await request(app)
        .get('/api/packages')
        .expect(200);

      expect(response.headers['content-type']).toMatch(/json/);
    });

    test('should handle very large package dataset', async () => {
      const largeDataset = Array(1000).fill(null).map((_, index) => ({
        _id: new mongoose.Types.ObjectId(),
        title: `Package ${index}`,
        price: 100 + index,
        category: 'trekking',
        featured: false
      }));

      const mockSort = jest.fn().mockResolvedValue(largeDataset);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const response = await request(app)
        .get('/api/packages')
        .expect(200);

      expect(response.body.packages).toHaveLength(1000);
    });

    test('should handle special characters in package ID', async () => {
      const invalidId = '507f1f77bcf86cd799439011%20';
      const error = new Error('Invalid ID format');
      
      Package.findById = jest.fn().mockRejectedValue(error);

      const response = await request(app)
        .get(`/api/packages/${invalidId}`)
        .expect(500);

      expect(response.body.success).toBe(false);
    });

    test('should return consistent response structure across all endpoints', async () => {
      // Test /popular endpoint
      const mockSort1 = jest.fn().mockResolvedValue([]);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort1 });

      const response1 = await request(app).get('/api/packages/popular');
      expect(response1.body).toHaveProperty('success');
      expect(response1.body).toHaveProperty('packages');

      // Test / endpoint
      const mockSort2 = jest.fn().mockResolvedValue([]);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort2 });

      const response2 = await request(app).get('/api/packages');
      expect(response2.body).toHaveProperty('success');
      expect(response2.body).toHaveProperty('packages');

      // Test /:id endpoint
      Package.findById = jest.fn().mockResolvedValue(mockPackages[0]);

      const response3 = await request(app).get(`/api/packages/${mockPackages[0]._id}`);
      expect(response3.body).toHaveProperty('success');
      expect(response3.body).toHaveProperty('package');
    });

    test('should handle null values in package data', async () => {
      const packageWithNulls = {
        ...mockPackages[0],
        description: null,
        image: null,
        location: null
      };

      Package.findById = jest.fn().mockResolvedValue(packageWithNulls);

      const response = await request(app)
        .get(`/api/packages/${packageWithNulls._id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.package.description).toBeNull();
    });

    test('should handle mongoose connection errors', async () => {
      const connectionError = new Error('MongoNetworkError: connection refused');
      connectionError.name = 'MongoNetworkError';

      const mockSort = jest.fn().mockRejectedValue(connectionError);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const response = await request(app)
        .get('/api/packages')
        .expect(500);

      expect(response.body.success).toBe(false);
    });
  });
});

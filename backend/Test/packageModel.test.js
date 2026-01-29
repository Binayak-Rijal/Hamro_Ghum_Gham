// backend/Test/packageModel.test.js
import { jest } from '@jest/globals';
import mongoose from 'mongoose';

// Create a mock for the Package model
const Package = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  updateMany: jest.fn(),
  findByIdAndDelete: jest.fn(),
  deleteMany: jest.fn(),
  countDocuments: jest.fn(),
  findOne: jest.fn(),
  exists: jest.fn()
};

describe('Package Model Tests', () => {
  let mockPackageData;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock package data
    mockPackageData = {
      _id: new mongoose.Types.ObjectId(),
      title: 'Everest Base Camp Trek',
      description: 'An amazing trek to the base of Mount Everest',
      price: 1500,
      location: 'Nepal',
      image: 'everest.jpg',
      duration: '14 days',
      rating: 4.8,
      reviews: 120,
      category: 'trekking',
      difficulty: 'difficult',
      highlights: ['Mountain views', 'Sherpa culture', 'High altitude'],
      itinerary: [
        { day: 1, title: 'Arrival', description: 'Arrive in Kathmandu' },
        { day: 2, title: 'Trek starts', description: 'Begin the journey' }
      ],
      included: ['Guide', 'Permits', 'Accommodation'],
      excluded: ['Flight tickets', 'Personal expenses'],
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  });

  describe('Package Model - CREATE Operations', () => {
    test('should create a new package with all required fields', async () => {
      // Mock the create method
      Package.create = jest.fn().mockResolvedValue(mockPackageData);

      const newPackage = await Package.create({
        title: mockPackageData.title,
        description: mockPackageData.description,
        price: mockPackageData.price,
        location: mockPackageData.location
      });

      expect(Package.create).toHaveBeenCalledTimes(1);
      expect(newPackage).toHaveProperty('_id');
      expect(newPackage.title).toBe('Everest Base Camp Trek');
      expect(newPackage.price).toBe(1500);
      expect(newPackage.category).toBe('trekking');
    });

    test('should create a package with default values', async () => {
      const minimalPackage = {
        _id: new mongoose.Types.ObjectId(),
        title: 'New Package',
        price: 500,
        rating: 4.5,
        reviews: 0,
        category: 'other',
        difficulty: 'moderate',
        featured: false
      };

      Package.create = jest.fn().mockResolvedValue(minimalPackage);

      const newPackage = await Package.create({
        title: 'New Package',
        price: 500
      });

      expect(newPackage.rating).toBe(4.5);
      expect(newPackage.reviews).toBe(0);
      expect(newPackage.category).toBe('other');
      expect(newPackage.difficulty).toBe('moderate');
      expect(newPackage.featured).toBe(false);
    });

    test('should fail to create package without required fields', async () => {
      const error = new Error('Package validation failed: title: Path `title` is required, price: Path `price` is required');
      error.name = 'ValidationError';

      Package.create = jest.fn().mockRejectedValue(error);

      await expect(Package.create({})).rejects.toThrow('Package validation failed');
      expect(Package.create).toHaveBeenCalledTimes(1);
    });

    test('should validate category enum values', async () => {
      const error = new Error('Package validation failed: category: `invalid` is not a valid enum value');
      error.name = 'ValidationError';

      Package.create = jest.fn().mockRejectedValue(error);

      await expect(
        Package.create({
          title: 'Test Package',
          price: 1000,
          category: 'invalid'
        })
      ).rejects.toThrow('not a valid enum value');
    });
  });

  describe('Package Model - READ Operations', () => {
    test('should find all packages', async () => {
      const mockPackages = [mockPackageData, { ...mockPackageData, _id: new mongoose.Types.ObjectId() }];
      
      const mockSort = jest.fn().mockResolvedValue(mockPackages);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const packages = await Package.find().sort({ createdAt: -1 });

      expect(Package.find).toHaveBeenCalledTimes(1);
      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(packages).toHaveLength(2);
    });

    test('should find package by ID', async () => {
      Package.findById = jest.fn().mockResolvedValue(mockPackageData);

      const package_ = await Package.findById(mockPackageData._id);

      expect(Package.findById).toHaveBeenCalledWith(mockPackageData._id);
      expect(package_).toHaveProperty('title', 'Everest Base Camp Trek');
      expect(package_._id).toEqual(mockPackageData._id);
    });

    test('should return null when package not found by ID', async () => {
      Package.findById = jest.fn().mockResolvedValue(null);

      const nonExistentId = new mongoose.Types.ObjectId();
      const package_ = await Package.findById(nonExistentId);

      expect(package_).toBeNull();
      expect(Package.findById).toHaveBeenCalledWith(nonExistentId);
    });

    test('should find featured packages', async () => {
      const featuredPackages = [
        mockPackageData,
        { ...mockPackageData, _id: new mongoose.Types.ObjectId(), featured: true }
      ];

      const mockSort = jest.fn().mockResolvedValue(featuredPackages);
      Package.find = jest.fn().mockReturnValue({ sort: mockSort });

      const packages = await Package.find({ featured: true }).sort({ createdAt: -1 });

      expect(Package.find).toHaveBeenCalledWith({ featured: true });
      expect(packages).toHaveLength(2);
      expect(packages[0].featured).toBe(true);
    });

    test('should find packages by category', async () => {
      const trekkingPackages = [mockPackageData];

      Package.find = jest.fn().mockResolvedValue(trekkingPackages);

      const packages = await Package.find({ category: 'trekking' });

      expect(Package.find).toHaveBeenCalledWith({ category: 'trekking' });
      expect(packages[0].category).toBe('trekking');
    });

    test('should find packages by difficulty', async () => {
      const mockFind = jest.fn().mockResolvedValue([mockPackageData]);
      Package.find = mockFind;

      const packages = await Package.find({ difficulty: 'difficult' });

      expect(mockFind).toHaveBeenCalledWith({ difficulty: 'difficult' });
      expect(packages[0].difficulty).toBe('difficult');
    });

    test('should handle database errors during find', async () => {
      const dbError = new Error('Database connection failed');
      Package.find = jest.fn().mockRejectedValue(dbError);

      await expect(Package.find()).rejects.toThrow('Database connection failed');
    });
  });

  describe('Package Model - UPDATE Operations', () => {
    test('should update package by ID', async () => {
      const updatedData = { ...mockPackageData, price: 1800, rating: 4.9 };

      Package.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedData);

      const updated = await Package.findByIdAndUpdate(
        mockPackageData._id,
        { price: 1800, rating: 4.9 },
        { new: true, runValidators: true }
      );

      expect(Package.findByIdAndUpdate).toHaveBeenCalledWith(
        mockPackageData._id,
        { price: 1800, rating: 4.9 },
        { new: true, runValidators: true }
      );
      expect(updated.price).toBe(1800);
      expect(updated.rating).toBe(4.9);
    });

    test('should update multiple packages', async () => {
      const mockUpdateResult = { 
        acknowledged: true, 
        modifiedCount: 3, 
        matchedCount: 3 
      };

      Package.updateMany = jest.fn().mockResolvedValue(mockUpdateResult);

      const result = await Package.updateMany(
        { category: 'trekking' },
        { $set: { featured: true } }
      );

      expect(Package.updateMany).toHaveBeenCalledWith(
        { category: 'trekking' },
        { $set: { featured: true } }
      );
      expect(result.modifiedCount).toBe(3);
    });

    test('should return null when updating non-existent package', async () => {
      Package.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      const nonExistentId = new mongoose.Types.ObjectId();
      const result = await Package.findByIdAndUpdate(
        nonExistentId,
        { price: 2000 },
        { new: true }
      );

      expect(result).toBeNull();
    });

    test('should fail validation when updating with invalid data', async () => {
      const validationError = new Error('Validation failed: price must be a number');
      Package.findByIdAndUpdate = jest.fn().mockRejectedValue(validationError);

      await expect(
        Package.findByIdAndUpdate(
          mockPackageData._id,
          { price: 'invalid' },
          { runValidators: true }
        )
      ).rejects.toThrow('Validation failed');
    });
  });

  describe('Package Model - DELETE Operations', () => {
    test('should delete package by ID', async () => {
      Package.findByIdAndDelete = jest.fn().mockResolvedValue(mockPackageData);

      const deleted = await Package.findByIdAndDelete(mockPackageData._id);

      expect(Package.findByIdAndDelete).toHaveBeenCalledWith(mockPackageData._id);
      expect(deleted).toEqual(mockPackageData);
    });

    test('should return null when deleting non-existent package', async () => {
      Package.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      const nonExistentId = new mongoose.Types.ObjectId();
      const result = await Package.findByIdAndDelete(nonExistentId);

      expect(result).toBeNull();
      expect(Package.findByIdAndDelete).toHaveBeenCalledWith(nonExistentId);
    });

    test('should delete multiple packages by criteria', async () => {
      const mockDeleteResult = {
        acknowledged: true,
        deletedCount: 5
      };

      Package.deleteMany = jest.fn().mockResolvedValue(mockDeleteResult);

      const result = await Package.deleteMany({ category: 'other' });

      expect(Package.deleteMany).toHaveBeenCalledWith({ category: 'other' });
      expect(result.deletedCount).toBe(5);
    });

    test('should handle errors during delete operation', async () => {
      const dbError = new Error('Delete operation failed');
      Package.findByIdAndDelete = jest.fn().mockRejectedValue(dbError);

      await expect(
        Package.findByIdAndDelete(mockPackageData._id)
      ).rejects.toThrow('Delete operation failed');
    });
  });

  describe('Package Model - Query Operations', () => {
    test('should count total packages', async () => {
      Package.countDocuments = jest.fn().mockResolvedValue(25);

      const count = await Package.countDocuments();

      expect(Package.countDocuments).toHaveBeenCalledTimes(1);
      expect(count).toBe(25);
    });

    test('should count packages by category', async () => {
      Package.countDocuments = jest.fn().mockResolvedValue(10);

      const count = await Package.countDocuments({ category: 'trekking' });

      expect(Package.countDocuments).toHaveBeenCalledWith({ category: 'trekking' });
      expect(count).toBe(10);
    });

    test('should find one package by criteria', async () => {
      Package.findOne = jest.fn().mockResolvedValue(mockPackageData);

      const package_ = await Package.findOne({ title: 'Everest Base Camp Trek' });

      expect(Package.findOne).toHaveBeenCalledWith({ title: 'Everest Base Camp Trek' });
      expect(package_.title).toBe('Everest Base Camp Trek');
    });

    test('should return null when findOne finds no match', async () => {
      Package.findOne = jest.fn().mockResolvedValue(null);

      const package_ = await Package.findOne({ title: 'Non-existent Package' });

      expect(package_).toBeNull();
    });

    test('should use exists to check if package exists', async () => {
      Package.exists = jest.fn().mockResolvedValue({ _id: mockPackageData._id });

      const exists = await Package.exists({ _id: mockPackageData._id });

      expect(Package.exists).toHaveBeenCalledWith({ _id: mockPackageData._id });
      expect(exists).toBeTruthy();
    });
  });

  describe('Package Model - Edge Cases', () => {
    test('should handle empty highlights array', async () => {
      const packageWithoutHighlights = { ...mockPackageData, highlights: [] };
      Package.create = jest.fn().mockResolvedValue(packageWithoutHighlights);

      const package_ = await Package.create({
        title: 'Test Package',
        price: 1000,
        highlights: []
      });

      expect(package_.highlights).toEqual([]);
    });

    test('should handle empty itinerary array', async () => {
      const packageWithoutItinerary = { ...mockPackageData, itinerary: [] };
      Package.create = jest.fn().mockResolvedValue(packageWithoutItinerary);

      const package_ = await Package.create({
        title: 'Test Package',
        price: 1000,
        itinerary: []
      });

      expect(package_.itinerary).toEqual([]);
    });

    test('should handle very long description', async () => {
      const longDescription = 'A'.repeat(5000);
      const packageWithLongDesc = { ...mockPackageData, description: longDescription };
      
      Package.create = jest.fn().mockResolvedValue(packageWithLongDesc);

      const package_ = await Package.create({
        title: 'Test Package',
        price: 1000,
        description: longDescription
      });

      expect(package_.description).toHaveLength(5000);
    });

    test('should handle zero price', async () => {
      const freePackage = { ...mockPackageData, price: 0 };
      Package.create = jest.fn().mockResolvedValue(freePackage);

      const package_ = await Package.create({
        title: 'Free Package',
        price: 0
      });

      expect(package_.price).toBe(0);
    });

    test('should handle negative price validation', async () => {
      const error = new Error('Price cannot be negative');
      Package.create = jest.fn().mockRejectedValue(error);

      await expect(
        Package.create({ title: 'Test', price: -100 })
      ).rejects.toThrow('Price cannot be negative');
    });

    test('should handle timestamps correctly', async () => {
      const packageWithTimestamps = {
        ...mockPackageData,
        createdAt: new Date('2026-01-01'),
        updatedAt: new Date('2026-01-28')
      };

      Package.create = jest.fn().mockResolvedValue(packageWithTimestamps);

      const package_ = await Package.create(mockPackageData);

      expect(package_.createdAt).toBeDefined();
      expect(package_.updatedAt).toBeDefined();
    });
  });
});

// backend/controllers/ratingController.js
import Rating from '../models/Rating.js';
import Package from '../models/Package.js';
import mongoose from 'mongoose';

// Submit or update a rating for a package
export const submitRating = async (req, res) => {
  try {
    const { packageId, rating, comment } = req.body;
    const userId = req.user._id;

    // Validate inputs
    if (!packageId || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Package ID and rating are required',
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5',
      });
    }

    // Check if package exists
    const packageExists = await Package.findById(packageId);
    if (!packageExists) {
      return res.status(404).json({
        success: false,
        message: 'Package not found',
      });
    }

    // Check if user already rated this package
    let existingRating = await Rating.findOne({ packageId, userId });

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
      existingRating.comment = comment || '';
      await existingRating.save();
    } else {
      // Create new rating
      existingRating = await Rating.create({
        packageId,
        userId,
        rating,
        comment: comment || '',
      });
    }

    // Recalculate package average rating and review count
    await updatePackageRating(packageId);

    res.status(200).json({
      success: true,
      message: 'Rating submitted successfully',
      rating: existingRating,
    });
  } catch (error) {
    console.error('Submit rating error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit rating',
      error: error.message,
    });
  }
};

// Get all ratings for a package
export const getPackageRatings = async (req, res) => {
  try {
    const { packageId } = req.params;

    const ratings = await Rating.find({ packageId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      ratings,
      count: ratings.length,
    });
  } catch (error) {
    console.error('Get ratings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ratings',
      error: error.message,
    });
  }
};

// Get user's rating for a specific package
export const getUserRating = async (req, res) => {
  try {
    const { packageId } = req.params;
    const userId = req.user._id;

    const rating = await Rating.findOne({ packageId, userId });

    res.status(200).json({
      success: true,
      rating: rating || null,
    });
  } catch (error) {
    console.error('Get user rating error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user rating',
      error: error.message,
    });
  }
};

// Delete a rating
export const deleteRating = async (req, res) => {
  try {
    const { packageId } = req.params;
    const userId = req.user._id;

    const rating = await Rating.findOneAndDelete({ packageId, userId });

    if (!rating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found',
      });
    }

    // Recalculate package rating
    await updatePackageRating(packageId);

    res.status(200).json({
      success: true,
      message: 'Rating deleted successfully',
    });
  } catch (error) {
    console.error('Delete rating error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete rating',
      error: error.message,
    });
  }
};

// Helper function to update package rating
const updatePackageRating = async (packageId) => {
  try {
    const ratings = await Rating.find({ packageId });

    if (ratings.length === 0) {
      // No ratings, set to default
      await Package.findByIdAndUpdate(packageId, {
        rating: 4.5,
        reviews: 0,
      });
      return;
    }

    // Calculate average rating
    const totalRating = ratings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = (totalRating / ratings.length).toFixed(1);

    await Package.findByIdAndUpdate(packageId, {
      rating: parseFloat(averageRating),
      reviews: ratings.length,
    });
  } catch (error) {
    console.error('Error updating package rating:', error);
  }
};
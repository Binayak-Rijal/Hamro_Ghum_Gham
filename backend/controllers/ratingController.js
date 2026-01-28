import Rating from '../models/Rating.js';

// Rate a package
export const ratePackage = async (req, res) => {
  try {
    const { packageId, rating, comment } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!packageId || !rating) {
      return res.status(400).json({ message: 'Package ID and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if user already rated this package
    const existingRating = await Rating.findOne({
      userId,
      packageId,
      type: 'package',
    });

    let result;
    if (existingRating) {
      // Update existing rating
      result = await Rating.findByIdAndUpdate(
        existingRating._id,
        {
          rating,
          comment: comment || '',
        },
        { new: true }
      );
      return res.status(200).json({
        message: 'Rating updated successfully',
        rating: result,
      });
    }

    // Create new rating
    const newRating = new Rating({
      userId,
      packageId,
      rating,
      comment: comment || '',
      type: 'package',
    });

    result = await newRating.save();
    res.status(201).json({
      message: 'Rating submitted successfully',
      rating: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Rate a destination
export const rateDestination = async (req, res) => {
  try {
    const { destinationId, rating, comment } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!destinationId || !rating) {
      return res.status(400).json({ message: 'Destination ID and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if user already rated this destination
    const existingRating = await Rating.findOne({
      userId,
      destinationId,
      type: 'destination',
    });

    let result;
    if (existingRating) {
      // Update existing rating
      result = await Rating.findByIdAndUpdate(
        existingRating._id,
        {
          rating,
          comment: comment || '',
        },
        { new: true }
      );
      return res.status(200).json({
        message: 'Rating updated successfully',
        rating: result,
      });
    }

    // Create new rating
    const newRating = new Rating({
      userId,
      destinationId,
      rating,
      comment: comment || '',
      type: 'destination',
    });

    result = await newRating.save();
    res.status(201).json({
      message: 'Rating submitted successfully',
      rating: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ratings for a package
export const getPackageRatings = async (req, res) => {
  try {
    const { packageId } = req.params;

    const ratings = await Rating.find({
      packageId,
      type: 'package',
    })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    // Calculate average rating
    const averageRating =
      ratings.length > 0
        ? (
            ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
          ).toFixed(1)
        : 0;

    res.status(200).json({
      averageRating,
      totalRatings: ratings.length,
      ratings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ratings for a destination
export const getDestinationRatings = async (req, res) => {
  try {
    const { destinationId } = req.params;

    const ratings = await Rating.find({
      destinationId,
      type: 'destination',
    })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    // Calculate average rating
    const averageRating =
      ratings.length > 0
        ? (
            ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
          ).toFixed(1)
        : 0;

    res.status(200).json({
      averageRating,
      totalRatings: ratings.length,
      ratings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's rating for a package
export const getUserPackageRating = async (req, res) => {
  try {
    const { packageId } = req.params;
    const userId = req.user.id;

    const rating = await Rating.findOne({
      userId,
      packageId,
      type: 'package',
    });

    if (!rating) {
      return res.status(404).json({ message: 'No rating found' });
    }

    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's rating for a destination
export const getUserDestinationRating = async (req, res) => {
  try {
    const { destinationId } = req.params;
    const userId = req.user.id;

    const rating = await Rating.findOne({
      userId,
      destinationId,
      type: 'destination',
    });

    if (!rating) {
      return res.status(404).json({ message: 'No rating found' });
    }

    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a rating
export const deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    const userId = req.user.id;

    const rating = await Rating.findById(ratingId);

    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    // Check if user owns the rating
    if (rating.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Rating.findByIdAndDelete(ratingId);

    res.status(200).json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

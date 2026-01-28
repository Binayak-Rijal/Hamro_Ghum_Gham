// backend/routes/ratings.js
import express from 'express';
import auth from '../middleware/auth.js';
import {
  submitRating,
  getPackageRatings,
  getUserRating,
  deleteRating,
} from '../controllers/ratingController.js';

const router = express.Router();

// Submit or update rating (requires authentication)
router.post('/package', auth, submitRating);

// Get all ratings for a package (public)
router.get('/package/:packageId', getPackageRatings);

// Get user's rating for a package (requires authentication)
router.get('/package/:packageId/user', auth, getUserRating);

// Delete rating (requires authentication)
router.delete('/package/:packageId', auth, deleteRating);

export default router;
import express from 'express';
import auth from '../middleware/auth.js';
import {
  ratePackage,
  rateDestination,
  getPackageRatings,
  getDestinationRatings,
  getUserPackageRating,
  getUserDestinationRating,
  deleteRating,
} from '../controllers/ratingController.js';

const router = express.Router();

// Rate endpoints
router.post('/package', auth, ratePackage);
router.post('/destination', auth, rateDestination);

// Get ratings endpoints
router.get('/package/:packageId', getPackageRatings);
router.get('/destination/:destinationId', getDestinationRatings);

// Get user's rating endpoints
router.get('/user/package/:packageId', auth, getUserPackageRating);
router.get('/user/destination/:destinationId', auth, getUserDestinationRating);

// Delete rating endpoint
router.delete('/:ratingId', auth, deleteRating);

export default router;

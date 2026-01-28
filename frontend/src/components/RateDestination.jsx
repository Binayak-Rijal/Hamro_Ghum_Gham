// RateDestination component - Modal for users to rate and review destinations
/**
 * This component provides a user-friendly interface for rating destinations
 * Features include:
 * - Interactive 5-star rating system with hover effects
 * - Optional text review with character limit (500 chars)
 * - Form validation and error handling
 * - Loading states during submission
 * - Integration with backend ratings API
 */
import { useState } from 'react';
import './RateDestination.css';
//small adjustments made in RateDestination.css for better styling

/**
 * RateDestination Component
 * Modal component that allows authenticated users to rate and review a destination
 * 
 * @param {string} destinationId - ID of the destination being rated
 * @param {function} onClose - Callback function to close the modal
 * @param {function} onSuccess - Callback function triggered after successful submission
 */
const RateDestination = ({ destinationId, onClose, onSuccess }) => {
  // State for selected rating (1-5 stars)
  const [rating, setRating] = useState(0);
  // State for hover effect on stars (visual feedback)
  const [hoverRating, setHoverRating] = useState(0);
  // State for optional review comment
  const [comment, setComment] = useState('');
  // State for loading status during submission
  const [loading, setLoading] = useState(false);
  // State for error messages
  const [error, setError] = useState('');

  /**
   * Handles form submission to send rating to backend API
   * Validates rating selection and sends POST request with authentication
   */
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    
    // Validate that user has selected a rating
    // Rating must be between 1-5, 0 means no selection
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get authentication token from localStorage
      // Token is required to identify the user submitting the rating
      const token = localStorage.getItem('token');
      
      // Send rating data to backend API with authorization
      // POST request to /api/ratings/destination endpoint
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ratings/destination`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        // Send destination ID, rating (1-5), and optional comment
        body: JSON.stringify({
          destinationId,
          rating,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }

      // Call success and close callbacks after successful submission
      // Optional chaining (?.) prevents errors if callbacks are undefined
      onSuccess?.();
      onClose?.();
    } catch (err) {
      // Display error message to user if submission fails
      setError(err.message || 'Something went wrong');
    } finally {
      // Always reset loading state, regardless of success or failure
      setLoading(false);
    }
  };

  return (
    // Modal overlay for rating form
    <div className="rate-destination-modal">
      {/* Modal content container */}
      <div className="rate-destination-container">
        <h2>Rate This Destination</h2>
        {/* Rating submission form */}
        <form onSubmit={handleSubmit}>
          {/* Interactive 5-star rating system */}
          <div className="star-rating">
            {/* Map through 5 stars with hover and click interactions */}
            {/* Each star is a button to ensure keyboard accessibility */}
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                // Highlight stars based on hover or selected rating
                // Shows visual feedback: filled stars up to hover/selected position
                className={`star ${
                  (hoverRating || rating) >= star ? 'active' : ''
                }`}
                // Hover handlers provide real-time visual feedback
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                // Click handler sets the final rating value
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>

          {/* Display selected rating value */}
          <div className="rating-value">
            {rating > 0 && <span>{rating} out of 5 stars</span>}
          </div>

          {/* Optional comment textarea with character limit */}
          {/* maxLength enforces 500 character limit at input level */}
          <textarea
            placeholder="Tell us about your experience at this destination (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            maxLength="500"
          />

          {/* Character counter for comment field */}
          {/* Shows current length / max length to guide user */}
          <div className="char-count">{comment.length}/500</div>

          {/* Error message display */}
          {error && <div className="error-message">{error}</div>}

          {/* Form action buttons */}
          <div className="button-group">
            {/* Cancel button to close modal */}
            {/* type="button" prevents form submission */}
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            {/* Submit button with loading state */}
            {/* Disabled during submission to prevent duplicate requests */}
            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'Submitting...' : 'Submit Rating'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RateDestination;

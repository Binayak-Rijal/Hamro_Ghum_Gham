// RateDestination component - Modal for users to rate and review destinations
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
    e.preventDefault();
    
    // Validate that user has selected a rating
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get authentication token from localStorage
      const token = localStorage.getItem('token');
      // Send rating data to backend API with authorization
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ratings/destination`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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
      onSuccess?.();
      onClose?.();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
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
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                // Highlight stars based on hover or selected rating
                className={`star ${
                  (hoverRating || rating) >= star ? 'active' : ''
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
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
          <textarea
            placeholder="Tell us about your experience at this destination (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            maxLength="500"
          />

          {/* Character counter for comment field */}
          <div className="char-count">{comment.length}/500</div>

          {/* Error message display */}
          {error && <div className="error-message">{error}</div>}

          {/* Form action buttons */}
          <div className="button-group">
            {/* Cancel button to close modal */}
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            {/* Submit button with loading state */}
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

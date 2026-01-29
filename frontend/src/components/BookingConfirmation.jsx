// BookingConfirmation component - Success modal displayed after booking confirmation
/**
 * This component displays a success confirmation after a booking is completed
 * Features include:
 * - Animated success checkmark for visual feedback
 * - Comprehensive booking details display (destination, date, guests, etc.)
 * - Auto-generated unique booking reference number
 * - Contact information display for customer communication
 * - Modal overlay with click-outside-to-close functionality
 * - Responsive design for all screen sizes
 */

import React, { useState, useEffect } from 'react';
// Import icons for visual elements (check, close, calendar, etc.)
import { CheckCircle, X, Calendar, Users, MapPin, Clock, Mail, Phone } from 'lucide-react';
import './BookingConfirmation.css';

/**
 * BookingConfirmation Component
 * Modal popup that displays booking confirmation details and success message
 * 
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback to close the modal
 * @param {object} bookingDetails - Contains all booking information (destination, date, guests, etc.)
 */
export default function BookingConfirmation({ isOpen, onClose, bookingDetails }) {
  // State to store randomly generated booking reference number
  const [bookingReference, setBookingReference] = useState('');

  // Generate a unique booking reference when modal opens
  useEffect(() => {
    if (isOpen) {
      // Create random alphanumeric reference code (e.g., "A3F7G2K9P")
      // Math.random().toString(36) converts to base-36 (0-9, a-z)
      // substr(2, 9) removes "0." prefix and takes 9 characters
      // toUpperCase() converts to uppercase for professional appearance
      setBookingReference(Math.random().toString(36).substr(2, 9).toUpperCase());
    }
  }, [isOpen]);

  // Don't render modal if not open
  if (!isOpen) return null;

  return (
    // Overlay that closes modal when clicked
    // Full-screen semi-transparent background
    <div className="booking-popup-overlay" onClick={onClose}>
      {/* Modal container - stops propagation to prevent closing when clicking inside */}
      {/* e.stopPropagation() ensures clicks inside modal don't trigger overlay's onClick */}
      <div className="booking-popup-container" onClick={(e) => e.stopPropagation()}>
        {/* Close button in top corner */}
        <button className="booking-popup-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="booking-popup-content">
          {/* Success Icon with Animation */}
          <div className="booking-success-icon-wrapper">
            {/* Animated checkmark icon to indicate success */}
            <div className="booking-success-checkmark">
              <CheckCircle size={80} />
            </div>
          </div>

          {/* Success Message */}
          <h2 className="booking-popup-title">Booking Confirmed!</h2>
          <p className="booking-popup-subtitle">
            Thank you for your booking. We'll contact you shortly with more details.
          </p>

          {/* Booking Details */}
          <div className="booking-details-box">
            <h3 className="booking-details-title">Booking Details</h3>
            
            {/* Destination/Package name with map pin icon */}
            <div className="booking-detail-item">
              <MapPin size={20} />
              <div className="booking-detail-content">
                <span className="booking-detail-label">Destination</span>
                <span className="booking-detail-value">{bookingDetails.packageName || bookingDetails.destination}</span>
              </div>
            </div>

            {/* Booking date with calendar icon */}
            <div className="booking-detail-item">
              <Calendar size={20} />
              <div className="booking-detail-content">
                <span className="booking-detail-label">Date</span>
                <span className="booking-detail-value">{bookingDetails.date}</span>
              </div>
            </div>

            {/* Number of guests with users icon */}
            <div className="booking-detail-item">
              <Users size={20} />
              <div className="booking-detail-content">
                <span className="booking-detail-label">Guests</span>
                {/* Conditionally display singular or plural form */}
                <span className="booking-detail-value">
                  {bookingDetails.guests} {bookingDetails.guests === 1 ? 'Person' : 'People'}
                </span>
              </div>
            </div>

            {/* Optional: Display duration if provided */}
            {/* Conditional rendering - only shows if duration exists in bookingDetails */}
            {bookingDetails.duration && (
              <div className="booking-detail-item">
                <Clock size={20} />
                <div className="booking-detail-content">
                  <span className="booking-detail-label">Duration</span>
                  <span className="booking-detail-value">{bookingDetails.duration}</span>
                </div>
              </div>
            )}

            {/* Optional: Display total price if provided */}
            {/* Special styling for total price to emphasize cost */}
            {bookingDetails.total && (
              <div className="booking-detail-item booking-total-price">
                <div className="booking-detail-content">
                  <span className="booking-detail-label">Total Amount</span>
                  <span className="booking-detail-value booking-price">${bookingDetails.total}</span>
                </div>
              </div>
            )}
          </div>

          {/* Contact Info */}
          {/* Section showing where customer will be contacted */}
          <div className="booking-contact-info-box">
            <p className="booking-contact-title">We'll reach you at:</p>
            <div className="booking-contact-details">
              {/* Display email if provided */}
              {/* Conditional rendering - only shows available contact methods */}
              {bookingDetails.email && (
                <div className="booking-contact-item">
                  <Mail size={16} />
                  <span>{bookingDetails.email}</span>
                </div>
              )}
              {/* Display phone if provided */}
              {bookingDetails.phone && (
                <div className="booking-contact-item">
                  <Phone size={16} />
                  <span>{bookingDetails.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Confirmation Number */}
          {/* Display unique reference number for customer records */}
          {/* Customer can use this reference for inquiries or modifications */}
          <div className="booking-confirmation-number">
            <p>Booking Reference: <strong>#{bookingReference}</strong></p>
          </div>

          {/* Action Button */}
          {/* Primary action to close the confirmation modal */}
          <button className="booking-popup-button" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
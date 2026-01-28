

import React, { useState, useEffect } from 'react';
import { CheckCircle, X, Calendar, Users, MapPin, Clock, Mail, Phone } from 'lucide-react';
import './BookingConfirmation.css';

export default function BookingConfirmation({ isOpen, onClose, bookingDetails }) {
  const [bookingReference, setBookingReference] = useState('');

  useEffect(() => {
    if (isOpen) {
      setBookingReference(Math.random().toString(36).substr(2, 9).toUpperCase());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="booking-popup-overlay" onClick={onClose}>
      <div className="booking-popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="booking-popup-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="booking-popup-content">
          {/* Success Icon with Animation */}
          <div className="booking-success-icon-wrapper">
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
            
            <div className="booking-detail-item">
              <MapPin size={20} />
              <div className="booking-detail-content">
                <span className="booking-detail-label">Destination</span>
                <span className="booking-detail-value">{bookingDetails.packageName || bookingDetails.destination}</span>
              </div>
            </div>

            <div className="booking-detail-item">
              <Calendar size={20} />
              <div className="booking-detail-content">
                <span className="booking-detail-label">Date</span>
                <span className="booking-detail-value">{bookingDetails.date}</span>
              </div>
            </div>

            <div className="booking-detail-item">
              <Users size={20} />
              <div className="booking-detail-content">
                <span className="booking-detail-label">Guests</span>
                <span className="booking-detail-value">
                  {bookingDetails.guests} {bookingDetails.guests === 1 ? 'Person' : 'People'}
                </span>
              </div>
            </div>

            {bookingDetails.duration && (
              <div className="booking-detail-item">
                <Clock size={20} />
                <div className="booking-detail-content">
                  <span className="booking-detail-label">Duration</span>
                  <span className="booking-detail-value">{bookingDetails.duration}</span>
                </div>
              </div>
            )}

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
          <div className="booking-contact-info-box">
            <p className="booking-contact-title">We'll reach you at:</p>
            <div className="booking-contact-details">
              {bookingDetails.email && (
                <div className="booking-contact-item">
                  <Mail size={16} />
                  <span>{bookingDetails.email}</span>
                </div>
              )}
              {bookingDetails.phone && (
                <div className="booking-contact-item">
                  <Phone size={16} />
                  <span>{bookingDetails.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Confirmation Number */}
          <div className="booking-confirmation-number">
            <p>Booking Reference: <strong>#{bookingReference}</strong></p>
          </div>

          {/* Action Button */}
          <button className="booking-popup-button" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
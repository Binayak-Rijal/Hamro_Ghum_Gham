import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import './CompleteBooking.css';

const API_URL = 'http://localhost:5000/api';

const CompleteBooking = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const pendingBooking = localStorage.getItem('pendingBooking');
    if (pendingBooking) {
      setBookingData(JSON.parse(pendingBooking));
    } else {
      // No pending booking, redirect to home
      navigate('/home');
    }
  }, [navigate]);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const validateForm = () => {
    const newErrors = {};

    if (!cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!expirationDate.trim()) {
      newErrors.expirationDate = 'Expiration date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate)) {
      newErrors.expirationDate = 'Expiration date must be in MM/YY format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(value);
  };

  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpirationDate(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || !bookingData) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/bookings`,
        bookingData,
        { headers: getAuthHeader() }
      );

      if (response.data.success) {
        // Clear pending booking
        localStorage.removeItem('pendingBooking');
        toast.success('Booking completed successfully!');
        // Navigate to booking confirmation or bookings page
        navigate('/bookings');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="complete-booking-page">
      <Navbar />
      <div className="complete-booking-container">
        <div className="complete-booking-form-container">
          <h1 className="complete-booking-title">Complete Your Booking</h1>
          <p className="complete-booking-subtitle">
            Please enter your payment details to finalize the booking for {bookingData.packageName}.
          </p>

          <form onSubmit={handleSubmit} className="complete-booking-form">
            <div className="form-group">
              <label htmlFor="cardNumber" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                maxLength="19"
              />
              {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="expirationDate" className="form-label">
                Expiration Date
              </label>
              <input
                type="text"
                id="expirationDate"
                value={expirationDate}
                onChange={handleExpirationDateChange}
                placeholder="MM/YY"
                className={`form-input ${errors.expirationDate ? 'error' : ''}`}
                maxLength="5"
              />
              {errors.expirationDate && <span className="error-message">{errors.expirationDate}</span>}
            </div>

            <button
              type="submit"
              className="complete-booking-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Complete Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteBooking;
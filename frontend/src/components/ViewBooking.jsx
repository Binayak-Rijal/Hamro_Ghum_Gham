import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, Mail, Phone, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import ScrollToTop from './ScrollToTop';
import './ViewBooking.css';

// Helper function for auth headers
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function ViewBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'http://localhost:3000/api/bookings',
        { headers: getAuthHeader() }
      );

      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/bookings/${bookingId}/cancel`,
        {},
        { headers: getAuthHeader() }
      );

      if (response.data.success) {
        // Update local state
        setBookings(bookings.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status: 'cancelled' }
            : booking
        ));
        
        // Dispatch event to update navbar count
        window.dispatchEvent(new Event('bookingsChanged'));
        
        toast.success('Booking cancelled successfully');
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
      toast.error('Failed to cancel booking. Please try again.');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="booking-status-icon booking-status-icon--confirmed" />;
      case 'pending':
        return <Clock className="booking-status-icon booking-status-icon--pending" />;
      case 'cancelled':
        return <XCircle className="booking-status-icon booking-status-icon--cancelled" />;
      case 'completed':
        return <CheckCircle className="booking-status-icon booking-status-icon--completed" />;
      default:
        return <AlertCircle className="booking-status-icon" />;
    }
  };

  const getStatusClass = (status) => {
    return `booking-status booking-status--${status}`;
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return booking.status === 'confirmed' || booking.status === 'pending';
    if (filter === 'completed') return booking.status === 'completed';
    if (filter === 'cancelled') return booking.status === 'cancelled';
    return true;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="bookings-container">
        <div className="bookings-loading">
          <div className="bookings-spinner"></div>
          <p>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bookings-container">
        <div className="bookings-error">
          <AlertCircle className="bookings-error-icon" />
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={fetchBookings} className="bookings-retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <ScrollToTop />
      <div className="bookings-header">
        <div className="bookings-header-content">
          <h1 className="bookings-title">My Bookings</h1>
          <p className="bookings-subtitle">
            Manage and view all your tour bookings in one place
          </p>
        </div>

        <div className="bookings-filters">
          <button
            className={`bookings-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Bookings
          </button>
          <button
            className={`bookings-filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`bookings-filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button
            className={`bookings-filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>

      <div className="bookings-content">
        {filteredBookings.length === 0 ? (
          <div className="bookings-empty">
            <Calendar className="bookings-empty-icon" />
            <h2>No bookings found</h2>
            <p>
              {filter === 'all' 
                ? "You haven't made any bookings yet. Start exploring our tours!"
                : `No ${filter} bookings at the moment.`
              }
            </p>
            <button
              onClick={() => navigate('/tours')}
              className="bookings-explore-btn"
            >
              Explore Tours
            </button>
          </div>
        ) : (
          <div className="bookings-grid">
            {filteredBookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-card-image">
                  <img
                    src={booking.package?.images?.[0] || '/images/placeholder.jpg'}
                    alt={booking.package?.name || 'Tour'}
                  />
                  <div className={getStatusClass(booking.status)}>
                    {getStatusIcon(booking.status)}
                    <span>{booking.status}</span>
                  </div>
                </div>

                <div className="booking-card-content">
                  <h3 className="booking-card-title">
                    {booking.package?.name || 'Tour Package'}
                  </h3>

                  <div className="booking-details">
                    <div className="booking-detail-item">
                      <Calendar className="booking-detail-icon" />
                      <div>
                        <p className="booking-detail-label">Travel Date</p>
                        <p className="booking-detail-value">
                          {formatDate(booking.travelDate)}
                        </p>
                      </div>
                    </div>

                    <div className="booking-detail-item">
                      <Users className="booking-detail-icon" />
                      <div>
                        <p className="booking-detail-label">Travelers</p>
                        <p className="booking-detail-value">
                          {booking.numberOfPeople} {booking.numberOfPeople === 1 ? 'Person' : 'People'}
                        </p>
                      </div>
                    </div>

                    <div className="booking-detail-item">
                      <MapPin className="booking-detail-icon" />
                      <div>
                        <p className="booking-detail-label">Duration</p>
                        <p className="booking-detail-value">
                          {booking.package?.duration || 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="booking-detail-item">
                      <Mail className="booking-detail-icon" />
                      <div>
                        <p className="booking-detail-label">Email</p>
                        <p className="booking-detail-value">{booking.email}</p>
                      </div>
                    </div>

                    <div className="booking-detail-item">
                      <Phone className="booking-detail-icon" />
                      <div>
                        <p className="booking-detail-label">Phone</p>
                        <p className="booking-detail-value">{booking.phone}</p>
                      </div>
                    </div>
                  </div>

                  {booking.specialRequests && (
                    <div className="booking-special-requests">
                      <p className="booking-detail-label">Special Requests:</p>
                      <p className="booking-detail-value">{booking.specialRequests}</p>
                    </div>
                  )}

                  <div className="booking-card-footer">
                    <div className="booking-price">
                      <span className="booking-price-label">Total Price:</span>
                      <span className="booking-price-value">
                        NPR {booking.totalPrice?.toLocaleString()}
                      </span>
                    </div>

                    <div className="booking-actions">
                      {(booking.status === 'confirmed' || booking.status === 'pending') && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="booking-btn booking-btn--cancel"
                        >
                          Cancel Booking
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/package/${booking.package?._id}`)}
                        className="booking-btn booking-btn--view"
                      >
                        View Package
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
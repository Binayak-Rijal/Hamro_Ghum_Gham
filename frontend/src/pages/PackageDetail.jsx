


// frontend/src/pages/PackageDetail.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Clock, Star, Bookmark, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import BookingConfirmation from '../components/BookingConfirmation';
import RatePackages from '../components/RatePackages';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import axios from 'axios';
import './PackageDetail.css';

const API_URL = 'http://localhost:3000/api';

// Helper function for auth headers
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function PackageDetail() {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 
  
  // UPDATED: Save state
  const [isSaved, setIsSaved] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(null);
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [bookingData, setBookingData] = useState({
    fullName: '',
    phone: '',
    date: '',
    guests: 1
  });
  const [errors, setErrors] = useState({});

  const packageInfo = packagesData[packageId];

  // UPDATED: Check if saved on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackageData();
    
    if (packageId && isAuthenticated()) {
      checkIfSavedInDB();
      fetchUserRating(); // ✅ NEW
    } else {
      setIsCheckingStatus(false);
    }
  }, [packageId]);

  //  NEW: Check saved status from database
  const checkIfSavedInDB = async () => {
    try {
      setIsCheckingStatus(true);
      const response = await axios.get(
        `http://localhost:3000/api/saved/check/${packageId}/package`,
        { headers: getAuthHeader() }
      );
      
      if (response.data.success) {
        setIsSaved(response.data.isSaved);
      }
    } catch (error) {
      console.error('Error checking saved status:', error);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  // UPDATED: Toggle save/unsave using database WITH TOASTIFY
  const handleSaveToggle = async () => {
    if (!isAuthenticated()) {
      toast.error('Please login to save packages');
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('No authentication token found. Please login again.');
        navigate('/login');
        return;
      }

      if (isSaved) {
        const response = await axios.delete(
          `http://localhost:3000/api/saved/${packageId}/package`,
          { 
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.data.success) {
          setIsSaved(false);
          toast.success('Package removed from saved items');
          window.dispatchEvent(new Event('savedItemsChanged'));
        }
      } else {
        const response = await axios.post(
          'http://localhost:3000/api/saved',
          {
            itemId: packageInfo._id,
            itemType: 'package',
            name: packageInfo.title,
            location: packageInfo.location,
            price: packageInfo.price,
            duration: packageInfo.duration,
            image: packageInfo.image,
            rating: packageInfo.rating
          },
          { 
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setIsSaved(true);
          toast.success('Package saved successfully!');
          window.dispatchEvent(new Event('savedItemsChanged'));
        }
      }
    } catch (error) {
      console.error('Save toggle error:', error);
      
      if (error.response?.status === 401) {
        toast.error('Your session has expired. Please login again.');
        navigate('/login');
      } else if (error.response?.status === 400) {
        toast.warning(error.response.data.message || 'Item already saved');
      } else {
        toast.error('Failed to update saved status.');
      }
    }
  };

  // ✅ NEW: Handle rating modal
  const handleRatePackage = () => {
    if (!isAuthenticated()) {
      toast.error('Please login to rate packages');
      navigate('/login');
      return;
    }
    setShowRatingModal(true);
  };

  // ✅ NEW: Handle successful rating submission
  const handleRatingSuccess = () => {
    toast.success('Rating submitted successfully!');
    fetchPackageData(); // Refresh to get updated rating
    fetchUserRating(); // Refresh user's rating
  };

  // Loading state
  if (loading) {
    return (
      <div className="package-detail-page">
        <Navbar />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh' 
        }}>
          <div className="spinner"></div>
          <p style={{ marginLeft: '20px' }}>Loading package details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !packageInfo) {
    return (
      <div className="package-detail-page">
        <Navbar />
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h2>Package not found</h2>
          <Link to="/tours">Go back to tours</Link>
        </div>
      </div>
    );
  }

  const serviceCharge = 10;
  const subtotal = packageInfo.price * bookingData.guests;
  const total = subtotal + serviceCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: name === 'guests' ? (value === '' ? 1 : Math.max(1, parseInt(value) || 1)) : value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  //  FIXED: Improved validation function
  const validateForm = () => {
    const newErrors = {};
    
    console.log('Validating form with data:', bookingData);
    
    if (!bookingData.fullName || !bookingData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (bookingData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    const phoneDigits = bookingData.phone.replace(/\D/g, '');
    if (!bookingData.phone || !bookingData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phoneDigits.length < 9 || phoneDigits.length > 15) {
      newErrors.phone = 'Please enter a valid phone number (9-15 digits)';
    }
    
    if (!bookingData.date) {
      newErrors.date = 'Date is required';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // Parse the date from input (YYYY-MM-DD format)
      const [year, month, day] = bookingData.date.split('-');
      const selectedDate = new Date(year, month - 1, day);
      selectedDate.setHours(0, 0, 0, 0);
      
      console.log('Today:', today, 'Selected:', selectedDate);
      
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
    }
    
    if (bookingData.guests < 1) {
      newErrors.guests = 'At least 1 guest is required';
    } else if (bookingData.guests > 20) {
      newErrors.guests = 'Maximum 20 guests allowed';
    }
    
    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  FIXED: Handle booking with correct field names WITH TOASTIFY
  const handleBookNow = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      toast.error('Please login to book packages');
      navigate('/login');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/bookings',
        {
          packageId: packageInfo.id,
          packageName: packageInfo.name,
          fullName: bookingData.fullName,
          phone: bookingData.phone.replace(/\D/g, ''), // Clean phone number
          travelDate: bookingData.date, // Changed from 'date' to 'travelDate'
          numberOfPeople: bookingData.guests, // Changed from 'guests' to 'numberOfPeople'
          subtotal,
          serviceCharge,
          totalPrice: total
        },
        { headers: getAuthHeader() }
      );

      if (response.data.success) {
        //  Show popup instead of toast
        setConfirmedBooking({
          packageName: packageInfo.name,
          date: bookingData.date,
          guests: bookingData.guests,
          duration: packageInfo.duration,
          phone: bookingData.phone,
          total: total
        });
        setShowConfirmation(true);
        
        // Reset form
        setBookingData({
          fullName: '',
          phone: '',
          date: '',
          guests: 1
        });
      }
    } catch (error) {
      console.error('Error preparing booking:', error);
      toast.error('Failed to prepare booking. Please try again.');
    }
  };

  return (
    <div className="package-detail-page">
      <ScrollToTop />
      {/* Shared Navigation */}
      <Navbar />

      <main className="package-detail-main">
        <div className="package-detail-container">
          <div className="package-detail-grid">
            {/* Left Side - Package Details */}
            <div className="package-info">
              {/* Hero Image */}
              <div className="package-hero-image">
                <img src={packageInfo.image} alt={packageInfo.name} />
                <button
                  className="play-button"
                  onClick={() => setShowVideoModal(true)}
                  title="Play video"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                {/* Save/Bookmark Button */}
                <button 
                  className={`save-button ${isSaved ? 'saved' : ''}`}
                  onClick={handleSaveToggle}
                  title={isSaved ? 'Remove from saved' : 'Save package'}
                  disabled={isCheckingStatus}
                >
                  <Bookmark 
                    className="bookmark-icon" 
                    fill={isSaved ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              {/* Package Header */}
              <div className="package-header">
                <h1 className="package-name">{packageInfo.title}</h1>
                <div className="package-meta">
                  <div className="package-rating">
                    <Star className="star-icon" fill="#f97316" />
                    <span>{packageInfo.rating || 4.5}</span>
                    <span className="review-count">({packageInfo.reviews || 0} reviews)</span>
                  </div>
                  <button
                    onClick={() => setShowRatingModal(true)}
                    className="rate-button"
                    title="Rate this package"
                  >
                    ⭐ Rate Package
                  </button>
                  <div className="package-location">
                    <MapPin className="meta-icon" />
                    <span>{packageInfo.location}</span>
                  </div>
                </div>
                
                {/* ✅ NEW: Rate Package Button */}
                {isAuthenticated() && (
                  <button 
                    className="rate-package-btn"
                    onClick={handleRatePackage}
                  >
                    <Star className="rate-icon" />
                    {userRating ? 'Update Your Rating' : 'Rate This Package'}
                  </button>
                )}
              </div>

              {/* Description */}
              <section className="package-section">
                <h2 className="section-title">Overview</h2>
                <p className="package-description">{packageInfo.description}</p>
              </section>

              {/* Highlights */}
              {packageInfo.highlights && packageInfo.highlights.length > 0 && (
                <section className="package-section">
                  <h2 className="section-title">Highlights</h2>
                  <ul className="highlights-list">
                    {packageInfo.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Itinerary */}
              {packageInfo.itinerary && packageInfo.itinerary.length > 0 && (
                <section className="package-section">
                  <h2 className="section-title">Itinerary</h2>
                  <div className="itinerary-list">
                    {packageInfo.itinerary.map((item) => (
                      <div key={item.day} className="itinerary-item">
                        <div className="itinerary-day">Day {item.day}</div>
                        <div className="itinerary-content">
                          <h3 className="itinerary-title">{item.title}</h3>
                          <p className="itinerary-description">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Included/Excluded */}
              {((packageInfo.included && packageInfo.included.length > 0) || 
                (packageInfo.excluded && packageInfo.excluded.length > 0)) && (
                <section className="package-section">
                  <div className="included-excluded-grid">
                    {packageInfo.included && packageInfo.included.length > 0 && (
                      <div>
                        <h2 className="section-title">What's Included</h2>
                        <ul className="included-list">
                          {packageInfo.included.map((item, index) => (
                            <li key={index}>✓ {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {packageInfo.excluded && packageInfo.excluded.length > 0 && (
                      <div>
                        <h2 className="section-title">What's Excluded</h2>
                        <ul className="excluded-list">
                          {packageInfo.excluded.map((item, index) => (
                            <li key={index}>✗ {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>

            {/* Right Side - Booking Card */}
            <div className="booking-sidebar">
              <div className="booking-card">
                <div className="booking-price">
                  <span className="price-amount">NPR {packageInfo.price?.toLocaleString()}</span>
                  <span className="price-per">/per person</span>
                </div>

                <form onSubmit={handleBookNow} className="booking-form">
                  <h3 className="booking-title">Information</h3>

                  <div className="form-group">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      value={bookingData.fullName}
                      onChange={handleInputChange}
                      className={`booking-input ${errors.fullName ? 'error' : ''}`}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone (e.g., 980001101)"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      className={`booking-input ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="date"
                        name="date"
                        value={bookingData.date}
                        onChange={handleInputChange}
                        className={`booking-input ${errors.date ? 'error' : ''}`}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.date && <span className="error-text">{errors.date}</span>}
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        name="guests"
                        placeholder="Guests"
                        min="1"
                        max="20"
                        value={bookingData.guests}
                        onChange={handleInputChange}
                        className={`booking-input ${errors.guests ? 'error' : ''}`}
                      />
                      {errors.guests && <span className="error-text">{errors.guests}</span>}
                    </div>
                  </div>

                  <div className="price-breakdown">
                    <div className="price-row">
                      <span>NPR {packageInfo.price} × {bookingData.guests} person</span>
                      <span>NPR {subtotal}</span>
                    </div>
                    <div className="price-row">
                      <span>Service charge</span>
                      <span>NPR {serviceCharge}</span>
                    </div>
                    <div className="price-row total">
                      <span>Total</span>
                      <span>NPR {total}</span>
                    </div>
                  </div>

                  <button type="submit" className="book-now-btn">
                    Book Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Confirmation Popup */}
      {showConfirmation && confirmedBooking && (
        <BookingConfirmation
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          bookingDetails={confirmedBooking}
        />
      )}

      {/* ✅ NEW: Rating Modal */}
      {showRatingModal && (
        <RatePackages
          packageId={packageId}
          onClose={() => setShowRatingModal(false)}
          onSuccess={handleRatingSuccess}
        />
      )}
    </div>
  );
}
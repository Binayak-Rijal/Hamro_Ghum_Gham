// frontend/src/pages/DestinationDetail.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Bookmark, Phone, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios'; 
import Navbar from '../components/Navbar';
import './DestinationDetail.css';
import BookingConfirmation from '../components/BookingConfirmation';

const API_URL = 'http://localhost:5000/api';

// Helper function for auth headers
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function DestinationDetail() {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // ✅ State for destination data from database
  const [destinationInfo, setDestinationInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isSaved, setIsSaved] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedInquiry, setConfirmedInquiry] = useState(null);
  const [inquiryData, setInquiryData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    guests: 2,
    message: ''
  });
  const [errors, setErrors] = useState({});

  // ✅ Fetch destination data from database
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDestinationData();
    
    if (destinationId && isAuthenticated()) {
      checkIfSavedInDB();
    } else {
      setIsCheckingStatus(false);
    }
  }, [destinationId]);

  const fetchDestinationData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/destinations/${destinationId}`);
      
      if (response.data.success) {
        setDestinationInfo(response.data.destination);
      }
    } catch (error) {
      console.error('Error fetching destination:', error);
      setError('Destination not found');
    } finally {
      setLoading(false);
    }
  };

  const checkIfSavedInDB = async () => {
    try {
      setIsCheckingStatus(true);
      const response = await axios.get(
        `${API_URL}/saved/check/${destinationId}/destination`,
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

  const handleSaveToggle = async () => {
    if (!isAuthenticated()) {
      toast.error('Please login to save destinations');
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
          `${API_URL}/saved/${destinationId}/destination`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );

        if (response.data.success) {
          setIsSaved(false);
          toast.success('Destination removed from saved items');
          window.dispatchEvent(new Event('savedItemsChanged'));
        }
      } else {
        const response = await axios.post(
          `${API_URL}/saved`,
          {
            itemId: destinationInfo._id,
            itemType: 'destination',
            name: destinationInfo.name,
            location: destinationInfo.location,
            price: destinationInfo.price,
            image: destinationInfo.image,
            rating: destinationInfo.rating
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
          toast.success('Destination saved successfully!');
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

  // Loading state
  if (loading) {
    return (
      <div className="destination-detail-page">
        <Navbar />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh' 
        }}>
          <div className="spinner"></div>
          <p style={{ marginLeft: '20px' }}>Loading destination details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !destinationInfo) {
    return (
      <div className="destination-detail-page">
        <Navbar />
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h2>Destination not found</h2>
          <Link to="/destinations">Go back to destinations</Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInquiryData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!inquiryData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!inquiryData.email.trim()) newErrors.email = 'Email is required';
    if (!inquiryData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!inquiryData.date) newErrors.date = 'Date is required';
    if (inquiryData.guests < 1) newErrors.guests = 'At least 1 guest required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInquiry = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      toast.error('Please login to send inquiry');
      navigate('/login');
      return;
    }

    if (validateForm()) {
      setConfirmedInquiry({
        packageName: destinationInfo.name,
        date: inquiryData.date,
        guests: inquiryData.guests,
        email: inquiryData.email,
        phone: inquiryData.phone,
        total: destinationInfo.price * inquiryData.guests
      });
      setShowConfirmation(true);
      
      setInquiryData({
        fullName: '',
        email: '',
        phone: '',
        date: '',
        guests: 2,
        message: ''
      });
    }
  };

  return (
    <div className="destination-detail-page">
      <Navbar />

      <main className="destination-detail-main">
        <div className="destination-detail-container">
          <div className="destination-detail-grid">
            {/* Left Side - Destination Details */}
            <div className="destination-info">
              {/* Hero Image */}
              <div className="destination-hero-image">
                <img src={destinationInfo.image || '/images/default.jpg'} alt={destinationInfo.name} />
                <button 
                  className={`save-button ${isSaved ? 'saved' : ''}`}
                  onClick={handleSaveToggle}
                  title={isSaved ? 'Remove from saved' : 'Save destination'}
                  disabled={isCheckingStatus}
                >
                  <Bookmark 
                    className="bookmark-icon" 
                    fill={isSaved ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              {/* Destination Header */}
              <div className="destination-header">
                <h1 className="destination-name">{destinationInfo.name}</h1>
                <div className="destination-meta">
                  <div className="destination-rating">
                    <Star className="star-icon" fill="#f97316" />
                    <span>{destinationInfo.rating || 4.5}</span>
                    <span className="review-count">({destinationInfo.reviews || 0} reviews)</span>
                  </div>
                  <div className="destination-location">
                    <MapPin className="meta-icon" />
                    <span>{destinationInfo.location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <section className="destination-section">
                <h2 className="section-title">Overview</h2>
                <p className="destination-description">{destinationInfo.description}</p>
              </section>

              {/* Highlights */}
              {destinationInfo.highlights && destinationInfo.highlights.length > 0 && (
                <section className="destination-section">
                  <h2 className="section-title">Highlights</h2>
                  <ul className="highlights-list">
                    {destinationInfo.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Top Attractions */}
              {destinationInfo.attractions && destinationInfo.attractions.length > 0 && (
                <section className="destination-section">
                  <h2 className="section-title">Top Attractions</h2>
                  <div className="attractions-list">
                    {destinationInfo.attractions.map((attraction, index) => (
                      <div key={index} className="attraction-item">
                        <div className="attraction-header">
                          <h3 className="attraction-name">{attraction.name}</h3>
                          <span className="attraction-time">{attraction.time}</span>
                        </div>
                        <p className="attraction-description">{attraction.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Best Time & Things To Do */}
              <section className="destination-section">
                <div className="info-grid">
                  {destinationInfo.bestTimeToVisit && (
                    <div>
                      <h2 className="section-title">Best Time to Visit</h2>
                      <p className="best-time">{destinationInfo.bestTimeToVisit}</p>
                    </div>
                  )}
                  {destinationInfo.thingsToDo && destinationInfo.thingsToDo.length > 0 && (
                    <div>
                      <h2 className="section-title">Things To Do</h2>
                      <ul className="things-list">
                        {destinationInfo.thingsToDo.map((thing, index) => (
                          <li key={index}>{thing}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>

              {/* Included/Excluded */}
              {((destinationInfo.included && destinationInfo.included.length > 0) || 
                (destinationInfo.excluded && destinationInfo.excluded.length > 0)) && (
                <section className="destination-section">
                  <div className="included-excluded-grid">
                    {destinationInfo.included && destinationInfo.included.length > 0 && (
                      <div>
                        <h2 className="section-title">What's Included</h2>
                        <ul className="included-list">
                          {destinationInfo.included.map((item, index) => (
                            <li key={index}>✓ {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {destinationInfo.excluded && destinationInfo.excluded.length > 0 && (
                      <div>
                        <h2 className="section-title">What's Excluded</h2>
                        <ul className="excluded-list">
                          {destinationInfo.excluded.map((item, index) => (
                            <li key={index}>✗ {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>

            {/* Right Side - Inquiry Card */}
            <div className="inquiry-sidebar">
              <div className="inquiry-card">
                <div className="inquiry-price">
                  <span className="price-amount">NPR {destinationInfo.price?.toLocaleString()}</span>
                  <span className="price-per">/per person</span>
                </div>

                <form onSubmit={handleInquiry} className="inquiry-form">
                  <h3 className="inquiry-title">Send Inquiry</h3>

                  <div className="form-group">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      value={inquiryData.fullName}
                      onChange={handleInputChange}
                      className={`inquiry-input ${errors.fullName ? 'error' : ''}`}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={inquiryData.email}
                      onChange={handleInputChange}
                      className={`inquiry-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={inquiryData.phone}
                      onChange={handleInputChange}
                      className={`inquiry-input ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="date"
                        name="date"
                        value={inquiryData.date}
                        onChange={handleInputChange}
                        className={`inquiry-input ${errors.date ? 'error' : ''}`}
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
                        value={inquiryData.guests}
                        onChange={handleInputChange}
                        className={`inquiry-input ${errors.guests ? 'error' : ''}`}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Your message (optional)"
                      value={inquiryData.message}
                      onChange={handleInputChange}
                      className="inquiry-textarea"
                      rows="3"
                    />
                  </div>

                  <button type="submit" className="inquiry-btn">
                    Send Inquiry
                  </button>
                </form>

                <div className="contact-info">
                  <div className="contact-item">
                    <Phone className="contact-icon" />
                    <span>+977-1-4567890</span>
                  </div>
                  <div className="contact-item">
                    <Mail className="contact-icon" />
                    <span>info@hamroghum.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showConfirmation && confirmedInquiry && (
        <BookingConfirmation
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          bookingDetails={confirmedInquiry}
        />
      )}
    </div>
  );
}
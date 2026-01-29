// frontend/src/pages/Destinations.jsx
/**
 * Destinations Component
 * Main page that displays all available travel destinations
 * Fetches destination data from backend API and displays in a responsive grid
 * 
 * Features:
 * - Dynamic data fetching from backend API
 * - Loading state with spinner animation
 * - Error state with retry functionality
 * - Empty state when no destinations available
 * - Responsive grid layout for destination cards
 * - Image error handling with fallback to default image
 * - Rating and visitor count display
 * - Price formatting with NPR currency
 * - Click-to-navigate destination details
 * - Call-to-action section for tour packages
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Import icons for visual elements (map pin, star, users)
import { MapPin, Star, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import axios from 'axios';
import './Destinations.css';

export default function Destinations() {
  // State for storing destination data from database
  const [destinations, setDestinations] = useState([]);
  // State for loading status during API fetch
  const [loading, setLoading] = useState(true);
  // State for error messages if fetch fails
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:3000/api';

  // Fetch destinations from database on component mount
  useEffect(() => {
    fetchDestinations();
  }, []);

  /**
   * Fetches all destinations from backend API
   * Updates state with destination data or error message
   * Handles loading states and error scenarios
   */
  const fetchDestinations = async () => {
    try {
      // Set loading to true before API call
      setLoading(true);
      
      // GET request to fetch all destinations
      const response = await axios.get(`${API_URL}/destinations`);
      
      // Check if API response was successful
      if (response.data.success) {
        // Update state with fetched destinations array
        setDestinations(response.data.destinations);
      }
    } catch (error) {
      // Log error for debugging purposes
      console.error('Error fetching destinations:', error);
      // Set user-friendly error message
      setError('Failed to load destinations');
    } finally {
      // Always set loading to false, regardless of success or failure
      setLoading(false);
    }
  };

  // Render loading state while fetching data
  // Shows spinner and message until API call completes
  if (loading) {
    return (
      <div className="destinations-page">
        <Navbar />
        {/* Centered loading container */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh' 
        }}>
          {/* Spinner animation defined in CSS */}
          <div className="spinner"></div>
          <p style={{ marginLeft: '20px' }}>Loading destinations...</p>
        </div>
      </div>
    );
  }

  // Render error state with retry button if fetch fails
  // Provides user-friendly error message and option to retry
  if (error) {
    return (
      <div className="destinations-page">
        <Navbar />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          flexDirection: 'column' 
        }}>
          {/* Display error message in red */}
          <p style={{ color: '#ef4444', fontSize: '18px' }}>{error}</p>
          {/* Retry button to attempt fetch again */}
          {/* Calls fetchDestinations() to retry API call */}
          <button 
            onClick={fetchDestinations}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#f97316',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="destinations-page">
      <Navbar />
      <ScrollToTop />
      
      <main className="destinations-main">
        {/* Hero Section */}
        <section className="destinations-hero">
          <div className="destinations-hero-content">
            <h1 className="destinations-hero-title">
              Explore <span className="highlight">Destinations</span>
            </h1>
            <p className="destinations-hero-description">
              Discover the most beautiful and popular destinations in Nepal. 
              From ancient cities to wildlife adventures, find your perfect getaway.
            </p>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="destinations-section">
          <div className="destinations-container">
            {/* Section header with destination count */}
            <div className="destinations-header">
              <h2 className="section-title">Popular Destinations</h2>
              <p className="section-subtitle">
                {destinations.length} {destinations.length === 1 ? 'destination' : 'destinations'} available
              </p>
            </div>

            {/* Empty state when no destinations are available */}
            {/* Shows friendly message instead of empty grid */}
            {destinations.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '4rem 2rem',
                background: 'rgba(249, 115, 22, 0.05)',
                borderRadius: '1rem',
                border: '2px dashed rgba(249, 115, 22, 0.2)'
              }}>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  color: '#111827', 
                  marginBottom: '1rem',
                  fontWeight: '700'
                }}>
                  No Destinations Available Yet
                </h3>
                <p style={{ 
                  color: '#6b7280', 
                  marginBottom: '1.5rem',
                  fontSize: '1rem'
                }}>
                  We're currently adding amazing destinations. Check back soon!
                </p>
              </div>
            ) : (
              // Grid of destination cards
              <div className="destinations-grid">
                {/* Map through destinations and create clickable cards */}
                {/* Each card is a Link component for navigation to detail page */}
                {destinations.map((destination) => (
                  <Link 
                    key={destination._id} 
                    // Navigate to individual destination detail page
                    to={`/destination/${destination._id}`} 
                    className="destination-card"
                  >
                    {/* Destination image with error handling */}
                    <div className="destination-image-container">
                      <img 
                        // Use destination image or fallback to default
                        src={destination.image || '/images/default.jpg'} 
                        alt={destination.name} 
                        className="destination-image"
                        // onError handles broken image links
                        onError={(e) => {
                          e.target.src = '/images/default.jpg';
                        }}
                      />
                      {/* Badge overlay (e.g., "Featured", "Popular") */}
                      <div className="destination-badge">{destination.badge || 'Featured'}</div>
                    </div>
                    
                    {/* Destination card content */}
                    <div className="destination-content">
                      <h3 className="destination-name">{destination.name}</h3>
                      
                      {/* Location with map pin icon */}
                      <div className="destination-location">
                        <MapPin className="location-icon" />
                        <span>{destination.location}</span>
                      </div>
                      
                      {/* Truncated description (max 120 characters) */}
                      {/* Prevents long descriptions from breaking card layout */}
                      <p className="destination-description">
                        {destination.description 
                          // If description exists, truncate to 120 chars and add ellipsis
                          ? `${destination.description.substring(0, 120)}...` 
                          // Fallback text if no description provided
                          : 'Discover the beauty and culture of this amazing destination.'}
                      </p>
                      
                      {/* Destination metadata: rating and visitor count */}
                      <div className="destination-meta">
                        <div className="destination-rating">
                          <Star className="star-icon" fill="#f97316" />
                          <span>{destination.rating || 4.5}</span>
                        </div>
                        <div className="destination-visitors">
                          <Users className="users-icon" />
                          <span>{destination.reviews || 0}+ Visitors</span>
                        </div>
                      </div>
                      
                      {/* Card footer with price and explore button */}
                      <div className="destination-footer">
                        <div className="destination-price">
                          <span className="price-label">Starting at</span>
                          {/* Format price with thousands separator (e.g., 10,000) */}
                          {/* Optional chaining (?.) prevents error if price is undefined */}
                          <span className="price-amount">NPR {destination.price?.toLocaleString()}</span>
                        </div>
                        <button className="destination-button">
                          Explore
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section - Encourages users to explore tour packages */}
        <section className="destinations-cta">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Journey?</h2>
            <p className="cta-description">
              Browse our tour packages for complete travel experiences
            </p>
            {/* Link to tours page */}
            <Link to="/tours" className="cta-button">
              View All Tours
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
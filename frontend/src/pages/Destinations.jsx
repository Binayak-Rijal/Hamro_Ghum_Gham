// frontend/src/pages/Destinations.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import './Destinations.css';

export default function Destinations() {
  // ✅ State for destinations from database
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api';

  // ✅ Fetch destinations from database on component mount
  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/destinations`);
      
      if (response.data.success) {
        setDestinations(response.data.destinations);
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setError('Failed to load destinations');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="destinations-page">
        <Navbar />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh' 
        }}>
          <div className="spinner"></div>
          <p style={{ marginLeft: '20px' }}>Loading destinations...</p>
        </div>
      </div>
    );
  }

  // ✅ Error state
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
          <p style={{ color: '#ef4444', fontSize: '18px' }}>{error}</p>
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
            <div className="destinations-header">
              <h2 className="section-title">Popular Destinations</h2>
              <p className="section-subtitle">
                {destinations.length} {destinations.length === 1 ? 'destination' : 'destinations'} available
              </p>
            </div>

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
              <div className="destinations-grid">
                {destinations.map((destination) => (
                  <Link 
                    key={destination._id} 
                    to={`/destination/${destination._id}`} 
                    className="destination-card"
                  >
                    <div className="destination-image-container">
                      <img 
                        src={destination.image || '/images/default.jpg'} 
                        alt={destination.name} 
                        className="destination-image"
                        onError={(e) => {
                          e.target.src = '/images/default.jpg';
                        }}
                      />
                      <div className="destination-badge">{destination.badge || 'Featured'}</div>
                    </div>
                    
                    <div className="destination-content">
                      <h3 className="destination-name">{destination.name}</h3>
                      
                      <div className="destination-location">
                        <MapPin className="location-icon" />
                        <span>{destination.location}</span>
                      </div>
                      
                      <p className="destination-description">
                        {destination.description 
                          ? `${destination.description.substring(0, 120)}...` 
                          : 'Discover the beauty and culture of this amazing destination.'}
                      </p>
                      
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
                      
                      <div className="destination-footer">
                        <div className="destination-price">
                          <span className="price-label">Starting at</span>
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

        {/* CTA Section */}
        <section className="destinations-cta">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Journey?</h2>
            <p className="cta-description">
              Browse our tour packages for complete travel experiences
            </p>
            <Link to="/tours" className="cta-button">
              View All Tours
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
/**
 * HomePage Component
 * Landing page of the travel booking application
 * Displays hero section, popular packages, and featured destinations
 * Features search functionality and call-to-action buttons
 */

// frontend/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, MapPin, Calendar, Users } from 'lucide-react';
import './HomePage.css';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import axios from 'axios';

/**
 * HomePage Component
 * Renders the main landing page with:
 * - Hero banner with tagline
 * - Popular packages carousel
 * - Featured destinations section
 * - Statistics section
 */
export default function HomePage() {
  const API_URL = 'http://localhost:3000/api';

  // State for popular packages
  const [popularPackages, setPopularPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for featured destinations
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [destinationsLoading, setDestinationsLoading] = useState(true);

  // Fetch popular packages on component mount
  useEffect(() => {
    fetchPopularPackages();
  }, []);

  /**
   * Fetch popular packages from API
   * Calls /api/packages/popular endpoint
   */
  const fetchPopularPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/packages/popular`);
      if (response.data.success) {
        setPopularPackages(response.data.packages);
      }
    } catch (error) {
      console.error('Error fetching popular packages:', error);
      setError('Failed to load popular packages');
    } finally {
      setLoading(false);
    }
  };

  // Fetch featured destinations on component mount
  useEffect(() => {
    fetchFeaturedDestinations();
  }, []);

  /**
   * Fetch featured destinations from API
   * Calls /api/destinations/featured endpoint
   */
  const fetchFeaturedDestinations = async () => {
    try {
      setDestinationsLoading(true);
      const response = await axios.get(`${API_URL}/destinations/featured`);
      if (response.data.success) {
        setFeaturedDestinations(response.data.destinations);
      }
    } catch (error) {
      console.error('Error fetching featured destinations:', error);
    } finally {
      setDestinationsLoading(false);
    }
  };

  return (
    <div className="homepage">
      <Navbar />
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>✈️</span>
              <span>Explore the world!</span>
            </div>

            <h1 className="hero-title">
              Traveling opens the door<br />
              to creating <span className="highlight">memories</span>
            </h1>

            <p className="hero-description">
              Discover amazing destinations, create unforgettable experiences, and explore Nepal and beyond. We provide the best travel experiences.
            </p>

            <div className="hero-buttons">
              <Link to="/tours" className="btn-primary">
                Find out more
                <ChevronRight className="icon-small" />
              </Link>
            </div>

            <div className="stats-grid">
              <div className="stat-item">
                <p className="stat-number">700+</p>
                <p className="stat-label">Destinations</p>
              </div>
              <div className="stat-item">
                <p className="stat-number">350+</p>
                <p className="stat-label">Hotels</p>
              </div>
              <div className="stat-item">
                <p className="stat-number">200+</p>
                <p className="stat-label">Tour Guides</p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Packages Section */}
        <section className="packages-section">
          <div className="packages-container">
            <div className="section-header">
              <h2 className="section-title">Popular Packages</h2>
              <p className="section-subtitle">Explore our most loved destinations in Nepal</p>
            </div>

            {/* Loading State */}
            {loading && (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: '#6b7280' }}>
                <p style={{ fontSize: '1.125rem' }}>Loading popular packages...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <p style={{ color: '#ef4444', fontSize: '1.125rem', marginBottom: '1rem' }}>
                  {error}
                </p>
                <button onClick={fetchPopularPackages} className="btn-primary" style={{ display: 'inline-flex' }}>
                  Retry
                </button>
              </div>
            )}

            {/* No Packages State */}
            {!loading && !error && popularPackages.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'rgba(249, 115, 22, 0.05)',
                borderRadius: '1rem',
                border: '2px dashed rgba(249, 115, 22, 0.2)'
              }}>
                <h3 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '1rem', fontWeight: '700' }}>
                  No Popular Packages Available Yet
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '1rem' }}>
                  We're currently adding amazing tour packages. Popular packages include: 
                  Pokhara, Mustang, Manang, Everest Base Camp, and Annapurna Base Camp.
                </p>
                <Link to="/tours" className="btn-primary" style={{ display: 'inline-flex' }}>
                  View All Tours
                  <ChevronRight className="icon-small" />
                </Link>
              </div>
            )}

            {/* Popular Packages Grid */}
            {!loading && !error && popularPackages.length > 0 && (
              <div className="packages-grid">
                {popularPackages.map((pkg) => (
                  <Link key={pkg._id} to={`/package/${pkg._id}`} className="package-card-link">
                    <div className="package-card">
                      <div className="package-image-container">
                        <img
                          src={pkg.image || '/images/default.jpg'}
                          alt={pkg.title}
                          className="package-image"
                          onError={(e) => { e.target.src = '/images/default.jpg'; }}
                        />
                        <div className="package-badge">
                          {pkg.category ? pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1) : 'Featured'}
                        </div>
                      </div>
                      <div className="package-content">
                        <h3 className="package-title">{pkg.title}</h3>
                        <p className="package-description">
                          {pkg.description
                            ? `${pkg.description.substring(0, 120)}...`
                            : 'Discover the beauty and adventure of this amazing destination.'}
                        </p>
                        <div className="package-features">
                          <div className="package-feature">
                            <Calendar className="feature-icon" />
                            <span>{pkg.duration || 'Multiple Days'}</span>
                          </div>
                          <div className="package-feature">
                            <MapPin className="feature-icon" />
                            <span>{pkg.location || 'Nepal'}</span>
                          </div>
                        </div>
                        <div className="package-footer">
                          <div className="package-price">
                            <span className="price-label">From</span>
                            <span className="price-amount">
                              NPR {pkg.price?.toLocaleString() || 'N/A'}
                            </span>
                          </div>
                          <button className="btn-book">Book Now</button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Featured Destinations Section */}
        <section className="packages-section">
          <div className="packages-container">
            <div className="section-header">
              <h2 className="section-title">Popular Destinations</h2>
              <p className="section-subtitle">Discover the most visited places in Nepal</p>
            </div>

            {/* Loading State */}
            {destinationsLoading && (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: '#6b7280' }}>
                <p style={{ fontSize: '1.125rem' }}>Loading featured destinations...</p>
              </div>
            )}

            {/* No Destinations State */}
            {!destinationsLoading && featuredDestinations.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'rgba(249, 115, 22, 0.05)',
                borderRadius: '1rem',
                border: '2px dashed rgba(249, 115, 22, 0.2)'
              }}>
                <h3 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '1rem', fontWeight: '700' }}>
                  No Featured Destinations Available Yet
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '1rem' }}>
                  We're currently adding amazing destinations. Check back soon!
                </p>
                <Link to="/destinations" className="btn-primary" style={{ display: 'inline-flex' }}>
                  View All Destinations
                  <ChevronRight className="icon-small" />
                </Link>
              </div>
            )}

            {/* Featured Destinations Grid */}
            {!destinationsLoading && featuredDestinations.length > 0 && (
              <div className="packages-grid">
                {featuredDestinations.map((dest) => (
                  <Link key={dest._id} to={`/destination/${dest._id}`} className="package-card-link">
                    <div className="package-card">
                      <div className="package-image-container">
                        <img
                          src={dest.image || '/images/default.jpg'}
                          alt={dest.name}
                          className="package-image"
                          onError={(e) => { e.target.src = '/images/default.jpg'; }}
                        />
                        <div className="package-badge">{dest.badge || 'Featured'}</div>
                      </div>
                      <div className="package-content">
                        <h3 className="package-title">{dest.name}</h3>
                        <p className="package-description">
                          {dest.description
                            ? `${dest.description.substring(0, 120)}...`
                            : 'Discover the beauty and culture of this amazing destination.'}
                        </p>
                        <div className="package-features">
                          <div className="package-feature">
                            <Star className="feature-icon" />
                            <span>{dest.rating || 4.5} Rating</span>
                          </div>
                          <div className="package-feature">
                            <Users className="feature-icon" />
                            <span>{dest.reviews || 0}+ Visitors</span>
                          </div>
                        </div>
                        <div className="package-footer">
                          <div className="package-price">
                            <span className="price-label">Starting at</span>
                            <span className="price-amount">
                              NPR {dest.price?.toLocaleString() || 'N/A'}
                            </span>
                          </div>
                          <button className="btn-book">Explore</button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

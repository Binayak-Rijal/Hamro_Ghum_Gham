import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight, Star, MapPin, Calendar } from 'lucide-react';
import './HomePage.css';


export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleHomeClick = (e) => {
    e.preventDefault();
    console.log('Home link clicked');
    console.log('Current URL before click:', window.location.href);
    window.location.href = '/home'; // Force navigation
  };




  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            {/* Logo - Already correct */}
            <Link to="/home" className="logo">
              <img src="/images/logo.png" alt="HamroGhumGham Logo" className="logo-img" />
              <span className="logo-text">HamroGhumGham</span>
            </Link>


            {/* Desktop Menu - FIXED Home link */}
            <div className="nav-menu">
              <Link to="/home" className="nav-link">Home</Link> {/* FIXED */}
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/tours" className="nav-link">Tours</Link>
              <Link to="/destinations" className="nav-link">Destinations</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>


            {/* Auth Buttons */}
            <div className="auth-buttons">
              <Link to="/login">
                <button className="btn-login">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn-register">Register</button>
              </Link>
            </div>


            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
            </button>
          </div>
        </div>


        {/* Mobile Menu Dropdown - FIXED Home link */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <Link to="/home" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link> {/* FIXED */}
            <Link to="/about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/tours" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Tours</Link>
            <Link to="/destinations" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Destinations</Link>
            <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <div className="mobile-auth-buttons">
              <Link to="/login" className="mobile-btn-login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="mobile-btn-register" onClick={() => setIsMenuOpen(false)}>Register</Link>
            </div>
          </div>
        )}
      </nav>


      {/* Rest of the component remained the same */}
      <main className="main-content">
        {/* Hero Section */}
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
              <button className="btn-secondary">
                <svg className="icon-small" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play Demo
              </button>
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


            <div className="packages-grid">
              {/* Pokhara Card */}
              <Link to="/package/pokhara" className="package-card-link">
                <div className="package-card">
                  <div className="package-image-container">
                    <img src="/images/pokhara.jpg" alt="Pokhara" className="package-image" />
                    <div className="package-badge">Featured</div>
                  </div>
                  <div className="package-content">
                    <h3 className="package-title">Pokhara</h3>
                    <p className="package-description">
                      Experience the beauty of Phewa Lake, Sarangkot sunrise, and the majestic Annapurna range.
                    </p>
                    <div className="package-features">
                      <div className="package-feature">
                        <Calendar className="feature-icon" />
                        <span>5 Days</span>
                      </div>
                      <div className="package-feature">
                        <MapPin className="feature-icon" />
                        <span>Pokhara Valley</span>
                      </div>
                    </div>
                    <div className="package-footer">
                      <div className="package-price">
                        <span className="price-label">From</span>
                        <span className="price-amount">NPR 41,860</span>
                      </div>
                      <button className="btn-book">Book Now</button>
                    </div>
                  </div>
                </div>
              </Link>


              {/* Manang Card */}
              <Link to="/package/manang" className="package-card-link">
                <div className="package-card">
                  <div className="package-image-container">
                    <img src="/images/manang.jpg" alt="Manang" className="package-image" />
                    <div className="package-badge">Popular</div>
                  </div>
                  <div className="package-content">
                    <h3 className="package-title">Manang</h3>
                    <p className="package-description">
                      Trek through the Annapurna circuit and witness the stunning Himalayan landscapes and culture.
                    </p>
                    <div className="package-features">
                      <div className="package-feature">
                        <Calendar className="feature-icon" />
                        <span>7 Days</span>
                      </div>
                      <div className="package-feature">
                        <MapPin className="feature-icon" />
                        <span>Manang District</span>
                      </div>
                    </div>
                    <div className="package-footer">
                      <div className="package-price">
                        <span className="price-label">From</span>
                        <span className="price-amount">NPR 69,860</span>
                      </div>
                      <button className="btn-book">Book Now</button>
                    </div>
                  </div>
                </div>
              </Link>


              {/* Mustang Card */}
              <Link to="/package/mustang" className="package-card-link">
                <div className="package-card">
                  <div className="package-image-container">
                    <img src="/images/Mustang.jpg" alt="Mustang" className="package-image" />
                    <div className="package-badge">Adventure</div>
                  </div>
                  <div className="package-content">
                    <h3 className="package-title">Mustang</h3>
                    <p className="package-description">
                      Discover the forbidden kingdom with ancient caves, monasteries, and dramatic desert landscapes.
                    </p>
                    <div className="package-features">
                      <div className="package-feature">
                        <Calendar className="feature-icon" />
                        <span>10 Days</span>
                      </div>
                      <div className="package-feature">
                        <MapPin className="feature-icon" />
                        <span>Upper Mustang</span>
                      </div>
                    </div>
                    <div className="package-footer">
                      <div className="package-price">
                        <span className="price-label">From</span>
                        <span className="price-amount">NPR 111,860</span>
                      </div>
                      <button className="btn-book">Book Now</button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


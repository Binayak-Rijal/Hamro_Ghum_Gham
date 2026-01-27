import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Bookmark, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { user, logout, isAuthenticated, getAuthHeader } = useAuth();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch saved count and bookings count from database
  useEffect(() => {
    console.log('🔄 Navbar useEffect triggered');
    console.log('🔐 isAuthenticated():', isAuthenticated());
    console.log('👤 User:', user);
    console.log('🔑 getAuthHeader():', getAuthHeader());
    
    if (isAuthenticated()) {
      console.log('✅ User authenticated, fetching counts...');
      fetchSavedCount();
      fetchBookingsCount();
    } else {
      console.log('⛔ User not authenticated, resetting counts');
      setSavedCount(0);
      setBookingsCount(0);
    }
    
    // Listen for save/unsave events
    const handleSavedItemsChange = () => {
      console.log('📢 savedItemsChanged event received');
      if (isAuthenticated()) {
        fetchSavedCount();
      }
    };
    
    // Listen for booking changes
    const handleBookingsChange = () => {
      console.log('📢 bookingsChanged event received');
      if (isAuthenticated()) {
        fetchBookingsCount();
      }
    };
    
    window.addEventListener('savedItemsChanged', handleSavedItemsChange);
    window.addEventListener('bookingsChanged', handleBookingsChange);
    
    return () => {
      window.removeEventListener('savedItemsChanged', handleSavedItemsChange);
      window.removeEventListener('bookingsChanged', handleBookingsChange);
    };
  }, [isAuthenticated, user]);

  // Fetch saved items count from database
  const fetchSavedCount = async () => {
    try {
      const headers = getAuthHeader();
      console.log('📤 fetchSavedCount - Headers:', headers);
      
      const response = await axios.get(
        'http://localhost:3000/api/saved/count',
        { headers }
      );
      
      console.log('✅ Saved count response:', response.data);
      
      if (response.data.success) {
        setSavedCount(response.data.count);
      }
    } catch (error) {
      console.error('❌ Error fetching saved count:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          headers: error.config?.headers
        }
      });
      setSavedCount(0);
    }
  };

  // Fetch bookings count from database
  const fetchBookingsCount = async () => {
    try {
      const headers = getAuthHeader();
      console.log('📤 fetchBookingsCount - Headers:', headers);
      
      const response = await axios.get(
        'http://localhost:3000/api/bookings/count',
        { headers }
      );
      
      console.log('✅ Bookings count response:', response.data);
      
      if (response.data.success) {
        setBookingsCount(response.data.count);
      }
    } catch (error) {
      console.error('❌ Error fetching bookings count:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          headers: error.config?.headers
        }
      });
      setBookingsCount(0);
    }
  };

  const handleLogout = () => {
    console.log('🚪 Logging out...');
    logout();
    setSavedCount(0);
    setBookingsCount(0);
    setShowDropdown(false);
    navigate('/home');
  };

  const handleProfileClick = () => {
    console.log('👤 Profile dropdown toggled:', !showDropdown);
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.profile-dropdown-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  return (
    <header className={`site-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="site-container">
        <div className="site-flex">
          {/* Logo */}
          <div className="site-logo" onClick={() => navigate('/home')}>
            <img 
              src="/images/logo.png" 
              alt="HamroGhum Logo" 
              className="site-logo__image"
            />
            <h1 className="site-logo__text">
              Hamro<span className="site-logo__accent">GhumGham</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="site-nav">
            <a href="/home" className="site-nav__link">
              Home
            </a>
            <a href="/about" className="site-nav__link">
              About
            </a>
            <a href="/tours" className="site-nav__link">
              Tours
            </a>
            <a href="/destinations" className="site-nav__link">
              Destinations
            </a>
            <a href="/contact" className="site-nav__link">
              Contact
            </a>
          </nav>

          {/* Auth Section - Desktop */}
          <div className="site-auth">
            {isAuthenticated() ? (
              <>
                {/* Saved Items Link */}
                <a 
                  href="/saved-packages" 
                  className="site-saved"
                >
                  <Bookmark className="site-saved__icon" />
                  <span className="site-saved__text">Saved</span>
                  {savedCount > 0 && (
                    <span className="site-saved__badge">
                      {savedCount}
                    </span>
                  )}
                </a>

                {/* Profile Dropdown */}
                <div className="profile-dropdown-container">
                  <button
                    onClick={handleProfileClick}
                    className="site-profile__button"
                  >
                    <div className="site-profile__avatar">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="site-profile__meta">
                      <p className="site-profile__name">{user?.name || 'User'}</p>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="site-profile__dropdown">
                      <div className="site-profile__dropdown-header">
                        <p className="site-profile__dropdown-name">{user?.name}</p>
                        <p className="site-profile__dropdown-email">{user?.email}</p>
                      </div>
                      
                      <a
                        href="/profile"
                        className="site-profile__dropdown-link"
                      >
                        <User className="site-profile__dropdown-icon" />
                        <span>My Profile</span>
                      </a>
                      
                      <a
                        href="/saved-packages"
                        className="site-profile__dropdown-link"
                      >
                        <Bookmark className="site-profile__dropdown-icon" />
                        <span>Saved Items ({savedCount})</span>
                      </a>
                      
                      <a
                        href="/bookings"
                        className="site-profile__dropdown-link"
                      >
                        <Calendar className="site-profile__dropdown-icon" />
                        <span>My Bookings ({bookingsCount})</span>
                      </a>
                      
                      <div className="site-profile__divider"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="site-profile__dropdown-link site-profile__dropdown-logout"
                      >
                        <LogOut className="site-profile__dropdown-icon" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <a 
                  href="/login" 
                  className="site-auth__login"
                >
                  Login
                </a>
                <a 
                  href="/signup" 
                  className="site-auth__register"
                >
                  Register
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="site-mobile-toggle"
          >
            {isOpen ? <X className="site-mobile-toggle__icon" /> : <Menu className="site-mobile-toggle__icon" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="site-mobile-nav">
            <a href="/home" className="site-mobile-nav__link">
              Home
            </a>
            <a href="/about" className="site-mobile-nav__link">
              About
            </a>
            <a href="/tours" className="site-mobile-nav__link">
              Tours
            </a>
            <a href="/destinations" className="site-mobile-nav__link">
              Destinations
            </a>
            <a href="/contact" className="site-mobile-nav__link">
              Contact
            </a>
            
            <div className="site-mobile-nav__divider"></div>
            
            {isAuthenticated() ? (
              <>
                {/* User Info */}
                <div className="site-mobile-user">
                  <div className="site-mobile-user__avatar">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="site-mobile-user__info">
                    <p className="site-mobile-user__name">{user?.name || 'User'}</p>
                    <p className="site-mobile-user__email">{user?.email || ''}</p>
                  </div>
                </div>

                {/* Saved Items */}
                <a 
                  href="/saved-packages" 
                  className="site-mobile-nav__link site-mobile-nav__link--special"
                >
                  <Bookmark className="site-mobile-nav__icon" />
                  <span>Saved Items</span>
                  {savedCount > 0 && (
                    <span className="site-mobile-nav__badge">
                      {savedCount}
                    </span>
                  )}
                </a>

                {/* Bookings */}
                <a 
                  href="/bookings" 
                  className="site-mobile-nav__link site-mobile-nav__link--special"
                >
                  <Calendar className="site-mobile-nav__icon" />
                  <span>My Bookings</span>
                  {bookingsCount > 0 && (
                    <span className="site-mobile-nav__badge">
                      {bookingsCount}
                    </span>
                  )}
                </a>

                {/* Profile Link */}
                <a 
                  href="/profile" 
                  className="site-mobile-nav__link site-mobile-nav__link--special"
                >
                  <User className="site-mobile-nav__icon" />
                  <span>My Profile</span>
                </a>

                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="site-mobile-logout"
                >
                  <LogOut className="site-mobile-logout__icon" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="site-mobile-auth">
                <a 
                  href="/login" 
                  className="site-mobile-auth__login"
                >
                  Login
                </a>
                <a 
                  href="/signup" 
                  className="site-mobile-auth__register"
                >
                  Register
                </a>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
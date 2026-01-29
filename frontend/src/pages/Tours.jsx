
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Star, Filter, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import axios from 'axios';
import './Tours.css';

export default function Tours() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  
  // ✅ NEW: State for packages from database
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:3000/api';

  // ✅ Fetch packages from database on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/packages`);
      
      if (response.data.success) {
        setAllPackages(response.data.packages);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      setError('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  // Filter packages
  const filteredPackages = allPackages.filter(pkg => {
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || pkg.difficulty === selectedDifficulty;
    const matchesSearch = pkg.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesPrice = true;
    if (priceRange === 'budget') matchesPrice = pkg.price < 500;
    else if (priceRange === 'mid') matchesPrice = pkg.price >= 500 && pkg.price < 1000;
    else if (priceRange === 'luxury') matchesPrice = pkg.price >= 1000;

    return matchesCategory && matchesDifficulty && matchesSearch && matchesPrice;
  });

  // ✅ Loading state
  if (loading) {
    return (
      <div className="tours-page">
        <Navbar />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh' 
        }}>
          <div className="spinner"></div>
          <p style={{ marginLeft: '20px' }}>Loading packages...</p>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="tours-page">
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
            onClick={fetchPackages}
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
    <div className="tours-page">
      {/* Shared Navigation */}
      <Navbar />
      <ScrollToTop />

      {/* Hero Section */}
      <section className="tours-hero">
        <div className="tours-hero-content">
          <h1 className="tours-hero-title">Explore Our Tours</h1>
          <p className="tours-hero-subtitle">Discover amazing adventures across Nepal</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="tours-main">
        <div className="tours-container">
          {/* Filters Sidebar */}
          <aside className="tours-filters">
            <div className="filters-header">
              <Filter className="filter-icon" />
              <h3>Filters</h3>
            </div>

            {/* Search */}
            <div className="filter-group">
              <label className="filter-label">Search</label>
              <div className="search-input-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search tours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                <option value="trekking">Trekking</option>
                <option value="cultural">Cultural</option>
                <option value="adventure">Adventure</option>
                <option value="wildlife">Wildlife</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="filter-group">
              <label className="filter-label">Difficulty</label>
              <select 
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Levels</option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="difficult">Difficult</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <label className="filter-label">Price Range</label>
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Prices</option>
                <option value="budget">Budget (&lt; $500)</option>
                <option value="mid">Mid-Range ($500 - $1000)</option>
                <option value="luxury">Luxury ($1000+)</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button 
              className="reset-filters-btn"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setSearchQuery('');
                setPriceRange('all');
              }}
            >
              Reset Filters
            </button>
          </aside>

          {/* Tours Grid */}
          <section className="tours-content">
            <div className="tours-header">
              <h2 className="tours-count">
                {filteredPackages.length} {filteredPackages.length === 1 ? 'Tour' : 'Tours'} Available
              </h2>
            </div>

            {filteredPackages.length === 0 ? (
              <div className="no-results">
                <p>No tours found matching your criteria.</p>
                <button 
                  className="btn-reset"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                    setSearchQuery('');
                    setPriceRange('all');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="tours-grid">
                {filteredPackages.map((pkg) => (
                  <Link 
                    key={pkg._id} 
                    to={`/package/${pkg._id}`} 
                    className="tour-card-link"
                  >
                    <div className="tour-card">
                      <div className="tour-image-container">
                        <img 
                          src={pkg.image || '/images/default.jpg'} 
                          alt={pkg.title} 
                          className="tour-image" 
                        />
                        <div className="tour-badge">{pkg.category || 'Featured'}</div>
                      </div>
                      <div className="tour-content">
                        <h3 className="tour-title">{pkg.title}</h3>
                        <div className="tour-location">
                          <MapPin className="tour-icon" />
                          <span>{pkg.location || 'Nepal'}</span>
                        </div>
                        <p className="tour-description">
                          {pkg.description?.substring(0, 120)}...
                        </p>
                        
                        <div className="tour-meta">
                          <div className="tour-rating">
                            <Star className="star-icon" fill="#f97316" />
                            <span>{pkg.rating || 4.5}</span>
                            <span className="reviews-count">({pkg.reviews || 0})</span>
                          </div>
                          <div className="tour-duration">
                            <Calendar className="tour-icon" />
                            <span>{pkg.duration || 'N/A'}</span>
                          </div>
                        </div>

                        <div className="tour-footer">
                          <div className="tour-price">
                            <span className="price-from">From</span>
                            <span className="price-amount">NPR {pkg.price?.toLocaleString()}</span>
                          </div>
                          <button className="btn-view-details">View Details</button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
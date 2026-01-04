import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, Calendar, Star, Filter, Search } from 'lucide-react';
import './Tours.css';

// All available packages
const allPackages = [
  {
    id: 'pokhara',
    name: 'Pokhara',
    location: 'Pokhara Valley, Nepal',
    price: 299,
    duration: '5 Days',
    image: '/images/pokhara.jpg',
    rating: 4.8,
    reviews: 156,
    category: 'cultural',
    difficulty: 'easy',
    badge: 'Featured',
    description: 'Experience the beauty of Phewa Lake, Sarangkot sunrise, and the majestic Annapurna range.'
  },
  {
    id: 'manang',
    name: 'Manang',
    location: 'Manang District, Nepal',
    price: 499,
    duration: '7 Days',
    image: '/images/manang.jpg',
    rating: 4.9,
    reviews: 203,
    category: 'trekking',
    difficulty: 'moderate',
    badge: 'Popular',
    description: 'Trek through the Annapurna circuit and witness the stunning Himalayan landscapes and culture.'
  },
  {
    id: 'mustang',
    name: 'Upper Mustang',
    location: 'Upper Mustang, Nepal',
    price: 799,
    duration: '10 Days',
    image: '/images/mustang.jpg',
    rating: 5.0,
    reviews: 89,
    category: 'adventure',
    difficulty: 'difficult',
    badge: 'Adventure',
    description: 'Discover the forbidden kingdom with ancient caves, monasteries, and dramatic desert landscapes.'
  },
  {
    id: 'everest-base-camp',
    name: 'Everest Base Camp',
    location: 'Solukhumbu, Nepal',
    price: 1299,
    duration: '14 Days',
    image: '/images/everest.jpg',
    rating: 4.9,
    reviews: 342,
    category: 'trekking',
    difficulty: 'difficult',
    badge: 'Best Seller',
    description: 'Trek to the base of the world\'s highest mountain and experience the Sherpa culture.'
  },
  {
    id: 'annapurna-circuit',
    name: 'Annapurna Circuit',
    location: 'Annapurna Region, Nepal',
    price: 899,
    duration: '12 Days',
    image: '/images/annapurna.jpg',
    rating: 4.8,
    reviews: 278,
    category: 'trekking',
    difficulty: 'moderate',
    badge: 'Popular',
    description: 'Complete circuit of the Annapurna massif with diverse landscapes and culture.'
  },
  {
    id: 'chitwan-safari',
    name: 'Chitwan Safari',
    location: 'Chitwan National Park',
    price: 399,
    duration: '3 Days',
    image: '/images/chitwan.jpg',
    rating: 4.7,
    reviews: 189,
    category: 'wildlife',
    difficulty: 'easy',
    badge: 'Family Friendly',
    description: 'Experience wildlife safari, elephant rides, and jungle activities in UNESCO heritage site.'
  }
];

export default function Tours() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  // Filter packages
  const filteredPackages = allPackages.filter(pkg => {
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || pkg.difficulty === selectedDifficulty;
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesPrice = true;
    if (priceRange === 'budget') matchesPrice = pkg.price < 500;
    else if (priceRange === 'mid') matchesPrice = pkg.price >= 500 && pkg.price < 1000;
    else if (priceRange === 'luxury') matchesPrice = pkg.price >= 1000;

    return matchesCategory && matchesDifficulty && matchesSearch && matchesPrice;
  });

  return (
    <div className="tours-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <Link to="/" className="logo">
              <div className="logo-icon"></div>
              <span className="logo-text">HamroGhum</span>
            </Link>

            <div className="nav-menu">
              <Link to="/home" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/tours" className="nav-link active">Tours</Link>
              <Link to="/destinations" className="nav-link">Destinations</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>

            <div className="auth-buttons">
              <Link to="/login">
                <button className="btn-login">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn-register">Register</button>
              </Link>
            </div>

            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/tours" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Tours</Link>
            <Link to="/destinations" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Destinations</Link>
            <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
        )}
      </nav>

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
                    key={pkg.id} 
                    to={`/package/${pkg.id}`} 
                    className="tour-card-link"
                  >
                    <div className="tour-card">
                      <div className="tour-image-container">
                        <img src={pkg.image} alt={pkg.name} className="tour-image" />
                        <div className="tour-badge">{pkg.badge}</div>
                      </div>
                      <div className="tour-content">
                        <h3 className="tour-title">{pkg.name}</h3>
                        <div className="tour-location">
                          <MapPin className="tour-icon" />
                          <span>{pkg.location}</span>
                        </div>
                        <p className="tour-description">{pkg.description}</p>
                        
                        <div className="tour-meta">
                          <div className="tour-rating">
                            <Star className="star-icon" fill="#f97316" />
                            <span>{pkg.rating}</span>
                            <span className="reviews-count">({pkg.reviews})</span>
                          </div>
                          <div className="tour-duration">
                            <Calendar className="tour-icon" />
                            <span>{pkg.duration}</span>
                          </div>
                        </div>

                        <div className="tour-footer">
                          <div className="tour-price">
                            <span className="price-from">From</span>
                            <span className="price-amount">${pkg.price}</span>
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
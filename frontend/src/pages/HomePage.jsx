// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ChevronRight, Star, MapPin, Calendar, Users, Bookmark } from 'lucide-react';
// import './HomePage.css';
// import Navbar from '../components/Navbar';

// export default function HomePage() {



//   const handleHomeClick = (e) => {
//     e.preventDefault();
//     console.log('Home link clicked');
//     console.log('Current URL before click:', window.location.href);
//     window.location.href = '/home'; // Force navigation
//   };




//   return (
//     <div className="homepage">
//       {/* Shared Navigation */}
//       <Navbar />


//       {/* Rest of the component */}
//       <main className="main-content">
//         {/* Hero Section */}
//         <div className="hero-container">
//           <div className="hero-content">
//             <div className="hero-badge">
//               <span>✈️</span>
//               <span>Explore the world!</span>
//             </div>


//             <h1 className="hero-title">
//               Traveling opens the door<br />
//               to creating <span className="highlight">memories</span>
//             </h1>


//             <p className="hero-description">
//               Discover amazing destinations, create unforgettable experiences, and explore Nepal and beyond. We provide the best travel experiences.
//             </p>


//             <div className="hero-buttons">
//               <Link to="/tours" className="btn-primary">
//                 Find out more
//                 <ChevronRight className="icon-small" />
//               </Link>
//             </div>


//             <div className="stats-grid">
//               <div className="stat-item">
//                 <p className="stat-number">700+</p>
//                 <p className="stat-label">Destinations</p>
//               </div>
//               <div className="stat-item">
//                 <p className="stat-number">350+</p>
//                 <p className="stat-label">Hotels</p>
//               </div>
//               <div className="stat-item">
//                 <p className="stat-number">200+</p>
//                 <p className="stat-label">Tour Guides</p>
//               </div>
//             </div>
//           </div>
//         </div>


//         {/* Popular Packages Section */}
//         <section className="packages-section">
//           <div className="packages-container">
//             <div className="section-header">
//               <h2 className="section-title">Popular Packages</h2>
//               <p className="section-subtitle">Explore our most loved destinations in Nepal</p>
//             </div>


//             <div className="packages-grid">
//               {/* Pokhara Card */}
//               <Link to="/package/pokhara" className="package-card-link">
//                 <div className="package-card">
//                   <div className="package-image-container">
//                     <img src="/images/pokhara.jpg" alt="Pokhara" className="package-image" />
//                     <div className="package-badge">Featured</div>
//                   </div>
//                   <div className="package-content">
//                     <h3 className="package-title">Pokhara</h3>
//                     <p className="package-description">
//                       Experience the beauty of Phewa Lake, Sarangkot sunrise, and the majestic Annapurna range.
//                     </p>
//                     <div className="package-features">
//                       <div className="package-feature">
//                         <Calendar className="feature-icon" />
//                         <span>5 Days</span>
//                       </div>
//                       <div className="package-feature">
//                         <MapPin className="feature-icon" />
//                         <span>Pokhara Valley</span>
//                       </div>
//                     </div>
//                     <div className="package-footer">
//                       <div className="package-price">
//                         <span className="price-label">From</span>
//                         <span className="price-amount">NPR 41,860</span>
//                       </div>
//                       <button className="btn-book">Book Now</button>
//                     </div>
//                   </div>
//                 </div>
//               </Link>


//               {/* Manang Card */}
//               <Link to="/package/manang" className="package-card-link">
//                 <div className="package-card">
//                   <div className="package-image-container">
//                     <img src="/images/manang.jpg" alt="Manang" className="package-image" />
//                     <div className="package-badge">Popular</div>
//                   </div>
//                   <div className="package-content">
//                     <h3 className="package-title">Manang</h3>
//                     <p className="package-description">
//                       Trek through the Annapurna circuit and witness the stunning Himalayan landscapes and culture.
//                     </p>
//                     <div className="package-features">
//                       <div className="package-feature">
//                         <Calendar className="feature-icon" />
//                         <span>7 Days</span>
//                       </div>
//                       <div className="package-feature">
//                         <MapPin className="feature-icon" />
//                         <span>Manang District</span>
//                       </div>
//                     </div>
//                     <div className="package-footer">
//                       <div className="package-price">
//                         <span className="price-label">From</span>
//                         <span className="price-amount">NPR 69,860</span>
//                       </div>
//                       <button className="btn-book">Book Now</button>
//                     </div>
//                   </div>
//                 </div>
//               </Link>


//               {/* Mustang Card */}
//               <Link to="/package/mustang" className="package-card-link">
//                 <div className="package-card">
//                   <div className="package-image-container">
//                     <img src="/images/Mustang.jpg" alt="Mustang" className="package-image" />
//                     <div className="package-badge">Adventure</div>
//                   </div>
//                   <div className="package-content">
//                     <h3 className="package-title">Mustang</h3>
//                     <p className="package-description">
//                       Discover the forbidden kingdom with ancient caves, monasteries, and dramatic desert landscapes.
//                     </p>
//                     <div className="package-features">
//                       <div className="package-feature">
//                         <Calendar className="feature-icon" />
//                         <span>10 Days</span>
//                       </div>
//                       <div className="package-feature">
//                         <MapPin className="feature-icon" />
//                         <span>Upper Mustang</span>
//                       </div>
//                     </div>
//                     <div className="package-footer">
//                       <div className="package-price">
//                         <span className="price-label">From</span>
//                         <span className="price-amount">NPR 111,860</span>
//                       </div>
//                       <button className="btn-book">Book Now</button>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* Popular Destinations Section */}
// <section className="packages-section">
//   <div className="packages-container">
//     <div className="section-header">
//       <h2 className="section-title">Popular Destinations</h2>
//       <p className="section-subtitle">Discover the most visited places in Nepal</p>
//     </div>

//     <div className="packages-grid">
//       {/* Kathmandu Card */}
//       <Link to="/destination/kathmandu" className="package-card-link">
//         <div className="package-card">
//           <div className="package-image-container">
//             <img src="/images/kathmandu.jpg" alt="Kathmandu" className="package-image" />
//             <div className="package-badge">Capital City</div>
//           </div>
//           <div className="package-content">
//             <h3 className="package-title">Kathmandu</h3>
//             <p className="package-description">
//               Explore ancient temples, vibrant markets, and UNESCO World Heritage Sites in Nepal's capital.
//             </p>
//             <div className="package-features">
//               <div className="package-feature">
//                 <Star className="feature-icon" />
//                 <span>4.8 Rating</span>
//               </div>
//               <div className="package-feature">
//                 <Users className="feature-icon" />
//                 <span>5,200+ Visitors</span>
//               </div>
//             </div>
//             <div className="package-footer">
//               <div className="package-price">
//                 <span className="price-label">Starting at</span>
//                 <span className="price-amount">NPR 25,000</span>
//               </div>
//               <button className="btn-book">Explore</button>
//             </div>
//           </div>
//         </div>
//       </Link>

//       {/* Chitwan Card */}
//       <Link to="/destination/chitwan" className="package-card-link">
//         <div className="package-card">
//           <div className="package-image-container">
//             <img src="/images/chitwan.jpg" alt="Chitwan" className="package-image" />
//             <div className="package-badge">Wildlife</div>
//           </div>
//           <div className="package-content">
//             <h3 className="package-title">Chitwan</h3>
//             <p className="package-description">
//               Experience jungle safaris, spot rare wildlife, and enjoy elephant rides in Chitwan National Park.
//             </p>
//             <div className="package-features">
//               <div className="package-feature">
//                 <Star className="feature-icon" />
//                 <span>4.9 Rating</span>
//               </div>
//               <div className="package-feature">
//                 <Users className="feature-icon" />
//                 <span>3,800+ Visitors</span>
//               </div>
//             </div>
//             <div className="package-footer">
//               <div className="package-price">
//                 <span className="price-label">Starting at</span>
//                 <span className="price-amount">NPR 35,000</span>
//               </div>
//               <button className="btn-book">Explore</button>
//             </div>
//           </div>
//         </div>
//       </Link>

//       {/* Lumbini Card */}
//       <Link to="/destination/lumbini" className="package-card-link">
//         <div className="package-card">
//           <div className="package-image-container">
//             <img src="/images/lumbini.jpg" alt="Lumbini" className="package-image" />
//             <div className="package-badge">Spiritual</div>
//           </div>
//           <div className="package-content">
//             <h3 className="package-title">Lumbini</h3>
//             <p className="package-description">
//               Visit the birthplace of Lord Buddha and explore sacred gardens, monasteries, and monuments.
//             </p>
//             <div className="package-features">
//               <div className="package-feature">
//                 <Star className="feature-icon" />
//                 <span>4.7 Rating</span>
//               </div>
//               <div className="package-feature">
//                 <Users className="feature-icon" />
//                 <span>4,100+ Visitors</span>
//               </div>
//             </div>
//             <div className="package-footer">
//               <div className="package-price">
//                 <span className="price-label">Starting at</span>
//                 <span className="price-amount">NPR 28,000</span>
//               </div>
//               <button className="btn-book">Explore</button>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   </div>
// </section>

//       </main>
//     </div>
//   );
// }



// frontend/src/pages/Tours.jsx (or HomePage.jsx)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Star, Filter, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
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

  const API_URL = 'http://localhost:5000/api';

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
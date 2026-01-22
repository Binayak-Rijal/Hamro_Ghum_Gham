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


// frontend/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, MapPin, Calendar, Users, Bookmark } from 'lucide-react';
import './HomePage.css';
import Navbar from '../components/Navbar';
import axios from 'axios';

export default function HomePage() {
  // ✅ State for popular packages from database
  const [popularPackages, setPopularPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api';

  // ✅ Fetch popular packages on component mount
  useEffect(() => {
    fetchPopularPackages();
  }, []);

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

  return (
    <div className="homepage">
      {/* Shared Navigation */}
      <Navbar />

      {/* Rest of the component */}
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

        {/* Popular Packages Section - NOW FROM DATABASE */}
        <section className="packages-section">
          <div className="packages-container">
            <div className="section-header">
              <h2 className="section-title">Popular Packages</h2>
              <p className="section-subtitle">Explore our most loved destinations in Nepal</p>
            </div>

            {/* Loading State */}
            {loading && (
              <div style={{ 
                textAlign: 'center', 
                padding: '4rem 0',
                color: '#6b7280'
              }}>
                <p style={{ fontSize: '1.125rem' }}>Loading popular packages...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div style={{ 
                textAlign: 'center', 
                padding: '4rem 0'
              }}>
                <p style={{ color: '#ef4444', fontSize: '1.125rem', marginBottom: '1rem' }}>
                  {error}
                </p>
                <button 
                  onClick={fetchPopularPackages}
                  className="btn-primary"
                  style={{ display: 'inline-flex' }}
                >
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
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  color: '#111827', 
                  marginBottom: '1rem',
                  fontWeight: '700'
                }}>
                  No Popular Packages Available Yet
                </h3>
                <p style={{ 
                  color: '#6b7280', 
                  marginBottom: '1.5rem',
                  fontSize: '1rem'
                }}>
                  We're currently adding amazing tour packages. Popular packages include: 
                  Pokhara, Mustang, Manang, Everest Base Camp, and Annapurna Base Camp.
                </p>
                <Link 
                  to="/tours" 
                  className="btn-primary"
                  style={{ display: 'inline-flex' }}
                >
                  View All Tours
                  <ChevronRight className="icon-small" />
                </Link>
              </div>
            )}

            {/* Popular Packages Grid - FROM DATABASE */}
            {!loading && !error && popularPackages.length > 0 && (
              <div className="packages-grid">
                {popularPackages.map((pkg) => (
                  <Link 
                    key={pkg._id} 
                    to={`/package/${pkg._id}`} 
                    className="package-card-link"
                  >
                    <div className="package-card">
                      <div className="package-image-container">
                        <img 
                          src={pkg.image || '/images/default.jpg'} 
                          alt={pkg.title} 
                          className="package-image"
                          onError={(e) => {
                            e.target.src = '/images/default.jpg';
                          }}
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

        {/* Popular Destinations Section - KEEP AS IS (STATIC) */}
        <section className="packages-section">
          <div className="packages-container">
            <div className="section-header">
              <h2 className="section-title">Popular Destinations</h2>
              <p className="section-subtitle">Discover the most visited places in Nepal</p>
            </div>

            <div className="packages-grid">
              {/* Kathmandu Card */}
              <Link to="/destination/kathmandu" className="package-card-link">
                <div className="package-card">
                  <div className="package-image-container">
                    <img src="/images/kathmandu.jpg" alt="Kathmandu" className="package-image" />
                    <div className="package-badge">Capital City</div>
                  </div>
                  <div className="package-content">
                    <h3 className="package-title">Kathmandu</h3>
                    <p className="package-description">
                      Explore ancient temples, vibrant markets, and UNESCO World Heritage Sites in Nepal's capital.
                    </p>
                    <div className="package-features">
                      <div className="package-feature">
                        <Star className="feature-icon" />
                        <span>4.8 Rating</span>
                      </div>
                      <div className="package-feature">
                        <Users className="feature-icon" />
                        <span>5,200+ Visitors</span>
                      </div>
                    </div>
                    <div className="package-footer">
                      <div className="package-price">
                        <span className="price-label">Starting at</span>
                        <span className="price-amount">NPR 25,000</span>
                      </div>
                      <button className="btn-book">Explore</button>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Chitwan Card */}
              <Link to="/destination/chitwan" className="package-card-link">
                <div className="package-card">
                  <div className="package-image-container">
                    <img src="/images/chitwan.jpg" alt="Chitwan" className="package-image" />
                    <div className="package-badge">Wildlife</div>
                  </div>
                  <div className="package-content">
                    <h3 className="package-title">Chitwan</h3>
                    <p className="package-description">
                      Experience jungle safaris, spot rare wildlife, and enjoy elephant rides in Chitwan National Park.
                    </p>
                    <div className="package-features">
                      <div className="package-feature">
                        <Star className="feature-icon" />
                        <span>4.9 Rating</span>
                      </div>
                      <div className="package-feature">
                        <Users className="feature-icon" />
                        <span>3,800+ Visitors</span>
                      </div>
                    </div>
                    <div className="package-footer">
                      <div className="package-price">
                        <span className="price-label">Starting at</span>
                        <span className="price-amount">NPR 35,000</span>
                      </div>
                      <button className="btn-book">Explore</button>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Lumbini Card */}
              <Link to="/destination/lumbini" className="package-card-link">
                <div className="package-card">
                  <div className="package-image-container">
                    <img src="/images/lumbini.jpg" alt="Lumbini" className="package-image" />
                    <div className="package-badge">Spiritual</div>
                  </div>
                  <div className="package-content">
                    <h3 className="package-title">Lumbini</h3>
                    <p className="package-description">
                      Visit the birthplace of Lord Buddha and explore sacred gardens, monasteries, and monuments.
                    </p>
                    <div className="package-features">
                      <div className="package-feature">
                        <Star className="feature-icon" />
                        <span>4.7 Rating</span>
                      </div>
                      <div className="package-feature">
                        <Users className="feature-icon" />
                        <span>4,100+ Visitors</span>
                      </div>
                    </div>
                    <div className="package-footer">
                      <div className="package-price">
                        <span className="price-label">Starting at</span>
                        <span className="price-amount">NPR 28,000</span>
                      </div>
                      <button className="btn-book">Explore</button>
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
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import './Destinations.css';

const destinations = [
  {
    id: 'kathmandu',
    name: 'Kathmandu',
    location: 'Kathmandu Valley, Nepal',
    image: '/images/kathmandu.jpg',
    rating: 4.8,
    visitors: '5,200+',
    price: 25000,
    badge: 'Capital City',
    description: 'Explore ancient temples, vibrant markets, and UNESCO World Heritage Sites in Nepal\'s capital.'
  },
  {
    id: 'pokhara',
    name: 'Pokhara',
    location: 'Pokhara Valley, Nepal',
    image: '/images/pokhara.jpg',
    rating: 4.9,
    visitors: '6,500+',
    price: 30000,
    badge: 'Adventure',
    description: 'Experience lakeside beauty, mountain views, and adventure sports in Nepal\'s tourism capital.'
  },
  {
    id: 'chitwan',
    name: 'Chitwan National Park',
    location: 'Chitwan District, Nepal',
    image: '/images/chitwan.jpg',
    rating: 4.9,
    visitors: '3,800+',
    price: 35000,
    badge: 'Wildlife',
    description: 'Experience jungle safaris, spot rare wildlife, and enjoy elephant rides in Chitwan National Park.'
  },
  {
    id: 'lumbini',
    name: 'Lumbini',
    location: 'Lumbini Province, Nepal',
    image: '/images/lumbini.jpg',
    rating: 4.7,
    visitors: '4,100+',
    price: 28000,
    badge: 'Spiritual',
    description: 'Visit the birthplace of Lord Buddha and explore sacred gardens, monasteries, and monuments.'
  }
];

export default function Destinations() {
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
              <p className="section-subtitle">Choose from our handpicked destinations</p>
            </div>

            <div className="destinations-grid">
              {destinations.map((destination) => (
                <Link 
                  key={destination.id} 
                  to={`/destination/${destination.id}`} 
                  className="destination-card"
                >
                  <div className="destination-image-container">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="destination-image"
                    />
                    <div className="destination-badge">{destination.badge}</div>
                  </div>
                  
                  <div className="destination-content">
                    <h3 className="destination-name">{destination.name}</h3>
                    
                    <div className="destination-location">
                      <MapPin className="location-icon" />
                      <span>{destination.location}</span>
                    </div>
                    
                    <p className="destination-description">
                      {destination.description}
                    </p>
                    
                    <div className="destination-meta">
                      <div className="destination-rating">
                        <Star className="star-icon" fill="#f97316" />
                        <span>{destination.rating}</span>
                      </div>
                      <div className="destination-visitors">
                        <Users className="users-icon" />
                        <span>{destination.visitors} Visitors</span>
                      </div>
                    </div>
                    
                    <div className="destination-footer">
                      <div className="destination-price">
                        <span className="price-label">Starting at</span>
                        <span className="price-amount">NPR {destination.price.toLocaleString()}</span>
                      </div>
                      <button className="destination-button">
                        Explore
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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
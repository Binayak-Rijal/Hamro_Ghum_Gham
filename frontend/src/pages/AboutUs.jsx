import React from 'react';
import { Mountain, Compass, Heart, Users, Shield, Star, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import './AboutUs.css';
//smalll adjustments made in AboutUs.css for better styling
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ScrollToTop />

      <div className="about-hero">
        <Mountain className="w-20 h-20 mx-auto mb-6" />
        <h1>Hamro Ghum Gham</h1>
        <p>Your trusted companion for unforgettable adventures across Nepal</p>
      </div>

      <div style={{ maxWidth: '75rem', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div className="story-card">
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            Our Story
          </h2>
          <p className="story-text">
            Welcome to Hamro Ghum Gham – where every journey tells a story and every traveler becomes part of our family. We're not just another travel website; we're your personal gateway to experiencing the magic, mystery, and majesty of Nepal.
          </p>
          <p className="story-text">
            Founded by passionate locals who have spent their lives exploring every corner of this beautiful nation, we understand what makes Nepal truly special. From the snow-capped peaks of the Himalayas to the bustling streets of Kathmandu, from ancient temples to hidden mountain villages, we know the paths less traveled and the experiences that will stay with you forever.
          </p>
          <p className="story-text">
            Our mission is simple: to make your Nepal adventure seamless, authentic, and absolutely unforgettable. Whether you're a solo backpacker, a family seeking adventure, or a group of friends ready to explore, we've got you covered with expert guidance, local insights, and personalized service every step of the way.
          </p>
        </div>

        <h2 className="section-title">Why Choose Us</h2>
        <p className="section-subtitle">
          We combine local expertise with modern convenience to create the perfect travel experience
        </p>

        <div className="feature-grid">
          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="feature-title">Local Experts</h3>
            <p className="feature-desc">
              Our team consists of experienced local guides who know Nepal like the back of their hands
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h3 className="feature-title">Personalized Care</h3>
            <p className="feature-desc">
              Every traveler is unique, and we tailor each journey to match your interests and style
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="feature-title">Safe & Secure</h3>
            <p className="feature-desc">
              Your safety is our priority with trusted partners and comprehensive support throughout
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h3 className="feature-title">Unforgettable Experiences</h3>
            <p className="feature-desc">
              We create moments and memories that you'll cherish for a lifetime
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <Compass className="w-10 h-10 text-white" />
            </div>
            <h3 className="feature-title">Hidden Gems</h3>
            <p className="feature-desc">
              Discover secret spots and authentic experiences beyond the typical tourist trail
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <Mountain className="w-10 h-10 text-white" />
            </div>
            <h3 className="feature-title">Adventure Awaits</h3>
            <p className="feature-desc">
              From trekking to cultural tours, we offer diverse adventures for every type of explorer
            </p>
          </div>
        </div>

        <div className="stats-section">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '1rem' }}>
            Our Journey in Numbers
          </h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Happy Travelers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">75+</div>
              <div className="stat-label">Destinations</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">12+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        <div className="mission-box">
          <div className="mission-title">Our Promise to You</div>
          <p className="mission-text">
            We promise to treat your journey with the same care and passion we would our own. Every recommendation, every guide, every experience is carefully selected to ensure you see Nepal not just as a tourist, but as a traveler who truly connects with the heart and soul of this incredible country.
          </p>
        </div>

        <div className="social-section">
          <h2 className="section-title">Connect With Us</h2>
          <p className="section-subtitle">
            Follow us on social media for travel inspiration, tips, and updates
          </p>
          <div className="social-cards">
            <a href="https://www.facebook.com/hamroghum" target="_blank" rel="noopener noreferrer" className="social-card">
              <div className="social-icon-wrapper facebook">
                <Facebook className="w-12 h-12" />
              </div>
              <h3 className="social-title">Facebook</h3>
              <p className="social-desc">Follow our page for daily travel updates</p>
            </a>

            <a href="https://www.instagram.com/hamroghum" target="_blank" rel="noopener noreferrer" className="social-card">
              <div className="social-icon-wrapper instagram">
                <Instagram className="w-12 h-12" />
              </div>
              <h3 className="social-title">Instagram</h3>
              <p className="social-desc">See beautiful moments from our travelers</p>
            </a>

            <a href="https://www.twitter.com/hamroghum" target="_blank" rel="noopener noreferrer" className="social-card">
              <div className="social-icon-wrapper twitter">
                <Twitter className="w-12 h-12" />
              </div>
              <h3 className="social-title">Twitter/X</h3>
              <p className="social-desc">Get latest news and announcements</p>
            </a>
          </div>
        </div>

        <div className="cta-box">
          <h2 className="cta-title">Ready to Explore Nepal?</h2>
          <p className="cta-text">
            Join thousands of travelers who have trusted us to create their dream Nepal adventure. Your journey of a lifetime starts here.
          </p>
          <button className="cta-button">
            Start Your Adventure Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

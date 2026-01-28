import React from 'react';
import { Mountain, Compass, Heart, Users, Shield, Star } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .about-hero {
          background: linear-gradient(135deg, #ff6b00 0%, #ff4500 50%, #ff1493 100%);
          padding: 5rem 1rem;
          text-align: center;
          color: white;
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .section-subtitle {
          font-size: 1.125rem;
          color: #6b7280;
          text-align: center;
          max-width: 48rem;
          margin: 0 auto 3rem;
          line-height: 1.75;
        }
        
        .story-card {
          background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
          border-radius: 1.5rem;
          padding: 2.5rem;
          margin-bottom: 3rem;
          border: 3px solid #fed7aa;
        }
        
        .story-text {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #374151;
          margin-bottom: 1rem;
        }
        
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .feature-box {
          background: white;
          border: 3px solid #fed7aa;
          border-radius: 1.25rem;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .feature-box:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(249, 115, 22, 0.2);
          border-color: #fb923c;
        }
        
        .feature-icon-wrapper {
          width: 5rem;
          height: 5rem;
          background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }
        
        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.75rem;
        }
        
        .feature-desc {
          font-size: 1rem;
          color: #6b7280;
          line-height: 1.6;
        }
        
        .stats-section {
          background: linear-gradient(135deg, #ff6b00 0%, #ff4500 50%, #ff1493 100%);
          border-radius: 1.5rem;
          padding: 3rem 2rem;
          margin: 4rem 0;
          color: white;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .stat-label {
          font-size: 1.125rem;
          font-weight: 600;
          opacity: 0.95;
        }
        
        .mission-box {
          background: white;
          border: 4px solid #fb923c;
          border-radius: 1.5rem;
          padding: 3rem;
          margin: 3rem 0;
          text-align: center;
        }
        
        .mission-title {
          font-size: 2rem;
          font-weight: 800;
          color: #f97316;
          margin-bottom: 1.5rem;
        }
        
        .mission-text {
          font-size: 1.25rem;
          color: #374151;
          line-height: 1.8;
        }
        
        .cta-box {
          background: linear-gradient(135deg, #fff7ed 0%, #fce7f3 100%);
          border-radius: 1.5rem;
          padding: 3rem;
          text-align: center;
          margin-top: 4rem;
        }
        
        .cta-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        
        .cta-text {
          font-size: 1.25rem;
          color: #6b7280;
          margin-bottom: 2rem;
          max-width: 40rem;
          margin-left: auto;
          margin-right: auto;
        }
        
        .cta-button {
          all: unset;
          display: inline-block;
          padding: 1.25rem 3rem;
          background: linear-gradient(135deg, #f97316 0%, #ec4899 100%);
          color: white;
          font-size: 1.25rem;
          font-weight: 700;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(249, 115, 22, 0.3);
          box-sizing: border-box;
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(249, 115, 22, 0.4);
        }
      `}</style>

      <div className="about-hero">
        <Mountain className="w-20 h-20 mx-auto mb-6" />
        <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '1.5rem' }}>
          Hamro Ghum Gham
        </h1>
        <p style={{ fontSize: '1.5rem', maxWidth: '50rem', margin: '0 auto', opacity: '0.95' }}>
          Your trusted companion for unforgettable adventures across Nepal
        </p>
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
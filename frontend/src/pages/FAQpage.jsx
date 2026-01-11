import React from 'react';
import { Search, ArrowRight, MapPin, Compass, Camera, Calendar, MessageCircle, Globe, Heart, Users } from 'lucide-react';
import './FAQpage.css';

function FAQpage() {
  const faqCategories = [
    {
      icon: <MapPin size={24} />,
      title: "About Hamro Ghum Gham",
      description: "Learn about our journey and how we can help you explore Nepal."
    },
    {
      icon: <Compass size={24} />,
      title: "Tour Packages",
      description: "Discover amazing destinations and customized tour packages."
    },
    {
      icon: <Calendar size={24} />,
      title: "Booking & Planning",
      description: "Everything you need to know about booking and planning your trip."
    },
    {
      icon: <Camera size={24} />,
      title: "Travel Experience",
      description: "Get the most out of your journey with our expert guidance."
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Customer Support",
      description: "24/7 assistance for all your travel queries and concerns."
    },
    {
      icon: <Globe size={24} />,
      title: "Destinations Guide",
      description: "Explore comprehensive guides for top tourist destinations."
    },
    {
      icon: <Heart size={24} />,
      title: "Travel Insurance",
      description: "Stay protected with our travel insurance options."
    },
    {
      icon: <Users size={24} />,
      title: "Group Tours",
      description: "Join group tours or customize packages for your group."
    }
  ];

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <MapPin size={28} />
            <span>Hamro Ghum Gham</span>
          </div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#destinations">Destinations</a>
            <a href="#packages">Packages</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <button className="btn-get-started">Book Now</button>
            <div className="user-avatar">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="User" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Looking for help? Here are our<br />
            most frequently asked questions.
          </h1>
          <p className="hero-description">
            Everything you need to know about Hamro Ghum Gham and our services. 
            Can't find the answer to a question you have? No worries, just click 
            'I've got a question' or 'Chat to our team'!
          </p>
        </div>
        <div className="search-box">
          <Search size={20} />
          <input type="text" placeholder="Search" />
        </div>
      </section>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn-question">
          <span>I've got a question</span>
          <ArrowRight size={20} />
        </button>
        <button className="btn-chat">
          <span>Chat to our team</span>
          <ArrowRight size={20} />
        </button>
      </div>

      {/* FAQ Categories Grid */}
      <section className="faq-categories">
        {faqCategories.map((category, index) => (
          <div key={index} className="faq-card">
            <div className="faq-icon">{category.icon}</div>
            <h3 className="faq-card-title">{category.title}</h3>
            <p className="faq-card-description">{category.description}</p>
          </div>
        ))}
      </section>

      {/* General FAQs Section */}
      <section className="general-faqs">
        <h2 className="general-faqs-title">General FAQs</h2>
        <p className="general-faqs-description">
          Everything you need to know about our services. Can't find an answer?{' '}
          <a href="#chat">Chat to our team</a>.
        </p>
      </section>
    </div>
  );
}

export default FAQpage;
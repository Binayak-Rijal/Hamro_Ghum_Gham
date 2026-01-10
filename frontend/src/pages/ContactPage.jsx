import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './ContactPage.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    email: '',
    message: '',
    screenshot: null
  });
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      screenshot: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // For now, just show success message (backend will be added later)
    alert('Message sent successfully!');
    
    // Reset form
    setFormData({
      category: '',
      name: '',
      email: '',
      message: '',
      screenshot: null
    });
    setCharCount(0);
  };

  return (
    <div className="contact-page">
      {/* Shared Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="contact-main">
        <div className="contact-container">
          {/* Header Section */}
          <div className="contact-header">
            <div className="contact-illustration">
              <svg viewBox="0 0 400 300" className="illustration-svg">
                {/* Laptop */}
                <rect x="80" y="120" width="240" height="140" rx="8" fill="#1f2937" />
                <rect x="90" y="130" width="220" height="120" fill="#ffffff" />
                
                {/* Email icon on screen */}
                <path d="M 150 170 L 200 200 L 250 170 L 250 210 L 150 210 Z" fill="#f97316" />
                <circle cx="130" cy="160" r="15" fill="#fed7aa" />
                <path d="M 130 150 L 130 170" stroke="#f97316" strokeWidth="3" />
                <circle cx="270" cy="160" r="15" fill="#fed7aa" />
                <path d="M 265 155 L 275 165 M 275 155 L 265 165" stroke="#f97316" strokeWidth="3" />
                
                {/* Decorative elements */}
                <circle cx="320" cy="80" r="20" fill="#fed7aa" />
                <path d="M 310 80 L 320 70 L 330 80" stroke="#f97316" strokeWidth="3" fill="none" />
                <circle cx="80" cy="60" r="25" fill="#fed7aa" />
                <circle cx="80" cy="60" r="15" fill="#f97316" />
              </svg>
            </div>
            
            <div className="contact-text">
              <h1 className="contact-title">
                Have questions?<br />
                Shoot us an email.
              </h1>
              <p className="contact-subtitle">
                We are here to help you plan your perfect journey. Get the latest updates about tours, destinations, and travel tips for Nepal.
              </p>
              <p className="contact-description">
                Have a question for us or feedback? Please select the most appropriate category and fill out the form to reach us.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="contact-form-section">
            <h2 className="form-section-title">How can we help?</h2>
            
            <div className="form-layout">
              <div className="category-list">
                <div 
                  className={`category-item ${formData.category === 'booking' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, category: 'booking' }))}
                >
                  <span className="category-number">1.</span>
                  <span className="category-text">I want to book a tour</span>
                </div>
                <div 
                  className={`category-item ${formData.category === 'inquiry' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, category: 'inquiry' }))}
                >
                  <span className="category-number">2.</span>
                  <span className="category-text">General inquiry</span>
                </div>
                <div 
                  className={`category-item ${formData.category === 'feedback' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, category: 'feedback' }))}
                >
                  <span className="category-number">3.</span>
                  <span className="category-text">Feedback or suggestions</span>
                </div>
                <div 
                  className={`category-item ${formData.category === 'custom' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, category: 'custom' }))}
                >
                  <span className="category-number">4.</span>
                  <span className="category-text">Custom tour package</span>
                </div>
                <div 
                  className={`category-item ${formData.category === 'partner' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, category: 'partner' }))}
                >
                  <span className="category-number">5.</span>
                  <span className="category-text">Partnership opportunities</span>
                </div>
                <div 
                  className={`category-item ${formData.category === 'support' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, category: 'support' }))}
                >
                  <span className="category-number">6.</span>
                  <span className="category-text">Technical support</span>
                </div>
                <div 
                  className={`category-item ${formData.category === 'other' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, category: 'other' }))}
                >
                  <span className="category-number">7.</span>
                  <span className="category-text">Something else</span>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    name="category" 
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="booking">I want to book a tour</option>
                    <option value="inquiry">General inquiry</option>
                    <option value="feedback">Feedback or suggestions</option>
                    <option value="custom">Custom tour package</option>
                    <option value="partner">Partnership opportunities</option>
                    <option value="support">Technical support</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Email <span className="required">*</span></label>
                  <input 
                    type="email" 
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message <span className="required">*</span></label>
                  <textarea 
                    name="message"
                    className="form-textarea"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <span className="char-count">{charCount} characters</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Screenshot (optional)</label>
                  <div className="file-upload">
                    <input 
                      type="file" 
                      id="screenshot"
                      className="file-input"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="screenshot" className="file-label">
                      Click or drop files to upload.
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn-submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Star, Bookmark, Phone, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import './DestinationDetail.css';
import BookingConfirmation from '../components/BookingConfirmation';

// Destinations data
const destinationsData = {
  kathmandu: {
    id: 'kathmandu',
    name: 'Kathmandu',
    location: 'Kathmandu Valley, Nepal',
    price: 180,
    image: '/images/kathmandu.jpg',
    rating: 4.8,
    reviews: 5200,
    description: 'Explore the vibrant capital city of Nepal, where ancient temples meet modern culture. Kathmandu is a UNESCO World Heritage Site filled with historic monuments, bustling markets, and spiritual sanctuaries.',
    highlights: [
      'Swayambhunath Stupa (Monkey Temple)',
      'Pashupatinath Temple',
      'Boudhanath Stupa',
      'Durbar Square',
      'Thamel Market',
      'Garden of Dreams'
    ],
    attractions: [
      { name: 'Swayambhunath Stupa', description: 'Ancient religious architecture atop a hill with panoramic valley views', time: '2-3 hours' },
      { name: 'Pashupatinath Temple', description: 'Sacred Hindu temple on the banks of Bagmati River', time: '2 hours' },
      { name: 'Boudhanath Stupa', description: 'One of the largest spherical stupas in Nepal and the world', time: '1-2 hours' },
      { name: 'Kathmandu Durbar Square', description: 'Historic palace complex with museums and temples', time: '3 hours' },
      { name: 'Thamel', description: 'Tourist hub with shops, restaurants, and nightlife', time: 'Full day' }
    ],
    bestTimeToVisit: 'October to December, March to May',
    thingsToDo: [
      'Visit UNESCO World Heritage Sites',
      'Explore ancient temples and monasteries',
      'Shop for handicrafts at Thamel',
      'Try authentic Nepali cuisine',
      'Attend cultural performances',
      'Take a cooking class'
    ],
    included: [
      '3 nights accommodation',
      'Daily breakfast',
      'Airport transfers',
      'Guided city tour',
      'All entrance fees',
      'Local transport'
    ],
    excluded: [
      'International flights',
      'Lunch and dinner',
      'Personal expenses',
      'Travel insurance',
      'Tips for guides'
    ]
  },

  chitwan: {
    id: 'chitwan',
    name: 'Chitwan National Park',
    location: 'Chitwan District, Nepal',
    price: 250,
    image: '/images/chitwan.jpg',
    rating: 4.9,
    reviews: 3800,
    description: 'Experience the wild side of Nepal at Chitwan National Park, home to endangered species like the one-horned rhinoceros and Bengal tiger. Enjoy jungle safaris, elephant rides, and immerse yourself in Tharu culture.',
    highlights: [
      'Jungle Safari (Jeep/Elephant)',
      'One-horned Rhinoceros sightings',
      'Bird watching (500+ species)',
      'Tharu cultural dance',
      'Canoe ride on Rapti River',
      'Elephant breeding center'
    ],
    attractions: [
      { name: 'Jungle Safari', description: 'Explore the dense forest on elephant back or jeep', time: '3-4 hours' },
      { name: 'Elephant Breeding Center', description: 'Learn about elephant conservation efforts', time: '1-2 hours' },
      { name: 'Rapti River Canoe Ride', description: 'Peaceful river journey spotting crocodiles and birds', time: '1 hour' },
      { name: 'Tharu Village Visit', description: 'Experience indigenous Tharu culture and traditions', time: '2 hours' },
      { name: 'Bird Watching', description: 'Over 500 bird species including endangered vultures', time: 'Morning/Evening' }
    ],
    bestTimeToVisit: 'October to March (Dry season)',
    thingsToDo: [
      'Jungle safari on elephant or jeep',
      'Canoe ride down Rapti River',
      'Watch Tharu cultural dance',
      'Visit elephant breeding center',
      'Bird watching tours',
      'Nature walks with guides'
    ],
    included: [
      '2 nights jungle resort stay',
      'All meals included',
      'Jungle safari activities',
      'Canoe ride',
      'Cultural performance',
      'National park fees',
      'Professional guide'
    ],
    excluded: [
      'Transportation to Chitwan',
      'Alcoholic beverages',
      'Personal expenses',
      'Tips for guides',
      'Travel insurance'
    ]
  },

  lumbini: {
    id: 'lumbini',
    name: 'Lumbini',
    location: 'Lumbini Province, Nepal',
    price: 200,
    image: '/images/lumbini.jpg',
    rating: 4.7,
    reviews: 4100,
    description: 'Visit the birthplace of Lord Buddha, one of the most sacred pilgrimage sites for Buddhists worldwide. Lumbini offers a serene environment with monasteries, temples, and the sacred Maya Devi Temple.',
    highlights: [
      'Maya Devi Temple (Buddha birthplace)',
      'Ashoka Pillar',
      'Sacred Garden',
      'International monasteries',
      'Lumbini Museum',
      'World Peace Pagoda'
    ],
    attractions: [
      { name: 'Maya Devi Temple', description: 'The exact birthplace of Siddhartha Gautama (Buddha)', time: '1-2 hours' },
      { name: 'Ashoka Pillar', description: 'Ancient stone pillar erected by Emperor Ashoka', time: '30 minutes' },
      { name: 'Sacred Garden', description: 'Peaceful gardens surrounding the birthplace', time: '1 hour' },
      { name: 'Lumbini Museum', description: 'Artifacts and history of Buddhism', time: '1-2 hours' },
      { name: 'International Monasteries', description: 'Buddhist monasteries from different countries', time: '2-3 hours' }
    ],
    bestTimeToVisit: 'October to March, September to November',
    thingsToDo: [
      'Visit Maya Devi Temple',
      'Meditate in Sacred Garden',
      'Explore international monasteries',
      'Visit Lumbini Museum',
      'Attend prayer ceremonies',
      'Cycle through the complex'
    ],
    included: [
      '2 nights hotel accommodation',
      'Daily breakfast',
      'Guided monastery tour',
      'Bicycle rental',
      'All entrance fees',
      'Airport/Bus station pickup'
    ],
    excluded: [
      'Lunch and dinner',
      'Personal expenses',
      'Travel insurance',
      'Tips for guides',
      'Transportation to Lumbini'
    ]
  },

  pokhara: {
    id: 'pokhara',
    name: 'Pokhara',
    location: 'Pokhara Valley, Nepal',
    price: 220,
    image: '/images/pokhara.jpg',
    rating: 4.9,
    reviews: 6500,
    description: 'The adventure capital and second-largest city of Nepal, nestled beside the tranquil Phewa Lake with stunning views of the Annapurna range. Perfect blend of nature, adventure, and relaxation.',
    highlights: [
      'Phewa Lake boating',
      'Sarangkot sunrise view',
      'World Peace Pagoda',
      'Paragliding adventures',
      'Davis Falls',
      'Mountain Museum'
    ],
    attractions: [
      { name: 'Phewa Lake', description: 'Serene lake with boating and lakeside cafes', time: '2-3 hours' },
      { name: 'Sarangkot', description: 'Hilltop viewpoint for stunning Himalayan sunrise', time: 'Early morning' },
      { name: 'World Peace Pagoda', description: 'Buddhist stupa with panoramic valley views', time: '2 hours' },
      { name: 'Davis Falls', description: 'Unique waterfall that flows into underground cave', time: '1 hour' },
      { name: 'International Mountain Museum', description: 'History of mountaineering and Himalayas', time: '1-2 hours' }
    ],
    bestTimeToVisit: 'September to November, March to May',
    thingsToDo: [
      'Boating on Phewa Lake',
      'Sunrise at Sarangkot',
      'Paragliding experience',
      'Visit World Peace Pagoda',
      'Explore caves and waterfalls',
      'Shopping at lakeside markets'
    ],
    included: [
      '3 nights lakeside hotel',
      'Daily breakfast',
      'Phewa Lake boat ride',
      'City sightseeing tour',
      'All entrance fees',
      'Airport transfers'
    ],
    excluded: [
      'Paragliding (optional)',
      'Lunch and dinner',
      'Personal expenses',
      'Travel insurance',
      'Adventure activities'
    ]
  }
};

// ✅ Helper function for auth headers
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function DestinationDetail() {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // ✅ UPDATED: Save state
  const [isSaved, setIsSaved] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedInquiry, setConfirmedInquiry] = useState(null);
  const [inquiryData, setInquiryData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    guests: 2,
    message: ''
  });
  const [errors, setErrors] = useState({});

  const destinationInfo = destinationsData[destinationId];

  // ✅ UPDATED: Check if saved on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    if (destinationId && isAuthenticated()) {
      checkIfSavedInDB();
    } else {
      setIsCheckingStatus(false);
    }
  }, [destinationId]);

  // ✅ NEW: Check saved status from database
  const checkIfSavedInDB = async () => {
    try {
      setIsCheckingStatus(true);
      const response = await axios.get(
        `http://localhost:3000/api/saved/check/${destinationId}/destination`,
        { headers: getAuthHeader() }
      );
      
      if (response.data.success) {
        setIsSaved(response.data.isSaved);
      }
    } catch (error) {
      console.error('Error checking saved status:', error);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  // ✅ UPDATED: Toggle save/unsave using database
const handleSaveToggle = async () => {
  if (!isAuthenticated()) {
    toast.info('Please login to save destinations');
    navigate('/login');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No authentication token found. Please login again.');
      navigate('/login');
      return;
    }

    if (isSaved) {
      // Remove destination from saved
      const response = await axios.delete(
        `http://localhost:3000/api/saved/${destinationId}/destination`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setIsSaved(false);
        toast.success('Destination removed from saved items');

        // 🔄 Update navbar
        window.dispatchEvent(new Event('savedItemsChanged'));
      }
    } else {
      // Add destination to saved
      const response = await axios.post(
        'http://localhost:3000/api/saved',
        {
          itemId: destinationInfo.id,
          itemType: 'destination',
          name: destinationInfo.name,
          location: destinationInfo.location,
          price: destinationInfo.price,
          image: destinationInfo.image,
          rating: destinationInfo.rating
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setIsSaved(true);
        toast.success('Destination saved successfully!');

        // 🔄 Update navbar
        window.dispatchEvent(new Event('savedItemsChanged'));
      }
    }
  } catch (error) {
    console.error('Save toggle error:', error);

    if (error.response?.status === 401) {
      toast.error('Your session has expired. Please login again.');
      navigate('/login');
    } else if (error.response?.status === 400) {
      toast.error(error.response.data.message || 'Item already saved');
    } else {
      toast.error('Failed to update saved status. Please check your connection and try again.');
    }
  }
};


  if (!destinationInfo) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Destination not found</h2>
        <Link to="/">Go back to home</Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInquiryData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!inquiryData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!inquiryData.email.trim()) newErrors.email = 'Email is required';
    if (!inquiryData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!inquiryData.date) newErrors.date = 'Date is required';
    if (inquiryData.guests < 1) newErrors.guests = 'At least 1 guest required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ FIXED: Added missing closing brace
  const handleInquiry = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      toast.info('Please login to send inquiry');
      navigate('/login');
      return;
    }

    if (validateForm()) {
      setConfirmedInquiry({
        packageName: destinationInfo.name,
        date: inquiryData.date,
        guests: inquiryData.guests,
        email: inquiryData.email,
        phone: inquiryData.phone,
        total: destinationInfo.price * inquiryData.guests
      });
      setShowConfirmation(true);
      
      // Reset form
      setInquiryData({
        fullName: '',
        email: '',
        phone: '',
        date: '',
        guests: 2,
        message: ''
      });
    }
  }; // ✅ FIXED: Added this closing brace

  return (
    <div className="destination-detail-page">
      <ScrollToTop />
      {/* Shared Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="destination-detail-main">
        <div className="destination-detail-container">
          <div className="destination-detail-grid">
            {/* Left Side - Destination Details */}
            <div className="destination-info">
              {/* Hero Image */}
              <div className="destination-hero-image">
                <img src={destinationInfo.image} alt={destinationInfo.name} />
                <button 
                  className={`save-button ${isSaved ? 'saved' : ''}`}
                  onClick={handleSaveToggle}
                  title={isSaved ? 'Remove from saved' : 'Save destination'}
                  disabled={isCheckingStatus}
                >
                  <Bookmark 
                    className="bookmark-icon" 
                    fill={isSaved ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              {/* Destination Header */}
              <div className="destination-header">
                <h1 className="destination-name">{destinationInfo.name}</h1>
                <div className="destination-meta">
                  <div className="destination-rating">
                    <Star className="star-icon" fill="#f97316" />
                    <span>{destinationInfo.rating}</span>
                    <span className="review-count">({destinationInfo.reviews} reviews)</span>
                  </div>
                  <div className="destination-location">
                    <MapPin className="meta-icon" />
                    <span>{destinationInfo.location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <section className="destination-section">
                <h2 className="section-title">Overview</h2>
                <p className="destination-description">{destinationInfo.description}</p>
              </section>

              {/* Highlights */}
              <section className="destination-section">
                <h2 className="section-title">Highlights</h2>
                <ul className="highlights-list">
                  {destinationInfo.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </section>

              {/* Top Attractions */}
              <section className="destination-section">
                <h2 className="section-title">Top Attractions</h2>
                <div className="attractions-list">
                  {destinationInfo.attractions.map((attraction, index) => (
                    <div key={index} className="attraction-item">
                      <div className="attraction-header">
                        <h3 className="attraction-name">{attraction.name}</h3>
                        <span className="attraction-time">{attraction.time}</span>
                      </div>
                      <p className="attraction-description">{attraction.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Best Time & Things To Do */}
              <section className="destination-section">
                <div className="info-grid">
                  <div>
                    <h2 className="section-title">Best Time to Visit</h2>
                    <p className="best-time">{destinationInfo.bestTimeToVisit}</p>
                  </div>
                  <div>
                    <h2 className="section-title">Things To Do</h2>
                    <ul className="things-list">
                      {destinationInfo.thingsToDo.map((thing, index) => (
                        <li key={index}>{thing}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Included/Excluded */}
              <section className="destination-section">
                <div className="included-excluded-grid">
                  <div>
                    <h2 className="section-title">What's Included</h2>
                    <ul className="included-list">
                      {destinationInfo.included.map((item, index) => (
                        <li key={index}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="section-title">What's Excluded</h2>
                    <ul className="excluded-list">
                      {destinationInfo.excluded.map((item, index) => (
                        <li key={index}>✗ {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Side - Inquiry Card */}
            <div className="inquiry-sidebar">
              <div className="inquiry-card">
                <div className="inquiry-price">
                  <span className="price-amount">${destinationInfo.price}</span>
                  <span className="price-per">/per person</span>
                </div>

                <form onSubmit={handleInquiry} className="inquiry-form">
                  <h3 className="inquiry-title">Send Inquiry</h3>

                  <div className="form-group">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      value={inquiryData.fullName}
                      onChange={handleInputChange}
                      className={`inquiry-input ${errors.fullName ? 'error' : ''}`}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={inquiryData.email}
                      onChange={handleInputChange}
                      className={`inquiry-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={inquiryData.phone}
                      onChange={handleInputChange}
                      className={`inquiry-input ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="date"
                        name="date"
                        value={inquiryData.date}
                        onChange={handleInputChange}
                        className={`inquiry-input ${errors.date ? 'error' : ''}`}
                      />
                      {errors.date && <span className="error-text">{errors.date}</span>}
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        name="guests"
                        placeholder="Guests"
                        min="1"
                        value={inquiryData.guests}
                        onChange={handleInputChange}
                        className={`inquiry-input ${errors.guests ? 'error' : ''}`}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Your message (optional)"
                      value={inquiryData.message}
                      onChange={handleInputChange}
                      className="inquiry-textarea"
                      rows="3"
                    />
                  </div>

                  <button type="submit" className="inquiry-btn">
                    Send Inquiry
                  </button>
                </form>

                {/* Contact Info */}
                <div className="contact-info">
                  <div className="contact-item">
                    <Phone className="contact-icon" />
                    <span>+977-1-4567890</span>
                  </div>
                  <div className="contact-item">
                    <Mail className="contact-icon" />
                    <span>info@hamroghum.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ✅ Booking Confirmation Popup */}
      {showConfirmation && confirmedInquiry && (
        <BookingConfirmation
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          bookingDetails={confirmedInquiry}
        />
      )}
    </div>
  );
}
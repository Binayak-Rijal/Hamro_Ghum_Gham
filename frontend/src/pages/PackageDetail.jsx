import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Clock, Star, Bookmark } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import BookingConfirmation from '../components/BookingConfirmation';
import Navbar from '../components/Navbar';
import axios from 'axios';
import './PackageDetail.css';

// Package data (unchanged)
const packagesData = {
  "everest-base-camp": {
    id: 'everest-base-camp',
    name: 'Everest Base Camp',
    location: 'Solukhumbu, Nepal',
    price: 1299,
    duration: '14 Days',
    image: '/images/everest.jpg',
    rating: 4.9,
    reviews: 342,
    description:
      'Trek to the base of the world\'s highest mountain and experience breathtaking Himalayan views, Sherpa culture, and iconic landmarks like Namche Bazaar and Tengboche Monastery.',
    highlights: [
      'Everest Base Camp (5,364m)',
      'Kala Patthar sunrise view',
      'Sherpa culture and monasteries',
      'Namche Bazaar exploration',
      'Sagarmatha National Park',
      'Scenic Lukla flight'
    ],
    itinerary: [
      { day: 1, title: 'Fly to Lukla', description: 'Flight to Lukla and trek to Phakding' },
      { day: 2, title: 'Phakding to Namche', description: 'Trek through suspension bridges' },
      { day: 3, title: 'Acclimatization Day', description: 'Explore Namche Bazaar' },
      { day: 4, title: 'Namche to Tengboche', description: 'Visit Tengboche Monastery' },
      { day: 5, title: 'Tengboche to Dingboche', description: 'Mountain views all around' },
      { day: 6, title: 'Acclimatization', description: 'Rest and short hikes' },
      { day: 7, title: 'Lobuche', description: 'High altitude trekking' },
      { day: 8, title: 'Everest Base Camp', description: 'Reach EBC and return to Gorakshep' },
      { day: 9, title: 'Kala Patthar', description: 'Sunrise view & descent' },
      { day: 10, title: 'Return Trek', description: 'Trek back to Namche' },
      { day: 11, title: 'Namche to Lukla', description: 'Final trekking day' },
      { day: 12, title: 'Fly to Kathmandu', description: 'End of trek' }
    ],
    included: [
      'Domestic flights',
      'Tea house accommodation',
      'All meals during trek',
      'Professional guide & porter',
      'National park permit',
      'TIMS card'
    ],
    excluded: [
      'International flight',
      'Travel insurance',
      'Personal expenses',
      'Tips'
    ]
  },

  "annapurna-circuit": {
    id: 'annapurna-circuit',
    name: 'Annapurna Circuit',
    location: 'Annapurna Region, Nepal',
    price: 899,
    duration: '12 Days',
    image: '/images/annapurna.jpg',
    rating: 4.8,
    reviews: 278,
    description:
      'A classic Himalayan trek offering diverse landscapes, mountain views, and cultural villages including Thorong La Pass.',
    highlights: [
      'Thorong La Pass (5,416m)',
      'Manang village',
      'Hot springs at Tatopani',
      'Mountain panoramas',
      'Cultural villages'
    ],
    itinerary: [
      { day: 1, title: 'Drive to Besisahar', description: 'Start of trek' },
      { day: 2, title: 'Chame Trek', description: 'Enter Manang region' },
      { day: 3, title: 'Manang', description: 'Acclimatization day' },
      { day: 4, title: 'Yak Kharka', description: 'Gradual ascent' },
      { day: 5, title: 'Thorong Phedi', description: 'Prepare for pass' },
      { day: 6, title: 'Thorong La Pass', description: 'Cross highest pass' },
      { day: 7, title: 'Muktinath', description: 'Holy temple visit' },
      { day: 8, title: 'Jomsom', description: 'Descent and relax' },
      { day: 9, title: 'Return to Pokhara', description: 'End of trek' }
    ],
    included: [
      'Accommodation',
      'Meals during trek',
      'Guide and porter',
      'All permits',
      'Transport'
    ],
    excluded: [
      'Flights',
      'Personal gear',
      'Insurance',
      'Tips'
    ]
  },

  "chitwan-safari": {
    id: 'chitwan-safari',
    name: 'Chitwan Safari',
    location: 'Chitwan National Park, Nepal',
    price: 399,
    duration: '3 Days',
    image: '/images/chitwan.jpg',
    rating: 4.7,
    reviews: 189,
    description:
      'Enjoy wildlife adventures in Nepal\'s most famous national park. Experience jungle safaris, elephant rides, and Tharu culture.',
    highlights: [
      'Jeep safari',
      'Elephant breeding center',
      'Canoeing',
      'Bird watching',
      'Tharu cultural dance'
    ],
    itinerary: [
      { day: 1, title: 'Arrival', description: 'Check-in & cultural program' },
      { day: 2, title: 'Safari Day', description: 'Jeep safari & canoe ride' },
      { day: 3, title: 'Departure', description: 'Breakfast and return' }
    ],
    included: [
      'Hotel stay',
      'All meals',
      'Safari activities',
      'Guide',
      'National park fees'
    ],
    excluded: [
      'Transportation to Chitwan',
      'Personal expenses',
      'Tips'
    ]
  },

  pokhara: {
    id: 'pokhara',
    name: 'Pokhara',
    location: 'Pokhara Valley, Nepal',
    price: 299,
    duration: '5 Days',
    image: '/images/pokhara.jpg',
    rating: 4.8,
    reviews: 156,
    description: 'Experience the serene beauty of Pokhara, the gateway to the Annapurna region. Enjoy stunning views of Phewa Lake, witness magical sunrises from Sarangkot, and explore the vibrant lakeside city.',
    highlights: [
      'Sunrise view from Sarangkot',
      'Boating in Phewa Lake',
      'Visit to World Peace Pagoda',
      'Paragliding experience (optional)',
      'Davis Falls and Gupteshwor Cave',
      'International Mountain Museum'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Pokhara', description: 'Check-in at hotel, evening lakeside walk' },
      { day: 2, title: 'Sarangkot Sunrise', description: 'Early morning sunrise, paragliding, city tour' },
      { day: 3, title: 'Lake Activities', description: 'Boating, World Peace Pagoda, Davis Falls' },
      { day: 4, title: 'Adventure Day', description: 'Optional activities - zip-lining, bungee jumping' },
      { day: 5, title: 'Departure', description: 'Last minute shopping and departure' }
    ],
    included: [
      '4 nights accommodation',
      'Daily breakfast',
      'Airport transfers',
      'Guided city tour',
      'All entrance fees'
    ],
    excluded: [
      'International flights',
      'Lunch and dinner',
      'Personal expenses',
      'Travel insurance',
      'Optional activities'
    ]
  },
  manang: {
    id: 'manang',
    name: 'Manang',
    location: 'Manang District, Nepal',
    price: 499,
    duration: '7 Days',
    image: '/images/manang.jpg',
    rating: 4.9,
    reviews: 203,
    description: 'Trek through the stunning Annapurna circuit and discover the hidden gem of Manang. Experience authentic Himalayan culture, breathtaking mountain views, and ancient monasteries.',
    highlights: [
      'Annapurna Circuit trekking',
      'Visit ancient Manang village',
      'Tilicho Lake excursion',
      'Gangapurna Glacier',
      'Buddhist monasteries',
      'Acclimatization hikes'
    ],
    itinerary: [
      { day: 1, title: 'Drive to Besisahar', description: 'Start journey, overnight at Besisahar' },
      { day: 2, title: 'Trek to Jagat', description: 'Begin trekking through beautiful valleys' },
      { day: 3, title: 'Jagat to Dharapani', description: 'Continue trek, stunning mountain views' },
      { day: 4, title: 'Dharapani to Chame', description: 'Enter Manang district' },
      { day: 5, title: 'Chame to Manang', description: 'Reach Manang village' },
      { day: 6, title: 'Acclimatization Day', description: 'Rest day, explore Manang' },
      { day: 7, title: 'Return Journey', description: 'Drive back to Kathmandu' }
    ],
    included: [
      '6 nights tea house accommodation',
      'All meals during trek',
      'Experienced trekking guide',
      'Porter service',
      'All permits and fees',
      'Transportation'
    ],
    excluded: [
      'International flights',
      'Travel insurance',
      'Personal trekking gear',
      'Tips for guide and porter',
      'Emergency evacuation'
    ]
  },
  mustang: {
    id: 'mustang',
    name: 'Upper Mustang',
    location: 'Upper Mustang, Nepal',
    price: 799,
    duration: '10 Days',
    image: '/images/Mustang.jpg',
    rating: 5.0,
    reviews: 89,
    description: 'Explore the forbidden kingdom of Upper Mustang, a restricted area that offers a glimpse into ancient Tibetan culture. Discover dramatic desert landscapes, ancient caves, and centuries-old monasteries.',
    highlights: [
      'Visit Lo Manthang (walled city)',
      'Ancient cave dwellings',
      'Tibetan Buddhist monasteries',
      'Unique desert landscape',
      'Choser Cave exploration',
      'Traditional Mustangi culture'
    ],
    itinerary: [
      { day: 1, title: 'Fly to Jomsom', description: 'Scenic flight from Pokhara' },
      { day: 2, title: 'Jomsom to Kagbeni', description: 'Enter restricted area' },
      { day: 3, title: 'Kagbeni to Chele', description: 'Trek through unique landscape' },
      { day: 4, title: 'Chele to Syangboche', description: 'Visit ancient villages' },
      { day: 5, title: 'Syangboche to Ghami', description: 'Explore monasteries' },
      { day: 6, title: 'Ghami to Lo Manthang', description: 'Reach the walled city' },
      { day: 7, title: 'Explore Lo Manthang', description: 'Full day exploration' },
      { day: 8, title: 'Lo Manthang to Yara', description: 'Visit Choser caves' },
      { day: 9, title: 'Yara to Jomsom', description: 'Return journey' },
      { day: 10, title: 'Fly to Pokhara', description: 'End of trek' }
    ],
    included: [
      '9 nights tea house accommodation',
      'All meals during trek',
      'Expert local guide',
      'Porter service',
      'Restricted Area Permit',
      'TIMS and ACAP permits',
      'Flights (Pokhara-Jomsom-Pokhara)'
    ],
    excluded: [
      'International flights',
      'Kathmandu-Pokhara flights',
      'Travel insurance',
      'Personal expenses',
      'Tips and gratuities',
      'Emergency evacuation'
    ]
  }
};

// ✅ Helper function for auth headers
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function PackageDetail() {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 
  
  // ✅ UPDATED: Save state
  const [isSaved, setIsSaved] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [bookingData, setBookingData] = useState({
    fullName: '',
    phone: '',
    date: '',
    guests: 1
  });
  const [errors, setErrors] = useState({});

  const packageInfo = packagesData[packageId];

  // ✅ UPDATED: Check if saved on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    if (packageId && isAuthenticated()) {
      checkIfSavedInDB();
    } else {
      setIsCheckingStatus(false);
    }
  }, [packageId]);

  // ✅ NEW: Check saved status from database
  const checkIfSavedInDB = async () => {
    try {
      setIsCheckingStatus(true);
      const response = await axios.get(
        `http://localhost:5000/api/saved/check/${packageId}/package`,
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

  // ✅ UPDATED: Toggle save/unsave using database WITH TOASTIFY
  const handleSaveToggle = async () => {
    if (!isAuthenticated()) {
      toast.error('Please login to save packages');
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
        // Remove from saved
        const response = await axios.delete(
          `http://localhost:5000/api/saved/${packageId}/package`,
          { 
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.data.success) {
          setIsSaved(false);
          toast.success('Package removed from saved items');
          
          // Dispatch event to update navbar
          window.dispatchEvent(new Event('savedItemsChanged'));
        }
      } else {
        // Add to saved
        const response = await axios.post(
          'http://localhost:5000/api/saved',
          {
            itemId: packageInfo.id,
            itemType: 'package',
            name: packageInfo.name,
            location: packageInfo.location,
            price: packageInfo.price,
            duration: packageInfo.duration,
            image: packageInfo.image,
            rating: packageInfo.rating
          },
          { 
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setIsSaved(true);
          toast.success('Package saved successfully!');
          
          // Dispatch event to update navbar
          window.dispatchEvent(new Event('savedItemsChanged'));
        }
      }
    } catch (error) {
      console.error('Save toggle error:', error);
      
      if (error.response?.status === 401) {
        toast.error('Your session has expired. Please login again.');
        navigate('/login');
      } else if (error.response?.status === 400) {
        toast.warning(error.response.data.message || 'Item already saved');
      } else {
        toast.error('Failed to update saved status. Please check your connection and try again.');
      }
    }
  };

  if (!packageInfo) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Package not found</h2>
        <Link to="/">Go back to home</Link>
      </div>
    );
  }

  const serviceCharge = 10;
  const subtotal = packageInfo.price * bookingData.guests;
  const total = subtotal + serviceCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 1 : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // ✅ FIXED: Improved validation function
  const validateForm = () => {
    const newErrors = {};
    
    // Full Name Validation
    if (!bookingData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (bookingData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    // Phone Validation - accept numbers like 980001101
    const phoneRegex = /^[0-9]{9,15}$/;
    const phoneDigits = bookingData.phone.replace(/\D/g, '');
    if (!bookingData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(phoneDigits)) {
      newErrors.phone = 'Please enter a valid phone number (9-15 digits)';
    }
    
    // Date Validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(bookingData.date);
    
    if (!bookingData.date) {
      newErrors.date = 'Date is required';
    } else if (selectedDate < today) {
      newErrors.date = 'Please select a future date';
    }
    
    // Guests Validation
    if (bookingData.guests < 1 || isNaN(bookingData.guests)) {
      newErrors.guests = 'At least 1 guest is required';
    } else if (bookingData.guests > 20) {
      newErrors.guests = 'Maximum 20 guests allowed';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ FIXED: Handle booking with correct field names WITH TOASTIFY
  const handleBookNow = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      toast.error('Please login to book packages');
      navigate('/login');
      return;
    }

    // Validate form
    if (!validateForm()) {
      return; // Don't proceed if validation fails
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/bookings',
        {
          packageId: packageInfo.id,
          packageName: packageInfo.name,
          fullName: bookingData.fullName,
          phone: bookingData.phone.replace(/\D/g, ''), // Clean phone number
          travelDate: bookingData.date, // Changed from 'date' to 'travelDate'
          numberOfPeople: bookingData.guests, // Changed from 'guests' to 'numberOfPeople'
          subtotal,
          serviceCharge,
          totalPrice: total
        },
        { headers: getAuthHeader() }
      );

      if (response.data.success) {
        // ✅ Show popup instead of toast
        setConfirmedBooking({
          packageName: packageInfo.name,
          date: bookingData.date,
          guests: bookingData.guests,
          duration: packageInfo.duration,
          phone: bookingData.phone,
          total: total
        });
        setShowConfirmation(true);
        
        // Reset form
        setBookingData({
          fullName: '',
          phone: '',
          date: '',
          guests: 1
        });
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  return (
    <div className="package-detail-page">
      {/* Shared Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="package-detail-main">
        <div className="package-detail-container">
          <div className="package-detail-grid">
            {/* Left Side - Package Details */}
            <div className="package-info">
              {/* Hero Image */}
              <div className="package-hero-image">
                <img src={packageInfo.image} alt={packageInfo.name} />
                <div className="play-button">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                {/* Save/Bookmark Button */}
                <button 
                  className={`save-button ${isSaved ? 'saved' : ''}`}
                  onClick={handleSaveToggle}
                  title={isSaved ? 'Remove from saved' : 'Save package'}
                  disabled={isCheckingStatus}
                >
                  <Bookmark 
                    className="bookmark-icon" 
                    fill={isSaved ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              {/* Package Header */}
              <div className="package-header">
                <h1 className="package-name">{packageInfo.name}</h1>
                <div className="package-meta">
                  <div className="package-rating">
                    <Star className="star-icon" fill="#f97316" />
                    <span>{packageInfo.rating}</span>
                    <span className="review-count">({packageInfo.reviews} reviews)</span>
                  </div>
                  <div className="package-location">
                    <MapPin className="meta-icon" />
                    <span>{packageInfo.location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <section className="package-section">
                <h2 className="section-title">Overview</h2>
                <p className="package-description">{packageInfo.description}</p>
              </section>

              {/* Highlights */}
              <section className="package-section">
                <h2 className="section-title">Highlights</h2>
                <ul className="highlights-list">
                  {packageInfo.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </section>

              {/* Itinerary */}
              <section className="package-section">
                <h2 className="section-title">Itinerary</h2>
                <div className="itinerary-list">
                  {packageInfo.itinerary.map((item) => (
                    <div key={item.day} className="itinerary-item">
                      <div className="itinerary-day">Day {item.day}</div>
                      <div className="itinerary-content">
                        <h3 className="itinerary-title">{item.title}</h3>
                        <p className="itinerary-description">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Included/Excluded */}
              <section className="package-section">
                <div className="included-excluded-grid">
                  <div>
                    <h2 className="section-title">What's Included</h2>
                    <ul className="included-list">
                      {packageInfo.included.map((item, index) => (
                        <li key={index}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="section-title">What's Excluded</h2>
                    <ul className="excluded-list">
                      {packageInfo.excluded.map((item, index) => (
                        <li key={index}>✗ {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Side - Booking Card */}
            <div className="booking-sidebar">
              <div className="booking-card">
                <div className="booking-price">
                  <span className="price-amount">${packageInfo.price}</span>
                  <span className="price-per">/per person</span>
                </div>

                <form onSubmit={handleBookNow} className="booking-form">
                  <h3 className="booking-title">Information</h3>

                  <div className="form-group">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      value={bookingData.fullName}
                      onChange={handleInputChange}
                      className={`booking-input ${errors.fullName ? 'error' : ''}`}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone (e.g., 980001101)"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      className={`booking-input ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="date"
                        name="date"
                        value={bookingData.date}
                        onChange={handleInputChange}
                        className={`booking-input ${errors.date ? 'error' : ''}`}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.date && <span className="error-text">{errors.date}</span>}
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        name="guests"
                        placeholder="Guests"
                        min="1"
                        max="20"
                        value={bookingData.guests}
                        onChange={handleInputChange}
                        className={`booking-input ${errors.guests ? 'error' : ''}`}
                      />
                      {errors.guests && <span className="error-text">{errors.guests}</span>}
                    </div>
                  </div>

                  <div className="price-breakdown">
                    <div className="price-row">
                      <span>${packageInfo.price} × {bookingData.guests} person</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="price-row">
                      <span>Service charge</span>
                      <span>${serviceCharge}</span>
                    </div>
                    <div className="price-row total">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>

                  <button type="submit" className="book-now-btn">
                    Book Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ✅ Booking Confirmation Popup */}
      {showConfirmation && confirmedBooking && (
        <BookingConfirmation
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          bookingDetails={confirmedBooking}
        />
      )}
    </div>
  );
}
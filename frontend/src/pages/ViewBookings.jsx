import React from 'react';
import './ViewBookings.css';

function ViewBookings() {
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('all');
  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    const mockData = [
      {
        id: 1,
        packageName: "Everest Base Camp Trek",
        destination: "Everest Region, Nepal",
        date: "2026-03-15",
        numberOfPeople: 4,
        duration: "14 Days 13 Nights",
        email: "john.doe@example.com",
        phone: "+977 9841234567",
        specialRequests: "Need vegetarian meals",
        totalPrice: 125000,
        status: "confirmed",
        type: "Package",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80"
      },
      {
        id: 2,
        packageName: "Annapurna Circuit",
        destination: "Annapurna Region",
        date: "2026-04-20",
        numberOfPeople: 2,
        duration: "12 Days 11 Nights",
        email: "jane@example.com",
        phone: "+977 9851234567",
        totalPrice: 98000,
        status: "pending",
        type: "Package",
        image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80"
      },
      {
        id: 3,
        packageName: "Pokhara Tour",
        destination: "Pokhara",
        date: "2025-12-20",
        numberOfPeople: 3,
        duration: "3 Days 2 Nights",
        email: "mike@example.com",
        phone: "+977 9861234567",
        totalPrice: 35000,
        status: "completed",
        type: "Destination",
        image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80"
      }
    ];

    setTimeout(() => {
      setBookings(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCancel = (id) => {
    if (window.confirm('Cancel this booking?')) {
      setBookings(bookings.map(b => b.id === id ? {...b, status: 'cancelled'} : b));
    }
  };

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  const filteredBookings = bookings.filter(b => {
    const date = new Date(b.date);
    const now = new Date();
    if (filter === 'upcoming') return date >= now;
    if (filter === 'past') return date < now;
    return true;
  });

  if (loading) {
    return (
      <div className="bookings-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <div className="header-content">
          <h1 className="fade-in">My Bookings</h1>
          <p className="fade-in-delay">View and manage your travel adventures</p>
        </div>
        <div className="header-stats fade-in-delay-2">
          <div className="stat-card">
            <div className="stat-number">{bookings.length}</div>
            <div className="stat-label">Total Bookings</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{bookings.filter(b => b.status === 'confirmed').length}</div>
            <div className="stat-label">Confirmed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{bookings.filter(b => new Date(b.date) >= new Date()).length}</div>
            <div className="stat-label">Upcoming</div>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-tabs">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            <span>All Bookings</span>
            <span className="badge">{bookings.length}</span>
          </button>
          <button className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`} onClick={() => setFilter('upcoming')}>
            <span>Upcoming</span>
            <span className="badge">{bookings.filter(b => new Date(b.date) >= new Date()).length}</span>
          </button>
          <button className={`filter-btn ${filter === 'past' ? 'active' : ''}`} onClick={() => setFilter('past')}>
            <span>Past</span>
            <span className="badge">{bookings.filter(b => new Date(b.date) < new Date()).length}</span>
          </button>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="no-bookings">
          <div className="no-bookings-icon">📦</div>
          <h2>No bookings found</h2>
          <p>Start exploring amazing destinations!</p>
          <button className="explore-btn" onClick={() => window.location.href = '/'}>Explore Destinations</button>
        </div>
      ) : (
        <div className="bookings-grid">
          {filteredBookings.map((booking, idx) => (
            <div key={booking.id} className="booking-card" style={{animationDelay: `${idx * 0.1}s`}}>
              <div className="booking-image-wrapper">
                <img src={booking.image} alt={booking.packageName} className="booking-image" />
                <div className="image-overlay">
                  <div className={`booking-status ${getStatusClass(booking.status)}`}>
                    <span>{booking.status}</span>
                  </div>
                </div>
              </div>

              <div className="booking-content">
                <div className="booking-header-info">
                  <div className="booking-type-badge">
                    <span>📦 {booking.type}</span>
                  </div>
                </div>

                <h3 className="booking-title">{booking.packageName}</h3>

                <div className="booking-details-grid">
                  <div className="detail-item">
                    <div className="detail-icon">📍</div>
                    <div className="detail-text">
                      <span className="detail-label">Location</span>
                      <span className="detail-value">{booking.destination}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">📅</div>
                    <div className="detail-text">
                      <span className="detail-label">Date</span>
                      <span className="detail-value">{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">👥</div>
                    <div className="detail-text">
                      <span className="detail-label">People</span>
                      <span className="detail-value">{booking.numberOfPeople} People</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-icon">⏱️</div>
                    <div className="detail-text">
                      <span className="detail-label">Duration</span>
                      <span className="detail-value">{booking.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="booking-footer">
                  <div className="booking-price">
                    <span className="price-label">Total Price</span>
                    <span className="price-value">NPR {booking.totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="booking-actions">
                  <button className="btn-view" onClick={() => { setSelectedBooking(booking); setShowModal(true); }}>
                    View Details
                  </button>
                  {booking.status === 'confirmed' && (
                    <button className="btn-cancel" onClick={() => handleCancel(booking.id)}>Cancel</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedBooking && (
        <div className="modal-overlay active" onClick={() => setShowModal(false)}>
          <div className="modal-content active" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>

            <div className="modal-header">
              <h2>{selectedBooking.packageName}</h2>
              <div className={`booking-status ${getStatusClass(selectedBooking.status)}`}>
                <span>{selectedBooking.status}</span>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedBooking.image} alt={selectedBooking.packageName} />
              </div>

              <div className="modal-details">
                <h3>Booking Details</h3>
                <div className="modal-info-grid">
                  <div className="info-item">
                    <span>📍</span>
                    <div>
                      <strong>Location</strong>
                      <p>{selectedBooking.destination}</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <span>📅</span>
                    <div>
                      <strong>Date</strong>
                      <p>{new Date(selectedBooking.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <span>👥</span>
                    <div>
                      <strong>People</strong>
                      <p>{selectedBooking.numberOfPeople} People</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <span>⏱️</span>
                    <div>
                      <strong>Duration</strong>
                      <p>{selectedBooking.duration}</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <span>📧</span>
                    <div>
                      <strong>Email</strong>
                      <p>{selectedBooking.email}</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <span>📱</span>
                    <div>
                      <strong>Phone</strong>
                      <p>{selectedBooking.phone}</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <span>💳</span>
                    <div>
                      <strong>Total Price</strong>
                      <p className="modal-price">NPR {selectedBooking.totalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {selectedBooking.specialRequests && (
                  <div className="special-requests-modal">
                    <h4>Special Requests</h4>
                    <p>{selectedBooking.specialRequests}</p>
                  </div>
                )}

                <div className="booking-id-modal">Booking ID: #{selectedBooking.id}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewBookings;
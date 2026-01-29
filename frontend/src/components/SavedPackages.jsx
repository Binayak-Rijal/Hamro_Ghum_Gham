import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, MapPin, Calendar, Star, Trash2, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import ScrollToTop from './ScrollToTop';
import './SavedPackages.css';

// Helper function for auth
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function SavedPackages() {
  const [savedPackages, setSavedPackages] = useState([]);
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // all, packages, destinations
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is logged in
    if (!isAuthenticated()) {
      toast.error('Please login to view saved items');
      navigate('/login');
      return;
    }
    
    loadSavedItems();
  }, []);

  // Load saved items from database
  const loadSavedItems = async () => {
    try {
      setLoading(true);
      
      // Fetch all saved items
      const response = await axios.get(
        'http://localhost:3000/api/saved',
        { headers: getAuthHeader() }
      );

      if (response.data.success) {
        const items = response.data.data;
        
        // Separate packages and destinations
        const packages = items.filter(item => item.itemType === 'package');
        const destinations = items.filter(item => item.itemType === 'destination');
        
        setSavedPackages(packages);
        setSavedDestinations(destinations);
      }
    } catch (error) {
      console.error('Error loading saved items:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else {
        toast.error('Failed to load saved items');
      }
    } finally {
      setLoading(false);
    }
  };

  // Remove a single item
  const handleRemove = async (itemId, itemType) => {
    if (!window.confirm(`Remove this ${itemType} from saved items?`)) return;

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/saved/${itemId}/${itemType}`,
        { headers: getAuthHeader() }
      );

      if (response.data.success) {
        // Update local state
        if (itemType === 'package') {
          setSavedPackages(prev => prev.filter(pkg => pkg.itemId !== itemId));
        } else {
          setSavedDestinations(prev => prev.filter(dest => dest.itemId !== itemId));
        }
        toast.success('Item removed successfully');
        
        // Dispatch event to update navbar
        window.dispatchEvent(new Event('savedItemsChanged'));
      }
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error(error.response?.data?.message || 'Failed to remove item');
    }
  };

  // Clear all saved items
  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all saved items?')) return;

    try {
      const allItems = [...savedPackages, ...savedDestinations];
      
      // Delete all items one by one
      for (const item of allItems) {
        await axios.delete(
          `http://localhost:3000/api/saved/${item.itemId}/${item.itemType}`,
          { headers: getAuthHeader() }
        );
      }

      setSavedPackages([]);
      setSavedDestinations([]);
      toast.success('All saved items cleared');
      
      // Dispatch event to update navbar
      window.dispatchEvent(new Event('savedItemsChanged'));
    } catch (error) {
      console.error('Error clearing items:', error);
      toast.error('Failed to clear all items');
    }
  };

  // Get items to display based on active tab
  const getDisplayItems = () => {
    if (activeTab === 'packages') return savedPackages;
    if (activeTab === 'destinations') return savedDestinations;
    return [...savedPackages, ...savedDestinations];
  };

  const displayItems = getDisplayItems();
  const totalCount = savedPackages.length + savedDestinations.length;

  // Loading state
  if (loading) {
    return (
      <div className="saved-packages-page">
        <Navbar />
        <div style={{ padding: '150px 20px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#6b7280' }}>Loading saved items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-packages-page">
      <ScrollToTop />
      {/* Shared Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="saved-main">
        <div className="saved-container">
          {/* Header */}
          <div className="saved-header">
            <div className="header-content">
              <Bookmark className="header-icon" />
              <div>
                <h1 className="saved-title">Saved Items</h1>
                <p className="saved-subtitle">
                  {totalCount} {totalCount === 1 ? 'item' : 'items'} saved
                </p>
              </div>
            </div>
            {totalCount > 0 && (
              <button onClick={handleClearAll} className="clear-all-btn">
                Clear All
              </button>
            )}
          </div>

          {/* Tabs */}
          {totalCount > 0 && (
            <div className="saved-tabs">
              <button
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All ({totalCount})
              </button>
              <button
                className={`tab-btn ${activeTab === 'packages' ? 'active' : ''}`}
                onClick={() => setActiveTab('packages')}
              >
                Packages ({savedPackages.length})
              </button>
              <button
                className={`tab-btn ${activeTab === 'destinations' ? 'active' : ''}`}
                onClick={() => setActiveTab('destinations')}
              >
                Destinations ({savedDestinations.length})
              </button>
            </div>
          )}

          {/* Saved Items Grid */}
          {displayItems.length === 0 ? (
            <div className="empty-state">
              <Bookmark className="empty-icon" />
              <h2 className="empty-title">No Saved Items Yet</h2>
              <p className="empty-text">
                Start exploring our packages and destinations to save your favorites here.
              </p>
              <Link to="/tours">
                <button className="browse-btn">Browse Packages</button>
              </Link>
            </div>
          ) : (
            <div className="saved-grid">
              {displayItems.map((item) => {
                const isPackage = item.itemType === 'package';
                const linkUrl = isPackage ? `/package/${item.itemId}` : `/destination/${item.itemId}`;
                
                return (
                  <div key={`${item.itemType}-${item.itemId}`} className="saved-card">
                    <Link to={linkUrl} className="saved-card-link">
                      <div className="saved-image-container">
                        <img src={item.image} alt={item.name} className="saved-image" />
                        <span className={`item-type-badge ${item.itemType}`}>
                          {item.itemType}
                        </span>
                      </div>
                      <div className="saved-content">
                        <h3 className="saved-name">{item.name}</h3>
                        <div className="saved-location">
                          <MapPin className="location-icon" />
                          <span>{item.location}</span>
                        </div>
                        <div className="saved-details">
                          <div className="saved-rating">
                            <Star className="star-icon" fill="#f97316" />
                            <span>{item.rating}</span>
                          </div>
                          {item.duration && (
                            <div className="saved-duration">
                              <Clock className="calendar-icon" />
                              <span>{item.duration}</span>
                            </div>
                          )}
                        </div>
                        <div className="saved-footer">
                          <div className="saved-price">
                            <span className="price-label">From</span>
                            <span className="price-amount">${item.price}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemove(item.itemId, item.itemType);
                      }}
                      className="remove-btn"
                      title="Remove from saved"
                    >
                      <Trash2 className="trash-icon" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
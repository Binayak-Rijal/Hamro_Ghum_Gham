import React, { useState, useCallback } from 'react';
import './SearchBar.css';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [category, setCategory] = useState('all');
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate brief loading for better UX
    await new Promise(resolve => setTimeout(resolve, 300));

    const params = new URLSearchParams();
    const q = query.trim();
    if (q) params.set('q', q);
    if (startDate) params.set('start', startDate);
    if (endDate) params.set('end', endDate);
    if (guests && Number(guests) > 1) params.set('guests', String(guests));
    if (category && category !== 'all') params.set('category', category);

    const search = params.toString();
    navigate(`/tours${search ? `?${search}` : ''}`);
    setIsSearching(false);
  }, [query, startDate, endDate, guests, category, navigate]);

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];

  return (
    <form className="searchbar" onSubmit={handleSubmit} aria-label="Search form">
      <div className="search-row">
        <div className="input-with-icon">
          <MapPin className="input-icon" size={18} />
          <label htmlFor="search-input" className="sr-only">Search tours</label>
          <input
            id="search-input"
            className="search-input with-icon"
            type="text"
            placeholder="Search destinations, tours or keywords"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>

        <select
          className="filter-select small"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Category"
        >
          <option value="all">All Categories</option>
          <option value="trekking">🥾 Trekking</option>
          <option value="cultural">🏛️ Cultural</option>
          <option value="adventure">⛰️ Adventure</option>
          <option value="wildlife">🦁 Wildlife</option>
        </select>

        <div className="date-inputs-group">
          <div className="input-with-icon">
            <Calendar className="input-icon" size={16} />
            <input
              type="date"
              className="filter-input small with-icon"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today}
              aria-label="Start date"
            />
          </div>

          <div className="input-with-icon">
            <Calendar className="input-icon" size={16} />
            <input
              type="date"
              className="filter-input small with-icon"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || today}
              aria-label="End date"
            />
          </div>
        </div>

        <div className="input-with-icon">
          <Users className="input-icon" size={16} />
          <input
            type="number"
            min={1}
            max={20}
            className="filter-input small with-icon"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            aria-label="Number of guests"
          />
        </div>

        <button 
          type="submit" 
          className={`btn-search ${isSearching ? 'searching' : ''}`}
          disabled={isSearching}
          aria-label="Search"
        >
          <Search className="search-icon" />
          <span className="btn-text">{isSearching ? 'Searching...' : 'Search'}</span>
        </button>
      </div>
    </form>
  );
}
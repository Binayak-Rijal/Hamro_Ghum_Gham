import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ScrollToTop from '../components/ScrollToTop';

export default function EditProfile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    const payload = { name, email };
    if (password) payload.password = password;

    const res = await updateProfile(payload);
    setLoading(false);

    if (res.success) {
      toast.success('Profile updated');
      navigate('/profile'); 
    } else {
      toast.error(res.message || 'Failed to update profile');
    }
  };

  return (
    <div className="edit-profile-page">
      <ScrollToTop />
      <div className="edit-profile-card">
        <h2 className="edit-profile-title">My Profile</h2>
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <label className="form-label">Full name</label>
          <input
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="form-label">Email</label>
          <input
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />

          <label className="form-label">New password (leave blank to keep current)</label>
          <input
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••"
          />

          <label className="form-label">Confirm password</label>
          <input
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="••••••"
          />

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

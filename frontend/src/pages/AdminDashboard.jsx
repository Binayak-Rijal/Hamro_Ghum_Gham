// // src/pages/AdminDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const { user, logout, getAuthHeader } = useAuth();
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalBookings: 0,
//     totalPackages: 0,
//     totalInquiries: 0
//   });
//   const [activeTab, setActiveTab] = useState('overview');
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const API_URL = 'http://localhost:5000/api';

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const headers = getAuthHeader();

//       // Fetch all data
//       const [usersRes, bookingsRes, packagesRes] = await Promise.all([
//         axios.get(`${API_URL}/admin/users`, { headers }),
//         axios.get(`${API_URL}/admin/bookings`, { headers }),
//         axios.get(`${API_URL}/admin/packages`, { headers })
//       ]);

//       setUsers(usersRes.data.users || []);
//       setBookings(bookingsRes.data.bookings || []);
//       setPackages(packagesRes.data.packages || []);

//       setStats({
//         totalUsers: usersRes.data.users?.length || 0,
//         totalBookings: bookingsRes.data.bookings?.length || 0,
//         totalPackages: packagesRes.data.packages?.length || 0,
//         totalInquiries: 0
//       });
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const renderOverview = () => (
//     <div className="overview-section">
//       <h2>Dashboard Overview</h2>
//       <div className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-icon">👥</div>
//           <div className="stat-info">
//             <h3>{stats.totalUsers}</h3>
//             <p>Total Users</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">📦</div>
//           <div className="stat-info">
//             <h3>{stats.totalPackages}</h3>
//             <p>Total Packages</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">📅</div>
//           <div className="stat-info">
//             <h3>{stats.totalBookings}</h3>
//             <p>Total Bookings</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">📧</div>
//           <div className="stat-info">
//             <h3>{stats.totalInquiries}</h3>
//             <p>Total Inquiries</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderUsers = () => (
//     <div className="users-section">
//       <h2>Users Management</h2>
//       <div className="table-container">
//         <table className="admin-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Joined</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <span className={`role-badge ${user.role}`}>
//                     {user.role}
//                   </span>
//                 </td>
//                 <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                 <td>
//                   <button className="btn-action">View</button>
//                   <button className="btn-action delete">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const renderBookings = () => (
//     <div className="bookings-section">
//       <h2>Bookings Management</h2>
//       <div className="table-container">
//         <table className="admin-table">
//           <thead>
//             <tr>
//               <th>Booking ID</th>
//               <th>User</th>
//               <th>Package</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking._id}>
//                 <td>#{booking._id.slice(-6)}</td>
//                 <td>{booking.user?.name || 'N/A'}</td>
//                 <td>{booking.package?.title || 'N/A'}</td>
//                 <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
//                 <td>
//                   <span className={`status-badge ${booking.status}`}>
//                     {booking.status}
//                   </span>
//                 </td>
//                 <td>
//                   <button className="btn-action">View</button>
//                   <button className="btn-action">Update</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const renderPackages = () => (
//     <div className="packages-section">
//       <h2>Packages Management</h2>
//       <button className="btn-primary mb-20">Add New Package</button>
//       <div className="table-container">
//         <table className="admin-table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Destination</th>
//               <th>Price</th>
//               <th>Duration</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {packages.map((pkg) => (
//               <tr key={pkg._id}>
//                 <td>{pkg.title}</td>
//                 <td>{pkg.destination}</td>
//                 <td>NPR {pkg.price}</td>
//                 <td>{pkg.duration}</td>
//                 <td>
//                   <button className="btn-action">Edit</button>
//                   <button className="btn-action delete">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="admin-loading">
//         <div className="spinner"></div>
//         <p>Loading dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-dashboard">
//       <aside className="admin-sidebar">
//         <div className="sidebar-header">
//           <h2>Admin Panel</h2>
//           <p>{user?.email}</p>
//         </div>
//         <nav className="sidebar-nav">
//           <button
//             className={activeTab === 'overview' ? 'active' : ''}
//             onClick={() => setActiveTab('overview')}
//           >
//             📊 Overview
//           </button>
//           <button
//             className={activeTab === 'users' ? 'active' : ''}
//             onClick={() => setActiveTab('users')}
//           >
//             👥 Users
//           </button>
//           <button
//             className={activeTab === 'bookings' ? 'active' : ''}
//             onClick={() => setActiveTab('bookings')}
//           >
//             📅 Bookings
//           </button>
//           <button
//             className={activeTab === 'packages' ? 'active' : ''}
//             onClick={() => setActiveTab('packages')}
//           >
//             📦 Packages
//           </button>
//           <button onClick={handleLogout} className="logout-btn">
//             🚪 Logout
//           </button>
//         </nav>
//       </aside>

//       <main className="admin-main">
//         <header className="admin-header">
//           <h1>Welcome, {user?.name}</h1>
//           <div className="header-actions">
//             <button onClick={() => navigate('/home')} className="btn-secondary">
//               View Site
//             </button>
//           </div>
//         </header>

//         <div className="admin-content">
//           {activeTab === 'overview' && renderOverview()}
//           {activeTab === 'users' && renderUsers()}
//           {activeTab === 'bookings' && renderBookings()}
//           {activeTab === 'packages' && renderPackages()}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;




// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout, getAuthHeader } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalPackages: 0,
    totalInquiries: 0
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ✅ Form state for adding packages
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    image: ''
  });
  const [formLoading, setFormLoading] = useState(false);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const headers = getAuthHeader();

      // Fetch all data
      const [usersRes, bookingsRes, packagesRes] = await Promise.all([
        axios.get(`${API_URL}/admin/users`, { headers }),
        axios.get(`${API_URL}/admin/bookings`, { headers }),
        axios.get(`${API_URL}/admin/packages`, { headers })
      ]);

      setUsers(usersRes.data.users || []);
      setBookings(bookingsRes.data.bookings || []);
      setPackages(packagesRes.data.packages || []);

      setStats({
        totalUsers: usersRes.data.users?.length || 0,
        totalBookings: bookingsRes.data.bookings?.length || 0,
        totalPackages: packagesRes.data.packages?.length || 0,
        totalInquiries: 0
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      alert('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Handle add package form submission
  const handleAddPackage = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price) {
      alert('Title and Price are required!');
      return;
    }

    try {
      setFormLoading(true);
      const headers = getAuthHeader();

      const response = await axios.post(
        `${API_URL}/admin/packages`,
        {
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          location: formData.location,
          image: formData.image
        },
        { headers }
      );

      if (response.data.success) {
        alert('Package added successfully!');
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          price: '',
          location: '',
          image: ''
        });
        setShowAddForm(false);
        
        // Refresh packages list
        await fetchDashboardData();
      }
    } catch (error) {
      console.error('Error adding package:', error);
      alert(error.response?.data?.message || 'Error adding package');
    } finally {
      setFormLoading(false);
    }
  };

  // ✅ Handle delete package
  const handleDeletePackage = async (packageId) => {
    if (!window.confirm('Are you sure you want to delete this package?')) {
      return;
    }

    try {
      const headers = getAuthHeader();
      
      const response = await axios.delete(
        `${API_URL}/admin/packages/${packageId}`,
        { headers }
      );

      if (response.data.success) {
        alert('Package deleted successfully!');
        
        // Refresh packages list
        await fetchDashboardData();
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      alert(error.response?.data?.message || 'Error deleting package');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderOverview = () => (
    <div className="overview-section">
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{stats.totalPackages}</h3>
            <p>Total Packages</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.totalBookings}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📧</div>
          <div className="stat-info">
            <h3>{stats.totalInquiries}</h3>
            <p>Total Inquiries</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="users-section">
      <h2>Users Management</h2>
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn-action">View</button>
                  <button className="btn-action delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="bookings-section">
      <h2>Bookings Management</h2>
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Package</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>#{booking._id.slice(-6)}</td>
                <td>{booking.user?.name || 'N/A'}</td>
                <td>{booking.package?.title || 'N/A'}</td>
                <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  <button className="btn-action">View</button>
                  <button className="btn-action">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ✅ ENHANCED PACKAGES SECTION WITH ADD FORM
  const renderPackages = () => (
    <div className="packages-section">
      <div className="packages-header">
        <h2>Packages Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '✕ Cancel' : '➕ Add New Package'}
        </button>
      </div>

      {/* ✅ ADD PACKAGE FORM */}
      {showAddForm && (
        <div className="add-package-form">
          <h3>Add New Package</h3>
          <form onSubmit={handleAddPackage}>
            <div className="form-grid">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Everest Base Camp Trek"
                  required
                />
              </div>

              <div className="form-group">
                <label>Price (NPR) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 25000"
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Everest Region"
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="e.g., /images/everest.jpg"
                />
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter package description..."
                  rows="4"
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={formLoading}
              >
                {formLoading ? 'Adding...' : '✓ Add Package'}
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ✅ PACKAGES TABLE */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px' }}>
                  No packages found. Add your first package!
                </td>
              </tr>
            ) : (
              packages.map((pkg) => (
                <tr key={pkg._id}>
                  <td>{pkg.title}</td>
                  <td>{pkg.location || 'N/A'}</td>
                  <td>NPR {pkg.price?.toLocaleString()}</td>
                  <td>{new Date(pkg.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-action">View</button>
                    <button 
                      className="btn-action delete"
                      onClick={() => handleDeletePackage(pkg._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>{user?.email}</p>
        </div>
        <nav className="sidebar-nav">
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
          <button
            className={activeTab === 'bookings' ? 'active' : ''}
            onClick={() => setActiveTab('bookings')}
          >
            📅 Bookings
          </button>
          <button
            className={activeTab === 'packages' ? 'active' : ''}
            onClick={() => setActiveTab('packages')}
          >
            📦 Packages
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Welcome, {user?.name}</h1>
          <div className="header-actions">
            <button onClick={() => navigate('/home')} className="btn-secondary">
              View Site
            </button>
          </div>
        </header>

        <div className="admin-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'packages' && renderPackages()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
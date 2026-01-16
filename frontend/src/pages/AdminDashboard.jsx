



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
  
//   // ✅ Enhanced form state for adding packages
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     location: '',
//     duration: '',
//     category: 'other',
//     difficulty: 'moderate',
//     highlights: [''],
//     itinerary: [{ day: 1, title: '', description: '' }],
//     included: [''],
//     excluded: ['']
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState('');
//   const [formLoading, setFormLoading] = useState(false);

//   const API_URL = 'http://localhost:5000/api';

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const headers = getAuthHeader();

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
//       alert('Error loading dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle image file selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         alert('Image size must be less than 5MB');
//         return;
//       }
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   // ✅ Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // ✅ Handle array fields (highlights, included, excluded)
//   const handleArrayChange = (field, index, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: prev[field].map((item, i) => i === index ? value : item)
//     }));
//   };

//   const addArrayItem = (field) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: [...prev[field], '']
//     }));
//   };

//   const removeArrayItem = (field, index) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index)
//     }));
//   };

//   // ✅ Handle itinerary changes
//   const handleItineraryChange = (index, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       itinerary: prev.itinerary.map((item, i) => 
//         i === index ? { ...item, [field]: value } : item
//       )
//     }));
//   };

//   const addItineraryDay = () => {
//     setFormData(prev => ({
//       ...prev,
//       itinerary: [...prev.itinerary, { 
//         day: prev.itinerary.length + 1, 
//         title: '', 
//         description: '' 
//       }]
//     }));
//   };

//   const removeItineraryDay = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       itinerary: prev.itinerary.filter((_, i) => i !== index)
//     }));
//   };

//   // ✅ Handle add package form submission
//   const handleAddPackage = async (e) => {
//     e.preventDefault();
    
//     if (!formData.title || !formData.price) {
//       alert('Title and Price are required!');
//       return;
//     }

//     if (!imageFile) {
//       alert('Please select an image!');
//       return;
//     }

//     try {
//       setFormLoading(true);
//       const headers = getAuthHeader();

//       // Create FormData for file upload
//       const formDataToSend = new FormData();
//       formDataToSend.append('image', imageFile);
//       formDataToSend.append('title', formData.title);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('location', formData.location);
//       formDataToSend.append('duration', formData.duration);
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('difficulty', formData.difficulty);
      
//       // Filter out empty values and stringify arrays
//       formDataToSend.append('highlights', JSON.stringify(formData.highlights.filter(h => h.trim())));
//       formDataToSend.append('itinerary', JSON.stringify(formData.itinerary.filter(i => i.title.trim())));
//       formDataToSend.append('included', JSON.stringify(formData.included.filter(i => i.trim())));
//       formDataToSend.append('excluded', JSON.stringify(formData.excluded.filter(e => e.trim())));

//       const response = await axios.post(
//         `${API_URL}/admin/packages`,
//         formDataToSend,
//         { 
//           headers: {
//             ...headers,
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       if (response.data.success) {
//         alert('Package added successfully!');
        
//         // Reset form
//         setFormData({
//           title: '',
//           description: '',
//           price: '',
//           location: '',
//           duration: '',
//           category: 'other',
//           difficulty: 'moderate',
//           highlights: [''],
//           itinerary: [{ day: 1, title: '', description: '' }],
//           included: [''],
//           excluded: ['']
//         });
//         setImageFile(null);
//         setImagePreview('');
//         setShowAddForm(false);
        
//         // Refresh packages list
//         await fetchDashboardData();
//       }
//     } catch (error) {
//       console.error('Error adding package:', error);
//       alert(error.response?.data?.message || 'Error adding package');
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // ✅ Handle delete package
//   const handleDeletePackage = async (packageId) => {
//     if (!window.confirm('Are you sure you want to delete this package?')) {
//       return;
//     }

//     try {
//       const headers = getAuthHeader();
      
//       const response = await axios.delete(
//         `${API_URL}/admin/packages/${packageId}`,
//         { headers }
//       );

//       if (response.data.success) {
//         alert('Package deleted successfully!');
//         await fetchDashboardData();
//       }
//     } catch (error) {
//       console.error('Error deleting package:', error);
//       alert(error.response?.data?.message || 'Error deleting package');
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

//   // ✅ ENHANCED PACKAGES SECTION WITH FULL FORM
//   const renderPackages = () => (
//     <div className="packages-section">
//       <div className="packages-header">
//         <h2>Packages Management</h2>
//         <button 
//           className="btn-primary"
//           onClick={() => setShowAddForm(!showAddForm)}
//         >
//           {showAddForm ? '✕ Cancel' : '➕ Add New Package'}
//         </button>
//       </div>

//       {/* ✅ COMPREHENSIVE ADD PACKAGE FORM */}
//       {showAddForm && (
//         <div className="add-package-form">
//           <h3>Add New Package</h3>
//           <form onSubmit={handleAddPackage}>
//             {/* Basic Info */}
//             <div className="form-section">
//               <h4>Basic Information</h4>
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label>Title *</label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Everest Base Camp Trek"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Price (NPR) *</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 25000"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Location</label>
//                   <input
//                     type="text"
//                     name="location"
//                     value={formData.location}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Everest Region"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Duration</label>
//                   <input
//                     type="text"
//                     name="duration"
//                     value={formData.duration}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 14 Days"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Category</label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                   >
//                     <option value="trekking">Trekking</option>
//                     <option value="cultural">Cultural</option>
//                     <option value="adventure">Adventure</option>
//                     <option value="wildlife">Wildlife</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label>Difficulty</label>
//                   <select
//                     name="difficulty"
//                     value={formData.difficulty}
//                     onChange={handleInputChange}
//                   >
//                     <option value="easy">Easy</option>
//                     <option value="moderate">Moderate</option>
//                     <option value="difficult">Difficult</option>
//                   </select>
//                 </div>

//                 <div className="form-group full-width">
//                   <label>Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     placeholder="Enter package description..."
//                     rows="4"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* ✅ FIXED IMAGE UPLOAD SECTION */}
//             <div className="form-section">
//               <h4>Package Image *</h4>
//               <div className="image-upload-container">
//                 <label htmlFor="package-image" className="custom-file-upload">
//                   📁 Choose Image File
//                 </label>
//                 <input
//                   id="package-image"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   required
//                   style={{ display: 'none' }}
//                 />
//                 {imageFile && (
//                   <span className="file-name-display">
//                     Selected: {imageFile.name}
//                   </span>
//                 )}
//                 {imagePreview && (
//                   <div className="image-preview">
//                     <img src={imagePreview} alt="Preview" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Highlights */}
//             <div className="form-section">
//               <h4>Highlights</h4>
//               {formData.highlights.map((highlight, index) => (
//                 <div key={index} className="array-input-group">
//                   <input
//                     type="text"
//                     value={highlight}
//                     onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
//                     placeholder="e.g., Everest Base Camp (5,364m)"
//                   />
//                   {formData.highlights.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeArrayItem('highlights', index)}
//                       className="btn-remove"
//                     >
//                       ✕
//                     </button>
//                   )}
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() => addArrayItem('highlights')}
//                 className="btn-add-item"
//               >
//                 + Add Highlight
//               </button>
//             </div>

//             {/* Itinerary */}
//             <div className="form-section">
//               <h4>Itinerary</h4>
//               {formData.itinerary.map((item, index) => (
//                 <div key={index} className="itinerary-input-group">
//                   <div className="itinerary-header">
//                     <strong>Day {item.day}</strong>
//                     {formData.itinerary.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeItineraryDay(index)}
//                         className="btn-remove"
//                       >
//                         ✕
//                       </button>
//                     )}
//                   </div>
//                   <input
//                     type="text"
//                     value={item.title}
//                     onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
//                     placeholder="Day title"
//                   />
//                   <input
//                     type="text"
//                     value={item.description}
//                     onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
//                     placeholder="Day description"
//                   />
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addItineraryDay}
//                 className="btn-add-item"
//               >
//                 + Add Day
//               </button>
//             </div>

//             {/* Included */}
//             <div className="form-section">
//               <h4>What's Included</h4>
//               {formData.included.map((item, index) => (
//                 <div key={index} className="array-input-group">
//                   <input
//                     type="text"
//                     value={item}
//                     onChange={(e) => handleArrayChange('included', index, e.target.value)}
//                     placeholder="e.g., All meals during trek"
//                   />
//                   {formData.included.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeArrayItem('included', index)}
//                       className="btn-remove"
//                     >
//                       ✕
//                     </button>
//                   )}
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() => addArrayItem('included')}
//                 className="btn-add-item"
//               >
//                 + Add Included Item
//               </button>
//             </div>

//             {/* Excluded */}
//             <div className="form-section">
//               <h4>What's Excluded</h4>
//               {formData.excluded.map((item, index) => (
//                 <div key={index} className="array-input-group">
//                   <input
//                     type="text"
//                     value={item}
//                     onChange={(e) => handleArrayChange('excluded', index, e.target.value)}
//                     placeholder="e.g., International flights"
//                   />
//                   {formData.excluded.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeArrayItem('excluded', index)}
//                       className="btn-remove"
//                     >
//                       ✕
//                     </button>
//                   )}
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() => addArrayItem('excluded')}
//                 className="btn-add-item"
//               >
//                 + Add Excluded Item
//               </button>
//             </div>

//             <div className="form-actions">
//               <button 
//                 type="submit" 
//                 className="btn-primary"
//                 disabled={formLoading}
//               >
//                 {formLoading ? 'Adding...' : '✓ Add Package'}
//               </button>
//               <button 
//                 type="button" 
//                 className="btn-secondary"
//                 onClick={() => setShowAddForm(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* ✅ PACKAGES TABLE */}
//       <div className="table-container">
//         <table className="admin-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Title</th>
//               <th>Location</th>
//               <th>Price</th>
//               <th>Duration</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {packages.length === 0 ? (
//               <tr>
//                 <td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>
//                   No packages found. Add your first package!
//                 </td>
//               </tr>
//             ) : (
//               packages.map((pkg) => (
//                 <tr key={pkg._id}>
//                   <td>
//                     {pkg.image && (
//                       <img 
//                         src={pkg.image} 
//                         alt={pkg.title}
//                         style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
//                       />
//                     )}
//                   </td>
//                   <td>{pkg.title}</td>
//                   <td>{pkg.location || 'N/A'}</td>
//                   <td>NPR {pkg.price?.toLocaleString()}</td>
//                   <td>{pkg.duration || 'N/A'}</td>
//                   <td>
//                     <button className="btn-action">View</button>
//                     <button 
//                       className="btn-action delete"
//                       onClick={() => handleDeletePackage(pkg._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
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
  
  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // ✅ NEW
  const [editingPackageId, setEditingPackageId] = useState(null); // ✅ NEW
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    duration: '',
    category: 'other',
    difficulty: 'moderate',
    highlights: [''],
    itinerary: [{ day: 1, title: '', description: '' }],
    included: [''],
    excluded: ['']
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [existingImage, setExistingImage] = useState(''); // ✅ NEW - for keeping old image
  const [formLoading, setFormLoading] = useState(false);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const headers = getAuthHeader();

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

  // ✅ NEW: Fetch single package for editing
  const handleEditPackage = async (packageId) => {
    try {
      const headers = getAuthHeader();
      const response = await axios.get(`${API_URL}/admin/packages/${packageId}`, { headers });
      
      if (response.data.success) {
        const pkg = response.data.package;
        
        // Populate form with existing data
        setFormData({
          title: pkg.title || '',
          description: pkg.description || '',
          price: pkg.price || '',
          location: pkg.location || '',
          duration: pkg.duration || '',
          category: pkg.category || 'other',
          difficulty: pkg.difficulty || 'moderate',
          highlights: pkg.highlights?.length > 0 ? pkg.highlights : [''],
          itinerary: pkg.itinerary?.length > 0 ? pkg.itinerary : [{ day: 1, title: '', description: '' }],
          included: pkg.included?.length > 0 ? pkg.included : [''],
          excluded: pkg.excluded?.length > 0 ? pkg.excluded : ['']
        });
        
        setExistingImage(pkg.image || '');
        setImagePreview(pkg.image || '');
        setEditingPackageId(packageId);
        setShowEditForm(true);
        setShowAddForm(false);
        
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error fetching package:', error);
      alert('Error loading package data');
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle array fields
  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Handle itinerary changes
  const handleItineraryChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { 
        day: prev.itinerary.length + 1, 
        title: '', 
        description: '' 
      }]
    }));
  };

  const removeItineraryDay = (index) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      duration: '',
      category: 'other',
      difficulty: 'moderate',
      highlights: [''],
      itinerary: [{ day: 1, title: '', description: '' }],
      included: [''],
      excluded: ['']
    });
    setImageFile(null);
    setImagePreview('');
    setExistingImage('');
    setEditingPackageId(null);
    setShowAddForm(false);
    setShowEditForm(false);
  };

  // Handle add package
  const handleAddPackage = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price) {
      alert('Title and Price are required!');
      return;
    }

    if (!imageFile) {
      alert('Please select an image!');
      return;
    }

    try {
      setFormLoading(true);
      const headers = getAuthHeader();

      const formDataToSend = new FormData();
      formDataToSend.append('image', imageFile);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('difficulty', formData.difficulty);
      
      formDataToSend.append('highlights', JSON.stringify(formData.highlights.filter(h => h.trim())));
      formDataToSend.append('itinerary', JSON.stringify(formData.itinerary.filter(i => i.title.trim())));
      formDataToSend.append('included', JSON.stringify(formData.included.filter(i => i.trim())));
      formDataToSend.append('excluded', JSON.stringify(formData.excluded.filter(e => e.trim())));

      const response = await axios.post(
        `${API_URL}/admin/packages`,
        formDataToSend,
        { 
          headers: {
            ...headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        alert('Package added successfully!');
        resetForm();
        await fetchDashboardData();
      }
    } catch (error) {
      console.error('Error adding package:', error);
      alert(error.response?.data?.message || 'Error adding package');
    } finally {
      setFormLoading(false);
    }
  };

  // ✅ NEW: Handle update package
  const handleUpdatePackage = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price) {
      alert('Title and Price are required!');
      return;
    }

    try {
      setFormLoading(true);
      const headers = getAuthHeader();

      const formDataToSend = new FormData();
      
      // Only append image if new file selected
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('difficulty', formData.difficulty);
      
      formDataToSend.append('highlights', JSON.stringify(formData.highlights.filter(h => h.trim())));
      formDataToSend.append('itinerary', JSON.stringify(formData.itinerary.filter(i => i.title.trim())));
      formDataToSend.append('included', JSON.stringify(formData.included.filter(i => i.trim())));
      formDataToSend.append('excluded', JSON.stringify(formData.excluded.filter(e => e.trim())));

      const response = await axios.put(
        `${API_URL}/admin/packages/${editingPackageId}`,
        formDataToSend,
        { 
          headers: {
            ...headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        alert('Package updated successfully!');
        resetForm();
        await fetchDashboardData();
      }
    } catch (error) {
      console.error('Error updating package:', error);
      alert(error.response?.data?.message || 'Error updating package');
    } finally {
      setFormLoading(false);
    }
  };

  // Handle delete package
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

  // ✅ PACKAGE FORM COMPONENT (Reusable for both Add and Edit)
  const renderPackageForm = (isEdit = false) => (
    <div className="add-package-form">
      <h3>{isEdit ? 'Edit Package' : 'Add New Package'}</h3>
      <form onSubmit={isEdit ? handleUpdatePackage : handleAddPackage}>
        {/* Basic Info */}
        <div className="form-section">
          <h4>Basic Information</h4>
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
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 14 Days"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="trekking">Trekking</option>
                <option value="cultural">Cultural</option>
                <option value="adventure">Adventure</option>
                <option value="wildlife">Wildlife</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
              >
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="difficult">Difficult</option>
              </select>
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
        </div>

        {/* Image Upload */}
        <div className="form-section">
          <h4>Package Image {!isEdit && '*'}</h4>
          <div className="image-upload-container">
            <label htmlFor="package-image" className="custom-file-upload">
              📁 {isEdit ? 'Change Image (Optional)' : 'Choose Image File'}
            </label>
            <input
              id="package-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!isEdit}
              style={{ display: 'none' }}
            />
            {imageFile && (
              <span className="file-name-display">
                Selected: {imageFile.name}
              </span>
            )}
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                {isEdit && !imageFile && existingImage && (
                  <p style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                    Current image (will be kept if no new image selected)
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Highlights */}
        <div className="form-section">
          <h4>Highlights</h4>
          {formData.highlights.map((highlight, index) => (
            <div key={index} className="array-input-group">
              <input
                type="text"
                value={highlight}
                onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                placeholder="e.g., Everest Base Camp (5,364m)"
              />
              {formData.highlights.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('highlights', index)}
                  className="btn-remove"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('highlights')}
            className="btn-add-item"
          >
            + Add Highlight
          </button>
        </div>

        {/* Itinerary */}
        <div className="form-section">
          <h4>Itinerary</h4>
          {formData.itinerary.map((item, index) => (
            <div key={index} className="itinerary-input-group">
              <div className="itinerary-header">
                <strong>Day {item.day}</strong>
                {formData.itinerary.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItineraryDay(index)}
                    className="btn-remove"
                  >
                    ✕
                  </button>
                )}
              </div>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                placeholder="Day title"
              />
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                placeholder="Day description"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addItineraryDay}
            className="btn-add-item"
          >
            + Add Day
          </button>
        </div>

        {/* Included */}
        <div className="form-section">
          <h4>What's Included</h4>
          {formData.included.map((item, index) => (
            <div key={index} className="array-input-group">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('included', index, e.target.value)}
                placeholder="e.g., All meals during trek"
              />
              {formData.included.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('included', index)}
                  className="btn-remove"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('included')}
            className="btn-add-item"
          >
            + Add Included Item
          </button>
        </div>

        {/* Excluded */}
        <div className="form-section">
          <h4>What's Excluded</h4>
          {formData.excluded.map((item, index) => (
            <div key={index} className="array-input-group">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('excluded', index, e.target.value)}
                placeholder="e.g., International flights"
              />
              {formData.excluded.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('excluded', index)}
                  className="btn-remove"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('excluded')}
            className="btn-add-item"
          >
            + Add Excluded Item
          </button>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={formLoading}
          >
            {formLoading ? (isEdit ? 'Updating...' : 'Adding...') : (isEdit ? '✓ Update Package' : '✓ Add Package')}
          </button>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={resetForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  // ✅ ENHANCED PACKAGES SECTION
  const renderPackages = () => (
    <div className="packages-section">
      <div className="packages-header">
        <h2>Packages Management</h2>
        <button 
          className="btn-primary"
          onClick={() => {
            if (showEditForm) {
              resetForm();
            }
            setShowAddForm(!showAddForm);
          }}
        >
          {showAddForm ? '✕ Cancel' : '➕ Add New Package'}
        </button>
      </div>

      {/* Show Add Form */}
      {showAddForm && renderPackageForm(false)}

      {/* Show Edit Form */}
      {showEditForm && renderPackageForm(true)}

      {/* Packages Table */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>
                  No packages found. Add your first package!
                </td>
              </tr>
            ) : (
              packages.map((pkg) => (
                <tr key={pkg._id}>
                  <td>
                    {pkg.image && (
                      <img 
                        src={pkg.image} 
                        alt={pkg.title}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    )}
                  </td>
                  <td>{pkg.title}</td>
                  <td>{pkg.location || 'N/A'}</td>
                  <td>NPR {pkg.price?.toLocaleString()}</td>
                  <td>{pkg.duration || 'N/A'}</td>
                  <td>
                    <button 
                      className="btn-action"
                      onClick={() => handleEditPackage(pkg._id)}
                    >
                      Edit
                    </button>
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
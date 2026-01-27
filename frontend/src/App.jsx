import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import ResetPassword from './pages/ResetPassword';
import PackageDetail from './pages/PackageDetail';
import Tours from './pages/Tours';
import Destinations from './pages/Destinations';
import SavedPackages from './components/SavedPackages';
import DestinationDetail from './pages/DestinationDetail';
import ViewBooking from './components/ViewBooking';
import AdminDashboard from './pages/AdminDashboard';
import CompleteBooking from './pages/CompleteBooking';
import EditProfile from './pages/EditProfile';
import AboutUs from './pages/AboutUs';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/bookings" element={<ViewBooking />} />
          <Route path="/about" element={<AboutUs />} />
          
          {/* Package and Destination routes (public but actions require login) */}
          <Route path="/package/:packageId" element={<PackageDetail />} />
          <Route path="/destination/:destinationId" element={<DestinationDetail />} />
          
          {/* Protected user routes */}
          <Route 
            path="/saved-packages" 
            element={
              <ProtectedRoute>
                <SavedPackages />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/complete-booking" 
            element={
              <ProtectedRoute>
                <CompleteBooking />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          
          {/* Admin routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
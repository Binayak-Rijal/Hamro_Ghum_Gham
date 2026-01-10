import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PackageDetail from './pages/PackageDetail';
import Tours from './pages/Tours';
import SavedPackages from './components/SavedPackages';
import DestinationDetail from './pages/DestinationDetail';
import ViewBooking from './components/ViewBooking';


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
          {/* WelcomePage is now the default landing page */}
          <Route path="/" element={<WelcomePage />} />
          
          {/* HomePage is now at /home */}
          <Route path="/home" element={<HomePage />} />
          
          {/* Public routes */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/bookings" element={<ViewBooking />} />

          
          {/* Package and Destination routes (public but actions require login) */}
          <Route path="/package/:packageId" element={<PackageDetail />} />
          <Route path="/destination/:destinationId" element={<DestinationDetail />} />
          
          {/* Protected routes */}
          <Route 
            path="/saved-packages" 
            element={
              <ProtectedRoute>
                <SavedPackages />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>

    
  );
}

export default App;
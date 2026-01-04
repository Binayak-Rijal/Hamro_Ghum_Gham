import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PackageDetail from './pages/PackageDetail';
import Tours from './pages/Tours';


function App() {
  return (
    <Router>
      <Routes>
        {/* WelcomePage is now the default landing page */}
        <Route path="/" element={<WelcomePage />} />
        
        {/* HomePage is now at /home */}
        <Route path="/home" element={<HomePage />} />
        
        {/* Other routes remain the same */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/package/:packageId" element={<PackageDetail />} />
        <Route path="/tours" element={<Tours />} />

      </Routes>
    </Router>
  );
}

export default App;
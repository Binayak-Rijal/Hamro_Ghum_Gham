import { Suspense } from 'react';
import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

const AboutUs = React.lazy(() => import("./pages/public/AboutUs"));

function App() {
  return (
    <>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-700 font-medium">Loading Hamro Ghum Gham...</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<AboutUs />} />
          <Route path="/about" element={<AboutUs />} />
          
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600">
                  <a href="/" className="text-blue-600 hover:underline">Go back to Home</a>
                </p>
              </div>
            </div>
          } />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
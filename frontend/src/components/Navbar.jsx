import React, { useState } from 'react';
import { Mountain, Menu, X, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Mountain className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-800">
              Hamro<span className="text-orange-500">Ghum</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-gray-700 hover:text-orange-500 transition font-medium">
              Home
            </a>
            <a href="/about" className="text-gray-700 hover:text-orange-500 transition font-medium">
              About
            </a>
            <a href="/tours" className="text-gray-700 hover:text-orange-500 transition font-medium">
              Tours
            </a>
            <a href="/destinations" className="text-gray-700 hover:text-orange-500 transition font-medium">
              Destinations
            </a>
            <a href="/contact" className="text-gray-700 hover:text-orange-500 transition font-medium">
              Contact
            </a>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <button className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition">
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </button>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="text-gray-700 hover:text-orange-500 transition font-medium">
                  Login
                </a>
                <a 
                  href="/register" 
                  className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition font-medium"
                >
                  Register
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-orange-500 transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              <a href="/" className="text-gray-700 hover:text-orange-500 transition font-medium">
                Home
              </a>
              <a href="/about" className="text-gray-700 hover:text-orange-500 transition font-medium">
                About
              </a>
              <a href="/tours" className="text-gray-700 hover:text-orange-500 transition font-medium">
                Tours
              </a>
              <a href="/destinations" className="text-gray-700 hover:text-orange-500 transition font-medium">
                Destinations
              </a>
              <a href="/contact" className="text-gray-700 hover:text-orange-500 transition font-medium">
                Contact
              </a>
              <div className="border-t pt-4 flex flex-col gap-3">
                {isLoggedIn ? (
                  <>
                    <button className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition">
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </button>
                    <button 
                      onClick={() => setIsLoggedIn(false)}
                      className="flex items-center gap-2 justify-center bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <a href="/login" className="text-center text-gray-700 hover:text-orange-500 transition font-medium">
                      Login
                    </a>
                    <a 
                      href="/register" 
                      className="text-center bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition font-medium"
                    >
                      Register
                    </a>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
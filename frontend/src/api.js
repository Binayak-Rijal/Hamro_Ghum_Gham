import axios from 'axios';

// Base URL for your backend
const API_URL = 'http://localhost:5000/api/auth';

// Signup function - sends data to backend
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data; // Returns success message
  } catch (error) {
    // If there's an error, throw it so we can catch it in the component
    throw error.response?.data?.message || 'Signup failed. Please try again.';
  }
};

// Login function - sends data to backend
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // Returns user data and success message
  } catch (error) {
    // If there's an error, throw it so we can catch it in the component
    throw error.response?.data?.message || 'Login failed. Please try again.';
  }
};
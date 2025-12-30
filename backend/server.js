// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API endpoint to get welcome data
app.get('/api/welcome', (req, res) => {
  res.json({
    title: 'WELCOME TO',
    subtitle: 'THE WILDERNESS',
    description: 'Experience the beauty of nature',
    buttonText: 'EXPLORE'
  });
});

// API endpoint for user interaction
app.post('/api/explore', (req, res) => {
  const { username } = req.body;
  res.json({
    message: `Welcome ${username || 'Explorer'}! Your adventure begins now.`,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
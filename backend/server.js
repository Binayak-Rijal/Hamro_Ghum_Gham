const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create directories if they don't exist
const uploadsDir = path.join(__dirname, 'uploads');
const dataDir = path.join(__dirname, 'data');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Serve static files
app.use('/uploads', express.static('uploads'));

// ==================== BOOKING ENDPOINTS ====================

// Create new booking
app.post('/api/bookings', (req, res) => {
  try {
    const { packageName, fullName, phone, date, guests, subtotal, serviceCharge, total } = req.body;

    // Validate required fields
    if (!packageName || !fullName || !phone || !date || !guests) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }

    // Create booking data object
    const bookingData = {
      id: Date.now().toString(),
      packageName,
      fullName,
      phone,
      date,
      guests: parseInt(guests),
      subtotal: parseFloat(subtotal),
      serviceCharge: parseFloat(serviceCharge),
      total: parseFloat(total),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save to JSON file
    const bookingsFile = path.join(dataDir, 'bookings.json');
    let bookings = [];
    
    if (fs.existsSync(bookingsFile)) {
      const fileData = fs.readFileSync(bookingsFile, 'utf8');
      bookings = JSON.parse(fileData);
    }
    
    bookings.push(bookingData);
    fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));

    console.log('New booking created:', bookingData);

    res.status(201).json({ 
      success: true, 
      message: 'Booking created successfully!',
      data: bookingData
    });

  } catch (error) {
    console.error('Error processing booking:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

// Get all bookings (admin endpoint)
app.get('/api/bookings', (req, res) => {
  try {
    const bookingsFile = path.join(dataDir, 'bookings.json');
    
    if (fs.existsSync(bookingsFile)) {
      const fileData = fs.readFileSync(bookingsFile, 'utf8');
      const bookings = JSON.parse(fileData);
      res.status(200).json({ success: true, data: bookings });
    } else {
      res.status(200).json({ success: true, data: [] });
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Get booking by ID
app.get('/api/bookings/:id', (req, res) => {
  try {
    const { id } = req.params;
    const bookingsFile = path.join(dataDir, 'bookings.json');
    
    if (fs.existsSync(bookingsFile)) {
      const fileData = fs.readFileSync(bookingsFile, 'utf8');
      const bookings = JSON.parse(fileData);
      const booking = bookings.find(b => b.id === id);
      
      if (booking) {
        res.status(200).json({ success: true, data: booking });
      } else {
        res.status(404).json({ success: false, message: 'Booking not found' });
      }
    } else {
      res.status(404).json({ success: false, message: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Update booking status
app.patch('/api/bookings/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const bookingsFile = path.join(dataDir, 'bookings.json');
    
    if (fs.existsSync(bookingsFile)) {
      const fileData = fs.readFileSync(bookingsFile, 'utf8');
      let bookings = JSON.parse(fileData);
      
      const bookingIndex = bookings.findIndex(b => b.id === id);
      
      if (bookingIndex !== -1) {
        bookings[bookingIndex].status = status;
        bookings[bookingIndex].updatedAt = new Date().toISOString();
        
        fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
        
        res.status(200).json({ 
          success: true, 
          message: 'Booking status updated',
          data: bookings[bookingIndex]
        });
      } else {
        res.status(404).json({ success: false, message: 'Booking not found' });
      }
    } else {
      res.status(404).json({ success: false, message: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// ==================== CONTACT ENDPOINTS ====================

// Contact form endpoint
app.post('/api/contact', upload.single('screenshot'), (req, res) => {
  try {
    const { category, name, email, message } = req.body;
    const screenshot = req.file ? req.file.filename : null;

    if (!category || !name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }

    const contactData = {
      id: Date.now().toString(),
      category,
      name,
      email,
      message,
      screenshot,
      timestamp: new Date().toISOString()
    };

    const contactsFile = path.join(dataDir, 'contacts.json');
    let contacts = [];
    
    if (fs.existsSync(contactsFile)) {
      const fileData = fs.readFileSync(contactsFile, 'utf8');
      contacts = JSON.parse(fileData);
    }
    
    contacts.push(contactData);
    fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));

    console.log('New contact form submission:', contactData);

    res.status(200).json({ 
      success: true, 
      message: 'Message received successfully!',
      data: contactData
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

// Get all contacts (admin endpoint)
app.get('/api/contacts', (req, res) => {
  try {
    const contactsFile = path.join(dataDir, 'contacts.json');
    
    if (fs.existsSync(contactsFile)) {
      const fileData = fs.readFileSync(contactsFile, 'utf8');
      const contacts = JSON.parse(fileData);
      res.status(200).json({ success: true, data: contacts });
    } else {
      res.status(200).json({ success: true, data: [] });
    }
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// ==================== NEWSLETTER ENDPOINTS ====================

// Newsletter subscription endpoint
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    const subscriberData = {
      id: Date.now().toString(),
      email,
      timestamp: new Date().toISOString()
    };

    const subscribersFile = path.join(dataDir, 'subscribers.json');
    let subscribers = [];
    
    if (fs.existsSync(subscribersFile)) {
      const fileData = fs.readFileSync(subscribersFile, 'utf8');
      subscribers = JSON.parse(fileData);
    }
    
    const emailExists = subscribers.some(sub => sub.email === email);
    if (emailExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already subscribed' 
      });
    }
    
    subscribers.push(subscriberData);
    fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2));

    console.log('New newsletter subscription:', subscriberData);

    res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter!' 
    });

  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
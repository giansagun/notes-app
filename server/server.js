const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


// Middleware
app.use(cors({
 app.use(cors({ origin: 'http://127.0.0.1:5500' }));

  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  credentials: true // if you want to send cookies/auth headers
}));
app.use(express.json()); // Parses incoming JSON requests

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Use routes
const notesRoutes = require('./routes/notes');
app.use('/api/notes', notesRoutes);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



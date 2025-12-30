const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const uploadRoutes = require('./routes/uploadRoutes');
const searchRoutes = require('./routes/searchRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.use(cors({
  origin: '*', // Allow all origins for now to fix the issue
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Product Search API',
    endpoints: {
      upload: 'POST /api/upload',
      search: 'POST /api/search'
    },
    status: 'Server is running'
  });
});

app.use('/api/upload', uploadRoutes);
app.use('/api/search', searchRoutes);

app.use(errorHandler);

module.exports = app;


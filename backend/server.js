require('dotenv').config();
const express = require('express');
const path = require('path');
const analyzeRoutes = require('./routes/analyzeRoutes');
// const logger = require('./utils/logger'); // To be implemented
// const errorHandler = require('./middleware/errorHandler'); // To be implemented

const app = express();

// --- Middleware --- 

// Body parser middleware to handle JSON request bodies
app.use(express.json());

// --- Logging (Placeholder) ---
// Example: Basic request logging
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
//   next();
// });

// --- API Routes --- 
app.use('/api/analyze', analyzeRoutes);

// --- Serve Frontend Static Files ---
// In production, Node.js backend serves the built React frontend.
// The 'startup.sh' script ensures the frontend is built into '../frontend/build'.
if (process.env.NODE_ENV === 'production' || process.env.SERVE_FRONTEND === 'true') {
  const frontendBuildPath = path.join(__dirname, '..', 'frontend', 'build');
  app.use(express.static(frontendBuildPath));

  // For any route not handled by the API or static files, serve index.html.
  // This is crucial for client-side routing in single-page applications (SPAs).
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendBuildPath, 'index.html'));
  });
}

// --- Basic Root Route (Health Check or Welcome) ---
// This route will only be hit if not serving frontend or if path is exactly '/'
// and not caught by static serving or API routes.
app.get('/', (req, res) => {
  // If serving frontend, this might not be reached if index.html is served for '/'
  res.status(200).json({ message: 'Startup Idea Analyzer API is running.' });
});

// --- Error Handling Middleware (Basic) ---
// A more sophisticated errorHandler middleware will be in ./middleware/errorHandler.js
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack || err.message || err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ 
    status: 'error',
    statusCode,
    message 
  });
});

// --- Start Server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  if (process.env.NODE_ENV === 'production' || process.env.SERVE_FRONTEND === 'true') {
    console.log('Serving frontend from ../frontend/build');
    console.log(`Access the application at http://localhost:${PORT} (or the port mapped by startup.sh, e.g., 9000)`);
  }
});

module.exports = app; // For potential testing

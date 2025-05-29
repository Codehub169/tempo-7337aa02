#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Define project root directory
PROJECT_ROOT=$(pwd)

# Frontend setup
FRONTEND_DIR="$PROJECT_ROOT/frontend"

# Backend setup
BACKEND_DIR="$PROJECT_ROOT/backend"

# --- Frontend --- 
echo "Setting up frontend..."
cd "$FRONTEND_DIR"

# Install frontend dependencies
if [ -f "package-lock.json" ]; then
  npm ci
else
  npm install
fi

# Build frontend
# The build command might vary depending on your React setup (e.g., if using Create React App, Vite, etc.)
# Assuming a common 'npm run build' script is defined in package.json
# This will create a 'build' or 'dist' folder in $FRONTEND_DIR
CI=false npm run build # CI=false to treat warnings as non-errors in some setups

# --- Backend --- 
echo "Setting up backend..."
cd "$BACKEND_DIR"

# Create a .env file from .env.example if it doesn't exist
if [ ! -f ".env" ] && [ -f ".env.example" ]; then
  echo "Creating .env file from .env.example..."
  cp .env.example .env
  # You might want to prompt the user for API keys here or instruct them to fill .env
  echo "IMPORTANT: Please fill in your API keys and other necessary environment variables in backend/.env"
else
  echo "Using existing .env file or no .env.example found."
fi

# Install backend dependencies
if [ -f "package-lock.json" ]; then
  npm ci
else
  npm install
fi

# --- Run Application ---
echo "Starting application..."

# The backend server will serve the static frontend build and handle API requests.
# The frontend is built and its static assets are typically served by the backend in production.
# Ensure your backend (e.g., Express server.js) is configured to serve static files from $FRONTEND_DIR/build

# Start the backend server. It should listen on port 9000.
# The server.js needs to be configured to serve frontend static files and listen on port 9000.
PORT=9000 node server.js

echo "Startup Idea Analyzer is running on http://localhost:9000"

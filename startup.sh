#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Define project root directory
# Assumes the script is run from the project's root directory
PROJECT_ROOT=$(pwd)

# Define directory paths
FRONTEND_DIR="$PROJECT_ROOT/frontend"
BACKEND_DIR="$PROJECT_ROOT/backend"

# --- Validate Project Structure ---
echo "Validating project structure..."
if [ ! -d "$FRONTEND_DIR" ]; then
  echo "Error: Frontend directory '$FRONTEND_DIR' not found."
  echo "Please ensure you are running this script from the project root and the 'frontend' directory exists."
  exit 1
fi

if [ ! -d "$BACKEND_DIR" ]; then
  echo "Error: Backend directory '$BACKEND_DIR' not found."
  echo "Please ensure you are running this script from the project root and the 'backend' directory exists."
  exit 1
fi

# --- Frontend Setup ---
echo "Setting up frontend in $FRONTEND_DIR..."
cd "$FRONTEND_DIR"

if [ ! -f "package.json" ]; then
  echo "Error: Frontend package.json not found in '$FRONTEND_DIR'."
  exit 1
fi

echo "Installing frontend dependencies..."
if [ -f "package-lock.json" ]; then
  npm ci
else
  npm install
fi

echo "Building frontend application..."
# CI=false can help treat warnings as non-errors in some React/build setups
# The build output is typically in 'build' or 'dist' folder within $FRONTEND_DIR
CI=false npm run build

# --- Backend Setup ---
echo "Setting up backend in $BACKEND_DIR..."
cd "$BACKEND_DIR"

if [ ! -f "package.json" ]; then
  echo "Error: Backend package.json not found in '$BACKEND_DIR'."
  exit 1
fi

echo "Configuring backend environment..."
if [ -f ".env" ]; then
  echo "Using existing backend/.env file."
elif [ -f ".env.example" ]; then
  echo "Creating backend/.env file from .env.example..."
  cp .env.example .env
  echo "IMPORTANT: Please review and fill in your API keys and other necessary environment variables in backend/.env"
else
  echo "Warning: backend/.env.example not found. Cannot create .env automatically."
  echo "The application might not work correctly without a configured .env file in '$BACKEND_DIR'."
  # Allowing to proceed with a warning, as the backend might have defaults or handle missing env vars.
fi

echo "Installing backend dependencies..."
if [ -f "package-lock.json" ]; then
  npm ci
else
  npm install
fi

# --- Run Application ---
echo "Starting application..."

# The backend server will serve the static frontend build and handle API requests.
# Ensure your backend (e.g., Express server.js in $BACKEND_DIR) is configured to:
# 1. Serve static files from the frontend build directory (e.g., ../frontend/build).
# 2. Listen on the port specified by the PORT environment variable (9000 in this script).

if [ ! -f "server.js" ]; then
  echo "Error: Backend server.js not found in '$BACKEND_DIR'."
  exit 1
fi

# Start the backend server in production mode on port 9000.
# The server.js (expected in current directory: $BACKEND_DIR) needs to be configured 
# to serve frontend static files and listen on the correct port.
echo "Starting backend server on port 9000..."
NODE_ENV=production PORT=9000 node server.js

# The script will typically remain on the 'node server.js' line while the server is running.
# These messages are useful if the server backgrounds itself or for when it's stopped.
echo "Startup Idea Analyzer server process initiated."
echo "If the server started successfully, access the application at http://localhost:9000"
echo "Press Ctrl+C to stop the server if it's running in the foreground."

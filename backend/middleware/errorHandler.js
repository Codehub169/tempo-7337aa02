const logger = require('../utils/logger');

/**
 * Global error handling middleware for the Express application.
 * Logs the error and sends a standardized JSON error response to the client.
 *
 * @param {Error} err - The error object.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 */
function errorHandler(err, req, res, next) {
  // Log the error internally
  logger.error(`Error occurred: ${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
    // Optionally add more request details like body, query, params if safe and useful
  });

  // Determine status code: use err.statusCode if set, otherwise default to 500
  const statusCode = err.statusCode || 500;

  // Prepare error response
  const errorResponse = {
    success: false,
    message: err.message || 'An unexpected error occurred on the server.',
    // Optionally include error code or type for client-side handling
    // errorCode: err.code,
  };

  // In development, you might want to send more details like the stack trace
  if (process.env.NODE_ENV === 'development' && err.stack) {
    errorResponse.stack = err.stack;
  }

  // Send the error response
  res.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;

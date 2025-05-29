/**
 * Simple logger utility for the backend application.
 * Provides basic logging functionalities with timestamps and log levels.
 */

const LogLevel = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

/**
 * Formats a log message with a timestamp and log level.
 * @param {string} level - The log level (e.g., INFO, ERROR).
 * @param {string} message - The main log message.
 * @param {object} [meta] - Optional metadata object to include in the log.
 * @returns {string} The formatted log string.
 */
function formatLog(level, message, meta) {
  const timestamp = new Date().toISOString();
  let logString = `${timestamp} [${level}] ${message}`;
  if (meta && typeof meta === 'object' && Object.keys(meta).length > 0) {
    try {
      // Attempt to stringify meta, handle potential circular references or errors
      logString += ` \n${JSON.stringify(meta, null, 2)}`;
    } catch (e) {
      logString += ` \n[Logger Error: Could not stringify metadata]`;
    }
  }
  return logString;
}

const logger = {
  /**
   * Logs an error message.
   * @param {string} message - The error message.
   * @param {object} [meta] - Optional metadata.
   */
  error: (message, meta) => {
    console.error(formatLog(LogLevel.ERROR, message, meta));
  },

  /**
   * Logs a warning message.
   * @param {string} message - The warning message.
   * @param {object} [meta] - Optional metadata.
   */
  warn: (message, meta) => {
    console.warn(formatLog(LogLevel.WARN, message, meta));
  },

  /**
   * Logs an informational message.
   * @param {string} message - The info message.
   * @param {object} [meta] - Optional metadata.
   */
  info: (message, meta) => {
    console.info(formatLog(LogLevel.INFO, message, meta));
  },

  /**
   * Logs a debug message. Only logs if NODE_ENV is 'development'.
   * @param {string} message - The debug message.
   * @param {object} [meta] - Optional metadata.
   */
  debug: (message, meta) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(formatLog(LogLevel.DEBUG, message, meta));
    }
  },
};

module.exports = logger;

import axios from 'axios';

// The base URL for the API. This will be proxied to the backend
// during development (as configured in frontend/package.json) and will
// be the same origin in production when the backend serves the frontend.
const API_BASE_URL = '/api'; // Adjusted to be a relative path

/**
 * Creates an Axios instance with predefined configurations.
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Sends a startup idea to the backend for analysis.
 *
 * @param {string} idea - The startup idea text.
 * @returns {Promise<object>} A promise that resolves to the analysis results.
 * @throws {Error} Throws an error if the API request fails.
 */
export const analyzeStartupIdea = async (idea) => {
  if (!idea || typeof idea !== 'string' || idea.trim() === '') {
    throw new Error('Idea text cannot be empty.');
  }

  try {
    console.log(`Sending idea to ${API_BASE_URL}/analyze:`, { idea });
    const response = await apiClient.post('/analyze', { idea });
    console.log('Received analysis from backend:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error analyzing startup idea:', error.response ? error.response.data : error.message);
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred while analyzing the idea.';
    throw new Error(errorMessage);
  }
};

export default {
  analyzeStartupIdea,
};

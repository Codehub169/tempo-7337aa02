import { useState, useCallback } from 'react';
import { analyzeStartupIdea } from '../services/apiService';

/**
 * Custom hook to manage the state and logic for fetching startup idea analysis.
 *
 * @returns {object} An object containing:
 *  - `analysisResults`: The analysis data received from the API, or null if no analysis has been performed or an error occurred.
 *  - `isLoading`: A boolean indicating whether an analysis request is currently in progress.
 *  - `error`: An error object or message if an error occurred during the analysis, otherwise null.
 *  - `fetchAnalysis`: A function to initiate the analysis process for a given startup idea.
 *  - `resetAnalysis`: A function to clear the current analysis results and error state.
 */
const useAnalytics = () => {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches analysis for the provided startup idea.
   * Sets loading state, calls the API service, and updates results or error state accordingly.
   * @param {string} idea - The startup idea text to analyze.
   */
  const fetchAnalysis = useCallback(async (idea) => {
    if (!idea || idea.trim() === '') {
      setError({ message: 'Please enter a startup idea to analyze.' });
      setAnalysisResults(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResults(null); // Clear previous results

    try {
      const data = await analyzeStartupIdea(idea);
      setAnalysisResults(data);
    } catch (err) {
      setError(err); // err is already an Error object from apiService
      setAnalysisResults(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Resets the analysis state, clearing results and errors.
   */
  const resetAnalysis = useCallback(() => {
    setAnalysisResults(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    analysisResults,
    isLoading,
    error,
    fetchAnalysis,
    resetAnalysis,
  };
};

export default useAnalytics;

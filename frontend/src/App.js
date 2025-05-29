import React, { useState, useCallback } from 'react';
import IdeaForm from './components/IdeaForm';
import AnalysisDisplay from './components/AnalysisDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import useAnalytics from './hooks/useAnalytics';

function App() {
  const [currentIdea, setCurrentIdea] = useState('');
  const {
    analysisResults,
    isLoading,
    error,
    fetchAnalysis,
    resetAnalysis,
  } = useAnalytics();

  const handleSubmitIdea = useCallback(() => {
    // Basic client-side validation can be added here if desired,
    // though useAnalytics also validates.
    fetchAnalysis(currentIdea);
  }, [currentIdea, fetchAnalysis]);

  const handleReset = useCallback(() => {
    resetAnalysis();
    setCurrentIdea(''); // Clear the input field as well
  }, [resetAnalysis]);

  const handleIdeaChange = (event) => {
    setCurrentIdea(event.target.value);
  };

  return (
    <div className="min-h-screen bg-primary text-light-gray flex flex-col items-center p-4 sm:p-6 md:p-8 selection:bg-accent selection:text-white">
      <header className="w-full max-w-4xl text-center mb-8 sm:mb-12 md:mb-16 animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display text-accent font-extrabold tracking-tight">
          Startup Idea <span className="text-indigo-400">Analyzer</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-gray mt-3 sm:mt-4 max-w-2xl mx-auto">
          Unlock the potential of your vision. Get instant, AI-powered SWOT analysis, market fit insights, competitor overviews, and actionable refinement tips.
        </p>
      </header>

      <main className="w-full max-w-3xl flex-grow flex flex-col items-center justify-center">
        {isLoading ? (
          <LoadingSpinner 
            text="Analyzing your idea... this might take a moment."
            size="lg"
          />
        ) : analysisResults ? (
          <div className="w-full animate-slideUp">
            <AnalysisDisplay results={analysisResults} onReset={handleReset} />
            {/* The 'Analyze Another Idea' button is now part of AnalysisDisplay, triggered by onReset prop */}
          </div>
        ) : (
          <IdeaForm 
            onSubmit={handleSubmitIdea} 
            isLoading={isLoading} 
            currentIdea={currentIdea} 
            onIdeaChange={handleIdeaChange} 
          />
        )}
        {error && (
          <p className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-md animate-fadeIn" role="alert">
            Error: {error.message || 'An unexpected error occurred.'}
          </p>
        )}
      </main>

      <footer className="w-full max-w-4xl text-center mt-auto pt-12 pb-6 animate-fadeIn delay-300">
        <p className="text-sm text-secondary">
          &copy; {new Date().getFullYear()} Startup Idea Analyzer. Powered by AI & Imagination.
        </p>
        <p className="text-xs text-muted-gray mt-1">
          Disclaimer: AI analysis is for informational purposes only and not financial or legal advice.
        </p>
      </footer>
    </div>
  );
}

export default App;

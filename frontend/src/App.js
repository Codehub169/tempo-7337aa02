import React, { useState, useCallback } from 'react';

// Placeholder components (actual implementations will be in separate files)
const IdeaForm = ({ onSubmit, isLoading }) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(idea);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-secondary/10 p-6 sm:p-8 rounded-lg shadow-xl backdrop-blur-md border border-neutral-700">
      <h2 className="text-2xl sm:text-3xl font-display text-accent mb-6 text-center">Enter Your Startup Idea</h2>
      <p className="text-center text-muted-gray mb-6">Let our AI analyze your concept and provide valuable insights.</p>
      <textarea 
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        className="w-full h-40 p-4 rounded-md bg-primary/50 border border-neutral-600 focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 ease-in-out text-light-gray placeholder-muted-gray resize-none"
        placeholder="Describe your revolutionary idea here... e.g., A platform that connects alien tourists with local Earth guides."
        disabled={isLoading}
        required
      />
      <button 
        type="submit"
        disabled={isLoading || !idea.trim()}
        className="mt-6 w-full bg-accent hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : "Analyze Idea"}
      </button>
      <p className="text-xs text-muted-gray mt-4 text-center">Your idea is processed by AI and is not stored.</p>
    </form>
  );
};

const AnalysisDisplay = ({ results }) => (
  <div className="w-full bg-secondary/10 p-6 sm:p-8 rounded-lg shadow-xl backdrop-blur-md border border-neutral-700 animate-fadeIn">
    <h2 className="text-2xl sm:text-3xl font-display text-accent mb-6 text-center">Analysis Results</h2>
    <div className="space-y-6">
      {Object.entries(results).map(([key, value]) => {
        let content;
        if (key === 'swotAnalysis' && typeof value === 'object' && value !== null) {
          content = (
            <div className="space-y-3">
              {Object.entries(value).map(([swotKey, swotValue]) => (
                <div key={swotKey}>
                  <h4 className="text-lg font-display text-indigo-300 capitalize mb-1">{swotKey.replace(/([A-Z])/g, ' $1')}</h4>
                  {Array.isArray(swotValue) ? (
                    <ul className="list-disc list-inside text-light-gray space-y-1 pl-2">
                      {swotValue.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  ) : (
                    <p className="text-light-gray whitespace-pre-line">{String(swotValue)}</p>
                  )}
                </div>
              ))}
            </div>
          );
        } else if (typeof value === 'string') {
          content = <p className="text-light-gray whitespace-pre-line">{value}</p>;
        } else if (Array.isArray(value)) {
          content = <ul className="list-disc list-inside text-light-gray space-y-1">{value.map((item, i) => <li key={i}>{item}</li>)}</ul>;
        } else if (typeof value === 'object' && value !== null) {
          content = <pre className="text-light-gray text-sm whitespace-pre-wrap bg-primary/30 p-3 rounded-md">{JSON.stringify(value, null, 2)}</pre>;
        } else {
          content = <p className="text-light-gray whitespace-pre-line">N/A</p>;
        }

        return (
          <div key={key} className="bg-primary/50 p-4 rounded-md border border-neutral-600">
            <h3 className="text-xl font-display text-indigo-400 capitalize mb-2">{key.replace(/([A-Z])/g, ' $1').replace('Swot', 'SWOT')}</h3>
            {content}
          </div>
        );
      })}
    </div>
  </div>
);

const LoadingSpinnerInternal = () => (
  <div className="flex flex-col items-center justify-center space-y-4 p-8">
    <svg className="animate-pulseSubtle h-16 w-16 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="text-xl text-muted-gray font-display animate-fadeIn">Analyzing your idea... this might take a moment.</p>
    <p className="text-sm text-secondary animate-fadeIn animation-delay-500">Our AI is hard at work crafting your insights!</p>
  </div>
);

function App() {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = useCallback(async (submittedIdea) => {
    if (!submittedIdea || !submittedIdea.trim()) {
      setError('Please enter an idea to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResults(null);
    
    // Simulate API call delay
    console.log("Simulating AI Analysis for:", submittedIdea);
    await new Promise(resolve => setTimeout(resolve, 3000)); 

    // Mocked AI response structure
    const mockResults = {
      swotAnalysis: {
        strengths: ['Unique technology concept', 'Potentially strong founding team expertise (if applicable)', 'Scalable business model if market is validated'],
        weaknesses: ['Limited initial funding (common for new ideas)', 'Market awareness needs to be built from scratch', 'Execution risk is high without a detailed plan'],
        opportunities: ['Growing market demand for innovative solutions', 'Potential for strategic partnerships if value proposition is clear', 'First-mover advantage in a specific niche'],
        threats: ['Established competitors in broader market', 'Rapid technological changes requiring adaptation', 'Difficulty in accurately predicting market adoption rates']
      },
      marketFit: "The idea shows promising potential for market fit, especially if it addresses a clearly defined problem for a specific target audience. Key indicators of strong fit would include a unique value proposition that is significantly better than existing alternatives and aligns with current or emerging market trends. Further validation through user research and MVP testing is crucial to confirm assumptions.",
      competitorOverview: "Potential competitors likely exist, ranging from direct solutions offering similar functionalities to indirect alternatives addressing the same user pain points. A thorough analysis should identify key players like 'LargeCorp Solutions' (incumbent with resources) and 'Nimble Innovators Ltd.' (agile, niche-focused). Your idea's differentiation strategy against these competitors will be critical.",
      refinementSuggestions: [
        'Develop a more detailed go-to-market strategy focusing on early adopters.',
        'Clearly articulate the unique value proposition: what makes this idea 10x better?',
        'Conduct surveys or interviews with potential users to validate core assumptions.',
        'Build a minimal viable product (MVP) to test the core functionality and gather feedback.',
        'Explore potential monetization strategies and revenue models early on.'
      ]
    };
    setAnalysisResults(mockResults);
    setIsLoading(false);
  }, []);

  const handleReset = () => {
    setAnalysisResults(null);
    setError(null);
    // The IdeaForm will reset its internal state or we could pass a key to force remount
  };

  return (
    <div className="min-h-screen bg-primary text-light-gray flex flex-col items-center p-4 sm:p-6 md:p-8 selection:bg-accent selection:text-white">
      <header className="w-full max-w-4xl text-center mb-8 sm:mb-12 md:mb-16 animate-fadeIn">
        {/* <img src="/logo.svg" alt="Startup Idea Analyzer Logo" className="h-12 mx-auto mb-4" /> */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display text-accent font-extrabold tracking-tight">
          Startup Idea <span className="text-indigo-400">Analyzer</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-gray mt-3 sm:mt-4 max-w-2xl mx-auto">
          Unlock the potential of your vision. Get instant, AI-powered SWOT analysis, market fit insights, competitor overviews, and actionable refinement tips.
        </p>
      </header>

      <main className="w-full max-w-3xl flex-grow flex flex-col items-center justify-center">
        {isLoading ? (
          <LoadingSpinnerInternal />
        ) : analysisResults ? (
          <div className='w-full animate-slideUp'>
            <AnalysisDisplay results={analysisResults} />
            <button 
              onClick={handleReset} 
              className="mt-8 w-full sm:w-auto mx-auto bg-transparent hover:bg-accent/20 border-2 border-accent text-accent font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300 flex items-center justify-center group"
            >
              Analyze Another Idea
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ) : (
          <IdeaForm onSubmit={handleAnalyze} isLoading={isLoading} />
        )}
        {error && (
          <p className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-md animate-fadeIn">{error}</p>
        )}
      </main>

      <footer className="w-full max-w-4xl text-center mt-auto pt-12 pb-6 animate-fadeIn animation-delay-300">
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

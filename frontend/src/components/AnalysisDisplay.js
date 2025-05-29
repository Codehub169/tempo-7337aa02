import React from 'react';
import PropTypes from 'prop-types';
import Card from './common/Card';

const Section = ({ title, children, icon }) => (
  <div className="mb-8 p-1">
    <h3 className="text-2xl font-display font-semibold text-light-gray mb-4 flex items-center">
      {icon && <span className="mr-3 text-accent">{icon}</span>}
      {title}
    </h3>
    {children}
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
};

const SWOTList = ({ items, title, colorClass }) => (
  <div className={`p-4 rounded-lg bg-secondary-light ${colorClass || 'bg-opacity-10'}`}>
    <h4 className="font-semibold text-lg text-light-gray mb-2">{title}</h4>
    {Array.isArray(items) && items.length > 0 ? (
      <ul className="list-disc list-inside space-y-1 text-gray-300">
        {items.map((item, index) => (
          <li key={index}>{typeof item === 'string' ? item : JSON.stringify(item)}</li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-400 italic">No {title.toLowerCase()} identified.</p>
    )}
  </div>
);

SWOTList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  colorClass: PropTypes.string,
};

function AnalysisDisplay({ analysisResults, onReset }) {
  if (!analysisResults) {
    return null;
  }

  const {
    swotAnalysis = { strengths: [], weaknesses: [], opportunities: [], threats: [] },
    marketFit = "No market fit analysis available.",
    competitorOverview = "No competitor overview available.",
    refinementSuggestions = [],
  } = analysisResults;

  // Example icons (replace with actual SVG or icon components)
  const SwotIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21M9 17.25v-4.5M9 17.25H5.25M9 17.25H12.75M9 17.25v1.007a3 3 0 00.879 2.122L10.5 21M9 9.75V5.625A2.625 2.625 0 006.375 3H5.25M9 9.75V12M9 9.75H5.25M9 9.75H12.75m0 0V5.625A2.625 2.625 0 0115.375 3H16.5m0 0V12m0 0h3.75m0 0h3.75m0 0V5.625A2.625 2.625 0 0018.375 3H17.25M5.25 9.75h3.75" /></svg>;
  const MarketFitIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
  const CompetitorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
  const SuggestionsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m0-8v4m-4-2h8"/></svg>;


  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-6 sm:p-8 bg-primary-dark rounded-lg shadow-2xl animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-light-gray">Analysis Results</h2>
          {onReset && (
            <button 
              onClick={onReset}
              className="px-4 py-2 bg-accent hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark focus:ring-accent transition-all duration-300 ease-in-out"
            >
              Analyze Another Idea
            </button>
          )}
      </div>

      <Section title="SWOT Analysis" icon={<SwotIcon/>}>
        <Card className="bg-secondary p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6">
            <SWOTList items={swotAnalysis.strengths || []} title="Strengths" colorClass="bg-green-500 bg-opacity-20" />
            <SWOTList items={swotAnalysis.weaknesses || []} title="Weaknesses" colorClass="bg-red-500 bg-opacity-20" />
            <SWOTList items={swotAnalysis.opportunities || []} title="Opportunities" colorClass="bg-blue-500 bg-opacity-20" />
            <SWOTList items={swotAnalysis.threats || []} title="Threats" colorClass="bg-yellow-500 bg-opacity-20" />
          </div>
        </Card>
      </Section>

      <Section title="Estimated Market Fit" icon={<MarketFitIcon/>}>
        <Card className="bg-secondary p-4 sm:p-6">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {marketFit || "No analysis provided."}
          </p>
        </Card>
      </Section>

      <Section title="Competitor Overview" icon={<CompetitorIcon/>}>
        <Card className="bg-secondary p-4 sm:p-6">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {competitorOverview || "No analysis provided."}
          </p>
        </Card>
      </Section>

      <Section title="Refinement Suggestions" icon={<SuggestionsIcon/>}>
        <Card className="bg-secondary p-4 sm:p-6">
          {Array.isArray(refinementSuggestions) && refinementSuggestions.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-300 leading-relaxed">
              {refinementSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">No refinement suggestions available.</p>
          )}
        </Card>
      </Section>
    </div>
  );
}

AnalysisDisplay.propTypes = {
  analysisResults: PropTypes.shape({
    swotAnalysis: PropTypes.shape({
      strengths: PropTypes.arrayOf(PropTypes.string),
      weaknesses: PropTypes.arrayOf(PropTypes.string),
      opportunities: PropTypes.arrayOf(PropTypes.string),
      threats: PropTypes.arrayOf(PropTypes.string),
    }),
    marketFit: PropTypes.string,
    competitorOverview: PropTypes.string,
    refinementSuggestions: PropTypes.arrayOf(PropTypes.string),
  }),
  onReset: PropTypes.func,
};

export default AnalysisDisplay;

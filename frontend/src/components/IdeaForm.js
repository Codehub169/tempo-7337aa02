import React from 'react';
import PropTypes from 'prop-types';

function IdeaForm({ onSubmit, isLoading, currentIdea, onIdeaChange }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!currentIdea.trim()) {
      // Basic validation, can be enhanced with visual feedback
      alert("Please enter your startup idea.");
      return;
    }
    onSubmit(currentIdea);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-primary-dark p-6 sm:p-8 rounded-lg shadow-xl transition-all duration-500 ease-in-out">
      <h2 className="text-2xl sm:text-3xl font-display font-bold text-light-gray mb-6 text-center">Describe Your Startup Idea</h2>
      <div className="mb-6">
        <label htmlFor="startup-idea" className="block text-sm font-medium text-gray-300 mb-2">
          What problem are you solving? Who is your target audience? What is your proposed solution?
        </label>
        <textarea
          id="startup-idea"
          name="startup-idea"
          rows="8"
          className="block w-full p-4 bg-secondary text-light-gray border border-gray-600 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm placeholder-gray-500 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 resize-none"
          placeholder="e.g., A platform that connects local artists with small businesses for custom mural projects, targeting cafes and boutiques..."
          value={currentIdea}
          onChange={onIdeaChange}
          disabled={isLoading}
          aria-describedby="idea-helper-text"
        />
        <p id="idea-helper-text" className="mt-2 text-xs text-gray-400">
          Be as detailed as possible for a more accurate analysis.
        </p>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading || !currentIdea.trim()}
          className="px-8 py-3 bg-accent hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark focus:ring-accent transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Idea'}
        </button>
      </div>
    </form>
  );
}

IdeaForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  currentIdea: PropTypes.string.isRequired,
  onIdeaChange: PropTypes.func.isRequired,
};

export default IdeaForm;

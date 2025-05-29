import React from 'react';
import PropTypes from 'prop-types';

function LoadingSpinner({ size = 'md', text = 'Analyzing your idea...' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const textSizeClasses = {
    sm: 'text-sm mt-2',
    md: 'text-base mt-3',
    lg: 'text-lg mt-4',
  }

  return (
    <div 
      role="status"
      aria-live="polite"
      aria-label={text}
      className="flex flex-col items-center justify-center p-8 bg-primary-dark rounded-lg shadow-xl my-8 animate-fadeIn"
    >
      <div
        className={`animate-pulseSubtle border-4 border-accent border-t-transparent rounded-full ${sizeClasses[size] || sizeClasses.md}`}
        style={{ borderTopColor: 'transparent' }} // Tailwind might not always override this for animations
      ></div>
      {text && <p className={`text-light-gray ${textSizeClasses[size] || textSizeClasses.md}`}>{text}</p>}
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string,
};

export default LoadingSpinner;

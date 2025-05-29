import React from 'react';
import PropTypes from 'prop-types';

function Card({ children, className = '', as: Component = 'div', ...rest }) {
  return (
    <Component
      className={`bg-secondary shadow-lg rounded-lg p-6 transition-all duration-300 ease-in-out ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.elementType, // Allows specifying the HTML element type (e.g., 'article', 'section')
};

export default Card;

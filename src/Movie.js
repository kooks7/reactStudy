import React from 'react';
import PropTypes from 'prop-types';

const Movie = ({ id, year, title, summary, poster }) => {
  return <h4>{title}</h4>;
};

Movie.propType = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired
};

export default Movie;

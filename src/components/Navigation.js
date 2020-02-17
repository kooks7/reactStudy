import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export const Navigation = () => {
  return (
    <div class="nav">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  );
};

export default Navigation;

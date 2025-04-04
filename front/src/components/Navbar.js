import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav>
      <div className="container">
        <div className="logo">WeatherToday</div>
        <ul>
          <li>
            <Link to="/" className="home">Home</Link>
          </li>
          <li>
            <Link to="/api" className="api">API</Link>
          </li>
          <li>
            <Link to="/visualize" className="visualize">Data Visualize</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
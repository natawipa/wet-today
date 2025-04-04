import React from 'react';
import './Card.css';

export default function Card({ title, description, children }) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <div className="card-content">{children}</div>
    </div>
  );
}
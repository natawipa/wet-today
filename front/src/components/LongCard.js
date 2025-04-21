import React from 'react';
import './LongCard.css';

export default function LongCard({ title, children }) {
  return (
    <div className="long-card">
      <h2 className="long-card-title">{title}</h2>
      <div className="long-card-content">{children}</div>
    </div>
  );
}
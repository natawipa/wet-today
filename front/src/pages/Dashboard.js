import React from 'react';
import WetTodayChart from '../components/WetTodayChart';
import WetKbChart from '../components/WetKbChart';

function Dashboard({ wetTodayData, wetKbData }) {
  return (
    <div className="dashboard">
      <h1>Weather Dashboard</h1>
      <div className="chart-grid">
        <WetTodayChart data={wetTodayData} />
        <WetKbChart data={wetKbData} />
      </div>
    </div>
  );
}

export default Dashboard;
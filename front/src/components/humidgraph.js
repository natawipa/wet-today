import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );


export default function HumidityGraph({ data, selectedDate }) {
  const prepareHumidData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          label: 'No Data Available',
          data: [1],
          backgroundColor: ['rgba(200, 200, 200, 0.6)'],
          borderColor: ['rgba(200, 200, 200, 1)'],
          borderWidth: 1
        }]
      };
    }

    const humidityRanges = ['<20%', '20-40%', '40-60%', '60-80%', '>80%'];
    const frequency = [0, 0, 0, 0, 0];

    data.forEach((item) => {
      const humid = item?.humidity || 0;
      if (humid < 20) frequency[0]++;
      else if (humid < 40) frequency[1]++;
      else if (humid < 60) frequency[2]++;
      else if (humid < 80) frequency[3]++;
      else frequency[4]++;
    });

    return {
      labels: humidityRanges,
      datasets: [{
        label: 'Frequency',
        data: frequency,
        backgroundColor: 'rgba(210, 180, 240, 0.6)',
        borderColor: 'rgba(210, 180, 240, 1)',
        borderWidth: 1,
      }],
    };
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h3>Humidity Distribution</h3>
      <Bar 
        data={prepareHumidData(data)} 
        options={{ 
          responsive: true, 
          plugins: { 
            legend: { position: 'top' },
          } 
        }} 
      />
    </div>
  );
}
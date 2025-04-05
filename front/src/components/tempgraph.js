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


export default function TemperatureGraph({ data, selectedDate }) {
  const prepareTempData = (data) => {
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

    const temperatureRanges = ['<20°C', '20-25°C', '25-30°C', '30-35°C', '>35°C'];
    const frequency = [0, 0, 0, 0, 0];

    data.forEach((item) => {
      const temp = item?.temperature || 0;
      if (temp < 20) frequency[0]++;
      else if (temp < 25) frequency[1]++;
      else if (temp < 30) frequency[2]++;
      else if (temp < 35) frequency[3]++;
      else frequency[4]++;
    });

    return {
      labels: temperatureRanges,
      datasets: [{
        label: 'Frequency',
        data: frequency,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    };
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h3>Temperature Distribution</h3>
      <Bar 
        data={prepareTempData(data)} 
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
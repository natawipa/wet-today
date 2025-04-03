import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function WetTodayChart({ data }) {
  // Define temperature ranges
  const tempRanges = [
    { range: '15-20', min: 15, max: 20 },
    { range: '21-25', min: 21, max: 25 },
    { range: '26-30', min: 26, max: 30 },
    { range: '31-35', min: 31, max: 35 },
    { range: '36-40', min: 36, max: 40 },
  ];

  // Calculate frequency of temperatures in each range
  const tempFrequencies = tempRanges.map((range) => {
    return data.filter(
      (item) => item.temperature >= range.min && item.temperature <= range.max
    ).length;
  });

  const chartData = {
    labels: tempRanges.map((range) => range.range), // X-axis labels (temperature ranges)
    datasets: [
      {
        label: 'Frequency of Temperatures',
        data: tempFrequencies, // Y-axis values (frequencies)
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Temperature Frequency (Bar Graph)',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Temperature Range (°C)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Frequency',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2>Wet Today Data</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default WetTodayChart;
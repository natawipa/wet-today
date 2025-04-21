import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ComparisonGraph({ kbData, tmdData }) {
  const prepareGraphData = (kbData, tmdData) => {
    const datasets = [];

    const processData = (data, label, color) => {
      return {
        label,
        data: data.map((item) => ({
          x: item.temperature,
          y: item.humidity,
          rain: item.rainfall24hr > 0,
        })),
        borderColor: color,
        backgroundColor: color,
        pointBackgroundColor: data.map((item) =>
          item.rainfall > 0 ? 'rgba(255, 99, 132, 1)' : color
        ),
        pointBorderColor: data.map((item) =>
          item.rainfall > 0 ? 'rgba(255, 99, 132, 1)' : color
        ),
        pointRadius: 5,
      };
    };

    if (kbData) {
      datasets.push(processData(kbData, 'KB Data', 'rgba(54, 162, 235, 1)'));
    }
    if (tmdData) {
      datasets.push(processData(tmdData, 'TMD Data', 'rgba(75, 192, 192, 1)'));
    }

    return {
      datasets,
    };
  };

  return (
    <div className="comparison-graph">
      <h3>Temperature vs Humidity Comparison</h3>
      <Line
        data={prepareGraphData(kbData, tmdData)}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
          },
          scales: {
            x: {
              title: { display: true, text: 'Temperature (°C)' },
            },
            y: {
              title: { display: true, text: 'Humidity (%)' },
            },
          },
        }}
      />
    </div>
  );
}
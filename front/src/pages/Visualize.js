import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Visualize() {
  const [selectedAPI, setSelectedAPI] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data function wrapped in useCallback
  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    let apiUrl = '';
    if (selectedAPI === 'tmd') {
      apiUrl = `http://127.0.0.1:8080/rain-api/wet-today${selectedDate ? `/${selectedDate}` : ''}`;
    } else if (selectedAPI === 'kidbright') {
      apiUrl = `http://127.0.0.1:8080/rain-api/wet-kb${selectedDate ? `/${selectedDate}` : ''}`;
    } else {
      // Fetch both APIs if "all" is selected
      Promise.all([
        fetch(`http://127.0.0.1:8080/rain-api/wet-today${selectedDate ? `/${selectedDate}` : ''}`).then((res) => res.json()),
        fetch(`http://127.0.0.1:8080/rain-api/wet-kb${selectedDate ? `/${selectedDate}` : ''}`).then((res) => res.json()),
      ])
        .then(([tmdData, kidBrightData]) => {
          setData([{ api: 'TMD', data: tmdData }, { api: 'KidBright', data: kidBrightData }]);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
      return;
    }

    // Fetch single API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData([{ api: selectedAPI.toUpperCase(), data }]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [selectedAPI, selectedDate]);

  // useEffect to fetch data when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to prepare chart data
  const prepareChartData = (data) => {
    const temperatureRanges = ['<20°C', '20-25°C', '25-30°C', '30-35°C', '>35°C'];
    const frequency = [0, 0, 0, 0, 0];

    data.forEach((item) => {
      const temp = item.temperature; // Assuming the data has a `temperature` field
      if (temp < 20) frequency[0]++;
      else if (temp >= 20 && temp < 25) frequency[1]++;
      else if (temp >= 25 && temp < 30) frequency[2]++;
      else if (temp >= 30 && temp < 35) frequency[3]++;
      else frequency[4]++;
    });

    return {
      labels: temperatureRanges,
      datasets: [
        {
          label: 'Frequency',
          data: frequency,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Visualize Data</h1>

      {/* API Selector */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="api-select" style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>
          Select API:
        </label>
        <select
          id="api-select"
          value={selectedAPI}
          onChange={(e) => setSelectedAPI(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        >
          <option value="all">All APIs</option>
          <option value="tmd">TMD API</option>
          <option value="kidbright">KidBright API</option>
        </select>
      </div>

      {/* Date Selector */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="date" style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>
          Select Date:
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
      </div>

      {/* Data Display */}
      {loading && <h2>Loading...</h2>}
      {error && <h2>Error: {error}</h2>}
      {!loading && !error && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {data.map((item, index) => (
            <Card key={index} title={`${item.api} Data`} description={`Data for ${selectedDate || 'all dates'}`}>
              <Bar data={prepareChartData(item.data)} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
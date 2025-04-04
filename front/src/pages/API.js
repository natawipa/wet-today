import React, { useState, useEffect, useCallback } from 'react';

export default function API() {
  const [selectedAPI, setSelectedAPI] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>API Overview</h1>
      <p>
        This page allows you to view data from the TMD and KidBright APIs. You can select a specific API or view data from both APIs. Additionally, you can filter data by date.
      </p>

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
        <label htmlFor="date-select" style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>
          Select Date:
        </label>
        <input
          type="date"
          id="date-select"
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
        <div>
          {data.map((item, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <h3>{item.api} Data</h3>
              <pre>{JSON.stringify(item.data, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import TemperatureGraph from '../components/TemperatureGraph';
import HumidityGraph from '../components/HumidityGraph';
import RainfallGraph from '../components/RainfallGraph';

export default function Visualize() {
  const [selectedAPI, setSelectedAPI] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const formattedDate = selectedDate ? formatDate(selectedDate) : '';

      if (selectedAPI === 'all') {
        const [tmdData, kidBrightData] = await Promise.all([
          fetch(`http://127.0.0.1:8080/rain-api/wet-today${formattedDate ? `/${formattedDate}` : ''}`)
            .then(res => {
              if (!res.ok) throw new Error('TMD API failed');
              return res.json();
            }),
          fetch(`http://127.0.0.1:8080/rain-api/wet-kb${formattedDate ? `/${formattedDate}` : ''}`)
            .then(res => {
              if (!res.ok) throw new Error('KidBright API failed');
              return res.json();
            })
        ]);
        
        setData([
          { api: 'TMD', data: Array.isArray(tmdData) ? tmdData : [] },
          { api: 'KidBright', data: Array.isArray(kidBrightData) ? kidBrightData : [] }
        ]);
      } else {
        const apiUrl = selectedAPI === 'tmd' 
          ? `http://127.0.0.1:8080/rain-api/wet-today${formattedDate ? `/${formattedDate}` : ''}`
          : `http://127.0.0.1:8080/rain-api/wet-kb${formattedDate ? `/${formattedDate}` : ''}`;

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('API request failed');
        const apiData = await response.json();
        
        setData([{ 
          api: selectedAPI.toUpperCase(), 
          data: Array.isArray(apiData) ? apiData : [] 
        }]);
      }
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [selectedAPI, selectedDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Visualize Data</h1>

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

      {loading && <h2>Loading...</h2>}
      {error && (
        <div style={{ color: 'red', margin: '1rem 0' }}>
          <h2>Error: {error}</h2>
          <button onClick={fetchData}>Retry</button>
        </div>
      )}
      
      {!loading && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {data.map((item, index) => (
              <Card key={`temp-${index}`} title={`${item.api} Temperature Data`} 
                description={selectedDate ? `Daily data for ${selectedDate}` : 'Frequency of temperature'}>
                <TemperatureGraph data={item.data} selectedDate={selectedDate} />
              </Card>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {data.map((item, index) => (
              <Card key={`humid-${index}`} title={`${item.api} Humidity Data`} 
                description={selectedDate ? `Daily data for ${selectedDate}` : 'Frequency of humidity'}>
                <HumidityGraph data={item.data} selectedDate={selectedDate} />
              </Card>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {data.some(item => item.api === 'TMD') && (
              <Card 
                title="TMD Rainfall Data" 
                description={selectedDate ? `Daily rainfall for ${selectedDate}` : 'Is rainfall occur or not.'}>
                <RainfallGraph 
                  data={data.find(item => item.api === 'TMD')?.data || []} 
                  selectedDate={selectedDate} 
                />
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

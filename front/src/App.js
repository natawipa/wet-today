import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]); // State to store fetched data

  useEffect(() => {
    // Fetch data from the API
    axios
      .get('http://127.0.0.1:8080/rain-api/wet-today') // Full API URL
      .then((response) => {
        console.log('API Response:', response.data); // Debugging
        setData(response.data); // Store the data in state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data from the API. Please check the server.');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>
        <p>Data fetched from the API:</p>
        {data.length > 0 ? (
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <strong>Timestamp:</strong> {item.timestamp} | <strong>Temperature:</strong> {item.temperature}°C | <strong>Humidity:</strong> {item.humidity}%
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available or still loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;

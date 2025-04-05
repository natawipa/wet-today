// import React, { useState, useEffect, useCallback } from 'react';
// import Card from '../components/Card';
// import { Bar } from 'react-chartjs-2';
// import { ArcElement } from 'chart.js';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,  Title, Tooltip, Legend } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// export default function Visualize() {
//   const [selectedAPI, setSelectedAPI] = useState('all');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch data function wrapped in useCallback
//   const fetchData = useCallback(() => {
//     setLoading(true);
//     setError(null);

//     let apiUrl = '';
//     if (selectedAPI === 'tmd') {
//       apiUrl = `http://127.0.0.1:8080/rain-api/wet-today${selectedDate ? `/${selectedDate}` : ''}`;
//     } else if (selectedAPI === 'kidbright') {
//       apiUrl = `http://127.0.0.1:8080/rain-api/wet-kb${selectedDate ? `/${selectedDate}` : ''}`;
//     } else {
//       // Fetch both APIs if "all" is selected
//       Promise.all([
//         fetch(`http://127.0.0.1:8080/rain-api/wet-today${selectedDate ? `/${selectedDate}` : ''}`).then((res) => res.json()),
//         fetch(`http://127.0.0.1:8080/rain-api/wet-kb${selectedDate ? `/${selectedDate}` : ''}`).then((res) => res.json()),
//       ])
//         .then(([tmdData, kidBrightData]) => {
//           setData([{ api: 'TMD', data: tmdData }, { api: 'KidBright', data: kidBrightData }]);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError(err.message);
//           setLoading(false);
//         });
//       return;
//     }

//     // Fetch single API
//     fetch(apiUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setData([{ api: selectedAPI.toUpperCase(), data }]);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, [selectedAPI, selectedDate]);

//   // useEffect to fetch data when dependencies change
//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // Function to prepare chart data
//   const prepareChartData = (data) => {
//     const temperatureRanges = ['<20°C', '20-25°C', '25-30°C', '30-35°C', '>35°C'];
//     const frequency = [0, 0, 0, 0, 0];

//     data.forEach((item) => {
//       const temp = item.temperature; // Assuming the data has a `temperature` field
//       if (temp < 20) frequency[0]++;
//       else if (temp >= 20 && temp < 25) frequency[1]++;
//       else if (temp >= 25 && temp < 30) frequency[2]++;
//       else if (temp >= 30 && temp < 35) frequency[3]++;
//       else frequency[4]++;
//     });

//     return {
//       labels: temperatureRanges,
//       datasets: [
//         {
//           label: 'Frequency',
//           data: frequency,
//           backgroundColor: 'rgba(75, 192, 192, 0.6)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h1>Visualize Data</h1>

//       {/* API Selector */}
//       <div style={{ marginBottom: '1rem' }}>
//         <label htmlFor="api-select" style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>
//           Select API:
//         </label>
//         <select
//           id="api-select"
//           value={selectedAPI}
//           onChange={(e) => setSelectedAPI(e.target.value)}
//           style={{
//             padding: '0.5rem',
//             borderRadius: '4px',
//             border: '1px solid #ccc',
//             fontSize: '1rem',
//           }}
//         >
//           <option value="all">All APIs</option>
//           <option value="tmd">TMD API</option>
//           <option value="kidbright">KidBright API</option>
//         </select>
//       </div>

//       {/* Date Selector */}
//       <div style={{ marginBottom: '1rem' }}>
//         <label htmlFor="date" style={{ marginRight: '0.5rem', fontWeight: 'bold' }}>
//           Select Date:
//         </label>
//         <input
//           type="date"
//           id="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           style={{
//             padding: '0.5rem',
//             borderRadius: '4px',
//             border: '1px solid #ccc',
//             fontSize: '1rem',
//           }}
//         />
//       </div>

//       {/* Data Display */}
//       {loading && <h2>Loading...</h2>}
//       {error && <h2>Error: {error}</h2>}
//       {!loading && !error && (
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
//           {data.map((item, index) => (
//             <Card key={index} title={`${item.api} Data`} description={`Data for ${selectedDate || 'all dates'}`}>
//               <Bar data={prepareChartData(item.data)} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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

  // Fetch data 
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

  // prepare temp chart data
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

  // prepare humidity chart data
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
  

  //prepare donut chart data
  const prepareRainfallDonutData = (data, dateSelected) => {
    if (!Array.isArray(data) || data.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          data: [1],
          backgroundColor: ['rgba(200, 200, 200, 0.6)'],
          borderColor: ['rgba(200, 200, 200, 1)'],
          borderWidth: 1
        }]
      };
    }

    let filteredData = data;
    
    // data for specific date
    if (dateSelected) {
      const selectedDateStr = new Date(dateSelected).toISOString().split('T')[0];
      filteredData = data.filter(item => {
        const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
        return itemDate === selectedDateStr;
      });
    }

    let rainCount = 0;
    let noRainCount = 0;

    filteredData.forEach((item) => {
      const rainfall = item?.rainfall24hr || 0;
      rainfall > 0 ? rainCount++ : noRainCount++;
    });

    return {
      labels: ['Rain', 'No Rain'],
      datasets: [{
        data: [rainCount, noRainCount],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      }],
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

      // skdpsp
      {!loading && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* First Row: Temperature Cards */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {data.map((item, index) => (
              <Card key={`temp-${index}`} title={`${item.api} Temperature Data`} 
                description={selectedDate ? `Daily data for ${selectedDate}` : 'Frequency of temperature'}
              >
                <div style={{ marginBottom: '1rem' }}>
                  <h3>Temperature Distribution</h3>
                  <Bar 
                    data={prepareTempData(item.data)} 
                    options={{ 
                      responsive: true, 
                      plugins: { 
                        legend: { position: 'top' },
                      } 
                    }} 
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Second Row: Humidity Cards */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {data.map((item, index) => (
              <Card key={`humid-${index}`} title={`${item.api} Humidity Data`} 
                description={selectedDate ? `Daily data for ${selectedDate}` : 'Frequency of humidity'}
              >
                <div style={{ marginBottom: '1rem' }}>
                  <h3>Humidity Distribution</h3>
                  <Bar 
                    data={prepareHumidData(item.data)} 
                    options={{ 
                      responsive: true, 
                      plugins: { 
                        legend: { position: 'top' },
                      } 
                    }} 
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Third Row: Rainfall Donut Chart */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {data.some(item => item.api === 'TMD') && (
              <Card 
                title="TMD Rainfall Data" 
                description={selectedDate ? `Daily rainfall for ${selectedDate}` : 'Is rainfall occur or not.'}
              >
                <div>
                  <h3>{selectedDate ? 'Daily' : 'Aggregated'} Rainfall Occurrence</h3>
                  <Doughnut 
                    data={prepareRainfallDonutData(
                      data.find(item => item.api === 'TMD')?.data || [], 
                      selectedDate
                    )} 
                    options={{ 
                      responsive: true, 
                      plugins: { 
                        legend: { position: 'top' },
                      },
                      cutout: '50%',
                      radius: '90%'
                    }} 
                    />
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
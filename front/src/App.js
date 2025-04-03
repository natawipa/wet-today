// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [data, setData] = useState([]); // State to store fetched data

//   useEffect(() => {
//     // Fetch data from the API
//     axios
//       .get('http://127.0.0.1:8080/rain-api/wet-today') // Full API URL
//       .then((response) => {
//         console.log('API Response:', response.data); // Debugging
//         setData(response.data); // Store the data in state
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         alert('Failed to fetch data from the API. Please check the server.');
//       });
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Weather Dashboard</h1>
//         <p>Data fetched from the API:</p>
//         {data.length > 0 ? (
//           <ul>
//             {data.map((item) => (
//               <li key={item.id}>
//                 <strong>Timestamp:</strong> {item.timestamp} | <strong>Temperature:</strong> {item.temperature}°C | <strong>Humidity:</strong> {item.humidity}%
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No data available or still loading...</p>
//         )}
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WetTodayChart from './components/WetTodayChart';
import WetKbChart from './components/WetKbChart';

function App() {
  const [wetTodayData, setWetTodayData] = useState([]);
  const [wetKbData, setWetKbData] = useState([]);

  useEffect(() => {
    // Fetch data from the first API
    axios
      .get('http://127.0.0.1:8080/rain-api/wet-today')
      .then((response) => {
        console.log('Wet Today API Response:', response.data);
        setWetTodayData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching wet-today data:', error);
        alert('Failed to fetch data from wet-today API.');
      });

    // Fetch data from the second API
    axios
      .get('http://127.0.0.1:8080/rain-api/wet-kb')
      .then((response) => {
        console.log('Wet KB API Response:', response.data);
        setWetKbData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching wet-kb data:', error);
        alert('Failed to fetch data from wet-kb API.');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>
        <WetTodayChart data={wetTodayData} />
        <WetKbChart data={wetKbData} />
      </header>
    </div>
  );
}

export default App;

// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import axios from 'axios';
// import NavigationBar from './components/Navbar';
// import Footer from './components/Footer';
// import Dashboard from './pages/Dashboard';
// import DataVisualize from './pages/DataVisualize';

// function App() {
//   const [wetTodayData, setWetTodayData] = useState([]);
//   const [wetKbData, setWetKbData] = useState([]);

//   useEffect(() => {
//     // Fetch data from the first API
//     axios
//       .get('http://127.0.0.1:8080/rain-api/wet-today')
//       .then((response) => {
//         setWetTodayData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching wet-today data:', error);
//       });

//     // Fetch data from the second API
//     axios
//       .get('http://127.0.0.1:8080/rain-api/wet-kb')
//       .then((response) => {
//         setWetKbData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching wet-kb data:', error);
//       });
//   }, []);

//   return (
//     <Router>
//       <NavigationBar />
//       <div className="content">
//         <Routes>
//           <Route path="/" element={<Dashboard wetTodayData={wetTodayData} wetKbData={wetKbData} />} />
//           <Route path="/data-visualize" element={<DataVisualize />} />
//         </Routes>
//       </div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import API from './pages/API';
import Visualize from './pages/Visualize';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api" element={<API />} />
        {/* <Route path="/api/tmd" element={<TMD />} />
        <Route path="/api/kidbright" element={<KidBright />} /> */}
        <Route path="/visualize" element={<Visualize />} />
      </Routes>
    </Router>
  );
}

export default App;
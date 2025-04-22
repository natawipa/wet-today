import React, { useEffect, useState } from "react";
import "./Home.css";
import cloudImage from "../components/cloud.png";
import ComparisonGraph from "../components/ComparisonGraph";
import Card from "../components/Card";
import LongCard from "../components/LongCard";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [kbData, setKbData] = useState([]);
  const [tmdData, setTmdData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/weather");
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchComparisonData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch both APIs in parallel
        const [kbResponse, tmdResponse] = await Promise.all([
          fetch("http://127.0.0.1:8080/rain-api/wet-kb"),
          fetch("http://127.0.0.1:8080/rain-api/wet-today"),
        ]);

        if (!kbResponse.ok || !tmdResponse.ok) {
          throw new Error("Failed to fetch comparison data");
        }

        const [kbData, tmdData] = await Promise.all([
          kbResponse.json(),
          tmdResponse.json(),
        ]);

        console.log("KB Data:", kbData);
        console.log("TMD Data:", tmdData);

        setKbData(kbData);
        setTmdData(tmdData);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    fetchComparisonData();
  }, []);

  // Safe humidity value calculation
  const humidityValue = weather 
    ? Number(weather.humidity?.toString().replace(/[^0-9.]/g, '') || 0)
    : 0;

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;
  if (!weather) return <h1>No weather data available</h1>;

  return (
    <div className="home-container">
      <Card title="Current Weather">
        <div className="weather-card">
          <img src={cloudImage} alt="Cloud" className="cloud-image" />
          <h2>{weather.location}</h2>
          <p>Temperature: {weather.temperature}</p>
          <p>Feels Like: {weather.feels_like}</p>
          <p>Condition: {weather.condition}</p>
          <p>Humidity: {weather.humidity}</p>
          <p>Wind Speed: {weather.wind_speed}</p>
          {humidityValue >= 70 && (
            <div className="humidity-warning">
              <span>⚠️ High humidity!</span>
              <p>People with respiratory</p>
              <span>disease please be careful.</span>
            </div>
          )}
        </div>
        
      </Card>
      <LongCard title="Humidity Comparison">
        <ComparisonGraph kbData={kbData} tmdData={tmdData} />
      </LongCard>
    </div>
  );
}
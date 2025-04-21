import React, { useEffect, useState } from "react";
import "./Home.css"; // Import CSS for styling
import cloudImage from "../components/cloud.png";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/weather"); // Updated URL
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

    fetchWeather();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="weather-card">
      <img src={cloudImage} alt="Cloud" className="cloud-image" />
      <h2>{weather.location}</h2>
      <p>Temperature: {weather.temperature}</p>
      <p>Feels Like: {weather.feels_like}</p>
      <p>Condition: {weather.condition}</p>
      <p>Humidity: {weather.humidity}</p>
      <p>Wind Speed: {weather.wind_speed}</p>
    </div>
  );
}
import React, { useState } from "react";
import styles from "./Weather.module.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  console.log("API Key:", process.env.REACT_APP_WEATHER_API_KEY);

  const getWeather = async () => {
    if (city.trim() === "") {
      alert("Please enter a city name.");
      return;
    }

    setLoading(true);
    setWeather(null);

    try {
      // ← This is where you use the API URL to fetch weather data:
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      const data = await response.json();

      if (data.cod === "404") {
        alert("City not found. Please check the spelling.");
        setLoading(false);
        return;
      }

      setWeather(data);
    } catch (error) {
      alert("Failed to fetch weather data. Check your internet or API key.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.weatherContainer}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={styles.input}
      />
      <button onClick={getWeather} className={styles.button}>
        Get Weather
      </button>

      {loading && <p>Fetching weather data...</p>}

      {weather && weather.main && (
        <div className={styles.result}>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

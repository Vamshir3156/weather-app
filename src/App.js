import React from "react";
import Weather from "./components/Weather";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>🌦️ WeatherCast</h1>
      <Weather />
    </div>
  );
}

export default App;

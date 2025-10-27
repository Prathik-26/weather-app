import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY 

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a valid city name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          />
          <button onClick={fetchWeather}>Hit me</button>
        </div>

        {error && <p className="error">{error}</p>}

        {loading && <p className="loading">Loading...</p>}

        {weather && !loading && (
          <div className="weather-info">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>

            <div className="weather-icon">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
            <h3>{weather.weather[0].main}</h3>

            <p className="description">{weather.weather[0].description}</p>

            <div className="temparature">
              <h1>{Math.round(weather.main.temp)}°C</h1>
            </div>

            <div className="details">
              <div className="detail-item">
                <p>Feels Like</p>
                <p>
                  <strong>{Math.round(weather.main.feels_like)}°C</strong>
                </p>
              </div>

              <div className="detail-item">
                <p>Humidity</p>
                <p>
                  <strong>{weather.main.humidity}%</strong>
                </p>
              </div>

              <div className="detail-item">
                <p>Wind Speed</p>
                <p>
                  <strong>{weather.wind.speed} m/s</strong>
                </p>
              </div>

              <div className="detail-item">
                <p>Pressure</p>
                <p>
                  <strong>{weather.main.pressure} hPa</strong>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

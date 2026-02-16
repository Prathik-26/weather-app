import { useState } from "react";

export function useWeather(apiKey) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getDailyForecast = (items = []) => {
    const byDay = new Map();
    items.forEach((item) => {
      const dayKey = new Date(item.dt * 1000).toISOString().split("T")[0];
      if (!byDay.has(dayKey) && byDay.size < 5) {
        byDay.set(dayKey, item);
      }
    });
    return Array.from(byDay.values());
  };

  const fetchWeather = async (city) => {
    if (!city.trim()) {
      setError("Please enter a valid city name");
      return;
    }
    if (!apiKey) {
      setError("Missing API key. Add REACT_APP_WEATHER_API_KEY to .env");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!weatherRes.ok) throw new Error("City not found");
      const weatherData = await weatherRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const forecastData = await forecastRes.json();

      setWeather(weatherData);
      setForecast(getDailyForecast(forecastData.list));
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    if (!apiKey) {
      setError("Missing API key. Add REACT_APP_WEATHER_API_KEY to .env");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      if (!weatherRes.ok) throw new Error("Unable to fetch location weather");
      const weatherData = await weatherRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      if (!forecastRes.ok) throw new Error("Unable to fetch location forecast");
      const forecastData = await forecastRes.json();

      setWeather(weatherData);
      setForecast(getDailyForecast(forecastData.list));
    } catch (err) {
      setError(err.message || "Unable to fetch location data");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    forecast,
    loading,
    error,
    fetchWeather,
    fetchWeatherByCoords,
  };
}

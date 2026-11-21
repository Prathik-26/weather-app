import { useEffect, useState } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import { useWeather } from "./hooks/useWeather";
import ThemeToggle from "./components/ThemeToggle";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import { WiDaySunny } from "react-icons/wi";

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const {
    weather,
    forecast,
    loading,
    error,
    fetchWeather,
    fetchWeatherByCoords,
  } = useWeather(apiKey);
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [unit, setUnit] = useState(localStorage.getItem("unit") || "C");
  const [recentCities, setRecentCities] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("recentCities") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      fetchWeather(lastCity);
    }
    // Run only once on initial load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  const toggleUnit = () => {
    const next = unit === "C" ? "F" : "C";
    setUnit(next);
    localStorage.setItem("unit", next);
  };

  const addRecentCity = (nextCity) => {
    const normalized = nextCity.trim();
    if (!normalized) return;
    setRecentCities((prev) => {
      const updated = [normalized, ...prev.filter((item) => item.toLowerCase() !== normalized.toLowerCase())].slice(0, 5);
      localStorage.setItem("recentCities", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSearch = () => {
    const normalized = city.trim();
    if (!normalized) {
      fetchWeather("");
      return;
    }
    fetchWeather(normalized);
    localStorage.setItem("lastCity", normalized);
    addRecentCity(normalized);
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
        () => alert("Unable to access location")
      );
    } else {
      alert("Geolocation is not supported by this browser");
    }
  };

  const selectRecentCity = (recentCity) => {
    setCity(recentCity);
    fetchWeather(recentCity);
    localStorage.setItem("lastCity", recentCity);
    addRecentCity(recentCity);
  };

  return (
    <main className={`dashboard ${theme === "dark" ? "dashboard-dark" : ""}`}>
      <div className="dashboard-glow dashboard-glow-one" />
      <div className="dashboard-glow dashboard-glow-two" />
      <div className="dashboard-shell">
        <aside className="sidebar">
          <a className="brand" href="#top" aria-label="Atmos home">
            <span className="brand-mark"><WiDaySunny size={28} /></span>
            <span>atmos<span className="brand-period">.</span><small>WEATHER INTELLIGENCE</small></span>
          </a>
          <div className="sidebar-label">WORKSPACE</div>
          <a href="#overview" className="nav-link nav-link-active"><span>◈</span> Overview <span className="nav-indicator" /></a>
          <a href="#forecast" className="nav-link"><span>▦</span> Forecast</a>
          <div className="sidebar-label locations-label">SAVED LOCATIONS</div>
          {recentCities.length > 0 ? recentCities.map((recentCity, index) => (
            <button key={recentCity} className="location-link" onClick={() => selectRecentCity(recentCity)}>
              <span className="location-dot" />{recentCity}<span className="location-index">0{index + 1}</span>
            </button>
          )) : <p className="sidebar-empty">Your recent searches will appear here.</p>}
          <div className="sidebar-bottom"><span className="status-pulse" /> SYSTEM OPERATIONAL <small>ATMOS CORE · V 2.4.0</small></div>
        </aside>

        <section className="workspace" id="top">
          <header className="topbar">
            <div className="breadcrumb"><span>Workspace</span><b>/</b> Weather overview</div>
            <div className="topbar-actions"><span className="live-status"><i /> LIVE DATA</span><ThemeToggle theme={theme} toggleTheme={toggleTheme} /><button className="unit-toggle" onClick={toggleUnit}>{unit}° <span>/{unit === "C" ? "F" : "C"}</span></button><div className="avatar">A</div></div>
          </header>

          <div className="content" id="overview">
            <div className="page-heading"><div><div className="eyebrow">CLIMATE CONTROL CENTER <span>—</span> 01</div><h1>Weather overview</h1><p>Your atmosphere, at a glance.</p></div><div className="date-chip"><span>LOCAL TIME</span>{new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</div></div>

            <div className="search-panel"><div className="search-copy"><span className="search-icon">⌕</span><div><strong>Explore a location</strong><small>Search any city to see live conditions</small></div></div><SearchBox city={city} setCity={setCity} onSearch={handleSearch} onUseLocation={handleUseLocation} /></div>

            {error && <ErrorMessage message={error} />}
            {loading && <Loader />}

            {weather && !loading ? (
              <div className="weather-grid">
                <div className="weather-main-card"><div className="card-topline"><span><i /> CURRENT CONDITIONS</span><span>UPDATED JUST NOW</span></div><WeatherDetails weather={weather} unit={unit} /></div>
                <div className="forecast-panel" id="forecast"><div className="panel-heading"><div><span className="eyebrow">LOOK AHEAD</span><h2>5-day forecast</h2></div><span className="panel-arrow">↗</span></div><Forecast forecast={forecast} unit={unit} /></div>
              </div>
            ) : !loading && !error ? (
              <div className="welcome-panel"><div className="welcome-orbit"><div className="orbit-ring orbit-ring-one"/><div className="orbit-ring orbit-ring-two"/><div className="orbit-core"><WiDaySunny size={52}/></div><span className="orbit-satellite"/></div><span className="eyebrow">ATMOSPHERIC INTELLIGENCE</span><h2>Forecast your next move.</h2><p>Search a city or use your current location to unlock real-time conditions and a five-day outlook.</p><div className="welcome-stats"><div><strong>24/7</strong><span>LIVE MONITORING</span></div><i/><div><strong>5 day</strong><span>FORECAST WINDOW</span></div><i/><div><strong>Global</strong><span>LOCATION COVERAGE</span></div></div></div>
            ) : null}
            <footer className="footer"><span>ATMOS <b>•</b> WEATHER INTELLIGENCE PLATFORM</span><span>BUILT FOR WHAT’S NEXT <b>↗</b></span></footer>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;

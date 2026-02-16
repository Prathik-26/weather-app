import { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import { useWeather } from "./hooks/useWeather";
import ThemeToggle from "./components/ThemeToggle";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

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

  const getThemeGradient = () => {
    if (!weather) {
      return theme === "dark"
        ? "from-slate-900 via-slate-800 to-slate-950"
        : "from-sky-200 via-cyan-100 to-indigo-200";
    }

    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes("clear")) {
      return theme === "dark"
        ? "from-slate-900 via-blue-900 to-indigo-950"
        : "from-cyan-200 via-sky-200 to-amber-100";
    }
    if (condition.includes("cloud")) {
      return theme === "dark"
        ? "from-slate-800 via-gray-700 to-slate-900"
        : "from-gray-200 via-slate-100 to-blue-100";
    }
    if (condition.includes("rain") || condition.includes("drizzle")) {
      return theme === "dark"
        ? "from-slate-900 via-blue-950 to-gray-900"
        : "from-slate-300 via-blue-200 to-cyan-100";
    }
    if (condition.includes("snow")) {
      return theme === "dark"
        ? "from-slate-900 via-blue-900 to-gray-800"
        : "from-blue-100 via-white to-slate-100";
    }
    if (condition.includes("thunder")) {
      return theme === "dark"
        ? "from-zinc-900 via-slate-900 to-indigo-950"
        : "from-slate-300 via-violet-200 to-indigo-100";
    }
    return theme === "dark"
      ? "from-slate-900 via-slate-800 to-slate-950"
      : "from-sky-200 via-cyan-100 to-indigo-200";
  };

  // Weather animation icons
  const getWeatherAnimation = () => {
    if (!weather) return null;
    const condition = weather.weather[0].main.toLowerCase();

    if (condition.includes("clear"))
      return (
        <div className="hidden sm:block absolute top-10 right-10 w-20 h-20 bg-yellow-300 rounded-full animate-float shadow-xl"></div>
      );

    if (condition.includes("cloud"))
      return (
        <div className="hidden sm:block absolute top-8 right-8">
          <div className="w-20 h-10 bg-gray-300 rounded-full blur-sm animate-float"></div>
          <div className="w-16 h-8 bg-gray-400 rounded-full blur-sm -mt-2 ml-3 animate-float"></div>
        </div>
      );

    if (condition.includes("rain"))
      return (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-blue-400 opacity-60 h-8 w-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `rain ${1 + Math.random()}s linear infinite`,
              }}
            ></div>
          ))}
          <style>
            {`@keyframes rain {
                0% { transform: translateY(-100px); opacity: 0; }
                20% { opacity: 1; }
                100% { transform: translateY(800px); opacity: 0; }
              }`}
          </style>
        </div>
      );

    if (condition.includes("snow"))
      return (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 4}px`,
                height: `${Math.random() * 6 + 4}px`,
                animation: `snow ${2 + Math.random() * 2}s linear infinite`,
              }}
            ></div>
          ))}
          <style>
            {`@keyframes snow {
                0% { transform: translateY(-10px); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translateY(800px); opacity: 0; }
              }`}
          </style>
        </div>
      );

    return null;
  };

  return (
    <div className={`relative flex justify-center items-center min-h-screen px-3 py-4 sm:px-6 sm:py-8 transition-all duration-500 bg-gradient-to-br ${getThemeGradient()}`}>
      {getWeatherAnimation()}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_60%)]"></div>

      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-xl bg-white/25 dark:bg-gray-900/45 backdrop-blur-xl shadow-2xl rounded-3xl p-4 sm:p-6 text-center transition-all duration-500 border border-white/35 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 justify-center sm:justify-end mb-3">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            onClick={toggleUnit}
            className="px-3 py-1 rounded-lg text-xs sm:text-sm font-medium bg-white/55 dark:bg-gray-700/55 text-gray-700 dark:text-gray-100 border border-white/40 dark:border-gray-500"
          >
            Unit: {unit === "C" ? "Celsius" : "Fahrenheit"}
          </button>
        </div>

        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 tracking-wide">
          Weather Pulse
        </h1>

        <SearchBox
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          onUseLocation={handleUseLocation}
        />

        {recentCities.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {recentCities.map((recentCity) => (
              <button
                key={recentCity}
                onClick={() => selectRecentCity(recentCity)}
                className="text-xs px-3 py-1 rounded-full bg-white/45 dark:bg-gray-700/40 border border-white/40 dark:border-gray-500 text-gray-700 dark:text-gray-100 hover:scale-105 transition-transform"
              >
                {recentCity}
              </button>
            ))}
          </div>
        )}

        {error && <ErrorMessage message={error} />}
        {loading && <Loader />}
        {weather && !loading && (
          <>
            <WeatherDetails weather={weather} unit={unit} />
            <Forecast forecast={forecast} unit={unit} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

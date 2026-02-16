import {
  WiBarometer,
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiSunrise,
  WiSunset,
  WiThermometer,
} from "react-icons/wi";

const toUnitTemp = (value, unit) => {
  if (unit === "F") {
    return Math.round((value * 9) / 5 + 32);
  }
  return Math.round(value);
};

const formatClock = (unix, timezoneOffsetSeconds) => {
  const localDate = new Date((unix + timezoneOffsetSeconds) * 1000);
  return localDate.toUTCString().slice(17, 22);
};

function WeatherDetails({ weather, unit }) {
  return (
    <div className="text-center mt-4">
      <h2 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-100">
        {weather.name}, {weather.sys.country}
      </h2>

      <div className="flex justify-center">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="drop-shadow-xl animate-float"
        />
      </div>

      <p className="capitalize text-gray-700 dark:text-gray-300 text-base sm:text-lg">
        {weather.weather[0].description}
      </p>

      <h1 className="text-4xl sm:text-5xl font-bold text-blue-500 my-4">
        {toUnitTemp(weather.main.temp, unit)}{unit}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
        <div className="p-3 rounded-xl bg-white/40 dark:bg-gray-700/40 backdrop-blur-lg">
          <WiThermometer size={36} className="mx-auto text-blue-400" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Feels Like</p>
          <strong>{toUnitTemp(weather.main.feels_like, unit)}{unit}</strong>
        </div>
        <div className="p-3 rounded-xl bg-white/40 dark:bg-gray-700/40 backdrop-blur-lg">
          <WiHumidity size={36} className="mx-auto text-blue-400" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Humidity</p>
          <strong>{weather.main.humidity}%</strong>
        </div>
        <div className="p-3 rounded-xl bg-white/40 dark:bg-gray-700/40 backdrop-blur-lg">
          <WiStrongWind size={36} className="mx-auto text-blue-400" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Wind</p>
          <strong>{weather.wind.speed} m/s</strong>
        </div>
        <div className="p-3 rounded-xl bg-white/40 dark:bg-gray-700/40 backdrop-blur-lg">
          <WiBarometer size={36} className="mx-auto text-blue-400" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Pressure</p>
          <strong>{weather.main.pressure} hPa</strong>
        </div>
        <div className="p-3 rounded-xl bg-white/40 dark:bg-gray-700/40 backdrop-blur-lg">
          <WiSunrise size={36} className="mx-auto text-amber-400" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Sunrise</p>
          <strong>{formatClock(weather.sys.sunrise, weather.timezone)}</strong>
        </div>
        <div className="p-3 rounded-xl bg-white/40 dark:bg-gray-700/40 backdrop-blur-lg">
          <WiSunset size={36} className="mx-auto text-orange-400" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Sunset</p>
          <strong>{formatClock(weather.sys.sunset, weather.timezone)}</strong>
        </div>
      </div>

      <div className="mt-4 rounded-xl p-3 bg-white/35 dark:bg-gray-700/30 border border-white/40 dark:border-gray-500">
        <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200">
          <WiDaySunny size={26} />
          <span className="text-sm">
            Visibility: {(weather.visibility / 1000).toFixed(1)} km
          </span>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;

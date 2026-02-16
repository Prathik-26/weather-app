const toUnitTemp = (value, unit) => {
  if (unit === "F") {
    return Math.round((value * 9) / 5 + 32);
  }
  return Math.round(value);
};

function Forecast({ forecast, unit }) {
  if (!forecast.length) return null;

  return (
    <div className="mt-8 text-left">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 text-center">
        5-Day Forecast
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {forecast.map((item) => (
          <div
            key={item.dt}
            className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/35 dark:bg-gray-700/30 border border-white/40 dark:border-gray-500"
          >
            <div>
              <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-100">
                {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 capitalize">
                {item.weather[0].description}
              </p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
              />
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {toUnitTemp(item.main.temp, unit)}
                {unit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;

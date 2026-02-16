function SearchBox({ city, setCity, onSearch, onUseLocation }) {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mb-4">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        className="flex-1 w-full sm:min-w-[180px] px-4 py-2 rounded-xl border border-white/50 dark:border-gray-600 bg-white/80 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-sky-400"
      />
      <button
        onClick={onSearch}
        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:scale-105 transition-transform"
      >
        Search
      </button>
      <button
        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:scale-105 transition-transform"
        onClick={onUseLocation}
      >
        Use Location
      </button>
    </div>
  );
}

export default SearchBox;

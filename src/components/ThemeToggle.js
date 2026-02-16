function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      className="px-3 py-1 rounded-lg bg-white/60 dark:bg-gray-700/60 text-gray-700 dark:text-gray-100 text-xs sm:text-sm font-semibold border border-white/40 dark:border-gray-500 hover:scale-105 transition-transform"
      onClick={toggleTheme}
    >
      Theme: {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}

export default ThemeToggle;

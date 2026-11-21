function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
    >
      Theme: {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}

export default ThemeToggle;

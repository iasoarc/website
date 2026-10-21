// Apply the initial theme; ThemeSwitcher handles subsequent user/system changes.
(() => {
  let theme;

  try {
    theme = localStorage.getItem("theme");
  } catch {
    // Storage may be disabled; fall back to the system preference.
  }

  const isDark = theme === "dark" ||
    (theme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.documentElement.classList.toggle("dark", isDark);
})();

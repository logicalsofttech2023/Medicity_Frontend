// Immediately apply the theme based on localStorage
(function () {
  const darkMode = localStorage.getItem('darkMode');
  const isDarkMode = darkMode === 'enabled';
  const themeClass = isDarkMode ? 'dark-mode' : 'light-mode';

  // Apply the theme class to the document immediately
  document.documentElement.classList.remove('dark-mode', 'light-mode');
  document.documentElement.classList.add(themeClass);

  // Wait for DOMContentLoaded to safely interact with DOM elements
  document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const lightModeToggle = document.getElementById('light-mode-toggle');

    const toggleMode = (enableDark) => {
      document.documentElement.classList.toggle('dark-mode', enableDark);
      document.documentElement.classList.toggle('light-mode', !enableDark);
      localStorage.setItem('darkMode', enableDark ? 'enabled' : 'disabled');
      updateToggleButtons(enableDark);
    };

    const updateToggleButtons = (isDarkModeActive) => {
      if (darkModeToggle && lightModeToggle) {
        darkModeToggle.classList.toggle('activate', !isDarkModeActive);
        lightModeToggle.classList.toggle('activate', isDarkModeActive);
      }
    };

    // Initial button state sync
    updateToggleButtons(isDarkMode);

    // Event listeners only if buttons exist
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => toggleMode(true));
    }
    if (lightModeToggle) {
      lightModeToggle.addEventListener('click', () => toggleMode(false));
    }
  });
})();

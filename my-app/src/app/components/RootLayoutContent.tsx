//Basically just using this for light / dark mode

'use client'; // This is the Client Component
import { useState, useEffect } from 'react';
import { FaMoon } from 'react-icons/fa'; // Import icons
import { HiLightBulb } from "react-icons/hi";

export default function RootLayoutContent({children}: {children: React.ReactNode}) {

  const [theme, setTheme] = useState('dark'); // Default theme is light

  useEffect(() => {
    // Check local storage for saved theme on mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Add or remove dark class from body based on theme
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]); // Run effect when theme changes

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save theme to local storage
  };

  return (
    <>
      {children}
      <button onClick={toggleTheme} className="dark-mode-toggle">
      {theme === 'light' ? <FaMoon /> : <HiLightBulb />}
      </button>
    </>
  )
}
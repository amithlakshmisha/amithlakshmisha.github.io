"use client"
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-3 bg-card border border-border rounded-xl hover:shadow-card transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 group"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-5 h-5">
        <FaSun 
          className={`absolute inset-0 text-amber-500 transition-all duration-300 ${
            theme === "light" 
              ? "opacity-100 rotate-0 scale-100" 
              : "opacity-0 rotate-90 scale-75"
          }`} 
        />
        <FaMoon 
          className={`absolute inset-0 text-slate-400 transition-all duration-300 ${
            theme === "dark" 
              ? "opacity-100 rotate-0 scale-100" 
              : "opacity-0 -rotate-90 scale-75"
          }`} 
        />
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-card border border-border px-2 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {theme === "light" ? "Dark mode" : "Light mode"}
      </div>
    </button>
  );
};

export default ThemeToggle;

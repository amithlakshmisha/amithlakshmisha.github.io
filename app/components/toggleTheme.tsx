"use client"
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 bg-gray-200 rounded-full focus:outline-none"
    >
      {theme === "light" ? <FaMoon className="text-gray-800" /> : <FaSun className="text-yellow-500" />}
    </button>
  );
};

export default ThemeToggle;

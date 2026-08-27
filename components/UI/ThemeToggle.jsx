"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ id = "theme-toggle-btn" }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Check initial theme from document or system preference
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <button
      id={id}
      type="button"
      onClick={toggleTheme}
      className="btn-ghost"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-label="Toggle theme"
      style={{
        width: "38px",
        height: "38px",
        borderRadius: "var(--radius-full)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        border: "1px solid var(--border-subtle)",
        background: "var(--bg-surface)",
      }}
    >
      {theme === "dark" ? (
        <Sun size={18} style={{ color: "#fbbf24" }} />
      ) : (
        <Moon size={18} style={{ color: "#8b5cf6" }} />
      )}
    </button>
  );
}

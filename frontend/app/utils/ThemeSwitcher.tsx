"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const primaryColor = "#4ea6a9";
  const primaryLight = "#7cc6c8";

  return (
    <button
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex items-center justify-center mx-4 p-1 rounded-md
                 transition duration-300 ease-in-out
                 hover:text-primary hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
      style={{ color: theme === "light" ? primaryColor : primaryLight }}
      type="button"
    >
      {theme === "light" ? (
        <BiMoon size={25} />
      ) : (
        <BiSun size={25} />
      )}
    </button>
  );
};

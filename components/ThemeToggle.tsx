"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: "light", label: "Light", icon: <Sun size={16} /> },
    { value: "dark", label: "Dark", icon: <Moon size={16} /> },
    { value: "system", label: "System", icon: <Monitor size={16} /> },
  ];

  return (
    <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1 dark:bg-gray-800">
      {options.map(({ value, label, icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-micro font-mono transition-colors duration-200 ease-out-expo ${
            theme === value
              ? "bg-ink text-bg"
              : "text-gray-500 hover:text-ink dark:hover:text-bg"
          }`}
          aria-pressed={theme === value}
          aria-label={label}
        >
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

type Theme = "light" | "dark" | "system";
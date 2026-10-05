import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ isDarkMode, onSelectTheme, className = "" }) => (
    <div
        className={`mobile-theme-toggle p-1 flex rounded-full ${className}`}
        role="group"
        aria-label="Color theme"
    >
        <button
            type="button"
            aria-label="Light mode"
            aria-pressed={!isDarkMode}
            className={`mobile-theme-option flex-1 flex justify-center items-center rounded-full transition-colors ${!isDarkMode ? "is-active" : ""}`}
            onClick={() => onSelectTheme(false)}
        >
            <Sun size={20} />
        </button>
        <button
            type="button"
            aria-label="Dark mode"
            aria-pressed={isDarkMode}
            className={`mobile-theme-option flex-1 flex justify-center items-center rounded-full transition-colors ${isDarkMode ? "is-active" : ""}`}
            onClick={() => onSelectTheme(true)}
        >
            <Moon size={20} />
        </button>
    </div>
);

export default ThemeToggle;
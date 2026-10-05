import { useState } from "react";
import { Moon, Sun, X } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import "./PopUp.css";

const PopUp = () => {
    const [isVisible, setIsVisible] = useState(
        () => window.localStorage.getItem("theme-prompt-seen") !== "true",
    );
    const [isDarkMode, setIsDarkMode] = useState(
        () => window.localStorage.getItem("theme") === "dark",
    );

    const selectTheme = (isDarkMode) => {
        setIsDarkMode(isDarkMode);
        window.dispatchEvent(
            new CustomEvent("theme-preference-change", { detail: { isDarkMode } }),
        );
    };

    const closePrompt = () => {
        window.localStorage.setItem("theme", isDarkMode ? "dark" : "light");
        window.localStorage.setItem("theme-prompt-seen", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="theme-prompt-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4">
            <section
                className="theme-prompt-panel relative w-full max-w-sm rounded-xl bg-white px-6 pb-6 p-12 shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="theme-prompt-title"
            >
                <button
                    type="button"
                    className="theme-prompt-close-button absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                    aria-label="Close theme introduction"
                    onClick={closePrompt}
                >
                    <X size={24} />
                </button>
                <div>
                    <h2 id="theme-prompt-title" className="text-xl mb-4 font-semibold text-center text-blue">
                        <Sun size={20} className="inline-block mr-2 text-blue mb-1" />
                        Introducing
                        <span className="ml-1 font-black">Dark Mode</span>
                        <Moon size={20} className="inline-block ml-2 text-blue mb-1" />
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 text-center">
                        Prefer browsing happy hours after sunset? Choose between light and dark mode.
                    </p>
                </div>
                <ThemeToggle
                    isDarkMode={isDarkMode}
                    onSelectTheme={selectTheme}
                    className="mx-auto mt-5 w-40"
                />
                <p className="mt-4 mx-12 text-xs text-gray-500 text-center">
                    You can change this setting at any time in the <span className="min-[730px]:hidden">menu bar</span><span className="hidden min-[730px]:inline">header</span>.
                </p>
                <div
                    className="cursor-pointer text-sm text-gray-600 text-end hover-text-blue transition-colors mt-6"
                    onClick={closePrompt}
                >
                    Continue <FaArrowRight className="inline-block ml-1 mb-1" />
                </div>
            </section>
        </div>
    );
};

export default PopUp;
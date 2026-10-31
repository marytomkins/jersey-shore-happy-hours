import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import logo from "../images/logo.png";

const NativeTopBar = ({ isDarkMode, onToggleTheme }) => (
  <div className="native-top-bar native-glass fixed top-0 left-0 right-0 z-50 border-b border-gray-300">
    <div className="h-14 flex items-center justify-between px-4">
      <Link to="/" className="h-9">
        <img src={logo} alt="Jersey Shore Happy Hours" className="h-full object-contain" />
      </Link>
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
        className="flex items-center justify-center h-10 w-10 rounded-full text-blue"
      >
        {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
      </button>
    </div>
  </div>
);

export default NativeTopBar;

import { useState, useEffect } from "react";
import logo from "../images/logo.png";
import hoverLogo from "../images/logo_hover.png";
import { Link } from "react-router-dom";
import Burger from "./Burger";
import { InstagramIcon } from "lucide-react";

const navItems = [
  { name: "Happy Hours", path: "/happyhours" },
  { name: "Events", path: "/events" },
  // { name: "Specials", path: "/specials" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`header nav:h-[15vh] h-[10vh] w-full z-50 flex items-center justify-between border-b border-gray-300 bg-white fixed transition-all
    duration-300 ease-in-out ${isScrolled ? "shadow-md nav:h-[9vh]" : ""}`}
    >
      <Link to="/" className="h-full w-full sm:w-1/5 nav:w-2/5 ml-4 flex items-center">
        <img
          src={isHovered ? hoverLogo : logo}
          alt="Jersey Shore Happy Hours"
          className="h-[85%] object-contain transition-transform duration-300 ease-in-out cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </Link>
      <div className="burger sm:hidden flex w-3/5 justify-end">
        <Burger />
      </div>
      <div className="menu-bar sm:flex sm:justify-between hidden font-black text-blue uppercase mx-4">
        {navItems.map((item) => (
          <div
            key={item.name}
            className="text-lg [@media(min-width:640px)_and_(max-width:675px)]:text-base ml-8"  //ml-4
          >
            <Link
              to={item.path}
              className="hover-text-light-blue transition-colors cursor-pointer"
            >
              {item.name}
            </Link>
          </div>
        ))}
        <a
          href="https://www.instagram.com/jerseyshore_happyhours"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue hover-text-light-blue transition ml-8"  //ml-4
        >
          <InstagramIcon className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default Header;

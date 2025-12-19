import { useState } from "react";
import logo from "../images/logo.png";
import hoverLogo from "../images/logo_hover.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="header sm:h-[25vh] h-[15vh] flex items-center justify-center mt-[-2rem]">
      <Link to="/" className="h-full">
        <img
          src={isHovered ? hoverLogo : logo}
          alt="Jersey Shore Happy Hours"
          className="h-full object-contain transition-transform duration-300 ease-in-out cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </Link>
    </div>
  );
};

export default Header;

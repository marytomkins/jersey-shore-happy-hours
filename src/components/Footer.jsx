import { Link } from "react-router-dom";
import footer_logo from "../images/footer_logo.png";
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="block text-center text-xs py-4 bg-white border-t border-gray-300">
      <div className="my-4 mx-8 text-xs">
        <b>Disclaimer:</b> Happy hours are subject to change regularly
        and exclusions may apply (ex: holidays, time of year, etc).
        <br /> Please check the restaurant's website/social media beforehand and
        submit any mistakes on our contact page.
      </div>
      <div className="h-32 flex flex-row items-center justify-center">
        <Link to="/" className="hover-text-light-blue transition-colors h-full">
          <img src={footer_logo} alt="JSHH" className="h-full" />
        </Link>
        <div className="flex flex-col items-start gap-1 text-sm text-blue font-semibold uppercase mx-4">
          <Link
            to="/happyhours"
            className="hover-text-light-blue transition-colors"
          >
            Happy Hours
          </Link>
          <Link to="/map" className="hover-text-light-blue transition-colors">
            Map
          </Link>
          {/* <Link
            to="/events"
            className="hover-text-light-blue transition-colors"
          >
            Events
          </Link> */}
          <Link
            to="/contact"
            className="hover-text-light-blue transition-colors"
          >
            Contact
          </Link>
          <div className="flex flex-row gap-2">
            <Link
              to="https://www.instagram.com/jerseyshore_happyhours"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-text-light-blue flex"
            >
              <FaInstagram size={20} color="#3677cd" />
            </Link>
            <Link
              to="https://www.facebook.com/profile.php?id=61592038439351"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-text-light-blue flex"
            >
              <FaFacebook size={18} color="#3677cd" />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-2">Jersey Shore Happy Hours LLC © 2026</div>
    </div>
  );
};
export default Footer;

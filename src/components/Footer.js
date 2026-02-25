import { Link } from "react-router-dom";
import { InstagramIcon } from "lucide-react";
import footer_logo from "../images/footer_logo.png";

const Footer = () => {
  return (
    <div className="block text-center text-xs py-4 mt-2 bg-white border-t border-gray-300">
      <div className="my-4 mx-8 text-sm">
        <b>Disclaimer:</b> Happy hours/events are subject to change regularly
        and exclusions may apply (ex: holidays, time of year, etc).
        <br /> Please check the restaurant's website/social media beforehand and
        submit any mistakes on our contact page.
      </div>
      <div className="h-32 flex flex-row items-center justify-center">
        <Link
            to="/"
            className="hover-text-light-blue transition-colors h-full"
          >
            <img src={footer_logo} alt="JSHH" className="h-full" />
          </Link>
        <div className="flex flex-col items-start gap-2 text-sm text-blue font-semibold uppercase mx-4">
          <Link
            to="/happyhours"
            className="hover-text-light-blue transition-colors"
          >
            Happy Hours
          </Link>
          <Link
            to="/events"
            className="hover-text-light-blue transition-colors"
          >
            Events
          </Link>
          <Link
            to="/contact"
            className="hover-text-light-blue transition-colors"
          >
            Contact
          </Link>
          <Link
            to="https://www.instagram.com/jerseyshore_happyhours"
          target="_blank"
          rel="noopener noreferrer"
            className="hover-text-light-blue flex"
          >
            Follow us <InstagramIcon className="w-4 h-5 mx-2 my-0" />
          </Link>
        </div>
      </div>
      <div className="mt-2">
        Jersey Shore Happy Hours by Mary Tomkins © 2025
      </div>
    </div>
  );
};
export default Footer;

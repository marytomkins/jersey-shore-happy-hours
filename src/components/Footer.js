import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="block text-center text-xs py-4 mt-2">
      <div className="pt-4 pb-4 px-8 mt-2 text-sm">
        <b>Disclaimer:</b> Happy hours are subject to change regularly and
        exclusions may apply (ex: holidays, time of year, etc).
        <br /> Please check the restaurant's website/social media and submit any
        feedback to the form below.
      </div>
      <div class="grid gap-2">
        <Link
          to="/feedback"
          className="hover:text-[#b4e255] transition-colors underline"
        >
          Feedback Form
        </Link>
        <Link
          to="https://www.instagram.com/jerseyshore_happyhours"
          className="hover:text-[#b4e255] transition-colors underline"
        >
          Follow us on Instagram
        </Link>
      </div>
      <div className="mt-2">
        Jersey Shore Happy Hours by Mary Tomkins © 2025
      </div>
    </div>
  );
};
export default Footer;

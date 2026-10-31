import { FaFacebook, FaInstagram } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import Contact from "./Contact";
import { Disclaimer } from "../components/Footer";

const socialLinks = [
  {
    name: "Instagram",
    handle: "@jerseyshore_happyhours",
    href: "https://www.instagram.com/jerseyshore_happyhours",
    Icon: FaInstagram,
  },
  {
    name: "Facebook",
    handle: "Jersey Shore Happy Hours",
    href: "https://www.facebook.com/profile.php?id=61592038439351",
    Icon: FaFacebook,
  },
];

const Social = () => (
  <div className="social-page pt-6">
    <h1 className="text-center font-semibold text-blue text-3xl">Social</h1>
    <div className="flex flex-col gap-3 w-4/5 md:w-1/2 mx-auto mt-6">
      {socialLinks.map(({ name, handle, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-white rounded-2xl shadow-lg p-4"
        >
          <Icon size={32} color="#3677cd" />
          <div className="flex-1">
            <div className="font-semibold">{name}</div>
            <div className="text-sm text-gray-500">{handle}</div>
          </div>
          <ExternalLink size={20} className="text-blue" />
        </a>
      ))}
    </div>
    <Contact />
    <div className="text-center text-xs pb-4">
      <Disclaimer />
      <div className="mt-2">Jersey Shore Happy Hours LLC © 2026</div>
    </div>
  </div>
);

export default Social;

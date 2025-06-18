import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Feedback Form", path: "/feedback" },
  ];

  return (
    <>
      <button
        className="absolute top-4 right-4 z-50 text-gray-800 hover:text-[#2f55c4]"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={28} />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-end">
          <button onClick={() => setIsOpen(false)}>
            <X size={24} className="text-gray-700 hover:text-[#2f55c4]" />
          </button>
        </div>
        <ul className="flex flex-col items-start gap-4 px-6 text-gray-800">
          {navItems.map((item) => (
            <li key={item.name} className="text-lg">
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-[#b4e255] transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Burger;

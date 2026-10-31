import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AtSign, House, Map, Martini } from "lucide-react";

const tabs = [
  { name: "Home", path: "/", Icon: House },
  { name: "Happy Hours", path: "/happyhours", Icon: Martini },
  { name: "Map", path: "/map", Icon: Map },
  { name: "Social", path: "/social", Icon: AtSign },
];

// Day/town links belong to Happy Hours, Contact lives inside Social,
// everything else (specials, game day) is reached from Home.
function activeTab(pathname) {
  if (pathname === "/map") return "/map";
  if (pathname === "/social" || pathname === "/contact") return "/social";
  if (pathname === "/happyhours" || pathname.endsWith("-happy-hours")) {
    return "/happyhours";
  }
  return "/";
}

const IslandNav = () => {
  const { pathname } = useLocation();
  const active = activeTab(pathname);
  const [isScrolling, setIsScrolling] = useState(false);

  // Shrink while the page scrolls, grow back once it settles.
  useEffect(() => {
    let settleTimer;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => setIsScrolling(false), 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(settleTimer);
    };
  }, []);

  return (
    <nav className={`island-nav native-glass fixed left-4 right-4 z-50 flex justify-between rounded-full p-1.5 shadow-lg ${isScrolling ? "is-scrolling" : ""}`}>
      {tabs.map(({ name, path, Icon }) => (
        <Link
          key={path}
          to={path}
          aria-current={active === path ? "page" : undefined}
          className={`island-tab flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-1.5 text-[11px] font-semibold transition-colors ${active === path ? "is-active" : ""}`}
        >
          <Icon size={22} strokeWidth={active === path ? 2.25 : 1.75} />
          {name}
        </Link>
      ))}
    </nav>
  );
};

export default IslandNav;

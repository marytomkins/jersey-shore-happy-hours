import { useState } from "react";

export default function Tooltip({ icon, text }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-flex cursor-pointer items-start"
      onClick={() => setOpen((v) => !v)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {open && (
        <div className="pointer-events-none absolute right-full top-1/2 z-10 mr-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-blue px-2 py-1 text-xs text-white shadow-lg">
          {text}
        </div>
      )}
      {icon}
    </div>
  );
}

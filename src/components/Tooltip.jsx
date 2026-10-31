import { useState } from "react";

export default function Tooltip({ icon, text }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-flex cursor-pointer"
      onClick={() => setOpen((v) => !v)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {open && (
        <div className="whitespace-nowrap mr-2 rounded-md bg-blue px-2 py-1 text-xs text-white shadow-lg">
          {text}
        </div>
      )}
      {icon}
    </div>
  );
}

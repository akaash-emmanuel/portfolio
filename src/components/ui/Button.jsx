import React from "react";

export const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded transition bg-white/20 hover:bg-white/40 text-white font-semibold backdrop-blur ${className}`}
    {...props}
  >
    {children}
  </button>
);

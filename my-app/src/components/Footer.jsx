import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} Toko Bambu | Dibuat dengan ❤️ React & Laravel
    </footer>
  );
}

"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-white font-semibold text-lg tracking-tight">
          iPhone 18
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#features" className="hover:text-white transition-colors">Recursos</a>
          <a href="#design" className="hover:text-white transition-colors">Design</a>
          <a href="#camera" className="hover:text-white transition-colors">Câmera</a>
          <a href="#performance" className="hover:text-white transition-colors">Performance</a>
          <a href="#specs" className="hover:text-white transition-colors">Especificações</a>
        </div>
        <button className="btn-primary text-white text-sm px-5 py-2 rounded-full font-medium">
          Comprar
        </button>
      </div>
    </nav>
  );
}

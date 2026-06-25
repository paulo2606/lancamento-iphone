"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Visão geral", href: "#hero" },
  { label: "Modelos", href: "#models" },
  { label: "Câmera", href: "#camera" },
  { label: "Desempenho", href: "#performance" },
  { label: "Especificações", href: "#specs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid #d2d2d7" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="text-sm font-semibold tracking-tight" style={{ color: "#1d1d1f" }}>
          iPhone 17
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs font-medium transition-colors duration-200 hover:opacity-60"
              style={{ color: "#1d1d1f" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#models"
          className="btn-orange hidden md:inline-flex items-center text-xs font-semibold px-5 py-2 rounded-full"
        >
          Comprar
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span
              className="block h-px bg-[#1d1d1f] transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(45deg) translateY(5px)" : "none" }}
            />
            <span
              className="block h-px bg-[#1d1d1f] transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-px bg-[#1d1d1f] transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "none" }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: menuOpen ? "300px" : "0" }}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-[#d2d2d7]">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-[#1d1d1f] hover:opacity-60"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#models" className="btn-orange text-xs font-semibold px-5 py-2.5 rounded-full text-center mt-2">
            Comprar
          </a>
        </div>
      </div>
    </header>
  );
}

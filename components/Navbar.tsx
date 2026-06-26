"use client";

import { useState, useEffect } from "react";
import { smoothScroll } from "@/lib/smoothScroll";

const LINKS = [
  { label: "Visão geral",      id: "hero"    },
  { label: "Modelos",          id: "models"  },
  { label: "Câmera",           id: "camera"  },
  { label: "Galeria",          id: "gallery" },
  { label: "Tela",             id: "display" },
  { label: "Bateria",          id: "battery" },
  { label: "Especificações",   id: "specs"   },
  { label: "FAQ",              id: "faq"     },
];

const APPLE_STORE = "https://www.apple.com/br/shop/buy-iphone";


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
        <button
          onClick={() => smoothScroll("hero")}
          className="text-sm font-semibold tracking-tight"
          style={{ color: "#1d1d1f", background: "none", border: "none", cursor: "pointer" }}
        >
          iPhone 17
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => smoothScroll(l.id)}
              className="text-xs font-medium transition-opacity duration-200 hover:opacity-50"
              style={{ color: "#1d1d1f", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* CTA — abre Apple Store em nova aba */}
        <a
          href={APPLE_STORE}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-orange hidden md:inline-flex items-center text-xs font-semibold px-5 py-2 rounded-full"
        >
          Comprar
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className="block h-px bg-[#1d1d1f] transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(45deg) translateY(5px)" : "none" }} />
            <span className="block h-px bg-[#1d1d1f] transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-px bg-[#1d1d1f] transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "none" }} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: menuOpen ? "400px" : "0" }}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-[#d2d2d7]">
          {LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => { smoothScroll(l.id); setMenuOpen(false); }}
              className="text-sm font-medium text-[#1d1d1f] hover:opacity-50 text-left"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              {l.label}
            </button>
          ))}
          <a
            href={APPLE_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange text-xs font-semibold px-5 py-2.5 rounded-full text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Comprar
          </a>
        </div>
      </div>
    </header>
  );
}

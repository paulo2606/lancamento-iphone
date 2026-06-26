"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BlobBackground from "./BlobBackground";
import { smoothScroll } from "@/lib/smoothScroll";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ paddingTop: "56px", background: "#ffffff" }}
    >
      {/* Animated blob background */}
      <BlobBackground />

      {/* White wash overlay — keeps text legible while blobs show through */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.58)",
          zIndex: 1,
        }}
      />

      {/* Announcement band */}
      <div
        className="relative w-full py-2.5 text-center text-xs font-medium"
        style={{ background: "rgba(245,245,247,0.85)", color: "#1d1d1f", zIndex: 2 }}
      >
        iPhone 17 Pro Max disponível agora.{" "}
        <button
          onClick={() => smoothScroll("models")}
          className="underline"
          style={{ color: "#e8622a", background: "none", border: "none", cursor: "pointer", font: "inherit", padding: 0 }}
        >
          Ver modelos →
        </button>
      </div>

      {/* Main content */}
      <div className="relative max-w-[980px] mx-auto px-6 text-center" style={{ zIndex: 2 }}>
        {/* Label */}
        <p className="section-label mt-16 mb-4" style={fade(0.05)}>
          Novo
        </p>

        {/* Headline */}
        <h1
          style={{
            ...fade(0.15),
            fontSize: "clamp(56px, 9vw, 96px)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            color: "#1d1d1f",
          }}
        >
          iPhone 17.
        </h1>

        {/* Tagline */}
        <p
          style={{
            ...fade(0.25),
            fontSize: "clamp(22px, 3.5vw, 36px)",
            fontWeight: 300,
            color: "#1d1d1f",
            marginTop: "12px",
          }}
        >
          Olá,{" "}
          <span style={{ color: "#e8622a", fontWeight: 500 }}>futuro.</span>
        </p>

        {/* CTAs */}
        <div
          className="flex items-center justify-center gap-4 mt-8"
          style={fade(0.35)}
        >
          <a
            href="https://www.apple.com/br/shop/buy-iphone"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange text-sm font-semibold px-7 py-3 rounded-full"
          >
            Comprar
          </a>
          <button
            onClick={() => smoothScroll("camera")}
            className="btn-ghost text-sm font-semibold px-7 py-3 rounded-full"
          >
            Saiba mais
          </button>
        </div>

        {/* Hero image */}
        <div
          className="relative mt-10"
          style={{
            ...fade(0.45),
            animation: visible
              ? "floatY 4s ease-in-out 1s infinite"
              : "none",
          }}
        >
          <Image
            src="/images/iphone17_PNG11.png"
            alt="iPhone 17"
            width={1920}
            height={1920}
            priority
            quality={85}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 680px"
            className="mx-auto w-full"
            style={{ maxWidth: "680px", objectFit: "contain", display: "block" }}
          />

          {/* Ground shadow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "16px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "42%",
              height: "32px",
              background:
                "radial-gradient(ellipse, rgba(0,0,0,0.12) 0%, transparent 70%)",
              filter: "blur(10px)",
            }}
          />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          zIndex: 2,
          height: "100px",
          marginTop: "-100px",
          background: "linear-gradient(to bottom, transparent, #ffffff)",
        }}
      />
    </section>
  );
}

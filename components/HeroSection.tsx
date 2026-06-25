"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Fallback gradient when video not loaded */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            videoLoaded ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, #1e1b4b 0%, #0f0f23 40%, #000000 100%)",
          }}
        />

        {/* Gradient overlays for cinematic look */}
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.85) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      </div>

      {/* Accent glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Label */}
        <div
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-xs font-medium text-white/70 tracking-widest uppercase opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Novo · iPhone 18
        </div>

        {/* Main headline */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="gradient-text">Além do que</span>
          <br />
          <span className="text-white">você imagina.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          Chip A19. Câmera que enxerga além dos limites.
          <br className="hidden sm:block" />
          Design que você vai sentir antes de ver.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <button className="btn-primary text-white font-semibold px-8 py-3.5 rounded-full text-base w-full sm:w-auto">
            Pré-venda
          </button>
          <button className="btn-secondary glass text-white font-medium px-8 py-3.5 rounded-full text-base w-full sm:w-auto">
            Conheça agora
          </button>
        </div>

        {/* Price hint */}
        <p
          className="mt-8 text-sm text-white/30 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "1s" }}
        >
          A partir de R$ 9.999 · Disponível em setembro de 2026
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/30 text-xs tracking-widest uppercase">
          Rolar
        </span>
        <div className="scroll-indicator w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}

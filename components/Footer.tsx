"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const LINKS = [
  {
    title: "iPhone 17",
    items: ["iPhone 17", "iPhone Air", "iPhone 17 Pro", "iPhone 17 Pro Max", "Comparar modelos", "Cores"],
  },
  {
    title: "Recursos",
    items: ["Câmera", "Tela Super Retina XDR", "Chip A19 Pro", "Bateria", "Design em Titânio", "iOS 26"],
  },
  {
    title: "Comprar",
    items: ["Loja Apple", "Formas de pagamento", "Trade In", "Apple Card", "Financiamento", "Encomenda"],
  },
  {
    title: "Suporte",
    items: ["AppleCare+", "Garantia", "Central de ajuda", "Reparos", "Contato Apple", "Status do sistema"],
  },
  {
    title: "Apple",
    items: ["Sobre a Apple", "Newsroom", "Liderança", "Sustentabilidade", "Privacidade", "Vagas"],
  },
];

const LEGAL_LINES = [
  "1. Os tempos de bateria variam conforme o uso e as configurações. Consulte apple.com/br/iphone para mais informações.",
  "2. Os dados de desempenho foram obtidos em testes realizados pela Apple em setembro de 2025. O desempenho real pode variar.",
  "3. As câmeras e os recursos de câmera descritos estão disponíveis apenas em modelos específicos.",
  "4. O iPhone é resistente a respingos, água e poeira. A resistência à líquidos não é permanente e pode diminuir com o uso.",
];

export default function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCtaVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!ctaVisible) return;
    const t = setTimeout(() => setLinksVisible(true), 400);
    return () => clearTimeout(t);
  }, [ctaVisible]);

  return (
    <footer style={{ background: "#1d1d1f" }}>

      {/* ── CTA HERO ─────────────────────────────────────────── */}
      <div
        ref={ctaRef}
        style={{
          position: "relative",
          background: "#0a0a0a",
          overflow: "hidden",
          padding: "120px 24px 110px",
          textAlign: "center",
        }}
      >
        {/* Orange blob glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            height: "70%",
            background:
              "radial-gradient(ellipse at center, rgba(232,98,42,0.28) 0%, rgba(200,60,0,0.12) 45%, transparent 70%)",
            filter: "blur(72px)",
            animation: "ctaGlow 5s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Floating iPhone */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            marginBottom: "48px",
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            style={{
              width: "340px",
              height: "400px",
              position: "relative",
              animation: ctaVisible ? "floatY 6s ease-in-out 0.8s infinite" : "none",
              filter: "drop-shadow(0 40px 80px rgba(232,98,42,0.4))",
            }}
          >
            <Image
              src="/images/iphone17_orange.png"
              alt="iPhone 17 Pro — Cosmic Orange"
              fill
              quality={95}
              sizes="340px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#e8622a",
              marginBottom: "16px",
            }}
          >
            iPhone 17
          </p>
          <h2
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#f5f5f7",
              lineHeight: 1.06,
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            Seu próximo iPhone
            <br />
            <span style={{ color: "#e8622a" }}>é esse.</span>
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "rgba(255,255,255,0.46)",
              marginTop: "16px",
              fontWeight: 300,
              maxWidth: "420px",
              margin: "16px auto 0",
            }}
          >
            Descubra qual modelo foi feito para você e comece a pré-encomenda hoje.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              marginTop: "40px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://www.apple.com/br/shop/buy-iphone"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                borderRadius: "980px",
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "0.01em",
                textDecoration: "none",
              }}
            >
              Comprar agora
            </a>
            <button
              style={{
                padding: "14px 32px",
                borderRadius: "980px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.28)",
                color: "#f5f5f7",
                letterSpacing: "0.01em",
                transition: "border-color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = "rgba(255,255,255,0.6)";
                b.style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = "rgba(255,255,255,0.28)";
                b.style.transform = "scale(1)";
              }}
            >
              Saiba mais
            </button>
          </div>
        </div>
      </div>

      {/* ── LINKS GRID ───────────────────────────────────────── */}
      <div style={{ background: "#1d1d1f", padding: "60px 24px 48px" }}>
        <div
          className="max-w-[980px] mx-auto"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "32px",
          }}
        >
          {LINKS.map((col, ci) => (
            <div
              key={col.title}
              style={{
                opacity: linksVisible ? 1 : 0,
                transform: linksVisible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.5s ease ${ci * 0.07}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${ci * 0.07}s`,
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#f5f5f7",
                  marginBottom: "14px",
                  letterSpacing: "0.01em",
                }}
              >
                {col.title}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      style={{
                        fontSize: "12px",
                        color: "#86868b",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        display: "inline-block",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f7"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#86868b"; }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ──────────────────────────────────────────── */}
      <div style={{ background: "#1d1d1f" }}>
        <div className="max-w-[980px] mx-auto px-6">
          <div style={{ height: "1px", background: "#424245" }} />
        </div>
      </div>

      {/* ── LEGAL TEXT ───────────────────────────────────────── */}
      <div style={{ background: "#1d1d1f", padding: "24px 24px 0" }}>
        <div className="max-w-[980px] mx-auto">
          {LEGAL_LINES.map((line) => (
            <p
              key={line}
              style={{
                fontSize: "11px",
                color: "#515154",
                lineHeight: 1.6,
                marginBottom: "6px",
                letterSpacing: "0.01em",
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* ── BOTTOM BAR ───────────────────────────────────────── */}
      <div style={{ background: "#1d1d1f", padding: "20px 24px 32px" }}>
        <div className="max-w-[980px] mx-auto">
          <div style={{ height: "1px", background: "#424245", marginBottom: "20px" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <p style={{ fontSize: "11px", color: "#515154" }}>
              Copyright © 2025 Apple Inc. Todos os direitos reservados.
            </p>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {["Privacidade", "Termos de uso", "Mapa do site", "Acessibilidade"].map((link) => (
                <a
                  key={link}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    fontSize: "11px",
                    color: "#515154",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#86868b"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#515154"; }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}

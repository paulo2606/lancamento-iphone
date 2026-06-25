"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const STATS = [
  { value: 460,  suffix: "",   unit: "PPI",   desc: "pixels por polegada" },
  { value: 2000, suffix: "",   unit: "NITS",  desc: "brilho máximo HDR" },
  { value: 120,  suffix: "Hz", unit: "",      desc: "ProMotion adaptativo" },
];

const FEATURES = [
  {
    title: "OLED Super Retina XDR",
    desc: "Contraste infinito, pretos absolutos e cores que ultrapassam os limites do sRGB.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="4" width="24" height="18" rx="3" stroke="#e8622a" strokeWidth="1.8"/>
        <line x1="9" y1="22" x2="19" y2="22" stroke="#e8622a" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="14" cy="13" r="4" stroke="#e8622a" strokeWidth="1.6"/>
      </svg>
    ),
  },
  {
    title: "ProMotion 120Hz",
    desc: "Taxa de atualização adaptativa de 1Hz a 120Hz. Rolagem, toques e animações nunca foram tão fluidos.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4 L14 24 M6 8 L22 8 M4 14 L24 14 M6 20 L22 20" stroke="#e8622a" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="10" stroke="#e8622a" strokeWidth="1.6"/>
      </svg>
    ),
  },
  {
    title: "Always-On Display",
    desc: "Hora, widgets e notificações sempre visíveis com consumo mínimo de energia.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#e8622a" strokeWidth="1.8"/>
        <path d="M14 8 L14 14 L18 17" stroke="#e8622a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "True Tone",
    desc: "Sensores multiespectrais ajustam temperatura de cor e intensidade ao ambiente em tempo real.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="5" fill="#e8622a"/>
        <path d="M14 3V5 M14 23V25 M3 14H5 M23 14H25 M6.2 6.2L7.6 7.6 M20.4 20.4L21.8 21.8 M6.2 21.8L7.6 20.4 M20.4 7.6L21.8 6.2" stroke="#e8622a" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Ceramic Shield",
    desc: "Vidro frontal com nanocristais de cerâmica. Até 2× mais resistente a quedas do que qualquer smartphone.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L24 7V14C24 19.5 19.5 24.3 14 25.5C8.5 24.3 4 19.5 4 14V7L14 3Z" stroke="#e8622a" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M9 14L12.5 17.5L19 11" stroke="#e8622a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "HDR & Dolby Vision",
    desc: "Reproduz conteúdo HDR10 e Dolby Vision com fidelidade total de cor e contraste cinematográfico.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M10 8L20 14L10 20V8Z" fill="#e8622a"/>
        <circle cx="14" cy="14" r="10" stroke="#e8622a" strokeWidth="1.8"/>
      </svg>
    ),
  },
];

function useCounter(target: number, active: boolean, delay = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => {
      const duration = 1500;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(eased * target));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [active, target, delay]);

  return value;
}

function StatItem({ stat, active, delay }: { stat: typeof STATS[0]; active: boolean; delay: number }) {
  const val = useCounter(stat.value, active, delay);

  return (
    <div
      style={{
        textAlign: "center",
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay / 1000 + 0.3}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay / 1000 + 0.3}s`,
      }}
    >
      <div
        style={{
          fontSize: "clamp(52px, 8vw, 88px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "#f5f5f7",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {val.toLocaleString("pt-BR")}
        {stat.suffix}
      </div>
      {stat.unit && (
        <div
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#e8622a",
            marginTop: "10px",
          }}
        >
          {stat.unit}
        </div>
      )}
      <div
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.38)",
          marginTop: "5px",
          letterSpacing: "0.01em",
        }}
      >
        {stat.desc}
      </div>
    </div>
  );
}

function FeatureCard({
  feat,
  index,
  visible,
}: {
  feat: (typeof FEATURES)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const delay = (0.4 + index * 0.08) * 1000 + 700;
    const t = setTimeout(() => setEntered(true), delay);
    return () => clearTimeout(t);
  }, [visible, index]);

  const entryDelay = 0.4 + index * 0.08;

  const cardTransition = entered
    ? "background 0.32s ease, transform 0.38s cubic-bezier(0.16,1,0.3,1), box-shadow 0.32s ease"
    : `opacity 0.6s ease ${entryDelay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${entryDelay}s`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "36px 28px",
        cursor: "default",
        overflow: "hidden",
        background: hovered ? "#161616" : "#0e0e0e",
        borderRadius:
          index === 0 ? "23px 0 0 0"
          : index === 2 ? "0 23px 0 0"
          : index === 3 ? "0 0 0 23px"
          : index === 5 ? "0 0 23px 0"
          : "0",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-5px)"
            : "translateY(0)"
          : "translateY(20px)",
        transition: cardTransition,
      }}
    >
      {/* Orange top line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "rgba(232,98,42,0.75)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Orange radial glow on hover */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(232,98,42,0.10) 0%, transparent 65%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <div
        style={{
          marginBottom: "18px",
          display: "inline-flex",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), filter 0.35s ease",
          transform: hovered ? "scale(1.15) translateY(-2px)" : "scale(1) translateY(0)",
          filter: hovered
            ? "drop-shadow(0 0 8px rgba(232,98,42,0.6))"
            : "drop-shadow(0 0 0 transparent)",
        }}
      >
        {feat.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          marginBottom: "8px",
          lineHeight: 1.3,
          color: hovered ? "#ffffff" : "#f5f5f7",
          transition: "color 0.25s ease",
        }}
      >
        {feat.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "13px",
          lineHeight: 1.65,
          color: hovered ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.42)",
          transition: "color 0.25s ease",
        }}
      >
        {feat.desc}
      </p>
    </div>
  );
}

export default function DisplaySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="display"
      ref={sectionRef}
      style={{ background: "#080808", padding: "120px 0 110px", overflow: "hidden" }}
    >
      <div className="max-w-[980px] mx-auto px-6">

        {/* Header */}
        <div
          style={{
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p className="section-label mb-4">Tela</p>
          <h2
            style={{
              fontSize: "clamp(36px, 6vw, 68px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#f5f5f7",
              lineHeight: 1.06,
            }}
          >
            Super Retina XDR.
          </h2>
          <p
            style={{
              fontSize: "clamp(17px, 2vw, 21px)",
              color: "rgba(255,255,255,0.48)",
              marginTop: "14px",
              fontWeight: 300,
              maxWidth: "460px",
              margin: "14px auto 0",
            }}
          >
            Cada pixel. Cada cor. Em perfeição absoluta.
          </p>
        </div>

        {/* Phone + ambient glow */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            marginTop: "72px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(48px)",
            transition: "opacity 0.9s ease 0.15s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.15s",
          }}
        >
          {/* Ambient screen glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "65%",
              height: "55%",
              top: "20%",
              left: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(90,140,255,0.4) 0%, rgba(232,98,42,0.18) 45%, transparent 70%)",
              filter: "blur(56px)",
              animation: "breathe 4.5s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />

          {/* Image wrapper: float + bottom fade mask */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: "620px",
              width: "100%",
              animation: visible ? "floatY 6s ease-in-out 0.8s infinite" : "none",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 58%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 0%, black 58%, transparent 100%)",
            }}
          >
            <Image
              src="/images/iphone17_PNG27.png"
              alt="iPhone 17 — Tela Super Retina XDR"
              width={1200}
              height={1200}
              quality={95}
              sizes="(max-width: 768px) 80vw, 560px"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "contain",
                filter: "drop-shadow(0 24px 60px rgba(60,100,255,0.22))",
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            marginTop: "72px",
          }}
        >
          {STATS.map((stat, i) => (
            <StatItem key={stat.unit + stat.suffix} stat={stat} active={visible} delay={i * 150} />
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(255,255,255,0.07)",
            margin: "80px 0",
          }}
        />

        {/* Feature grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "24px",
          }}
        >
          {FEATURES.map((feat, i) => (
            <FeatureCard key={feat.title} feat={feat} index={i} visible={visible} />
          ))}
        </div>

      </div>
    </section>
  );
}

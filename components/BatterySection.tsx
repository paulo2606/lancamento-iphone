"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/lib/useIsMobile";

const ACTIVITIES = [
  {
    label: "Reprodução de vídeo",
    hours: 26,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="1" y="3" width="14" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M15 8.5L21 5.5V16.5L15 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Streaming de vídeo",
    hours: 20,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M8.5 7.5L16 11L8.5 14.5V7.5Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Reprodução de música",
    hours: 80,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="7" cy="16" r="3" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="16" cy="14" r="3" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M10 16V5L19 3V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Chamadas de voz",
    hours: 22,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 4h4l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v4a1 1 0 01-1 1C7 20 2 13 2 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Jogos",
    hours: 15,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="7" width="18" height="10" rx="5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M7 12H11M9 10V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="15" cy="11" r="0.8" fill="currentColor"/>
        <circle cx="15" cy="13" r="0.8" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Uso de câmera",
    hours: 18,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M2 7.5A2.5 2.5 0 014.5 5h1.67l1.5-2h6.66l1.5 2H17.5A2.5 2.5 0 0120 7.5v9A2.5 2.5 0 0117.5 19h-13A2.5 2.5 0 012 16.5v-9z" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="11" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
  },
];

const MAX_HOURS = Math.max(...ACTIVITIES.map((a) => a.hours));
const FILL_PERCENT = 88;

function useCounter(target: number, active: boolean, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      const start = performance.now();
      const duration = 1600;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [active, target, delay]);
  return value;
}

function ActivityCard({
  item,
  index,
  visible,
}: {
  item: (typeof ACTIVITIES)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const barWidth = Math.round((item.hours / MAX_HOURS) * 100);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px 24px",
        borderRadius: "16px",
        background: hovered ? "#f0f0f2" : "#f5f5f7",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${0.5 + index * 0.08}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${0.5 + index * 0.08}s, background 0.25s ease`,
      }}
    >
      {/* Icon */}
      <div
        style={{
          color: "#e8622a",
          marginBottom: "14px",
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
          display: "inline-block",
          transform: hovered ? "scale(1.15)" : "scale(1)",
        }}
      >
        {item.icon}
      </div>

      {/* Label */}
      <p
        style={{
          fontSize: "13px",
          fontWeight: 500,
          color: "#6e6e73",
          marginBottom: "10px",
          letterSpacing: "0.01em",
        }}
      >
        {item.label}
      </p>

      {/* Hours */}
      <p
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#1d1d1f",
          letterSpacing: "-0.025em",
          lineHeight: 1,
          marginBottom: "14px",
        }}
      >
        {item.hours}
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#6e6e73", marginLeft: "4px" }}>
          horas
        </span>
      </p>

      {/* Progress bar */}
      <div
        style={{
          height: "3px",
          borderRadius: "999px",
          background: "#e5e5ea",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: "999px",
            background: "linear-gradient(to right, #e8622a, #f5934a)",
            width: visible ? `${barWidth}%` : "0%",
            transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${0.6 + index * 0.08}s`,
          }}
        />
      </div>
    </div>
  );
}

export default function BatterySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [labelVisible, setLabelVisible] = useState(false);
  const hours = useCounter(26, visible, 600);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setLabelVisible(true), 1400);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <section
      id="battery"
      ref={sectionRef}
      style={{ background: "#ffffff", padding: "120px 0 100px" }}
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
          <p className="section-label mb-4">Bateria</p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.022em",
              color: "#1d1d1f",
              lineHeight: 1.07,
            }}
          >
            Carregue menos.{" "}
            <span style={{ color: "#e8622a" }}>Viva mais.</span>
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              color: "#6e6e73",
              marginTop: "12px",
              fontWeight: 300,
              maxWidth: "440px",
              margin: "12px auto 0",
            }}
          >
            A maior bateria que já colocamos num iPhone.
          </p>
        </div>

        {/* Battery visual */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "64px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          {/* Battery container */}
          <div style={{ position: "relative", width: "160px", height: "300px" }}>
            {/* Terminal cap */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "52px",
                height: "16px",
                borderRadius: "8px 8px 0 0",
                background: "#d2d2d7",
                zIndex: 2,
              }}
            />

            {/* Battery body */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "22px",
                border: "3px solid #d2d2d7",
                overflow: "hidden",
              }}
            >
              {/* Fill */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: visible ? `${FILL_PERCENT}%` : "0%",
                  background: "linear-gradient(to top, #d4521e 0%, #e8622a 40%, #f5834a 80%, #fda46e 100%)",
                  transition: "height 1.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
                  borderRadius: "0 0 18px 18px",
                }}
              >
                {/* Shine */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "10%",
                    width: "30%",
                    height: "100%",
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)",
                    borderRadius: "0 0 10px 10px",
                  }}
                />
              </div>
            </div>

            {/* Hours label inside battery */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 3,
                textAlign: "center",
                opacity: labelVisible ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            >
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  textShadow: "0 2px 12px rgba(0,0,0,0.2)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {hours}h
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}
              >
                de vídeo
              </div>
            </div>
          </div>

          {/* Subtitle below battery */}
          <p
            style={{
              marginTop: "28px",
              fontSize: "14px",
              color: "#a1a1a6",
              fontWeight: 400,
              opacity: labelVisible ? 1 : 0,
              transition: "opacity 0.5s ease 0.2s",
            }}
          >
            iPhone 17 Pro Max · Carga completa
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "#e5e5ea",
            margin: "72px 0 56px",
          }}
        />

        {/* Activities grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "12px",
          }}
        >
          {ACTIVITIES.map((item, i) => (
            <ActivityCard key={item.label} item={item} index={i} visible={visible} />
          ))}
        </div>

        {/* Footnote */}
        <p
          style={{
            fontSize: "11px",
            color: "#a1a1a6",
            marginTop: "32px",
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 1s",
          }}
        >
          Os tempos de bateria variam conforme o uso e as configurações. Consulte apple.com/br/iphone para mais informações.
        </p>

      </div>
    </section>
  );
}

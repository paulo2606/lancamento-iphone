"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useIsMobile } from "@/lib/useIsMobile";

const MODELS = [
  { name: "iPhone 17",         color: "#1d1d1f", img: "/images/iphone17_115538.png" },
  { name: "iPhone Air",        color: "#1d1d1f", img: "/images/iphone17_115540.png" },
  { name: "iPhone 17 Pro",     color: "#e8622a", img: "/images/iphone17_PNG115536.png" },
  { name: "iPhone 17 Pro Max", color: "#e8622a", img: "/images/iphone17_PNG115537.png" },
];

type Cell = { value: string; highlight?: boolean };
interface SpecRow   { label: string; cells: Cell[]; }
interface SpecGroup { category: string; rows: SpecRow[]; }

const SPECS: SpecGroup[] = [
  {
    category: "Tela",
    rows: [
      { label: "Tamanho",       cells: [{ value: "6,3\"" }, { value: "6,5\"" }, { value: "6,3\"" }, { value: "6,9\"", highlight: true }] },
      { label: "Tipo",          cells: [{ value: "OLED Super Retina XDR" }, { value: "OLED Super Retina XDR" }, { value: "OLED Super Retina XDR" }, { value: "OLED Super Retina XDR" }] },
      { label: "Resolução",     cells: [{ value: "460 ppi" }, { value: "460 ppi" }, { value: "460 ppi" }, { value: "460 ppi" }] },
      { label: "ProMotion",     cells: [{ value: "Até 120 Hz" }, { value: "Até 120 Hz" }, { value: "Até 120 Hz" }, { value: "Até 120 Hz" }] },
      { label: "Always-On",     cells: [{ value: "—" }, { value: "—" }, { value: "✓", highlight: true }, { value: "✓", highlight: true }] },
    ],
  },
  {
    category: "Desempenho",
    rows: [
      { label: "Chip",          cells: [{ value: "A19" }, { value: "A19 Pro" }, { value: "A19 Pro", highlight: true }, { value: "A19 Pro", highlight: true }] },
      { label: "CPU",           cells: [{ value: "6 núcleos" }, { value: "6 núcleos" }, { value: "6 núcleos" }, { value: "6 núcleos" }] },
      { label: "GPU",           cells: [{ value: "5 núcleos" }, { value: "5 núcleos" }, { value: "6 núcleos", highlight: true }, { value: "6 núcleos", highlight: true }] },
      { label: "Neural Engine", cells: [{ value: "16 núcleos" }, { value: "16 núcleos" }, { value: "16 núcleos" }, { value: "16 núcleos" }] },
    ],
  },
  {
    category: "Câmeras",
    rows: [
      { label: "Principal",     cells: [{ value: "48 MP f/1,6" }, { value: "48 MP f/1,6" }, { value: "48 MP f/1,78" }, { value: "48 MP f/1,78" }] },
      { label: "Ultra-Angular", cells: [{ value: "48 MP f/2,2" }, { value: "—" }, { value: "48 MP f/2,2", highlight: true }, { value: "48 MP f/2,2", highlight: true }] },
      { label: "Teleobjetiva",  cells: [{ value: "2x digital" }, { value: "2x digital" }, { value: "8x óptico", highlight: true }, { value: "8x óptico", highlight: true }] },
      { label: "Frontal",       cells: [{ value: "18 MP f/1,9" }, { value: "18 MP f/1,9" }, { value: "18 MP f/1,9" }, { value: "18 MP f/1,9" }] },
      { label: "Modo Cinema",   cells: [{ value: "4K 30fps" }, { value: "4K 30fps" }, { value: "4K 120fps", highlight: true }, { value: "4K 120fps", highlight: true }] },
    ],
  },
  {
    category: "Bateria",
    rows: [
      { label: "Reprodução de vídeo", cells: [{ value: "30 horas" }, { value: "27 horas" }, { value: "33 horas" }, { value: "39 horas", highlight: true }] },
      { label: "MagSafe",             cells: [{ value: "25 W" }, { value: "20 W" }, { value: "25 W" }, { value: "25 W" }] },
      { label: "Carga rápida",        cells: [{ value: "50% em 20 min" }, { value: "50% em 30 min" }, { value: "50% em 20 min" }, { value: "50% em 20 min" }] },
    ],
  },
  {
    category: "Armazenamento",
    rows: [
      { label: "Opções", cells: [{ value: "256GB–512GB" }, { value: "256GB–1TB" }, { value: "256GB–1TB" }, { value: "256GB–2TB", highlight: true }] },
    ],
  },
  {
    category: "Design",
    rows: [
      { label: "Material",          cells: [{ value: "Alumínio" }, { value: "Titânio" }, { value: "Titânio" }, { value: "Titânio" }] },
      { label: "Espessura",         cells: [{ value: "7,80 mm" }, { value: "5,64 mm", highlight: true }, { value: "8,75 mm" }, { value: "8,75 mm" }] },
      { label: "Peso",              cells: [{ value: "177 g" }, { value: "165 g", highlight: true }, { value: "206 g" }, { value: "233 g" }] },
      { label: "IP68",              cells: [{ value: "✓" }, { value: "✓" }, { value: "✓" }, { value: "✓" }] },
      { label: "Ceramic Shield 2",  cells: [{ value: "✓" }, { value: "✓" }, { value: "✓" }, { value: "✓" }] },
    ],
  },
];

function SpecRowItem({ row, visible, delay }: { row: SpecRow; visible: boolean; delay: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr",
        alignItems: "center",
        padding: "16px 0",
        borderBottom: "1px solid #f0f0f2",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      <span style={{ fontSize: "13px", color: "#6e6e73", fontWeight: 400 }}>{row.label}</span>
      {row.cells.map((cell, i) => (
        <span
          key={i}
          style={{
            fontSize: "13px",
            fontWeight: cell.highlight ? 600 : 400,
            color: cell.highlight ? "#e8622a" : "#1d1d1f",
            textAlign: "center",
          }}
        >
          {cell.value}
        </span>
      ))}
    </div>
  );
}

function MobileSpecs({ selectedModel, visible }: { selectedModel: number; visible: boolean }) {
  return (
    <div>
      {SPECS.map((group) => (
        <div key={group.category} style={{ marginBottom: "8px" }}>
          <div style={{ padding: "20px 0 8px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e8622a" }}>
              {group.category}
            </span>
          </div>
          {group.rows.map((row, ri) => {
            const cell = row.cells[selectedModel];
            return (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 0",
                  borderBottom: "1px solid #f0f0f2",
                  gap: "16px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.4s ease ${0.1 + ri * 0.03}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${0.1 + ri * 0.03}s`,
                }}
              >
                <span style={{ fontSize: "14px", color: "#6e6e73", flexShrink: 0 }}>{row.label}</span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: cell.highlight ? 600 : 400,
                    color: cell.highlight ? "#e8622a" : "#1d1d1f",
                    textAlign: "right",
                  }}
                >
                  {cell.value}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function SpecsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [selectedModel, setSelectedModel] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.04 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  let rowIndex = 0;

  return (
    <section id="specs" ref={sectionRef} style={{ background: "#ffffff", padding: "100px 0 80px" }}>
      <div className="max-w-[980px] mx-auto px-6">

        {/* Header */}
        <div
          style={{
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: "64px",
          }}
        >
          <p className="section-label mb-3">Comparativo</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-0.022em", color: "#1d1d1f", lineHeight: 1.07 }}>
            Qual é o seu?
          </h2>
          <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", color: "#6e6e73", marginTop: "12px", fontWeight: 300 }}>
            Compare os quatro modelos e encontre o iPhone 17 ideal para você.
          </p>
        </div>

        {isMobile ? (
          /* ── MOBILE: model tabs + spec list ─────────── */
          <div>
            {/* Model selector */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                paddingBottom: "4px",
                marginBottom: "32px",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
            >
              {MODELS.map((m, i) => (
                <button
                  key={m.name}
                  onClick={() => setSelectedModel(i)}
                  style={{
                    flexShrink: 0,
                    padding: "9px 18px",
                    borderRadius: "999px",
                    border: `1.5px solid ${selectedModel === i ? "#e8622a" : "#e5e5ea"}`,
                    background: selectedModel === i ? "#e8622a" : "transparent",
                    color: selectedModel === i ? "#fff" : "#1d1d1f",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                  }}
                >
                  {m.name}
                </button>
              ))}
            </div>

            {/* Selected model thumbnail + name */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "24px",
                padding: "16px",
                background: "#f5f5f7",
                borderRadius: "16px",
              }}
            >
              <div style={{ position: "relative", width: "52px", height: "76px", flexShrink: 0 }}>
                <Image
                  src={MODELS[selectedModel].img}
                  alt={MODELS[selectedModel].name}
                  fill
                  sizes="52px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div>
                <p style={{ fontSize: "18px", fontWeight: 700, color: MODELS[selectedModel].color, letterSpacing: "-0.01em" }}>
                  {MODELS[selectedModel].name}
                </p>
                <p style={{ fontSize: "13px", color: "#6e6e73", marginTop: "2px" }}>Especificações completas</p>
              </div>
            </div>

            <MobileSpecs selectedModel={selectedModel} visible={visible} />
          </div>
        ) : (
          /* ── DESKTOP: table view ─────────────────────── */
          <>
            {/* Sticky model header */}
            <div
              style={{
                position: "sticky",
                top: "52px",
                zIndex: 10,
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: "1px solid #e5e5ea",
                opacity: visible ? 1 : 0,
                transition: "opacity 0.6s ease 0.2s",
                marginBottom: "8px",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", alignItems: "end", padding: "12px 0 16px" }}>
                <span style={{ fontSize: "11px", color: "#a1a1a6", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Especificações
                </span>
                {MODELS.map((m) => (
                  <div key={m.name} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <div style={{ position: "relative", width: "58px", height: "84px" }}>
                      <Image src={m.img} alt={m.name} fill sizes="58px" style={{ objectFit: "contain", objectPosition: "center bottom" }} />
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: m.color, letterSpacing: "-0.01em", lineHeight: 1.2, whiteSpace: "nowrap" }}>
                      {m.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spec groups */}
            {SPECS.map((group) => (
              <div key={group.category} style={{ marginBottom: "8px" }}>
                <div style={{ padding: "28px 0 8px", opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${0.1 + rowIndex * 0.03}s` }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e8622a" }}>
                    {group.category}
                  </span>
                </div>
                {group.rows.map((row) => {
                  const d = 0.15 + rowIndex * 0.04;
                  rowIndex++;
                  return <SpecRowItem key={row.label} row={row} visible={visible} delay={d} />;
                })}
              </div>
            ))}
          </>
        )}

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "56px", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 1.2s" }}>
          <a
            href="https://www.apple.com/br/shop/buy-iphone"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-orange"
            style={{ display: "inline-block", padding: "14px 40px", borderRadius: "980px", fontSize: "15px", fontWeight: 600, letterSpacing: "0.01em", textDecoration: "none" }}
          >
            Comprar iPhone 17
          </a>
        </div>

      </div>
    </section>
  );
}

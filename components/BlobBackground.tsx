"use client";

import { useEffect, useRef } from "react";

const BLOBS = [
  { baseX: 0.18, baseY: 0.32, size: 420, speedX: 0.28, speedY: 0.22, radiusX: 0.14, radiusY: 0.18, phase: 0 },
  { baseX: 0.72, baseY: 0.18, size: 360, speedX: 0.20, speedY: 0.31, radiusX: 0.18, radiusY: 0.12, phase: 1.2 },
  { baseX: 0.50, baseY: 0.65, size: 500, speedX: 0.16, speedY: 0.24, radiusX: 0.20, radiusY: 0.16, phase: 2.5 },
  { baseX: 0.82, baseY: 0.55, size: 310, speedX: 0.34, speedY: 0.18, radiusX: 0.10, radiusY: 0.14, phase: 0.8 },
  { baseX: 0.28, baseY: 0.72, size: 380, speedX: 0.22, speedY: 0.28, radiusX: 0.16, radiusY: 0.10, phase: 3.7 },
  { baseX: 0.60, baseY: 0.35, size: 270, speedX: 0.38, speedY: 0.22, radiusX: 0.12, radiusY: 0.16, phase: 1.8 },
  { baseX: 0.10, baseY: 0.58, size: 330, speedX: 0.24, speedY: 0.30, radiusX: 0.08, radiusY: 0.12, phase: 4.2 },
  { baseX: 0.88, baseY: 0.78, size: 290, speedX: 0.30, speedY: 0.20, radiusX: 0.14, radiusY: 0.10, phase: 2.1 },
];

const COLORS = [
  "rgba(232,98,42,0.55)",
  "rgba(251,146,60,0.50)",
  "rgba(249,115,22,0.48)",
  "rgba(234,88,12,0.52)",
  "rgba(253,186,116,0.45)",
  "rgba(232,98,42,0.42)",
  "rgba(251,146,60,0.50)",
  "rgba(249,115,22,0.46)",
];

export default function BlobBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const startTime = performance.now();

    const animate = (now: number) => {
      const t = (now - startTime) / 1000;
      const W = container.offsetWidth;
      const H = container.offsetHeight;

      BLOBS.forEach((b, i) => {
        const el = blobsRef.current[i];
        if (!el) return;
        const x = (b.baseX + Math.sin(t * b.speedX + b.phase) * b.radiusX) * W - b.size / 2;
        const y = (b.baseY + Math.cos(t * b.speedY + b.phase) * b.radiusY) * H - b.size / 2;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        filter: "blur(40px) contrast(18) brightness(1.05)",
        backgroundColor: "#ffffff",
        zIndex: 0,
        willChange: "contents",
      }}
    >
      {BLOBS.map((b, i) => (
        <div
          key={i}
          ref={(el) => { if (el) blobsRef.current[i] = el; }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: COLORS[i],
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}

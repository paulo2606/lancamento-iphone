"use client";

import { useState } from "react";
import Image from "next/image";

const PHOTOS = [
  {
    src: "/images/shot_pomegranate.jpg",
    alt: "Romãs — iPhone 17 Pro 48MP",
    area: "a",
    label: "48MP · iPhone 17 Pro",
    position: "center 60%",
  },
  {
    src: "/images/shot_telephoto.jpg",
    alt: "Flor de lótus — iPhone 17 Pro Teléfoto 8×",
    area: "b",
    label: "Teléfoto 8× · iPhone 17 Pro",
    position: "center center",
  },
  {
    src: "/images/shot_lowlight.jpg",
    alt: "Retrato noturno — iPhone 17 Pro",
    area: "c",
    label: "Modo Noturno · iPhone 17 Pro",
    position: "center 20%",
  },
  {
    src: "/images/shot_macro.jpg",
    alt: "Dente-de-leão — iPhone 17 Macro",
    area: "d",
    label: "Macro · iPhone 17",
    position: "center center",
  },
  {
    src: "/images/shot_portrait.jpg",
    alt: "Retrato urbano — iPhone 17 Pro",
    area: "e",
    label: "Retrato · iPhone 17 Pro",
    position: "center 30%",
  },
];

function PhotoCard({ photo }: { photo: (typeof PHOTOS)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridArea: photo.area,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Image with grayscale → color transition */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: hovered
            ? "grayscale(0) brightness(1.03)"
            : "grayscale(1) brightness(0.78)",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition:
            "filter 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          quality={92}
          sizes="(max-width: 768px) 100vw, 40vw"
          style={{ objectFit: "cover", objectPosition: photo.position }}
        />
      </div>

      {/* Label on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "28px 18px 18px",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {photo.label}
        </span>
      </div>
    </div>
  );
}

export default function GallerySection() {
  return (
    <section id="gallery" style={{ background: "#ffffff" }}>
      {/* Header */}
      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          padding: "96px 24px 52px",
          textAlign: "center",
        }}
      >
        <p className="section-label mb-3">Galeria</p>
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 700,
            letterSpacing: "-0.022em",
            color: "#1d1d1f",
            lineHeight: 1.07,
          }}
        >
          Shot on iPhone&nbsp;17.
        </h2>
        <p
          style={{
            fontSize: "clamp(15px, 1.8vw, 18px)",
            color: "#6e6e73",
            marginTop: "12px",
            fontWeight: 300,
          }}
        >
          Passe o mouse para revelar as cores.
        </p>
      </div>

      {/* Asymmetric grid — break positions differ on every row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr 0.9fr",
          gridTemplateRows: "420px 260px 360px",
          gridTemplateAreas: `
            "a a b"
            "c d b"
            "c e e"
          `,
          gap: "4px",
        }}
      >
        {PHOTOS.map((photo) => (
          <PhotoCard key={photo.src} photo={photo} />
        ))}
      </div>
    </section>
  );
}

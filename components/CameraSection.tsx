"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type CameraSpec = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  image: string;
};

const CAMERAS: CameraSpec[] = [
  {
    id: "main",
    title: "Câmera Principal 48MP",
    subtitle: "Fusion Camera · f/1.6",
    description:
      "O sensor de 48MP com abertura f/1.6 captura até 2× mais luz do que a geração anterior. O Photonic Engine processa cada pixel com inteligência computacional para fotos extraordinárias mesmo na escuridão.",
    specs: ["48MP · f/1.6", "OIS Avançado", "Smart HDR 5", "Photonic Engine"],
    image: "/images/iphone17_PNG12.png",
  },
  {
    id: "ultrawide",
    title: "Ultra-Angular 12MP",
    subtitle: "120° de campo visual",
    description:
      "Um campo de visão de 120° permite enquadrar paisagens épicas e capturar detalhes macro com foco automático a partir de 2 cm de distância. Cada ângulo. Cada detalhe.",
    specs: ["12MP · f/2.2", "120° FoV", "Macro Automático", "Foco autofoco"],
    image: "/images/iphone17_PNG1.png",
  },
  {
    id: "zoom",
    title: "Zoom Tetra Prisma 5×",
    subtitle: "120mm equivalente",
    description:
      "A lente Tetra Prisma dobra a luz quatro vezes para entregar zoom óptico de 5× com estabilização de imagem de próxima geração. Chegue perto sem se mover.",
    specs: ["5× Óptico", "25× Digital", "OIS Avançado", "120mm equiv."],
    image: "/images/iphone17_orange.png",
  },
  {
    id: "video",
    title: "Vídeo 4K Dolby Vision",
    subtitle: "Qualidade de cinema",
    description:
      "Grave em 4K a 120fps em Log Video e edite diretamente no iPhone. O Modo Cinema cria profundidade de campo cinematográfica em tempo real, automaticamente.",
    specs: ["4K@120fps", "Log Video", "ProRes", "Modo Cinema 4K"],
    image: "/images/iphone17_PNG115542.png",
  },
  {
    id: "front",
    title: "TrueDepth Frontal 24MP",
    subtitle: "Câmera frontal com autofoco",
    description:
      "24MP com abertura f/1.9 e autofoco captura selfies nítidas em qualquer luz. O Face ID mapeia seu rosto com precisão de infravermelhos para desbloqueio instantâneo.",
    specs: ["24MP · f/1.9", "Autofoco", "Face ID", "Modo Retratos"],
    image: "/images/iphone17_PNG11.png",
  },
];

function AccordionItem({
  cam,
  isActive,
  isLast,
  onClick,
}: {
  cam: CameraSpec;
  isActive: boolean;
  isLast: boolean;
  onClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setHeight(isActive ? el.scrollHeight : 0);
  }, [isActive]);

  return (
    <div
      style={{
        borderTop: "1px solid #d2d2d7",
        ...(isLast ? { borderBottom: "1px solid #d2d2d7" } : {}),
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "16px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: "17px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: isActive ? "#e8622a" : "#1d1d1f",
              transition: "color 0.25s ease",
              lineHeight: 1.2,
            }}
          >
            {cam.title}
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "#a1a1a6",
              marginTop: "3px",
              opacity: isActive ? 0 : 1,
              maxHeight: isActive ? 0 : "20px",
              overflow: "hidden",
              transition: "opacity 0.2s ease, max-height 0.25s ease",
            }}
          >
            {cam.subtitle}
          </p>
        </div>

        {/* +/× toggle */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            background: isActive ? "#e8622a" : "#ebebed",
            flexShrink: 0,
            transition: "background 0.25s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
            transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <line x1="5" y1="1" x2="5" y2="9" stroke={isActive ? "#fff" : "#1d1d1f"} strokeWidth="1.6" strokeLinecap="round" />
            <line x1="1" y1="5" x2="9" y2="5" stroke={isActive ? "#fff" : "#1d1d1f"} strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* Expandable body */}
      <div
        style={{
          overflow: "hidden",
          height: `${height}px`,
          transition: "height 0.38s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div ref={contentRef} style={{ paddingBottom: "28px" }}>
          <p
            style={{
              fontSize: "15px",
              color: "#6e6e73",
              lineHeight: 1.65,
              marginBottom: "16px",
            }}
          >
            {cam.description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
            {cam.specs.map((spec) => (
              <span
                key={spec}
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#e8622a",
                  background: "rgba(232,98,42,0.07)",
                  border: "1px solid rgba(232,98,42,0.18)",
                  borderRadius: "999px",
                  padding: "4px 12px",
                }}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CameraSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [imageIn, setImageIn] = useState(true);
  const [tilt, setTilt] = useState({ rx: 2, ry: -10 });

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

  const handleAccordionClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);

    // Carousel: slide out → swap → slide in
    setImageIn(false);
    setTimeout(() => {
      setDisplayedIndex(index);
      setTimeout(() => setImageIn(true), 40);
    }, 210);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imageContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: 4 - ny * 10,
      ry: -14 + nx * 12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 2, ry: -10 });
  };

  return (
    <section
      id="camera"
      ref={sectionRef}
      style={{ background: "#ffffff", padding: "120px 0 110px" }}
    >
      <div className="max-w-[980px] mx-auto px-6">
        {/* Header */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: "72px",
          }}
        >
          <p className="section-label mb-3">Câmera</p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.022em",
              color: "#1d1d1f",
              lineHeight: 1.07,
              maxWidth: "580px",
            }}
          >
            Sistema de câmera.<br />Reinventado.
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              color: "#6e6e73",
              marginTop: "14px",
              fontWeight: 300,
              maxWidth: "460px",
            }}
          >
            Cada pixel capturado com a precisão de um sistema óptico profissional.
          </p>
        </div>

        {/* Main layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-start"
          style={{ gap: "clamp(32px, 6vw, 72px)" }}
        >
          {/* Image — sticky on desktop */}
          <div
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-32px)",
              transition: "opacity 0.9s ease 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
              position: "sticky",
              top: "100px",
            }}
          >
            {/* 3D tilt wrapper */}
            <div
              style={{
                transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)",
                transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Image frame */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/5",
                  opacity: imageIn ? 1 : 0,
                  transform: imageIn ? "translateX(0) scale(1)" : "translateX(-24px) scale(0.97)",
                  transition: "opacity 0.22s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <Image
                  src={CAMERAS[displayedIndex].image}
                  alt={CAMERAS[displayedIndex].title}
                  fill
                  priority={displayedIndex === 0}
                  quality={90}
                  sizes="(max-width: 1024px) 90vw, 480px"
                  style={{ objectFit: "contain", filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.18))" }}
                />
              </div>
            </div>

            {/* Progress dots */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "6px",
                marginTop: "18px",
              }}
            >
              {CAMERAS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleAccordionClick(i)}
                  style={{
                    width: i === displayedIndex ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "999px",
                    background: i === displayedIndex ? "#e8622a" : "#d2d2d7",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "width 0.3s ease, background 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Accordion */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(32px)",
              transition: "opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            {CAMERAS.map((cam, i) => (
              <AccordionItem
                key={cam.id}
                cam={cam}
                isActive={activeIndex === i}
                isLast={i === CAMERAS.length - 1}
                onClick={() => handleAccordionClick(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Model = {
  id: string;
  name: string;
  tagline: string;
  feature: string;
  colors: string[];
  price: string;
  image: string;
  badge: string;
  pro: boolean;
};

const MODELS: Model[] = [
  {
    id: "iphone17",
    name: "iPhone 17",
    tagline: "Câmera. Chip. Conexão.",
    feature: "Chip A18 Bionic · Tela OLED 6,1\"",
    colors: ["#1c3a70", "#3b6b67", "#e8afc0", "#f0efea", "#2a2a2a"],
    price: "A partir de R$ 8.499",
    image: "/images/iphone17_PNG11.png",
    badge: "Novo",
    pro: false,
  },
  {
    id: "iphone17-plus",
    name: "iPhone 17 Plus",
    tagline: "Grande tela. Grande bateria.",
    feature: "Chip A18 Bionic · Tela OLED 6,7\"",
    colors: ["#1c3a70", "#3b6b67", "#e8afc0", "#f0efea", "#2a2a2a"],
    price: "A partir de R$ 9.499",
    image: "/images/iphone17_PNG6.png",
    badge: "Novo",
    pro: false,
  },
  {
    id: "iphone17-pro",
    name: "iPhone 17 Pro",
    tagline: "Pro. Ao extremo.",
    feature: "Chip A19 Pro · Câmera Pro 48MP",
    colors: ["#e8622a", "#c9b49b", "#c8c0b4", "#2a2a2a"],
    price: "A partir de R$ 10.499",
    image: "/images/iphone17_PNG30.png",
    badge: "Pro",
    pro: true,
  },
  {
    id: "iphone17-pro-max",
    name: "iPhone 17 Pro Max",
    tagline: "Nosso iPhone mais avançado.",
    feature: "Chip A19 Pro · Tela OLED 6,9\"",
    colors: ["#e8622a", "#c9b49b", "#c8c0b4", "#2a2a2a"],
    price: "A partir de R$ 12.499",
    image: "/images/iphone17_orange.png",
    badge: "Pro Max",
    pro: true,
  },
];

function ModelCard({
  model,
  index,
  visible,
}: {
  model: Model;
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const delay = 0.15 + index * 0.1;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "32px 24px 28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, box-shadow 0.3s ease`,
        boxShadow: hovered
          ? "0 24px 64px rgba(0,0,0,0.10)"
          : "0 2px 20px rgba(0,0,0,0.055)",
      }}
    >
      {/* Badge */}
      <span
        style={{
          display: "inline-block",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: model.pro ? "#1d1d1f" : "#e8622a",
          border: `1.5px solid ${model.pro ? "#1d1d1f" : "#e8622a"}`,
          borderRadius: "999px",
          padding: "3px 11px",
          marginBottom: "20px",
        }}
      >
        {model.badge}
      </span>

      {/* Phone image */}
      <div
        style={{
          width: "100%",
          height: "220px",
          position: "relative",
          marginBottom: "24px",
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
          transform: hovered ? "scale(1.05) translateY(-6px)" : "scale(1) translateY(0)",
        }}
      >
        <Image
          src={model.image}
          alt={model.name}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 260px"
          quality={85}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Model name */}
      <h3
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "#1d1d1f",
          letterSpacing: "-0.015em",
          lineHeight: 1.1,
        }}
      >
        {model.name}
      </h3>

      {/* Tagline */}
      <p
        style={{
          fontSize: "14px",
          color: "#6e6e73",
          marginTop: "6px",
          lineHeight: 1.4,
        }}
      >
        {model.tagline}
      </p>

      {/* Feature */}
      <p
        style={{
          fontSize: "12px",
          color: "#a1a1a6",
          marginTop: "4px",
        }}
      >
        {model.feature}
      </p>

      {/* Color swatches */}
      <div
        style={{
          display: "flex",
          gap: "7px",
          marginTop: "18px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {model.colors.map((color, ci) => (
          <div
            key={ci}
            title={color}
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: color,
              border:
                color === "#f0efea" || color === "#c8c0b4"
                  ? "1.5px solid #d2d2d7"
                  : "1.5px solid transparent",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Price */}
      <p
        style={{
          fontSize: "17px",
          fontWeight: 600,
          color: "#1d1d1f",
          marginTop: "20px",
          letterSpacing: "-0.01em",
        }}
      >
        {model.price}
      </p>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: "#e5e5ea",
          margin: "20px 0 16px",
        }}
      />

      {/* CTAs */}
      <a
        href="#"
        className="btn-orange"
        style={{
          display: "block",
          width: "100%",
          padding: "11px 0",
          borderRadius: "999px",
          fontSize: "14px",
          fontWeight: 600,
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        Comprar
      </a>
      <a
        href="#"
        style={{
          display: "block",
          fontSize: "13px",
          fontWeight: 500,
          color: "#e8622a",
          textDecoration: "none",
          marginTop: "10px",
          letterSpacing: "0.01em",
        }}
      >
        Saiba mais &rsaquo;
      </a>
    </div>
  );
}

export default function ModelsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.08 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="models"
      ref={sectionRef}
      style={{ background: "#f5f5f7", padding: "100px 0 96px" }}
    >
      <div className="max-w-[980px] mx-auto px-6">
        {/* Heading */}
        <div
          style={{
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p className="section-label mb-4">Modelos</p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.022em",
              color: "#1d1d1f",
              lineHeight: 1.07,
            }}
          >
            Escolha o seu iPhone&nbsp;17.
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 21px)",
              color: "#6e6e73",
              marginTop: "12px",
              fontWeight: 300,
              maxWidth: "520px",
              margin: "12px auto 0",
            }}
          >
            Quatro modelos. Possibilidades infinitas.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "16px",
            marginTop: "56px",
          }}
        >
          {MODELS.map((model, i) => (
            <ModelCard key={model.id} model={model} index={i} visible={visible} />
          ))}
        </div>

        {/* Compare link */}
        <div
          style={{
            textAlign: "center",
            marginTop: "48px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.6s",
          }}
        >
          <a
            href="#"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#e8622a",
              textDecoration: "none",
              borderBottom: "1px solid rgba(232,98,42,0.35)",
              paddingBottom: "1px",
            }}
          >
            Comparar todos os modelos &rsaquo;
          </a>
        </div>
      </div>
    </section>
  );
}

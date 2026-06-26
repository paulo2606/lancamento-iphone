"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/lib/useIsMobile";

const FAQS = [
  {
    q: "Qual é a diferença entre o iPhone 17 e o iPhone 17 Pro?",
    a: "O iPhone 17 traz o chip A19, câmera dupla de 48MP e estrutura em alumínio — ideal para quem quer o melhor desempenho do mercado num design elegante. O iPhone 17 Pro vai além: chip A19 Pro com GPU de 6 núcleos, sistema triplo de câmeras 48MP com teleobjetiva de zoom óptico 8×, estrutura em titânio e Always-On Display. É a escolha certa para criadores de conteúdo e quem exige o máximo em fotografia e vídeo.",
  },
  {
    q: "O iPhone 17 Air é realmente o mais fino já feito?",
    a: "Sim. Com apenas 5,64 mm de espessura, o iPhone 17 Air é o iPhone mais fino da história — e um dos smartphones mais finos já fabricados. Apesar do perfil ultrafino, ele mantém estrutura em titânio, câmera de 48MP, chip A19 Pro e bateria com até 27 horas de reprodução de vídeo.",
  },
  {
    q: "Posso fazer trade-in do meu iPhone atual?",
    a: "Sim. O programa Apple Trade In permite trocar seu iPhone atual por crédito na compra de um modelo novo. O valor do crédito varia conforme o modelo, estado de conservação e capacidade de armazenamento do seu aparelho. O processo é feito diretamente na Loja Apple, on-line ou nas Apple Authorized Resellers.",
  },
  {
    q: "O iPhone 17 tem suporte a eSIM?",
    a: "Todos os modelos do iPhone 17 utilizam eSIM duplo — sem slot para chip físico. Isso permite usar duas linhas simultaneamente no mesmo aparelho, alternar entre operadoras sem precisar trocar chip e manter um número local ao viajar para outro país.",
  },
  {
    q: "Quanto tempo leva para carregar completamente o iPhone 17?",
    a: "Com carga rápida e um adaptador de 30W ou superior, o iPhone 17 atinge 50% em aproximadamente 20 minutos. A carga completa leva cerca de 1h30 a 2h, dependendo do modelo e do adaptador utilizado. O carregamento sem fio MagSafe chega a até 25W no iPhone 17 e 17 Pro.",
  },
  {
    q: "O iPhone 17 é resistente à água?",
    a: "Sim, todos os modelos do iPhone 17 possuem certificação IP68 — resistentes à imersão em até 6 metros de profundidade por até 30 minutos. A resistência é testada em água doce; líquidos como água do mar, café ou refrigerante podem causar danos não cobertos pela garantia.",
  },
  {
    q: "Quais são as opções de armazenamento disponíveis?",
    a: "O iPhone 17 e o iPhone Air partem de 256GB. O iPhone 17 Pro oferece 256GB, 512GB e 1TB. Já o iPhone 17 Pro Max é o único modelo com opção de 2TB — ideal para quem grava vídeos em 4K ProRes ou armazena grandes bibliotecas de fotos.",
  },
  {
    q: "O iPhone 17 funciona com acessórios MagSafe anteriores?",
    a: "Sim. Todos os iPhones 17 são compatíveis com o ecossistema MagSafe, incluindo carteiras, capas, suportes e carregadores lançados para modelos anteriores compatíveis com MagSafe. Alguns acessórios podem ter limitações de potência dependendo do modelo.",
  },
];

function FAQItem({
  item,
  open,
  onToggle,
  visible,
  delay,
}: {
  item: (typeof FAQS)[0];
  open: boolean;
  onToggle: () => void;
  visible: boolean;
  delay: number;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (!bodyRef.current) return;
    setHeight(open ? `${bodyRef.current.scrollHeight}px` : "0px");
  }, [open]);

  return (
    <div
      style={{
        borderBottom: "1px solid #e5e5ea",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "24px",
        }}
      >
        <span
          style={{
            fontSize: "clamp(15px, 1.6vw, 17px)",
            fontWeight: 500,
            color: open ? "#e8622a" : "#1d1d1f",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
            transition: "color 0.25s ease",
          }}
        >
          {item.q}
        </span>

        {/* +/- icon */}
        <div
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: `1.5px solid ${open ? "#e8622a" : "#d2d2d7"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.25s ease, background 0.25s ease",
            background: open ? "#e8622a" : "transparent",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "12px",
              height: "12px",
            }}
          >
            {/* horizontal bar */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: "1.5px",
                background: open ? "#fff" : "#6e6e73",
                transform: "translateY(-50%)",
                transition: "background 0.25s ease",
              }}
            />
            {/* vertical bar */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: "1.5px",
                background: open ? "#fff" : "#6e6e73",
                transform: `translateX(-50%) scaleY(${open ? 0 : 1})`,
                transition: "transform 0.25s ease, background 0.25s ease",
              }}
            />
          </div>
        </div>
      </button>

      {/* Answer drawer */}
      <div
        style={{
          height,
          overflow: "hidden",
          transition: "height 0.38s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div ref={bodyRef} style={{ paddingBottom: "22px" }}>
          <p
            style={{
              fontSize: "15px",
              color: "#6e6e73",
              lineHeight: 1.7,
              maxWidth: "680px",
              fontWeight: 300,
            }}
          >
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      style={{ background: "#f5f5f7", padding: "100px 0 96px" }}
    >
      <div className="max-w-[980px] mx-auto px-6">

        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
            gap: isMobile ? "32px" : "48px",
            alignItems: "start",
          }}
        >
          {/* Title */}
          <div
            style={{
              position: isMobile ? "static" : "sticky",
              top: "80px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <p className="section-label mb-3">FAQ</p>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.022em",
                color: "#1d1d1f",
                lineHeight: 1.1,
              }}
            >
              Perguntas
              <br />
              frequentes.
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#6e6e73",
                marginTop: "12px",
                fontWeight: 300,
                lineHeight: 1.5,
              }}
            >
              Tudo o que você precisa saber antes de escolher seu iPhone 17.
            </p>
          </div>

          {/* FAQ list */}
          <div>
            {FAQS.map((item, i) => (
              <FAQItem
                key={item.q}
                item={item}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                visible={visible}
                delay={0.1 + i * 0.05}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

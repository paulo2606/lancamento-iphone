import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iPhone 18 — Além do que você imagina",
  description: "Conheça o iPhone 18. O smartphone mais avançado que já existiu. Chip A19, câmera revolucionária e design que redefine o padrão.",
  keywords: "iPhone 18, Apple, smartphone, lançamento 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}

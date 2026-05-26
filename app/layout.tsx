import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohamed El-Ghazoui | Portfolio",
  description: "Portfolio de Mohamed El-Ghazoui, étudiant ingénieur en Informatique et Réseaux à l'EMSI Rabat.",
  openGraph: {
    title: "Mohamed El-Ghazoui | Informatique et Réseaux",
    description: "Projets, compétences, certifications et parcours EMSI de Mohamed El-Ghazoui.",
    type: "profile"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-theme="cyber">
      <body>{children}</body>
    </html>
  );
}

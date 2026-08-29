export type PackageId = "strategie-call" | "deep-dive-audit" | "vip-mentoring";

export interface ServicePackage {
  id: PackageId;
  name: string;
  duration: string;
  priceCents: number;
  currency: "eur";
  description: string;
  features: string[];
  featured?: boolean;
}

export const servicePackages: ServicePackage[] = [
  {
    id: "strategie-call",
    name: "Strategie-Call",
    duration: "30 Minuten",
    priceCents: 9700,
    currency: "eur",
    description: "Der perfekte Einstieg, um Klarheit über deinen nächsten Schritt zu gewinnen.",
    features: [
      "Analyse deiner aktuellen Situation",
      "Konkreter Fahrplan für die nächsten 30 Tage",
      "Live per Video-Call",
      "Zusammenfassung per E-Mail",
    ],
  },
  {
    id: "deep-dive-audit",
    name: "Deep-Dive Audit",
    duration: "60 Minuten",
    priceCents: 24700,
    currency: "eur",
    description: "Tiefgehende Analyse mit klarer Priorisierung und umsetzbaren Maßnahmen.",
    featured: true,
    features: [
      "Vollständiges Audit deines Business/Projekts",
      "Priorisierte Roadmap inkl. Quick Wins",
      "Aufzeichnung des Calls",
      "7 Tage Follow-up per E-Mail",
      "Individuelles PDF-Reporting",
    ],
  },
  {
    id: "vip-mentoring",
    name: "VIP Mentoring",
    duration: "4 Wochen Begleitung",
    priceCents: 149000,
    currency: "eur",
    description: "Enge 1:1 Begleitung für alle, die schnell und verbindlich vorankommen wollen.",
    features: [
      "Wöchentliche 1:1 Calls (4x 60 Min)",
      "Direkter Draht per WhatsApp/E-Mail",
      "Individuelle Umsetzungsstrategie",
      "Zugriff auf exklusive Ressourcen",
      "Priorisierter Support",
    ],
  },
];

export function getServicePackage(id: string): ServicePackage | undefined {
  return servicePackages.find((pkg) => pkg.id === id);
}

export function formatPrice(priceCents: number, currency: string = "eur"): string {
  const hasCents = priceCents % 100 !== 0;
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(priceCents / 100);
}

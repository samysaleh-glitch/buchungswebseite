import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Camera,
  Check,
  Clock,
  Mail,
  Shield,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";

import CalBooking from "@/components/CalBooking";
import CheckoutButton from "@/components/CheckoutButton";
import { formatPrice, servicePackages, type PackageId } from "@/lib/stripe/packages";

const packageIcons: Record<PackageId, React.ReactNode> = {
  "strategie-call": <Clock className="h-6 w-6" />,
  "deep-dive-audit": <Sparkles className="h-6 w-6" />,
  "vip-mentoring": <Star className="h-6 w-6" />,
};

const trustBadges = [
  { icon: <Users className="h-4 w-4" />, label: "500+ Klienten betreut" },
  { icon: <Star className="h-4 w-4" />, label: "4,9/5 Ø-Bewertung" },
  { icon: <Shield className="h-4 w-4" />, label: "Kostenlose Terminverschiebung" },
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#05050a] font-sans text-zinc-100">
      {/* Ambient glow background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[130px]" />
        <div className="absolute top-[28rem] -right-40 h-[520px] w-[520px] rounded-full bg-indigo-500/15 blur-[140px]" />
        <div className="absolute bottom-0 -left-40 h-[480px] w-[480px] rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(5,5,10,0.6)_60%,#05050a)]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#05050a]/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#hero" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-500/30">
              <Sparkles className="h-4 w-4" />
            </span>
            <span>Clarity Sessions</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-zinc-400 sm:flex">
            <a href="#leistungen" className="transition-colors hover:text-zinc-100">
              Leistungen
            </a>
            <a href="#buchung" className="transition-colors hover:text-zinc-100">
              Termin
            </a>
          </nav>
          <a
            href="#buchung"
            className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_-4px_rgba(99,102,241,0.8)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_28px_-4px_rgba(99,102,241,1)]"
          >
            Termin buchen
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="hero" className="relative px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300">
              <Star className="h-3.5 w-3.5 fill-indigo-300 text-indigo-300" />
              Bewertet mit 4,9/5 von über 500 Klienten
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-transparent sm:text-6xl">
              <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text">
                Klarheit, Strategie und Ergebnisse —
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-violet-400 bg-clip-text">
                in einem Gespräch.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
              Buche deinen 1:1 Termin und erhalte einen klaren, umsetzbaren Plan für dein
              Vorhaben — persönlich, fokussiert und ohne Umwege.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <a
                href="#buchung"
                className="group inline-flex items-center gap-2 rounded-full bg-indigo-500 px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_30px_-6px_rgba(99,102,241,0.9)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_40px_-4px_rgba(99,102,241,1)]"
              >
                Termin buchen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#leistungen"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-base font-medium text-zinc-200 backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Leistungen ansehen
              </a>
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm text-zinc-400"
                >
                  <span className="text-indigo-400">{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="leistungen" className="relative px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Wähle dein Paket
              </h2>
              <p className="mt-4 text-zinc-400">
                Drei Formate, ein Ziel: dich schnell und verbindlich zum nächsten Schritt zu
                bringen.
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              {servicePackages.map((service) => (
                <div
                  key={service.id}
                  className={`relative flex flex-col rounded-2xl border p-8 backdrop-blur-sm transition-all ${
                    service.featured
                      ? "border-indigo-400/40 bg-gradient-to-b from-indigo-500/10 to-transparent shadow-[0_0_50px_-12px_rgba(99,102,241,0.6)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20"
                  }`}
                >
                  {service.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow-[0_0_20px_-2px_rgba(99,102,241,0.9)]">
                      Beliebteste Wahl
                    </span>
                  )}

                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${
                      service.featured
                        ? "bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/40"
                        : "bg-white/5 text-indigo-400 ring-1 ring-white/10"
                    }`}
                  >
                    {packageIcons[service.id]}
                  </div>

                  <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{service.duration}</p>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">
                      {formatPrice(service.priceCents, service.currency)}
                    </span>
                  </div>

                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <CheckoutButton packageId={service.id} featured={service.featured} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking */}
        <section id="buchung" className="relative px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Wähle deinen Wunschtermin
              </h2>
              <p className="mt-4 text-zinc-400">
                Suche dir direkt einen freien Slot aus — unkompliziert und in wenigen Klicks
                bestätigt.
              </p>
            </div>

            <div className="mt-12 rounded-3xl border border-indigo-400/20 bg-gradient-to-b from-indigo-500/[0.07] to-white/[0.02] p-2 shadow-[0_0_60px_-20px_rgba(99,102,241,0.5)]">
              <div className="h-[720px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0a0a12]/60 sm:h-[820px]">
                <CalBooking />
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-zinc-500">
              Kein passender Slot dabei?{" "}
              <a
                href="mailto:kontakt@example.com?subject=Terminanfrage"
                className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
              >
                Schreib uns einfach eine E-Mail
              </a>
              .
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-indigo-400" />
                Sofortige Bestätigung
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-indigo-400" />
                Kostenlose Terminverschiebung
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-400" />
                Antwort innerhalb 24h
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/5 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2 font-semibold tracking-tight text-zinc-200">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-500/30">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            Clarity Sessions
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-indigo-400/40 hover:text-indigo-300"
            >
              <Camera className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-indigo-400/40 hover:text-indigo-300"
            >
              <Briefcase className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="X"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-indigo-400/40 hover:text-indigo-300"
            >
              <X className="h-4 w-4" />
            </a>
            <a
              href="mailto:kontakt@example.com"
              aria-label="E-Mail"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-indigo-400/40 hover:text-indigo-300"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          <p className="text-sm text-zinc-500">
            © {year} Clarity Sessions. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}

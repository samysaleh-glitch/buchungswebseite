import { ArrowLeft, HelpCircle, Mail, Sparkles, XCircle } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#05050a] font-sans text-zinc-100">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[130px]" />
        <div className="absolute bottom-0 -left-40 h-[480px] w-[480px] rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(5,5,10,0.6)_60%,#05050a)]" />
      </div>

      <header className="border-b border-white/5 bg-[#05050a]/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-500/30">
              <Sparkles className="h-4 w-4" />
            </span>
            <span>Clarity Sessions</span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center px-6 py-20 sm:py-28">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-500/15 text-zinc-300 ring-1 ring-white/10">
            <XCircle className="h-8 w-8" />
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Zahlung abgebrochen
          </h1>

          <p className="mt-4 text-lg text-zinc-400">
            Kein Problem — es wurde nichts abgebucht. Du kannst den Bezahlvorgang jederzeit
            erneut starten oder uns direkt kontaktieren, falls etwas nicht funktioniert hat.
          </p>

          <div className="mt-10 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <HelpCircle className="h-4 w-4 text-indigo-400" />
              Häufige Gründe für einen Abbruch
            </div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>• Die Zahlung wurde manuell abgebrochen oder das Fenster geschlossen</li>
              <li>• Die Karte wurde von der Bank abgelehnt</li>
              <li>• Zeitüberschreitung während des Bezahlvorgangs</li>
            </ul>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-indigo-500 px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_30px_-6px_rgba(99,102,241,0.9)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_40px_-4px_rgba(99,102,241,1)]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Zurück zur Startseite
            </Link>
            <a
              href="mailto:kontakt@example.com?subject=Problem%20bei%20der%20Zahlung"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-base font-medium text-zinc-200 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              Support kontaktieren
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

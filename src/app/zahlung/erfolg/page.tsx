import { CheckCircle2, Mail, Sparkles } from "lucide-react";
import Link from "next/link";

import CalBooking from "@/components/CalBooking";
import { formatPrice, getServicePackage } from "@/lib/stripe/packages";
import { getStripeClient } from "@/lib/stripe/server";

interface ConfirmedBooking {
  packageName?: string;
  duration?: string;
  amountFormatted?: string;
  customerEmail?: string;
}

async function getConfirmedBooking(sessionId: string | undefined): Promise<ConfirmedBooking | null> {
  if (!sessionId) {
    return null;
  }

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const packageId = session.metadata?.packageId;
    const servicePackage = packageId ? getServicePackage(packageId) : undefined;
    const amountFormatted =
      typeof session.amount_total === "number"
        ? formatPrice(session.amount_total, session.currency ?? "eur")
        : undefined;

    return {
      packageName: servicePackage?.name,
      duration: servicePackage?.duration,
      amountFormatted,
      customerEmail: session.customer_details?.email ?? undefined,
    };
  } catch {
    return null;
  }
}

export default async function Page(props: PageProps<"/zahlung/erfolg">) {
  const searchParams = await props.searchParams;
  const rawSessionId = searchParams.session_id;
  const sessionId = typeof rawSessionId === "string" ? rawSessionId : undefined;
  const booking = await getConfirmedBooking(sessionId);

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#05050a] font-sans text-zinc-100">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[130px]" />
        <div className="absolute top-[28rem] -right-40 h-[520px] w-[520px] rounded-full bg-indigo-500/15 blur-[140px]" />
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

      <main className="flex-1 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/30">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Zahlung erfolgreich!
            </h1>

            {booking ? (
              <p className="mt-4 text-lg text-zinc-400">
                Vielen Dank für deine Buchung des Pakets{" "}
                <span className="font-semibold text-white">{booking.packageName}</span>
                {booking.duration ? ` (${booking.duration})` : ""}
                {booking.amountFormatted ? (
                  <>
                    {" "}
                    über <span className="font-semibold text-white">{booking.amountFormatted}</span>
                  </>
                ) : null}
                . Deine Zahlung wurde bestätigt.
              </p>
            ) : (
              <p className="mt-4 text-lg text-zinc-400">
                Deine Zahlung wurde erfolgreich verarbeitet. Vielen Dank für dein Vertrauen!
              </p>
            )}

            {booking?.customerEmail && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-400">
                <Mail className="h-3.5 w-3.5 text-indigo-400" />
                Bestätigung gesendet an {booking.customerEmail}
              </div>
            )}
          </div>

          <div className="mx-auto mt-16 max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Letzter Schritt: Wähle deinen Wunschtermin
            </h2>
            <p className="mt-4 text-zinc-400">
              Suche dir jetzt direkt einen passenden Slot im Kalender aus, um deinen Termin final
              zu bestätigen.
            </p>
          </div>

          <div className="mt-12 rounded-3xl border border-indigo-400/20 bg-gradient-to-b from-indigo-500/[0.07] to-white/[0.02] p-2 shadow-[0_0_60px_-20px_rgba(99,102,241,0.5)]">
            <div className="h-[720px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0a0a12]/60 sm:h-[820px]">
              <CalBooking />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-500">
            Fragen zu deiner Buchung?{" "}
            <a
              href="mailto:kontakt@example.com?subject=Frage%20zu%20meiner%20Buchung"
              className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
            >
              Schreib uns eine E-Mail
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}

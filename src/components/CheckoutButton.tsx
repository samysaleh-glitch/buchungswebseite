"use client";

import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

import type { PackageId } from "@/lib/stripe/packages";

let stripePromise: Promise<Stripe | null> | null = null;

function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ist nicht konfiguriert.");
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
}

interface CheckoutButtonProps {
  packageId: PackageId;
  featured?: boolean;
}

export default function CheckoutButton({ packageId, featured }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setLoading(true);

    try {
      // Lädt Stripe.js vor (u.a. für Betrugserkennung), bevor zu Checkout weitergeleitet wird.
      void getStripe();

      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId }),
      });

      const data: { id?: string; url?: string; error?: string } = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Zahlung konnte nicht gestartet werden.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler.");
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
          featured
            ? "bg-indigo-500 text-white shadow-[0_0_24px_-6px_rgba(99,102,241,0.9)] hover:bg-indigo-400"
            : "border border-white/15 text-zinc-100 hover:bg-white/10"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Weiterleitung...
          </>
        ) : (
          <>
            Jetzt buchen
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      {error && <p className="mt-2 text-center text-xs text-red-400">{error}</p>}
    </div>
  );
}

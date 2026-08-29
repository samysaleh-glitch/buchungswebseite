import { NextResponse } from "next/server";

import { getServicePackage } from "@/lib/stripe/packages";
import { getStripeClient } from "@/lib/stripe/server";

function extractPackageId(body: unknown): string | null {
  if (typeof body !== "object" || body === null) {
    return null;
  }
  const candidate = (body as Record<string, unknown>).packageId;
  return typeof candidate === "string" && candidate.trim().length > 0 ? candidate : null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültiges JSON im Request-Body." }, { status: 400 });
  }

  const packageId = extractPackageId(body);
  if (!packageId) {
    return NextResponse.json({ error: 'Feld "packageId" fehlt oder ist ungültig.' }, { status: 400 });
  }

  const servicePackage = getServicePackage(packageId);
  if (!servicePackage) {
    return NextResponse.json({ error: "Unbekanntes Paket." }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    const stripe = getStripeClient();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: servicePackage.currency,
            unit_amount: servicePackage.priceCents,
            product_data: {
              name: servicePackage.name,
              description: `${servicePackage.duration} · ${servicePackage.description}`,
            },
          },
        },
      ],
      metadata: {
        packageId: servicePackage.id,
      },
      success_url: `${siteUrl}/zahlung/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/zahlung/abbruch`,
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unbekannter Fehler bei der Zahlungsanbindung.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

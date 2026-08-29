import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  getBookingConfirmationHtml,
  getBookingConfirmationSubject,
  getBookingConfirmationText,
} from "@/lib/email/booking-confirmation";

interface SendConfirmationRequestBody {
  to: string;
  customerName: string;
  packageName: string;
  duration: string;
  price: string;
  date?: string;
  time?: string;
  meetLink?: string;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validateBody(body: unknown): { data: SendConfirmationRequestBody } | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Der Request-Body muss ein JSON-Objekt sein." };
  }

  const candidate = body as Record<string, unknown>;
  const requiredFields: (keyof SendConfirmationRequestBody)[] = [
    "to",
    "customerName",
    "packageName",
    "duration",
    "price",
  ];

  for (const field of requiredFields) {
    if (!isNonEmptyString(candidate[field])) {
      return { error: `Feld "${field}" fehlt oder ist ungültig.` };
    }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(candidate.to as string)) {
    return { error: 'Feld "to" muss eine gültige E-Mail-Adresse sein.' };
  }

  return {
    data: {
      to: candidate.to as string,
      customerName: candidate.customerName as string,
      packageName: candidate.packageName as string,
      duration: candidate.duration as string,
      price: candidate.price as string,
      date: isNonEmptyString(candidate.date) ? candidate.date : undefined,
      time: isNonEmptyString(candidate.time) ? candidate.time : undefined,
      meetLink: isNonEmptyString(candidate.meetLink) ? candidate.meetLink : undefined,
    },
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "RESEND_API_KEY ist nicht konfiguriert." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Ungültiges JSON im Request-Body." },
      { status: 400 },
    );
  }

  const validation = validateBody(body);
  if ("error" in validation) {
    return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
  }

  const { data } = validation;
  const fromAddress = process.env.RESEND_FROM_EMAIL ?? "Clarity Sessions <onboarding@resend.dev>";
  const supportEmail = process.env.SUPPORT_EMAIL ?? "kontakt@example.com";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const emailData = {
    customerName: data.customerName,
    packageName: data.packageName,
    duration: data.duration,
    price: data.price,
    date: data.date,
    time: data.time,
    meetLink: data.meetLink,
    supportEmail,
    siteUrl,
  };

  try {
    const resend = new Resend(apiKey);
    const { data: sendResult, error } = await resend.emails.send({
      from: fromAddress,
      to: data.to,
      subject: getBookingConfirmationSubject(emailData),
      html: getBookingConfirmationHtml(emailData),
      text: getBookingConfirmationText(emailData),
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 502 });
    }

    return NextResponse.json({ success: true, id: sendResult?.id ?? null });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unbekannter Fehler beim E-Mail-Versand.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

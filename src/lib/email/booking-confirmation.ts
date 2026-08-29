export interface BookingConfirmationData {
  customerName: string;
  packageName: string;
  duration: string;
  price: string;
  date?: string;
  time?: string;
  meetLink?: string;
  supportEmail: string;
  siteUrl: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function getBookingConfirmationSubject(data: BookingConfirmationData): string {
  return `Deine Buchung ist bestätigt: ${data.packageName}`;
}

export function getBookingConfirmationText(data: BookingConfirmationData): string {
  const dateLine = data.date ? `Datum: ${data.date}` : "Datum: wird noch bestätigt";
  const timeLine = data.time ? `Uhrzeit: ${data.time}` : "Uhrzeit: wird noch bestätigt";
  const meetLine = data.meetLink
    ? `Video-Call-Link (Google Meet): ${data.meetLink}`
    : "Video-Call-Link (Google Meet): wird dir rechtzeitig vor dem Termin zugeschickt";

  return `Hallo ${data.customerName},

deine Buchung wurde erfolgreich bestätigt!

Gebuchtes Paket: ${data.packageName} (${data.duration}, ${data.price})
${dateLine}
${timeLine}
${meetLine}

Vorbereitung:
- Sorge für eine stabile Internetverbindung und einen ruhigen Ort
- Halte relevante Unterlagen oder Fragen bereit
- Sei 5 Minuten vor Beginn startklar

Bei Fragen erreichst du uns jederzeit unter ${data.supportEmail}.

Wir freuen uns auf das Gespräch!
Dein Clarity Sessions Team
${data.siteUrl}`;
}

export function getBookingConfirmationHtml(data: BookingConfirmationData): string {
  const name = escapeHtml(data.customerName);
  const packageName = escapeHtml(data.packageName);
  const duration = escapeHtml(data.duration);
  const price = escapeHtml(data.price);
  const date = data.date ? escapeHtml(data.date) : "Wird dir noch bestätigt";
  const time = data.time ? escapeHtml(data.time) : "Wird dir noch bestätigt";
  const supportEmail = escapeHtml(data.supportEmail);
  const siteUrl = escapeHtml(data.siteUrl);
  const meetLink = data.meetLink ? escapeHtml(data.meetLink) : null;

  return `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>Buchungsbestätigung</title>
    <!--[if mso]>
    <style type="text/css">
      table { border-collapse: collapse; }
    </style>
    <![endif]-->
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f7; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
      Deine Buchung für ${packageName} wurde bestätigt – hier findest du alle Details.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(15,15,35,0.08);">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#4f46e5,#6366f1 55%,#818cf8); padding:36px 40px; text-align:center;">
                <div style="display:inline-flex; align-items:center; gap:8px; color:#ffffff; font-size:18px; font-weight:700; letter-spacing:-0.02em;">
                  ✦ Clarity Sessions
                </div>
                <p style="margin:14px 0 0; color:rgba(255,255,255,0.85); font-size:13px; letter-spacing:0.08em; text-transform:uppercase;">
                  Terminbestätigung
                </p>
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="padding:36px 40px 8px;">
                <h1 style="margin:0 0 12px; font-size:22px; line-height:1.3; color:#111117;">
                  Hallo ${name}, dein Termin steht! 🎉
                </h1>
                <p style="margin:0; font-size:15px; line-height:1.6; color:#52525b;">
                  vielen Dank für deine Buchung. Wir freuen uns auf das Gespräch mit dir.
                  Nachfolgend findest du alle Details zu deinem gebuchten Termin.
                </p>
              </td>
            </tr>

            <!-- Booking summary card -->
            <tr>
              <td style="padding:24px 40px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5ff; border:1px solid #e0e0fb; border-radius:12px;">
                  <tr>
                    <td style="padding:24px 28px;">
                      <p style="margin:0 0 4px; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#6366f1;">
                        Gebuchtes Paket
                      </p>
                      <p style="margin:0 0 18px; font-size:19px; font-weight:700; color:#111117;">
                        ${packageName}
                        <span style="font-weight:400; font-size:14px; color:#6b6b76;"> · ${duration}</span>
                      </p>

                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:8px 0; font-size:14px; color:#52525b; width:34%;">Preis</td>
                          <td style="padding:8px 0; font-size:14px; font-weight:600; color:#111117;">${price}</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0; font-size:14px; color:#52525b; border-top:1px solid #e5e5f5;">Datum</td>
                          <td style="padding:8px 0; font-size:14px; font-weight:600; color:#111117; border-top:1px solid #e5e5f5;">${date}</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0; font-size:14px; color:#52525b; border-top:1px solid #e5e5f5;">Uhrzeit</td>
                          <td style="padding:8px 0; font-size:14px; font-weight:600; color:#111117; border-top:1px solid #e5e5f5;">${time}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Meet link -->
            <tr>
              <td style="padding:24px 40px 8px; text-align:center;">
                ${
                  meetLink
                    ? `<a href="${meetLink}" style="display:inline-block; background-color:#6366f1; color:#ffffff; text-decoration:none; font-size:15px; font-weight:600; padding:14px 32px; border-radius:999px; box-shadow:0 8px 20px -6px rgba(99,102,241,0.6);">
                        Google Meet beitreten
                      </a>
                      <p style="margin:12px 0 0; font-size:12px; color:#9a9aa5;">
                        Der Link wird am Tag des Termins aktiv.
                      </p>`
                    : `<div style="border:1px dashed #d4d4e8; border-radius:12px; padding:18px 20px; font-size:14px; color:#6b6b76;">
                        Dein persönlicher Google-Meet-Link wird dir rechtzeitig vor dem Termin
                        per E-Mail zugeschickt.
                      </div>`
                }
              </td>
            </tr>

            <!-- Preparation -->
            <tr>
              <td style="padding:28px 40px 8px;">
                <p style="margin:0 0 10px; font-size:13px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; color:#111117;">
                  So bereitest du dich vor
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:6px 0; font-size:14px; color:#52525b; vertical-align:top;">✓&nbsp;&nbsp;Sorge für eine stabile Internetverbindung und einen ruhigen Ort</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; font-size:14px; color:#52525b; vertical-align:top;">✓&nbsp;&nbsp;Halte relevante Unterlagen oder offene Fragen bereit</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0; font-size:14px; color:#52525b; vertical-align:top;">✓&nbsp;&nbsp;Sei 5 Minuten vor Beginn startklar</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Support -->
            <tr>
              <td style="padding:24px 40px 36px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eeeef2; padding-top:20px;">
                  <tr>
                    <td style="padding-top:20px; font-size:14px; color:#52525b; text-align:center;">
                      Fragen vorab? Schreib uns einfach an
                      <a href="mailto:${supportEmail}" style="color:#6366f1; font-weight:600; text-decoration:none;">${supportEmail}</a>.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Footer -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin-top:20px;">
            <tr>
              <td style="text-align:center; font-size:12px; color:#9a9aa5; padding:0 20px;">
                © ${new Date().getFullYear()} Clarity Sessions ·
                <a href="${siteUrl}" style="color:#9a9aa5; text-decoration:underline;">${siteUrl}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

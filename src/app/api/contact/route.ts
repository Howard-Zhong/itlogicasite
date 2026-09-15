import { NextResponse } from "next/server";
import { offices, type OfficeKey } from "@/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  office?: string;
  interest?: string;
  message?: string;
  /** Honeypot — must stay empty. */
  company_website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Office → recipient. Environment variables win so ops can reroute without a deploy. */
function recipientFor(office: OfficeKey): string {
  if (office === "atlanta") {
    return process.env.CONTACT_EMAIL_ATLANTA || offices.atlanta.email;
  }
  return process.env.CONTACT_EMAIL_NANJING || offices.nanjing.email;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Silently accept bot submissions so they don't retry.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  const company = (body.company || "").trim();
  const interest = (body.interest || "").trim();
  const office = (body.office || "").trim() as OfficeKey;

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name, email and a message." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "That email address looks wrong." }, { status: 400 });
  }
  if (office !== "atlanta" && office !== "nanjing") {
    return NextResponse.json({ ok: false, error: "Please choose an office." }, { status: 400 });
  }
  if (message.length > 8000) {
    return NextResponse.json({ ok: false, error: "That message is too long." }, { status: 400 });
  }

  const to = recipientFor(office);
  const officeMeta = offices[office];
  const subject = `Website enquiry — ${name}${company ? ` (${company})` : ""} → ${officeMeta.city}`;

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["Office", `${officeMeta.label} — ${officeMeta.role}`],
    ["Topic", interest || "—"],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    message,
    "",
    `Sent from ${new URL(request.url).origin}`,
  ].join("\n");

  const html = `
    <div style="font-family:Inter,-apple-system,Segoe UI,sans-serif;max-width:640px;color:#1f2121">
      <div style="border-left:4px solid #d96119;padding-left:16px;margin-bottom:24px">
        <h2 style="margin:0 0 4px;font-size:20px">New website enquiry</h2>
        <p style="margin:0;color:#6b7280;font-size:14px">Routed to the ${escapeHtml(
          officeMeta.city
        )} office</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 0;color:#6b7280;width:120px">${escapeHtml(
                k
              )}</td><td style="padding:8px 0;font-weight:600">${escapeHtml(v)}</td></tr>`
          )
          .join("")}
      </table>
      <div style="margin-top:20px;padding:18px;background:#f9f9f9;border-radius:12px;white-space:pre-wrap;font-size:14px;line-height:1.6">${escapeHtml(
        message
      )}</div>
    </div>`;

  const apiKey = process.env.RESEND_API_KEY;

  // No key configured (local dev, or before ops provisions Resend): log and succeed
  // so the form is never a dead end during development.
  if (!apiKey) {
    console.info("[contact] RESEND_API_KEY missing — enquiry not emailed.\n" + text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "ITLogica Website <website@itlogica.com>",
      to: [to],
      bcc: process.env.CONTACT_BCC_EMAIL ? [process.env.CONTACT_BCC_EMAIL] : undefined,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json(
        { ok: false, error: "We couldn't deliver that. Please email us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[contact] unexpected error", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our side. Please email us directly." },
      { status: 500 }
    );
  }
}

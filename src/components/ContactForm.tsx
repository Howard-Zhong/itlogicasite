"use client";

import { useState, type FormEvent } from "react";
import Icon from "./Icon";
import { offices, type OfficeKey } from "@/data/site";
import styles from "./ContactForm.module.css";

type Status = { kind: "idle" | "sending" | "ok" | "err"; message?: string };

const interests = [
  "Solution Delivery",
  "Managed Services",
  "Distributed Delivery Model",
  "Staff Augmentation",
  "AI / Agentic Solutions",
  "Data & Analytics",
  "Cloud Modernisation",
  "Something else",
];

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [office, setOffice] = useState<OfficeKey | "">("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "We couldn't send that. Please try again.");
      }

      setStatus({
        kind: "ok",
        message: `Thank you — your enquiry is on its way to our ${
          office ? offices[office as OfficeKey].city : "nearest"
        } office. We reply within one business day.`,
      });
      form.reset();
      setOffice("");
    } catch (error) {
      setStatus({
        kind: "err",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please email us directly instead.",
      });
    }
  }

  const routed = office ? offices[office as OfficeKey] : null;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="cf-name">
            Full name <span className={styles.req}>*</span>
          </label>
          <input
            className={styles.input}
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Mitchell"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="cf-email">
            Work email <span className={styles.req}>*</span>
          </label>
          <input
            className={styles.input}
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="cf-company">
            Company
          </label>
          <input
            className={styles.input}
            id="cf-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="cf-office">
            Office <span className={styles.req}>*</span>
          </label>
          <select
            className={styles.select}
            id="cf-office"
            name="office"
            required
            value={office}
            onChange={(e) => setOffice(e.target.value as OfficeKey | "")}
          >
            <option value="" disabled>
              Select an office
            </option>
            <option value="atlanta">Atlanta, USA — Headquarters</option>
            <option value="nanjing">Nanjing, China — Delivery Center</option>
          </select>
        </div>
      </div>

      {!compact && (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="cf-interest">
            What can we help with?
          </label>
          <select className={styles.select} id="cf-interest" name="interest" defaultValue="">
            <option value="">Select a topic (optional)</option>
            {interests.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="cf-message">
          Message <span className={styles.req}>*</span>
        </label>
        <textarea
          className={styles.textarea}
          id="cf-message"
          name="message"
          required
          rows={compact ? 3 : 5}
          placeholder="Tell us about the project, the timeline, and what a good outcome looks like."
        />
      </div>

      {/* Honeypot — bots fill it, humans never see it. */}
      <input className={styles.hp} type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <p className={styles.routeNote}>
        <Icon name="mail" size={15} />
        {routed ? (
          <span>
            Routed to <strong>{routed.email}</strong> · {routed.role}
          </span>
        ) : (
          <span>Choose an office and we&rsquo;ll route your message to the right team.</span>
        )}
      </p>

      {status.kind === "ok" && (
        <p className={`${styles.status} ${styles.ok}`}>
          <Icon name="check" size={18} />
          <span>{status.message}</span>
        </p>
      )}
      {status.kind === "err" && (
        <p className={`${styles.status} ${styles.err}`}>
          <Icon name="close" size={18} />
          <span>{status.message}</span>
        </p>
      )}

      <button className={`btn ${styles.submit}`} type="submit" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Sending…" : "Send enquiry"}
        <Icon name="arrow" size={16} />
      </button>
    </form>
  );
}

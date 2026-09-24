"use client";

import { useState, type FormEvent } from "react";
import Icon from "./Icon";
import { offices } from "@/data/site";
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

/* One office, so there is nothing to choose: every enquiry routes to Atlanta. */
const ROUTED = offices.atlanta;

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form).entries()), office: ROUTED.key };

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
        message: `Thank you — your enquiry is on its way to our ${ROUTED.city} office. We reply within one business day.`,
      });
      form.reset();
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
        <span>
          Routed to <strong>{ROUTED.email}</strong> · {ROUTED.role}
        </span>
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

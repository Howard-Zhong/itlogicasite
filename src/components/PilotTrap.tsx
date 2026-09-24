"use client";

import { useState } from "react";
import { pilotTrap } from "@/data/home";
import styles from "./PilotTrap.module.css";

/*
 * Three questions, answers on hover.
 *
 * Hover is not an interaction on a touch screen, so the card is a real button:
 * tap opens it, and focus opens it for the keyboard. The answer is always in
 * the DOM — only its height and opacity change.
 */
export default function PilotTrap() {
  /* The first answer is showing on load, so the pattern is obvious without
     anyone having to discover it. */
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={styles.grid}>
      {pilotTrap.map((item, i) => (
        <button
          type="button"
          key={item.q}
          className={`${styles.card} ${open === i ? styles.open : ""}`}
          aria-expanded={open === i}
          onMouseEnter={() => setOpen(i)}
          onMouseLeave={() => setOpen(0)}
          onFocus={() => setOpen(i)}
          onBlur={() => setOpen(0)}
          onClick={() => setOpen(open === i ? null : i)}
        >
          <span className={styles.q}>{item.q}</span>

          <span className={styles.reveal}>
            <span className={styles.revealInner}>
              <span className={styles.stat}>{item.stat}</span>
              <span className={styles.statLabel}>{item.statLabel}</span>
              <span className={styles.a}>{item.a}</span>
            </span>
          </span>

          {/* Always rendered: swapping the text for "" reflowed the card and
              moved the whole row. Only its opacity changes. */}
          <span className={styles.hint} aria-hidden="true">
            Hover for the answer
          </span>
        </button>
      ))}
    </div>
  );
}

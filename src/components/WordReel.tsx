"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import ReelArt from "./ReelArt";
import styles from "./WordReel.module.css";

/*
 * Capability orbit — the hero's main visual.
 *
 * Eight capability balls ride an elliptical track around the headline, which
 * sits in the middle as `children`. Whichever ball reaches the top is the live
 * one: it fills with the brand gradient at full opacity and swaps the motif
 * behind the headline. Every ball stays legible — distance from the apex only
 * dims them part of the way, it never hides them.
 */

const DEFAULT_WORDS = [
  "Agentic AI",
  "Machine Learning",
  "Computer Vision",
  "Sound Recognition",
  "Data Analytics",
  "Cloud",
  "IoT",
  "Mobile & Web",
];

/** How long a ball takes to travel one seat. */
const TRAVEL = 1500;
/** Fraction of the travel after which the motif swaps to the arriving ball. */
const HANDOVER = 0.45;

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function WordReel({
  words = DEFAULT_WORDS,
  intervalMs = 3300,
  className,
  children,
}: {
  words?: string[];
  intervalMs?: number;
  className?: string;
  children?: ReactNode;
}) {
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  /* Which seat is live. Mirrored in a ref because the rAF loop repaints far
     more often than React re-renders. */
  const apexRef = useRef(0);
  const [active, setActive] = useState(0);
  const n = words.length;

  useEffect(() => {
    const STEP = (Math.PI * 2) / n;
    const APEX = -Math.PI / 2;

    /* Place every ball from one angle. Only transform and opacity change, so
       the ring never costs a layout or a repaint. */
    const place = (a0: number) => {
      for (let i = 0; i < n; i++) {
        const el = dotsRef.current[i];
        if (!el) continue;
        const th = a0 - i * STEP + APEX;
        // 1 at the top of the ellipse, 0 at the bottom.
        const p = (1 + Math.cos(th - APEX)) / 2;
        const x = Math.cos(th).toFixed(4);
        const y = Math.sin(th).toFixed(4);
        el.style.transform =
          `translate(-50%, -50%)` +
          ` translate(calc(${x} * var(--orb-rx)), calc(${y} * var(--orb-ry)))` +
          ` scale(${(0.88 + 0.17 * p).toFixed(3)})`;
        // Never below 0.52 — every capability has to stay readable.
        el.style.opacity = (0.52 + 0.48 * Math.pow(p, 1.25)).toFixed(3);
        el.style.zIndex = String(10 + Math.round(p * 20));
        /* Highlight by identity, not by proximity: at the midpoint of a hop
           both the leaving and the arriving ball are within 22.5° of the top,
           so a distance threshold would light two at once. */
        el.classList.toggle(styles.apex, i === apexRef.current);
      }
    };

    const reduced =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;

    apexRef.current = 0;
    place(0);
    setActive(0);
    if (reduced) return;

    let seat = 0;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;

    const advance = () => {
      const from = seat * STEP;
      seat += 1;
      const to = seat * STEP;
      const landing = ((seat % n) + n) % n;
      const t0 = performance.now();
      let handed = false;

      const frame = (now: number) => {
        const k = Math.min(1, (now - t0) / TRAVEL);
        place(from + (to - from) * easeInOut(k));
        if (!handed && k >= HANDOVER) {
          handed = true;
          apexRef.current = landing;
          setActive(landing);
        }
        if (k < 1) raf = requestAnimationFrame(frame);
        else timer = setTimeout(advance, Math.max(0, intervalMs - TRAVEL));
      };
      raf = requestAnimationFrame(frame);
    };

    timer = setTimeout(advance, intervalMs);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [n, intervalMs]);

  return (
    <div className={[styles.orbit, className].filter(Boolean).join(" ")}>
      <svg
        className={styles.track}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="orbTrack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--orange)" stopOpacity="0.8" />
            <stop offset="32%" stopColor="var(--orange)" stopOpacity="0.34" />
            <stop offset="70%" stopColor="var(--ink)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--ink)" stopOpacity="0.13" />
          </linearGradient>
        </defs>
        <ellipse
          cx="50"
          cy="50"
          rx="49.6"
          ry="49.6"
          fill="none"
          stroke="url(#orbTrack)"
          strokeWidth="1.1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className={styles.core}>
        <div className={styles.coreArt} aria-hidden="true">
          <ReelArt key={`a${active}`} scene={active} className={styles.art} />
        </div>
        {/* A soft bed so the motif never runs through the headline. */}
        <span className={styles.scrim} aria-hidden="true" />
        <div className={styles.coreSlot}>{children}</div>
      </div>

      {words.map((w, i) => (
        <span
          key={w}
          className={styles.dot}
          aria-hidden="true"
          ref={(el) => {
            dotsRef.current[i] = el;
          }}
        >
          <span>{w}</span>
        </span>
      ))}
    </div>
  );
}

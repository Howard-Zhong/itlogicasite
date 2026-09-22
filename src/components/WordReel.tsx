"use client";

import { useEffect, useState } from "react";
import ReelArt from "./ReelArt";
import styles from "./WordReel.module.css";

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

/* Per-character delays. Out clears faster than in arrives, so the two
   words never fight for the same row. */
const STAGGER_IN = 18;
const STAGGER_OUT = 11;
/* The incoming word waits for the outgoing one to clear the row. Without
   this the two overlap mid-flip and both become unreadable. */
const HANDOFF = 240;

function Line({ word, kind }: { word: string; kind: "in" | "out" }) {
  const step = kind === "in" ? STAGGER_IN : STAGGER_OUT;
  const base = kind === "in" ? HANDOFF : 0;
  return (
    <span className={`${styles.line} ${kind === "in" ? styles.in : styles.out}`}>
      {Array.from(word).map((ch, k) => (
        /* The cell clips; the glyph inside it flips. One perspective per
           cell is what makes each letter hinge on its own axis. */
        <span className={styles.cell} key={`${k}-${ch}`}>
          <span
            className={styles.glyph}
            style={{ animationDelay: `${base + k * step}ms` }}
          >
            {ch === " " ? " " : ch}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function WordReel({
  words = DEFAULT_WORDS,
  intervalMs = 2400,
  className,
}: {
  words?: string[];
  intervalMs?: number;
  className?: string;
}) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  const n = words.length;
  const cur = tick % n;
  const prev = (tick - 1 + n) % n;

  return (
    <div
      className={[styles.reel, className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <div className={styles.block}>
        <div className={styles.window}>
          {/* Motif layer: centred on the word row and swapped with it. Declared
              first so the letters paint over it. */}
          <div className={styles.artLayer}>
            {tick > 0 && (
              <ReelArt key={`ao${tick}`} scene={prev} className={`${styles.art} ${styles.artOut}`} />
            )}
            <ReelArt
              key={`ai${tick}`}
              scene={cur}
              className={`${styles.art} ${styles.artIn}`}
              style={{ animationDelay: `${HANDOFF}ms` }}
            />
          </div>
          {/* A soft bed so the motif never runs through the letters. */}
          <span className={styles.scrim} />
          {tick > 0 && <Line key={`o${tick}`} word={words[prev]} kind="out" />}
          <Line key={`i${tick}`} word={words[cur]} kind="in" />
        </div>

        {/* The rail is not decoration: one segment per capability, so the
            whole set is legible at a glance and the fill shows the dwell. */}
        <div className={styles.rail}>
          <div className={styles.segs}>
            {words.map((w, k) => (
              <span
                key={w}
                className={styles.seg}
                data-state={k === cur ? "on" : k < cur ? "done" : "todo"}
              >
                {k === cur && (
                  <span
                    key={tick}
                    className={styles.fill}
                    style={{ animationDuration: `${intervalMs}ms` }}
                  />
                )}
              </span>
            ))}
          </div>
          <span className={styles.count}>
            {String(cur + 1).padStart(2, "0")}
            <i>/</i>
            {String(n).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

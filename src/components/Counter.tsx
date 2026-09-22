"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Counter.module.css";

/**
 * Counts up any numeric portion of a string ("+52%", "1,500+", "$10M+"),
 * leaving prefixes and suffixes intact. Non-numeric values render as-is.
 */
export default function Counter({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\D*)([\d,.]+)(.*)$/s);
    const node = ref.current;
    if (!match || !node || typeof IntersectionObserver === "undefined") return;

    const [, prefix, rawNumber, suffix] = match;
    const decimals = (rawNumber.split(".")[1] || "").length;
    const hasComma = rawNumber.includes(",");
    const target = parseFloat(rawNumber.replace(/,/g, ""));
    if (!isFinite(target)) return;

    const reduced =
      typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      return hasComma ? Number(fixed).toLocaleString("en-US") : fixed;
    };

    setDisplay(`${prefix}${format(0)}${suffix}`);

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(`${prefix}${format(target * eased)}${suffix}`);
            if (p < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={styles.counter}>
      <span className={styles.ghost} aria-hidden="true">
        {value}
      </span>
      <span>{display}</span>
    </span>
  );
}

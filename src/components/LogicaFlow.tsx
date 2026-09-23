"use client";

import { useEffect, useRef } from "react";
import Icon, { type IconName } from "@/components/Icon";
import styles from "./LogicaFlow.module.css";

/*
 * The LogicaAI flow.
 *
 * One spine runs the length of the section and fills with brand orange as the
 * reader scrolls it, so the section reads as a single pipeline rather than four
 * stacked bands. Each station splits off the spine into its nodes and merges
 * back, and the whole thing is an hourglass: the platform and the customer's
 * data converge in, the results fan out, and they close on three outcomes.
 */

type Station = {
  n: string;
  label: string;
  title: string;
  caption: string;
  flow: "in" | "out";
  items: { name: string; icon: IconName; note?: string }[];
};

const STATIONS: Station[] = [
  {
    n: "01",
    label: "The platform",
    title: "Five modules, already assembled",
    caption:
      "Everything an agent needs to reach production is in one place. Nothing to evaluate, integrate or stitch together before you begin.",
    flow: "in",
    items: [
      { name: "Agent Development & Orchestration", icon: "layers" },
      { name: "Enterprise Knowledge Base", icon: "data" },
      { name: "MCP Integration", icon: "handover" },
      { name: "GuardRail Safety", icon: "shield" },
      { name: "Full Lifecycle Management", icon: "managed" },
    ],
  },
  {
    n: "02",
    label: "Your data goes in",
    title: "Just plug in your data",
    caption:
      "No migration project, no warehouse rebuild, no cleanup phase before the value starts. LogicaAI reads what you already keep, where you already keep it.",
    flow: "in",
    items: [
      { name: "Databases", icon: "data" },
      { name: "Documents & wikis", icon: "layers" },
      { name: "Spreadsheets", icon: "apps" },
      { name: "Sensors & IoT", icon: "iot" },
      { name: "Business systems", icon: "cloud" },
      { name: "Email & tickets", icon: "mail" },
    ],
  },
  {
    n: "03",
    label: "What comes out",
    title: "Low-hanging fruit first",
    caption:
      "We ship the pieces that pay for themselves early, so the business sees a working result in weeks — before it commits to the big build.",
    flow: "out",
    items: [
      { name: "Customer chatbot", icon: "ai" },
      { name: "Internal AI assistant", icon: "staff" },
      { name: "Document processing", icon: "layers" },
      { name: "Visual inspection", icon: "eye" },
      { name: "Forecasting & reporting", icon: "target" },
      { name: "Workflow automation", icon: "compass" },
    ],
  },
];

const OUTCOMES: { name: string; claim: string; icon: IconName }[] = [
  {
    name: "Efficiency up",
    claim: "Hours handed back to the people doing the work, not added to their queue.",
    icon: "clock",
  },
  {
    name: "Cost down",
    claim: "The same output without the headcount curve that used to come with it.",
    icon: "target",
  },
  {
    name: "Reach wider",
    claim: "Serve more customers, markets and hours with the operation you already run.",
    icon: "globe",
  },
];

export default function LogicaFlow() {
  const rootRef = useRef<HTMLDivElement>(null);

  /* Fill the spine from the scroll position. One element measured per frame,
     rAF-throttled, and the fill itself is a scaleY so it stays on the GPU. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduced =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.setProperty("--p", "1");
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const start = window.innerHeight * 0.82;
      const end = window.innerHeight * 0.3;
      const span = r.height + (start - end);
      const done = start - r.top;
      el.style.setProperty("--p", String(Math.min(1, Math.max(0, done / span))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Each station lights up its own nodes as it arrives, so the reader meets
     one idea at a time on the way down. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-step]");
    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((t) => t.classList.add(styles.in));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.in);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.flow} ref={rootRef}>
      <div className={styles.spine} aria-hidden="true">
        <span className={styles.spineFill} />
      </div>

      {STATIONS.map((s) => (
        <section className={styles.station} key={s.n} data-step>
          <div className={styles.chip}>
            <b>{s.n}</b>
            {s.label}
          </div>

          {/* Opaque: the spine runs behind this block, not through the words. */}
          <div className={styles.stationHead}>
            <h3 className={styles.stationTitle}>{s.title}</h3>
            <p className={styles.stationCaption}>{s.caption}</p>
          </div>

          <div className={styles.bus} aria-hidden="true" />

          <div
            className={styles.nodes}
            style={{ ["--cols" as string]: String(s.items.length) }}
          >
            {s.items.map((it, i) => (
              <div className={styles.node} key={it.name} style={{ ["--i" as string]: i }}>
                <span className={styles.nodeIcon}>
                  <Icon name={it.icon} size={20} />
                </span>
                <span className={styles.nodeName}>{it.name}</span>
              </div>
            ))}
          </div>

          <div className={`${styles.bus} ${styles.busMerge}`} aria-hidden="true" />

          {/* Which way the work is travelling through this station. */}
          <span className={styles.flowMark} aria-hidden="true">
            {s.flow === "in" ? "converges" : "fans out"}
          </span>
        </section>
      ))}

      <section className={`${styles.station} ${styles.outcomes}`} data-step>
        <div className={styles.chip}>
          <b>04</b>
          What it is worth
        </div>

        <div className={styles.stationHead}>
          <h3 className={styles.stationTitle}>Hours back. Cost down. Reach wider.</h3>
          <p className={styles.stationCaption}>
            The point was never the model. It is what the operation can do afterwards that it
            could not do before.
          </p>
        </div>

        <div className={styles.outcomeGrid}>
          {OUTCOMES.map((o, i) => (
            <div className={styles.outcome} key={o.name} style={{ ["--i" as string]: i }}>
              <span className={styles.outcomeIcon}>
                <Icon name={o.icon} size={22} />
              </span>
              <h4>{o.name}</h4>
              <p>{o.claim}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

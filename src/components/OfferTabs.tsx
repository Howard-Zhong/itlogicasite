"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import Icon, { type IconName } from "./Icon";
import Reveal from "./Reveal";
import type { Capability } from "@/data/capabilities";
import type { Service } from "@/data/services";
import styles from "./OfferTabs.module.css";

type Tab = "services" | "capabilities";

const COPY: Record<Tab, { label: string; title: string; lead: string; href: string; cta: string }> = {
  services: {
    label: "Services",
    title: "Four ways to engage us.",
    lead:
      "Whether you need a project delivered end-to-end, a team that becomes an extension of yours, or one specialist on your floor next month — the engagement model flexes, the delivery discipline does not.",
    href: "/services",
    cta: "All services",
  },
  capabilities: {
    label: "Capabilities",
    title: "Five things we go deep on.",
    lead:
      "Data and analytics platforms, AI and computer vision, cloud and DevOps, IoT and mobile, and the enterprise applications that tie them together. Whichever engagement model you pick, these are the specialists who build it.",
    href: "/capabilities",
    cta: "All capabilities",
  },
};

export default function OfferTabs({
  services,
  capabilities,
}: {
  services: Service[];
  capabilities: Capability[];
}) {
  const [tab, setTab] = useState<Tab>("services");
  const id = useId();
  const copy = COPY[tab];

  /*
   * Only the visible panel is in flow, so the deck has to be told how tall to
   * be — otherwise it would collapse mid-transition. Measured from the active
   * panel and kept in sync with resizes.
   */
  const deckRef = useRef<HTMLDivElement>(null);
  const [deckHeight, setDeckHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const measure = () => {
      const panel = deck.querySelector<HTMLElement>('[aria-hidden="false"]');
      if (panel) setDeckHeight(panel.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    deck.querySelectorAll('[role="tabpanel"]').forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [tab]);

  return (
    <>
      <div className={styles.head}>
        <div className={styles.headText}>
          <span className="eyebrow">Services &amp; Capabilities</span>
          <h2 className="h2">{copy.title}</h2>
          <p className="lead">{copy.lead}</p>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Services and capabilities">
          {(Object.keys(COPY) as Tab[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              id={`${id}-${key}-tab`}
              aria-selected={tab === key}
              aria-controls={`${id}-${key}`}
              className={`${styles.tab} ${tab === key ? styles.active : ""}`}
              onClick={() => setTab(key)}
            >
              {COPY[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.deck} ref={deckRef} style={{ height: deckHeight }}>
        <div
          role="tabpanel"
          id={`${id}-services`}
          aria-labelledby={`${id}-services-tab`}
          aria-hidden={tab !== "services"}
          className={styles.panel}
        >
          <div className="grid grid-4">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className="card"
                style={{ height: "100%" }}
                tabIndex={tab === "services" ? undefined : -1}
              >
                <span className="card-index">0{i + 1}</span>
                <span className="card-icon">
                  <Icon name={service.icon as IconName} size={26} />
                </span>
                <h3>{service.name}</h3>
                <p>{service.blurb}</p>
                <span className="link-arrow">
                  Explore
                  <Icon name="arrow" size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`${id}-capabilities`}
          aria-labelledby={`${id}-capabilities-tab`}
          aria-hidden={tab !== "capabilities"}
          className={styles.panel}
        >
          <div className="grid grid-3">
            {capabilities.map((cap) => (
              <Link
                key={cap.slug}
                href={`/capabilities#${cap.slug}`}
                className="card"
                style={{ height: "100%" }}
                tabIndex={tab === "capabilities" ? undefined : -1}
              >
                <span className="card-icon">
                  <Icon name={cap.icon as IconName} size={26} />
                </span>
                <h3>{cap.name}</h3>
                <p>{cap.blurb}</p>
                <div className="chips" style={{ marginTop: 16 }}>
                  {cap.stack.slice(0, 4).map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Reveal className={styles.foot}>
        <Link href={copy.href} className="link-arrow">
          {copy.cta}
          <Icon name="arrow" size={16} />
        </Link>
      </Reveal>
    </>
  );
}

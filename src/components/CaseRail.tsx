"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import type { CaseStudy } from "@/data/cases";
import styles from "./CaseRail.module.css";

/*
 * A horizontal rail of case studies driven by the mouse wheel.
 *
 * A vertical wheel gesture scrolls the rail sideways, but only while the rail
 * still has somewhere to go — at either end the event is left alone so the page
 * keeps scrolling and the reader is never trapped. Trackpads that already send
 * a horizontal delta are left to the browser.
 */
export default function CaseRail({ studies }: { studies: CaseStudy[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const next = el.scrollLeft + e.deltaY;
      // At either end, hand the gesture back to the page.
      if ((e.deltaY < 0 && el.scrollLeft <= 0) || (e.deltaY > 0 && el.scrollLeft >= max - 1)) {
        return;
      }
      e.preventDefault();
      el.scrollLeft = Math.max(0, Math.min(max, next));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.rail} ref={ref} tabIndex={0} aria-label="More case studies">
        {studies.map((study) => (
          <Link key={study.slug} href={`/cases/${study.slug}`} className={styles.card}>
            <span className={styles.media}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={study.image} alt="" loading="lazy" decoding="async" />
              <span className={styles.sector}>{study.sector}</span>
            </span>

            <span className={styles.body}>
              <span className={styles.headline}>
                <b>{study.headline.value}</b>
                {study.headline.label}
              </span>
              <h3>{study.title}</h3>
              <p>{study.summary}</p>
              <span className={styles.read}>
                Read case study
                <Icon name="arrow" size={15} />
              </span>
            </span>
          </Link>
        ))}
      </div>

      <span className={styles.hint} aria-hidden="true">
        Scroll to explore
        <Icon name="arrow" size={14} />
      </span>
    </div>
  );
}

"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { flowLayers, flowPromises } from "@/data/home";
import styles from "./LogicaFlow.module.css";

/*
 * The LogicaAI engagement, read left to right as five folding cards.
 *
 * Closed, a card carries only its step number and its two-word label, so the
 * whole story — you bring, we prepare, LogicaAI, you get, it pays back — reads
 * in one glance. Open, it widens in place and shows what that layer actually
 * contains. One card is open at a time and the first is open on load; opening
 * is a click, not a hover, so nothing moves as the pointer crosses the row.
 * Below 1000px the row becomes a stack.
 */
export default function LogicaFlow() {
  const [open, setOpen] = useState(0);

  return (
    <div className={styles.flow}>
      <div className={styles.promises}>
        {flowPromises.map((p) => (
          <span className={styles.promise} key={p}>
            <Icon name="check" size={15} />
            {p}
          </span>
        ))}
      </div>

      <div className={styles.layers}>
        {flowLayers.map((layer, i) => (
          <button
            type="button"
            key={layer.key}
            className={`${styles.layer} ${i === open ? styles.isOpen : ""}`}
            aria-expanded={i === open}
            onClick={() => setOpen(i)}
          >
            <span className={styles.head}>
              <span className={styles.step} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.kicker}>{layer.kicker}</span>
              <span className={styles.chevron} aria-hidden="true">
                <Icon name="arrow" size={16} />
              </span>
            </span>

            <span className={styles.body}>
              <span className={styles.bodyInner}>
                <span className={styles.layerTitle}>{layer.title}</span>
                <span className={styles.layerNote}>{layer.note}</span>

                <span className={styles.items}>
                  {layer.items.map((it) => (
                    <span className={styles.item} key={it.name}>
                      <Icon name={it.icon} size={17} />
                      {it.name}
                    </span>
                  ))}
                </span>
              </span>
            </span>

            <span className={styles.tap} aria-hidden="true">
              Click to open
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

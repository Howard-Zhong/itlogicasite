"use client";

import { useState } from "react";
import Icon from "./Icon";
import LogicaArt from "./LogicaArt";
import { logicaCapabilities } from "@/data/logicaai";
import styles from "./LogicaPanels.module.css";

export default function LogicaPanels() {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Desktop: horizontally expanding panels */}
      <div className={styles.rowWrap}>
        {logicaCapabilities.map((cap, i) => {
          const open = active === i;
          return (
            <button
              key={cap.slug}
              type="button"
              aria-expanded={open}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`${styles.panel} ${open ? styles.open : ""}`}
            >
              <span className={styles.art}>
                <LogicaArt variant={cap.art} />
              </span>
              <span className={styles.scrim} />

              <span className={styles.collapsed}>
                <span className={styles.num}>0{i + 1}</span>
                <span className={styles.vertical}>{cap.name}</span>
                <span className={styles.plus}>
                  <Icon name="plus" size={16} />
                </span>
              </span>

              <span className={styles.expanded}>
                <span className={styles.num}>0{i + 1}</span>
                <span className={styles.kicker}>{cap.kicker}</span>
                <h4>{cap.name}</h4>
                <p>{cap.blurb}</p>
              </span>
            </button>
          );
        })}
      </div>

      {/* Below the large breakpoint the same content stacks as an accordion */}
      <div className={styles.stack}>
        {logicaCapabilities.map((cap, i) => {
          const open = active === i;
          return (
            <div key={cap.slug} className={`${styles.item} ${open ? styles.itemOpen : ""}`}>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setActive(open ? -1 : i)}
                className={styles.itemHead}
              >
                <span className={styles.itemTitle}>
                  <span className={styles.num}>0{i + 1}</span>
                  <span>{cap.name}</span>
                </span>
                <span className={styles.itemPlus}>
                  <Icon name="plus" size={16} />
                </span>
              </button>
              <div className={styles.itemBody}>
                <div className={styles.itemBodyInner}>
                  <div>
                    <span className={styles.itemArt}>
                      <LogicaArt variant={cap.art} />
                    </span>
                    <p>{cap.blurb}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

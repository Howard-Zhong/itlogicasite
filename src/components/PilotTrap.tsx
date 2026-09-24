import { pilotTrap } from "@/data/home";
import styles from "./PilotTrap.module.css";

/*
 * Three questions, each with its answer. Everything is on screen at once —
 * no hover, no state, nothing to discover — so this is a plain server
 * component and the three cards read as one block.
 */
export default function PilotTrap() {
  return (
    <div className={styles.grid}>
      {pilotTrap.map((item) => (
        <article className={styles.card} key={item.q}>
          <h3 className={styles.q}>{item.q}</h3>
          <p className={styles.stat}>{item.stat}</p>
          <p className={styles.statLabel}>{item.statLabel}</p>
          <p className={styles.a}>{item.a}</p>
        </article>
      ))}
    </div>
  );
}

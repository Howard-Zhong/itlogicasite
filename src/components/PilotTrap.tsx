import { pilotTrap } from "@/data/home";
import styles from "./PilotTrap.module.css";

/*
 * Three industry figures. Each card is the figure, what it means, and where
 * it came from — nothing else, so the number carries the card.
 */
export default function PilotTrap() {
  return (
    <div className={styles.grid}>
      {pilotTrap.map((item) => (
        <figure className={styles.card} key={item.source}>
          <p className={styles.stat}>{item.stat}</p>
          <p className={styles.fact}>{item.fact}</p>
          <figcaption className={styles.source}>{item.source}</figcaption>
        </figure>
      ))}
    </div>
  );
}

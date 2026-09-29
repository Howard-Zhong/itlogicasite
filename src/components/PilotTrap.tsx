import { pilotTrap } from "@/data/home";
import styles from "./PilotTrap.module.css";

/*
 * Three answers to the question the section asks.
 *
 * Reading order inside a card is answer, explanation, then the industry
 * figure as evidence with its source — the figure sits behind a rule so it
 * cannot be mistaken for the answer, which is what happened when it sat
 * between the two.
 */
export default function PilotTrap() {
  return (
    <div className={styles.grid}>
      {pilotTrap.map((item, i) => (
        <article className={styles.card} key={item.answer}>
          <span className={styles.num} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.answer}>{item.answer}</h3>
          <p className={styles.body}>{item.body}</p>

          <figure className={styles.evidence}>
            <p className={styles.fact}>
              <b>{item.stat}</b>
              {item.fact}
            </p>
            <figcaption className={styles.source}>Source: {item.source}</figcaption>
          </figure>
        </article>
      ))}
    </div>
  );
}

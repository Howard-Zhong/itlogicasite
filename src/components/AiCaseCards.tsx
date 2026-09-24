import AiCaseArt from "@/components/AiCaseArt";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { aiCases } from "@/data/home";
import styles from "./CaseRail.module.css";

/*
 * The three LogicaAI agents, as cards.
 *
 * They deliberately share CaseRail's stylesheet rather than carrying their own:
 * these sit directly above the case-study rail, and two near-identical card
 * designs in two files is exactly how they drift apart. The only difference is
 * the media slot — drawn artwork here, a photograph there.
 */
export default function AiCaseCards({ href }: { href: string }) {
  return (
    <div className={styles.grid}>
      {aiCases.map((c, i) => (
        <Reveal key={c.title} delay={i * 80}>
          <a
            className={styles.card}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className={`${styles.media} ${styles.mediaArt}`}>
              <AiCaseArt variant={c.art} />
              <span className={styles.sector}>{c.sector}</span>
            </span>

            <span className={styles.body}>
              <span className={styles.headline}>
                <b>{c.headline.value}</b>
                {c.headline.label}
              </span>
              <h3>{c.title}</h3>
              <p>{c.blurb}</p>
              <span className={styles.read}>
                See it on LogicaAI
                <Icon name="arrow" size={15} />
              </span>
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

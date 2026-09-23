import Link from "next/link";
import Icon from "./Icon";
import type { CaseStudy } from "@/data/cases";
import styles from "./CaseCard.module.css";

export default function CaseCard({
  study,
  featured = false,
}: {
  study: CaseStudy;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/cases/${study.slug}`}
      className={`${styles.card} ${featured ? styles.featured : ""}`}
    >
      <div className={styles.media}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={study.image} alt="" loading="lazy" decoding="async" />
        <span className={styles.sector}>{study.sector}</span>
        <span className={styles.headline}>
          <span className={styles.headlineValue}>{study.headline.value}</span>
          <span className={styles.headlineLabel}>{study.headline.label}</span>
        </span>
      </div>

      <div className={styles.body}>
        <span className={styles.client}>{study.client}</span>
        <h3 className={styles.title}>{study.title}</h3>
        <p className={styles.summary}>{study.summary}</p>
        {featured && (
          <div className="chips" style={{ marginTop: 4 }}>
            {study.tags.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>
        )}
        <span className={styles.foot}>
          <span className={styles.year}>{study.year}</span>
          <span className={styles.read}>
            Read case study
            <Icon name="arrow" size={15} />
          </span>
        </span>
      </div>
    </Link>
  );
}

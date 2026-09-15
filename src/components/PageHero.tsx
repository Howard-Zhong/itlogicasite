import Link from "next/link";
import type { ReactNode } from "react";
import ParticleField from "./ParticleField";
import styles from "./PageHero.module.css";

export default function PageHero({
  eyebrow,
  title,
  lead,
  aside,
  tone = "dark",
  particles = false,
  crumbs,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  tone?: "dark" | "light";
  particles?: boolean;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className={`${styles.hero} ${tone === "dark" ? styles.dark : styles.light} noise`}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      {particles && (
        <ParticleField
          className={styles.canvas}
          density={0.00008}
          color={tone === "dark" ? "255, 255, 255" : "31, 33, 33"}
        />
      )}

      <div className="container">
        {crumbs && (
          <p className={styles.crumb}>
            {crumbs.map((c, i) => (
              <span key={c.label} style={{ display: "inline-flex", gap: 8 }}>
                {i > 0 && <span aria-hidden="true">/</span>}
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
              </span>
            ))}
          </p>
        )}

        <div className={styles.inner}>
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h1 className={styles.title}>{title}</h1>
          </div>
          <div>
            {lead && <p className="lead">{lead}</p>}
            {aside}
          </div>
        </div>
      </div>
    </section>
  );
}

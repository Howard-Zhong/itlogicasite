import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { capabilities } from "@/data/capabilities";
import { industries } from "@/data/industries";
import styles from "../inner.module.css";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Artificial Intelligence, Data Analytics, Cloud, IoT and Mobile & Web Development — the technology ITLogica builds enterprise systems with.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title={
          <>
            Five pillars.
            <br />
            Built in production,
            <br />
            not in slideware.
          </>
        }
        lead="Every capability listed here is running inside a client's operation right now — a benchmarking database the U.S. cattle industry depends on, vision models on farm cameras, carbon accounting wired into a global marketplace. That is the only qualification we recognise."
        particles
        crumbs={[{ label: "Home", href: "/" }, { label: "Capabilities" }]}
      />

      <section className="section">
        <div className="container">
          <div className={styles.split}>
            <div className={styles.sticky}>
              <span className="eyebrow">Overview</span>
              <h2 className="h3" style={{ margin: "14px 0 24px" }}>
                What we go deep on
              </h2>
              <nav className={styles.tocNav} aria-label="Capabilities">
                {capabilities.map((c) => (
                  <a className={styles.tocLink} href={`#${c.slug}`} key={c.slug}>
                    {c.name}
                  </a>
                ))}
              </nav>
              <Link href="/cases" className="btn btn-sm btn-ghost" style={{ marginTop: 26 }}>
                See it applied
                <Icon name="arrow" size={15} />
              </Link>
            </div>

            <div>
              {capabilities.map((cap, i) => (
                <Reveal key={cap.slug} as="article" id={cap.slug} className={styles.entry}>
                  <span className={styles.mark}>
                    <Icon name={cap.icon as IconName} size={28} />
                  </span>
                  <p className={styles.entryNum}>0{i + 1}</p>
                  <h2 className={styles.entryTitle}>{cap.name}</h2>
                  <p className={styles.entryKicker}>{cap.kicker}</p>
                  <div className={styles.entryBody}>
                    <p>{cap.blurb}</p>
                  </div>
                  <ul className={styles.featureList}>
                    {cap.detail.map((d) => (
                      <li key={d}>
                        <Icon name="check" size={17} />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="chips" style={{ marginTop: 26 }}>
                    {cap.stack.map((s) => (
                      <span className="chip chip-accent" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries now live on their own page — this is the hand-off to it. */}
      <section className="section skin-dark noise">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Industries</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                The same five pillars,
                <br />
                six sectors of judgement.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                Technology transfers between industries. Judgement does not. The Industries page
                breaks down each sector we know from the inside — what we build there, who we have
                built it for, and the case studies behind it.
              </p>
              <div className="chips" style={{ marginTop: 24 }}>
                {industries.map((ind) => (
                  <Link href={`/industries#${ind.slug}`} className="chip chip-accent" key={ind.slug}>
                    {ind.name}
                  </Link>
                ))}
              </div>
              <Link href="/industries" className="btn" style={{ marginTop: 26 }}>
                Explore industries
                <Icon name="arrow" size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

    </>
  );
}

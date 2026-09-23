import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { cases, getCase } from "@/data/cases";
import styles from "../../inner.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) return { title: "Case study not found" };
  return {
    title: study.title,
    description: study.summary,
  };
}

export default async function CaseDetailPage({ params }: Params) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) notFound();

  const index = cases.findIndex((c) => c.slug === slug);
  const prev = index > 0 ? cases[index - 1] : cases[cases.length - 1];
  const next = index < cases.length - 1 ? cases[index + 1] : cases[0];

  return (
    <>
      <PageHero
        eyebrow={study.sector}
        title={study.title}
        lead={study.summary}
        aside={
          <div style={{ marginTop: 24 }}>
            <p className="stat-value" style={{ color: "var(--orange-bright)" }}>
              <Counter value={study.headline.value} />
            </p>
            <p className="stat-label" style={{ maxWidth: "28ch" }}>
              {study.headline.label}
            </p>
            <div className="chips" style={{ marginTop: 22 }}>
              {study.tags.map((t) => (
                <span className="chip" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        }
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/cases" },
          { label: study.client },
        ]}
      />

      <div className={styles.caseArtBand}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={study.image} alt="" />
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.split}>
            <div className={styles.sticky}>
              <span className="eyebrow">In this case study</span>
              <nav className={styles.tocNav} aria-label="Sections" style={{ marginTop: 18 }}>
                <a className={styles.tocLink} href="#challenge">
                  Challenge
                </a>
                <a className={styles.tocLink} href="#solution">
                  Solution
                </a>
                <a className={styles.tocLink} href="#result">
                  Result
                </a>
                <a className={styles.tocLink} href="#takeaway">
                  Key Takeaway
                </a>
              </nav>

              <dl className={styles.facts} style={{ marginTop: 30 }}>
                <div className={styles.fact} style={{ gridTemplateColumns: "110px 1fr" }}>
                  <dt>Client</dt>
                  <dd>{study.client}</dd>
                </div>
                <div className={styles.fact} style={{ gridTemplateColumns: "110px 1fr" }}>
                  <dt>Sector</dt>
                  <dd>{study.sector}</dd>
                </div>
                <div className={styles.fact} style={{ gridTemplateColumns: "110px 1fr" }}>
                  <dt>Timeline</dt>
                  <dd>{study.year}</dd>
                </div>
              </dl>

              <Link href="/contact" className="btn btn-sm" style={{ marginTop: 26 }}>
                Start something similar
                <Icon name="arrow" size={15} />
              </Link>
            </div>

            <div>
              {/* Challenge */}
              <Reveal as="section" id="challenge" className={`${styles.entry} ${styles.caseBlock}`}>
                <p className={styles.blockLabel}>
                  <b>01</b> Challenge
                </p>
                <h2 className={styles.blockTitle}>What we were handed</h2>
                <p className="lead" style={{ maxWidth: "70ch" }}>
                  {study.challenge}
                </p>
              </Reveal>

              {/* Solution */}
              <Reveal as="section" id="solution" className={`${styles.entry} ${styles.caseBlock}`}>
                <p className={styles.blockLabel}>
                  <b>02</b> Solution
                </p>
                <h2 className={styles.blockTitle}>What we built</h2>
                {study.solutionIntro && (
                  <p className="lead" style={{ maxWidth: "70ch", marginBottom: 28 }}>
                    {study.solutionIntro}
                  </p>
                )}
                <ul className={styles.bulletList}>
                  {study.solution.map((s, i) => (
                    <li key={s}>
                      <span className={styles.bulletNum}>{String(i + 1).padStart(2, "0")}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Result */}
              <Reveal as="section" id="result" className={`${styles.entry} ${styles.caseBlock}`}>
                <p className={styles.blockLabel}>
                  <b>03</b> Result
                </p>
                <h2 className={styles.blockTitle}>What changed</h2>

                {study.resultStats && (
                  <div className={styles.statStrip} style={{ marginBottom: 30 }}>
                    {study.resultStats.map((s) => (
                      <div className={styles.statCell} key={s.label}>
                        <p
                          className="stat-value"
                          style={{ fontSize: "clamp(1.6rem,2.8vw,2.3rem)", color: "var(--orange)" }}
                        >
                          <Counter value={s.value} />
                        </p>
                        <p className="stat-label">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                <ul className={styles.featureList}>
                  {study.result.map((r) => (
                    <li key={r}>
                      <Icon name="check" size={17} />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Takeaway */}
              <Reveal as="section" id="takeaway" className={`${styles.entry} ${styles.caseBlock}`}>
                <p className={styles.blockLabel}>
                  <b>04</b> Key Takeaway
                </p>
                <div className={styles.takeaway}>
                  <span className={styles.takeawayMark} aria-hidden="true">
                    &ldquo;
                  </span>
                  <q>{study.takeaway}</q>
                </div>
              </Reveal>

              <nav className={styles.caseNav} aria-label="More case studies">
                <Link href={`/cases/${prev.slug}`} className={styles.caseNavItem}>
                  <span>← Previous</span>
                  <strong>{prev.title}</strong>
                </Link>
                <Link
                  href={`/cases/${next.slug}`}
                  className={styles.caseNavItem}
                  style={{ textAlign: "right" }}
                >
                  <span>Next →</span>
                  <strong>{next.title}</strong>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

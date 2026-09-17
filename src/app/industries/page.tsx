import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { capabilities } from "@/data/capabilities";
import { cases } from "@/data/cases";
import { industries } from "@/data/industries";
import styles from "../inner.module.css";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "The sectors ITLogica knows from the inside — animal health, agribusiness, health and veterinary, utilities, retail and cross-industry enterprise work.",
};

const capabilityName = (slug: string) =>
  capabilities.find((c) => c.slug === slug)?.name ?? slug;

const caseFor = (slug: string) => cases.find((c) => c.slug === slug);

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Where the domain
            <br />
            knowledge lives.
          </>
        }
        lead="Technology transfers between industries. Judgement does not. These are the sectors where we arrive already understanding the business problem — what the data means, what the season looks like, and what breaks when the system is wrong."
        particles
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />

      {/* ------------------------------------------------------------- Detail */}
      <section className="section">
        <div className="container">
          <div className={styles.split}>
            <div className={styles.sticky}>
              <span className="eyebrow">Sectors</span>
              <h2 className="h3" style={{ margin: "14px 0 24px" }}>
                Six sectors we know
                <br />
                from the inside
              </h2>
              <nav className={styles.tocNav} aria-label="Industries">
                {industries.map((ind) => (
                  <a className={styles.tocLink} href={`#${ind.slug}`} key={ind.slug}>
                    {ind.name}
                  </a>
                ))}
              </nav>
              <Link href="/contact" className="btn btn-sm btn-ghost" style={{ marginTop: 26 }}>
                Talk to an engineer
                <Icon name="arrow" size={15} />
              </Link>
            </div>

            <div>
              {industries.map((ind, i) => (
                <Reveal key={ind.slug} as="article" id={ind.slug} className={styles.entry}>
                  <span className={styles.mark}>
                    <Icon name={ind.icon as IconName} size={28} />
                  </span>
                  <p className={styles.entryNum}>0{i + 1}</p>
                  <h2 className={styles.entryTitle}>{ind.name}</h2>
                  <p className={styles.entryKicker}>{ind.kicker}</p>

                  <div className={styles.entryArt}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ind.image} alt="" loading="lazy" decoding="async" />
                  </div>

                  <div className={styles.entryBody}>
                    <p>{ind.blurb}</p>
                  </div>

                  <ul className={styles.featureList}>
                    {ind.focus.map((f) => (
                      <li key={f}>
                        <Icon name="check" size={17} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="chips" style={{ marginTop: 26 }}>
                    {ind.capabilities.map((slug) => (
                      <Link href={`/capabilities#${slug}`} className="chip chip-accent" key={slug}>
                        {capabilityName(slug)}
                      </Link>
                    ))}
                  </div>

                  {ind.clients && ind.clients.length > 0 && (
                    <p className={styles.industryClients}>
                      <span>Worked with</span> {ind.clients.join(" · ")}
                    </p>
                  )}

                  {ind.cases.length > 0 && (
                    <div className={styles.industryCases}>
                      {ind.cases.map((slug) => {
                        const study = caseFor(slug);
                        if (!study) return null;
                        return (
                          <Link
                            href={`/cases/${study.slug}`}
                            key={slug}
                            className={styles.industryCase}
                          >
                            <span>{study.sector}</span>
                            <strong>{study.title}</strong>
                            <Icon name="arrow" size={15} />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- CTA */}
      <section className="section skin-dark noise">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Not on the list?</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                The pattern is usually
                <br />
                the same underneath.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                Complex operational data, systems nobody can afford to switch off, and a decision
                that has to be right the first time. Tell us the problem and we will tell you
                honestly whether we are the right team for it.
              </p>
              <div className="chips" style={{ marginTop: 26 }}>
                <Link href="/contact" className="btn">
                  Talk to an engineer
                  <Icon name="arrow" size={16} />
                </Link>
                <Link href="/cases" className="btn btn-ghost">
                  See the work
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

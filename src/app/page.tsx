import Link from "next/link";
import AiCaseCards from "@/components/AiCaseCards";
import CaseRail from "@/components/CaseRail";
import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import LogicaFlow from "@/components/LogicaFlow";
import Marquee from "@/components/Marquee";
import PilotTrap from "@/components/PilotTrap";
import Reveal from "@/components/Reveal";
import WordReel from "@/components/WordReel";
import { cases } from "@/data/cases";
import { industries } from "@/data/industries";
import { certifications, clients, keyStats } from "@/data/company";
import { otherServices, whyItl, whyItlProof } from "@/data/home";
import { site } from "@/data/site";

import styles from "./home.module.css";

/* The ring names the industries we work in, not the technologies we know:
   the reader cares whether we understand their business. */
const industryWords = industries.map((i) => i.name);

/* The rail carries everything except the case the AI section already showed. */
const railCases = cases.filter((c) => c.slug !== "intelligent-path-planning-shopping-malls");

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          {/* Claim on the left, the industry ring on the right. */}
          <div className={styles.heroSplit}>
            <div className={styles.heroText}>
              <p className={styles.heroBadge}>
                <b>Since 2002</b>
                Atlanta, Georgia
              </p>

              <h1 className={styles.heroTitle}>
                <span>
                  <i>Enterprise AI that makes it</i>
                </span>
                <span>
                  <i className={styles.heroAccent}>out of pilot</i>
                </span>
              </h1>

              <p className={styles.heroLead}>
                Most never do. Ours pay back from the first use case &mdash; because for 20 years
                we&rsquo;ve built the data foundations they stand on. Grounded in your data,
                governed by your rules, and handed to your team to own.
              </p>

              <div className={styles.heroCtas}>
                <Link href="/contact" className="btn">
                  Book a 30-min AI readiness review
                  <Icon name="arrow" size={16} />
                </Link>
                <Link href="/cases" className="btn btn-ghost">
                  See Our Work
                </Link>
              </div>
            </div>

            <div className={styles.heroArt}>
              <WordReel className={styles.heroWords} words={industryWords} intervalMs={3600} />
            </div>
          </div>

          <div className={styles.heroStats}>
            {keyStats.map((s) => (
              <div key={s.label}>
                <p className="stat-value">
                  <Counter value={s.value} />
                </p>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          <p className={styles.heroTrust}>
            Trusted by enterprise leaders across industries &mdash; several for more than a
            decade
          </p>
        </div>

        {/* The proof the reader wants first: who already trusts us. */}
        <Marquee duration={52} className={styles.heroLogos}>
          <div className={styles.logoRow}>
            {clients.map((c) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={c.file} src={`/clients/${c.file}`} alt={c.name} loading="lazy" />
            ))}
          </div>
        </Marquee>

        <span className={styles.scrollHint}>
          Scroll
          <Icon name="arrow-down" size={15} />
        </span>
      </section>

      {/* ------------------------------------------------------- The pilot trap */}
      <section className="section skin-black">
        <div className="container">
          <div className={styles.trapHead}>
            <Reveal>
              <h2 className="h2">
                Why is AI hard to start
                <br />
                &mdash; and harder to finish?
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="lead">
                Almost never because of the model. Three reasons come up every time &mdash; and
                they are all the same reason underneath.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <PilotTrap />
          </Reveal>

          {/* The section asked a question; this is the answer to it. */}
          <Reveal delay={160}>
            <p className={styles.trapAnswer}>
              Notice what is missing from all three: the model. These are foundation problems
              &mdash; integration, data, measurement &mdash; which is exactly the work we have
              been doing for twenty years.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Why ITLogica */}
      <section className="section skin-mute">
        <div className="container">
          <div className={styles.centerHead}>
            <Reveal>
              <span className="eyebrow">Why ITLogica</span>
              <h2 className="h2">
                We didn&rsquo;t arrive with the AI wave.
                <br />
                We built what it stands on.
              </h2>
            </Reveal>
          </div>

          {/* Three bands on one grid — the answer, the record, the way we work.
              Every band shares the same label column, so their content edges
              line up down the whole section. No boxes: the rules do the work. */}
          <div className={styles.bands}>
            <Reveal className={styles.band}>
              <p className={styles.bandLabel}>The answer</p>
              <div className={styles.answerRow}>
                {whyItl.map((w, i) => (
                  <div className={styles.answer} key={w.t}>
                    <span className={styles.answerNum} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3>{w.t}</h3>
                    <p>{w.b}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80} className={styles.band}>
              <p className={styles.bandLabel}>The record</p>
              <div className={styles.proofRow}>
                {whyItlProof.map((p) => (
                  <div key={p.label}>
                    <p className="stat-value">{p.value}</p>
                    <p className="stat-label">{p.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- LogicaAI */}
      <section className="section">
        <div className="container">
          <div className={styles.centerHead}>
            <Reveal>
              <span className="eyebrow">Our AI platform</span>
              <h2 className="h2">
                LogicaAI &mdash; the platform that
                <br />
                carries AI into production.
              </h2>
              <p className="lead">
                Not a methodology and not a services wrapper: the agents, the knowledge base,
                the guardrails and the monitoring all live in one place. Five steps &mdash; open
                any one of them.
              </p>
            </Reveal>
          </div>

          <LogicaFlow />

          <Reveal>
            <div className={styles.centerCta}>
              <a className="btn" href={site.aiSiteUrl} target="_blank" rel="noreferrer noopener">
                Explore LogicaAI
                <Icon name="arrow" size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- AI case studies */}
      <section className="section skin-mute">
        <div className="container">
          <div className={styles.centerHead}>
            <Reveal>
              <span className="eyebrow">AI in production</span>
              <h2 className="h2">Agents already doing the work.</h2>
            </Reveal>
          </div>

          <AiCaseCards href={site.aiSiteUrl} />
        </div>
      </section>

      {/* -------------------------------------------------------- Other services */}
      <section className="section">
        <div className="container">
          <div className={styles.centerHead}>
            <Reveal>
              <span className="eyebrow">Need more than AI?</span>
              <h2 className="h2">AI is what we lead with, not all we do.</h2>
              <p className="lead">
                Data platforms, cloud, connected devices and applications &mdash; the same
                team, the same delivery record.
              </p>
            </Reveal>
          </div>

          <div className={styles.serviceGrid}>
            {otherServices.map((s, i) => (
              <Reveal key={s.name} delay={i * 70}>
                <Link href={s.href} className={styles.service}>
                  <span className={styles.serviceIcon}>
                    <Icon name={s.icon} size={20} />
                  </span>
                  <h3>{s.name}</h3>
                  <p>{s.blurb}</p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className={styles.teamLine}>
              Need a team rather than a project? We also work as{" "}
              <Link href="/services">
                managed services, staff augmentation, or an embedded delivery team
                <Icon name="arrow" size={15} />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ More case studies */}
      <section className="section skin-mute">
        <div className="container">
          <div className={styles.railHead}>
            <Reveal>
              <span className="eyebrow">Proof, measured in outcomes</span>
              <h2 className="h2">Programs still running years later.</h2>
            </Reveal>
            <Reveal delay={90}>
              <Link href="/cases" className="btn btn-ghost">
                All case studies
                <Icon name="arrow" size={16} />
              </Link>
            </Reveal>
          </div>

          <CaseRail studies={railCases} />
        </div>
      </section>

      {/* ------------------------------------------------------- Certifications */}
      <section className="section" id="certifications">
        <div className="container">
          <div className={styles.centerHead}>
            <Reveal>
              <span className="eyebrow">Certifications</span>
              <h2 className="h2">Qualifications behind the track record.</h2>
            </Reveal>
          </div>

          <div className={styles.certGrid}>
            {certifications.map((cert, i) => (
              <Reveal key={cert.name} delay={i * 50} className={styles.cert}>
                {/* Decorative: the name sits right below it in text. */}
                <img
                  className={styles.certLogo}
                  src={cert.logo}
                  alt=""
                  width={300}
                  height={110}
                  loading="lazy"
                  decoding="async"
                />
                <strong>{cert.name}</strong>
                <span>{cert.detail}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

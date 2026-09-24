import Link from "next/link";
import AiCaseCards from "@/components/AiCaseCards";
import CaseRail from "@/components/CaseRail";
import Counter from "@/components/Counter";
import Icon, { type IconName } from "@/components/Icon";
import LogicaFlow from "@/components/LogicaFlow";
import Marquee from "@/components/Marquee";
import PilotTrap from "@/components/PilotTrap";
import Reveal from "@/components/Reveal";
import WordReel from "@/components/WordReel";
import { cases } from "@/data/cases";
import { certifications, clients, keyStats, values } from "@/data/company";
import { otherServices, whyItl, whyItlProof } from "@/data/home";
import { site } from "@/data/site";

import styles from "./home.module.css";

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
          <p className={styles.heroBadge}>
            <b>Since 2002</b>
            Atlanta, Georgia
          </p>

          {/* The orbit is the hero. The headline rides in the middle of it. */}
          <WordReel className={styles.heroWords}>
            <h1 className={styles.heroTitle}>
              <span>
                <i>We are an AI-first</i>
              </span>
              <span>
                <i className={styles.heroAccent}>software services provider</i>
              </span>
            </h1>
          </WordReel>

          <div className={styles.heroFoot}>
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

            <p className={styles.heroLead}>
              For 20 years we&rsquo;ve built the data and technology foundations enterprises run
              on. That&rsquo;s why we know how to build the AI on top: grounded in your data,
              governed by your rules, integrated with your systems, and handed to your team to
              own.
            </p>

            <div className={styles.heroCtas}>
              <Link href="/contact" className="btn">
                Book a Consultation
                <Icon name="arrow" size={16} />
              </Link>
              <Link href="/cases" className="btn btn-ghost">
                See Our Work
              </Link>
            </div>
          </div>
        </div>

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
                A proof of concept that impresses in the demo collapses the moment it meets real
                operational data. Three questions come up every time.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <PilotTrap />
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

            <Reveal delay={140} className={styles.band}>
              <p className={styles.bandLabel}>How we work</p>
              <div className={styles.valueRow}>
                {values.map((value) => (
                  <div className={styles.value} key={value.title}>
                    <h3>
                      <span className={styles.valueMark}>
                        <Icon name={value.icon as IconName} size={19} />
                      </span>
                      {value.title}
                    </h3>
                    <p>{value.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={60}>
            <p className={styles.trustLine}>
              Trusted by enterprise leaders across industries &mdash; several for more than a
              decade
            </p>
          </Reveal>
        </div>

        <Marquee duration={52} className={styles.logoBand}>
          <div className={styles.logoRow}>
            {clients.map((c) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={c.file} src={`/clients/${c.file}`} alt={c.name} loading="lazy" />
            ))}
          </div>
        </Marquee>
      </section>

      {/* ------------------------------------------------------------- LogicaAI */}
      <section className="section">
        <div className="container">
          <div className={styles.centerHead}>
            <Reveal>
              <span className="eyebrow">Our AI practice</span>
              <h2 className="h2">
                Meet LogicaAI &mdash; how we build
                <br />
                AI that reaches production.
              </h2>
              <p className="lead">
                Start with your highest-value use case, prove it on your data, build only what
                earns its place. Five steps &mdash; open any one of them.
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
              <h2 className="h2">We build the rest of it too.</h2>
              <p className="lead">
                AI is what we lead with, not all we do &mdash; data, cloud, connected devices
                and applications, from the same team.
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

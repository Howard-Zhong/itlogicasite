import Link from "next/link";
import CaseCard from "@/components/CaseCard";
import Counter from "@/components/Counter";
import Icon, { type IconName } from "@/components/Icon";
import Marquee from "@/components/Marquee";
import LogicaPanels from "@/components/LogicaPanels";
import OfferTabs from "@/components/OfferTabs";
import Reveal from "@/components/Reveal";
import WordReel from "@/components/WordReel";
import { cases } from "@/data/cases";
import { capabilities } from "@/data/capabilities";
import { certifications, clients, values } from "@/data/company";
import { startPaths, startPromise } from "@/data/logicaai";
import { services } from "@/data/services";
import { site } from "@/data/site";
import styles from "./home.module.css";

const heroStats = [
  { value: "20+", label: "Years delivering" },
  { value: "500+", label: "Projects delivered" },
  { value: "100%", label: "On time, on budget" },
];


export default function HomePage() {
  const [featured, ...rest] = cases;

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          {/* Badge, title and reel are siblings of one grid so the reel can be
              centred on the title alone rather than on badge + title. */}
          <div className={styles.heroTop}>
            <p className={styles.heroBadge}>
              <b>Since 2002</b>
              Atlanta · Nanjing
            </p>

            <h1 className={styles.heroTitle}>
              <span>
                <i>Pragmatic AI.</i>
              </span>
              <span>
                <i className={styles.heroAccent}>Proven Delivery</i>
              </span>
            </h1>

            <div className={styles.heroWordsWrap} aria-hidden="true">
              <WordReel className={styles.heroWords} />
            </div>
          </div>

          <div className={styles.heroFoot}>
            <div className={styles.heroFootText}>
              <p className={styles.heroLead}>
                20+ years, always on time, always on budget — now with AI at the core of how we
                build.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/cases" className="btn">
                  See what we&rsquo;ve built
                  <Icon name="arrow" size={16} />
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  Talk to an engineer
                </Link>
              </div>
            </div>

            <div className={styles.heroStats}>
              {heroStats.map((s) => (
                <div key={s.label}>
                  <p className="stat-value">
                    <Counter value={s.value} />
                  </p>
                  <p className="stat-label">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <span className={styles.scrollHint}>
          Scroll
          <Icon name="arrow-down" size={15} />
        </span>
      </section>

      {/* ----------------------------------------------------------- Customers */}
      <section className={styles.customers}>
        <div className="container">
          <div className={styles.customersHead}>
            <span className="eyebrow">A Global Player Trusted by:</span>
          </div>
        </div>
        <Marquee duration={52}>
          <div className={styles.logoRow}>
            {clients.map((c) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={c.file} src={`/clients/${c.file}`} alt={c.name} loading="lazy" />
            ))}
          </div>
        </Marquee>
      </section>

      {/* ----------------------------------------------------- Certifications */}
      <section className="section-tight">
        <div className="container">
          <div className={styles.certHead}>
            <Reveal>
              <span className="eyebrow">Certifications</span>
              <h2 className="h3" style={{ marginTop: 14 }}>
                Qualifications behind the track record
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p>
                Repeatable process is what makes two decades of on-time delivery possible — and what
                lets a Fortune 500 procurement team say yes.
              </p>
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

      {/* ------------------------------------------------------------ LogicaAI */}
      <section className={`section skin-mute ${styles.logica}`}>
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow" style={{ textTransform: "none", letterSpacing: "0.02em" }}>
                LogicaAI
              </span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Quick to start.
                <br />
                Easy to use.
              </h2>
              <p className="lead" style={{ marginTop: 22 }}>
                LogicaAI is the platform we use to put agents into production without a twelve-month
                programme in front of it. Plug in the data you already have, go after the
                low-hanging fruit first, and let the business see a working result before it
                commits to the big build.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <div className={styles.logicaPoints}>
                {[
                  "Just plug in your data — no migration project first",
                  "Low-hanging fruit first, so value shows up early",
                  "Visual composition, not a framework to learn",
                  "Production-grade from the pilot, not after it",
                ].map((point) => (
                  <p key={point}>
                    <Icon name="check" size={17} />
                    <span>{point}</span>
                  </p>
                ))}
              </div>
              <div className={styles.heroCtas}>
                <a className="btn" href={site.aiSiteUrl} target="_blank" rel="noreferrer noopener">
                  Visit the LogicaAI site
                  <Icon name="arrow" size={16} />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className={styles.railHead}>
              <h3>
                The stack behind <span style={{ color: "var(--orange)" }}>LogicaAI</span>
              </h3>
              <span>Hover to look inside</span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <LogicaPanels />
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------- Start AI with Ease */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">How to begin</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Start AI with Ease
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                Two ways in, both of them short. Pick the one that fits how much of your operation
                we need to see, and we come back with something you can actually run.
              </p>
            </Reveal>
          </div>

          <div className={styles.startGrid}>
            {startPaths.map((path, i) => (
              <Reveal key={path.key} delay={i * 110} className={styles.startCard}>
                <span className={styles.startStep}>0{i + 1}</span>
                <span className={styles.startIcon}>
                  <Icon name={path.icon as IconName} size={26} />
                </span>
                <h3>{path.label}</h3>
                <p className={styles.startTiming}>{path.timing}</p>
                <p>{path.blurb}</p>
                <ul>
                  {path.points.map((point) => (
                    <li key={point}>
                      <Icon name="check" size={16} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.startPromise}>
            <Icon name="spark" size={20} />
            <p>{startPromise}</p>
            <Link href="/contact" className="btn">
              Book a discovery session
              <Icon name="arrow" size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------- Services & capabilities */}
      <section className="section skin-mute">
        <div className="container">
          <OfferTabs services={services} capabilities={capabilities} />
        </div>
      </section>

      {/* ------------------------------------------------------------- Values */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Our Values</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Three commitments that
                <br />
                outlasted every tech cycle.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                Twenty years is long enough for the technology to change completely. These have not.
              </p>
            </Reveal>
          </div>

          <div className={styles.valueGrid}>
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 70} className={styles.valueItem}>
                <span className={styles.valueIcon}>
                  <Icon name={value.icon as IconName} size={22} />
                </span>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Case studies */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Case Studies</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Eight programmes.
                <br />
                Measured in outcomes.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                Industry-standard benchmarking databases, vision AI on the farm floor, carbon
                markets, agentic routing inside a shopping mall. Every one of them still running.
              </p>
            </Reveal>
          </div>

          <div className={styles.caseGrid}>
            <Reveal className={styles.caseSpan}>
              <CaseCard study={featured} featured />
            </Reveal>
            {rest.map((study, i) => (
              <Reveal key={study.slug} delay={(i % 2) * 90}>
                <CaseCard study={study} />
              </Reveal>
            ))}
          </div>

          <div className={styles.caseFoot}>
            <p>
              Every case study breaks down the same four ways: the challenge, what we built, the
              measured result, and the takeaway we carried into the next engagement.
            </p>
            <Link href="/cases" className="btn">
              All case studies
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

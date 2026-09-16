import Link from "next/link";
import CaseCard from "@/components/CaseCard";
import Counter from "@/components/Counter";
import Icon, { type IconName } from "@/components/Icon";
import Marquee from "@/components/Marquee";
import WordParticles from "@/components/WordParticles";
import Reveal from "@/components/Reveal";
import { cases } from "@/data/cases";
import { capabilities } from "@/data/capabilities";
import { clients, values } from "@/data/company";
import { services } from "@/data/services";
import { site } from "@/data/site";
import styles from "./home.module.css";

const heroStats = [
  { value: "20+", label: "Years delivering" },
  { value: "500+", label: "Projects delivered" },
  { value: "100%", label: "On time, on budget" },
];

const fdeSteps = [
  {
    n: "01",
    title: "Observe",
    body: "Our engineers sit inside your operation, combining industry understanding with what they see to surface where AI actually pays.",
  },
  {
    n: "02",
    title: "Collect",
    body: "We gather requirements with your team around one question: where in this process does AI create the most value?",
  },
  {
    n: "03",
    title: "Propose",
    body: "A tailored solution proposal — objectives, technical path, expected outcomes and a timeline you can hold us to.",
  },
  {
    n: "04",
    title: "Deliver",
    body: "The FDE team builds alongside you, measured on business outcomes, and keeps iterating after go-live.",
  },
];

export default function HomePage() {
  const [featured, ...rest] = cases;

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className={`${styles.hero} noise`}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroTop}>
            <div>
              <p className={styles.heroBadge}>
                <b>Since 2002</b>
                Atlanta · Nanjing — Fortune 500 Tier 1 solution provider
              </p>

              <h1 className={styles.heroTitle}>
                <span>
                  <i>20+ Years</i>
                </span>
                <span>
                  <i>Experience,</i>
                </span>
                <span>
                  <i className={styles.heroAccent}>Always on Time</i>
                </span>
                <span>
                  <i className={styles.heroAccent}>on Budget.</i>
                </span>
              </h1>
            </div>

            <div className={styles.heroWordsWrap} aria-hidden="true">
              <WordParticles className={styles.heroWords} />
            </div>
          </div>

          <div className={styles.heroFoot}>
            <div>
              <p className={styles.heroLead}>
                For two decades we have built the systems that large enterprises run their
                operations on — data platforms, computer vision, cloud architecture and agentic AI —
                across animal health, agribusiness, utilities and retail.
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
            <span className="eyebrow">Trusted by</span>
            <p>
              Global animal health, agribusiness, consumer and utility leaders — several for more
              than a decade.
            </p>
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

      {/* ------------------------------------------------------------ Services */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Services</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Four ways
                <br />
                to engage us.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                Whether you need a project delivered end-to-end, a team that becomes an extension of
                yours, or one specialist on your floor next month — the engagement model flexes, the
                delivery discipline does not.
              </p>
            </Reveal>
          </div>

          <div className={styles.svcGrid}>
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 80}>
                <Link href={`/services#${service.slug}`} className="card" style={{ height: "100%" }}>
                  <span className="card-index">0{i + 1}</span>
                  <span className="card-icon">
                    <Icon name={service.icon as IconName} size={26} />
                  </span>
                  <h3>{service.name}</h3>
                  <p>{service.blurb}</p>
                  <span className="link-arrow">
                    Explore
                    <Icon name="arrow" size={15} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className={styles.svcFoot}>
            <Link href="/services" className="link-arrow">
              All services
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Capabilities */}
      <section className="section skin-mute">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Capabilities</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Five things
                <br />
                we&rsquo;re deep in.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                The technology we go deep on — data and analytics platforms, AI and computer vision,
                cloud and DevOps, IoT and mobile, and the enterprise applications that tie them
                together. Whichever engagement model you pick above, these are the specialists who
                build it.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-3">
            {capabilities.map((cap, i) => (
              <Reveal key={cap.slug} delay={i * 70}>
                <Link
                  href={`/capabilities#${cap.slug}`}
                  className={`card ${styles.capCard}`}
                  style={{ height: "100%" }}
                >
                  <span className="card-icon">
                    <Icon name={cap.icon as IconName} size={26} />
                  </span>
                  <h3>{cap.name}</h3>
                  <p>{cap.blurb}</p>
                  <div className={`chips ${styles.capStack}`}>
                    {cap.stack.slice(0, 4).map((s) => (
                      <span className="chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className={styles.svcFoot}>
            <Link href="/capabilities" className="link-arrow">
              All capabilities
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ AI & FDE */}
      <section className={`section skin-dark noise ${styles.ai}`}>
        <span className={styles.aiGlow} aria-hidden="true" />
        <div className="container">
          <div className={styles.aiTop}>
            <Reveal>
              <span className="eyebrow">AI &amp; Forward Deployed Engineering</span>
              <h2 className="h2" style={{ margin: "16px 0 20px" }}>
                Beyond concepts — we take AI from the lab to the production line.
              </h2>
              <p className="lead">
                An AI Agent is a digital employee that understands your business: give it a goal and
                it reasons, calls tools, acts, and adjusts until the job is done. LogicaAI is how
                enterprises recruit and govern that workforce safely — every agent fluent in your
                domain, bound by your rules, wired into your existing systems.
              </p>
              <div className={styles.heroCtas}>
                <a
                  className="btn"
                  href={site.aiSiteUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Visit our AI site
                  <Icon name="arrow" size={16} />
                </a>
                <Link href="/cases/intelligent-path-planning-shopping-malls" className="btn btn-ghost">
                  See an AI case study
                </Link>
              </div>
            </Reveal>

            <Reveal delay={120} className={styles.aiCompare}>
              <div className={styles.aiCard}>
                <span className={styles.aiCardMark}>
                  <Icon name="apps" size={22} />
                </span>
                <div>
                  <h4>Traditional software</h4>
                  <strong>A vending machine</strong>
                  <p>
                    Press a button, get that drink. Rigid logic, fixed paths, nothing outside what
                    was anticipated.
                  </p>
                </div>
              </div>
              <div className={`${styles.aiCard} ${styles.aiCardHot}`}>
                <span className={styles.aiCardMark}>
                  <Icon name="spark" size={22} />
                </span>
                <div>
                  <h4>AI Agent</h4>
                  <strong>A specialist assistant</strong>
                  <p>
                    Hand it a task and it researches, analyses and drafts — then hands you back
                    finished work.
                  </p>
                </div>
              </div>
              <div className={styles.aiCard}>
                <span className={styles.aiCardMark}>
                  <Icon name="shield" size={22} />
                </span>
                <div>
                  <h4>LogicaAI</h4>
                  <strong>Agents you can actually deploy</strong>
                  <p>
                    Orchestration, enterprise knowledge base, MCP integration, GuardRail safety and
                    full lifecycle management.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className={styles.fde}>
            <Reveal>
              <div className={styles.capHead}>
                <div>
                  <span className="eyebrow">FDE</span>
                  <h3 style={{ fontSize: "clamp(1.5rem,2.6vw,2.2rem)", marginTop: 8 }}>
                    Forward Deployed Engineer — a way of working, not a job title
                  </h3>
                </div>
              </div>
            </Reveal>

            <div className={styles.fdeSteps}>
              {fdeSteps.map((step, i) => (
                <Reveal key={step.n} delay={i * 90} className={styles.fdeStep}>
                  <span>{step.n}</span>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </Reveal>
              ))}
            </div>

            <div className={styles.fdeWhy}>
              {[
                {
                  t: "Embedded, not adjacent",
                  b: "FDEs join your stand-ups and planning sessions and carry the same accountability your own team does.",
                },
                {
                  t: "Outcome-priced, not day-rate",
                  b: "Success is measured against the business result, not against hours logged on a timesheet.",
                },
                {
                  t: "Bridging the gap",
                  b: "Between people who know the platform and people who know the business — which is where most AI projects stall.",
                },
              ].map((item, i) => (
                <Reveal key={item.t} delay={i * 80} className={styles.fdeWhyItem}>
                  <strong>{item.t}</strong>
                  <p>{item.b}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Values */}
      <section className="section skin-mute">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Our Values</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Six commitments that
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

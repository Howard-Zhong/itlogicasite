import type { Metadata } from "next";
import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import Marquee from "@/components/Marquee";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  certifications,
  clients,
  companyFacts,
  milestones,
  partners,
} from "@/data/company";
import styles from "../inner.module.css";
import home from "../home.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in Atlanta in 2002 with a delivery centre in Nanjing — ITLogica's company overview, certifications, milestones, clients and partners.",
};

const overviewStats = [
  { value: "20+", label: "Years in the IT industry" },
  { value: "2002", label: "Founded in Atlanta, Georgia" },
  { value: "2", label: "Operating centres: USA + China" },
  { value: "Tier 1", label: "Fortune 500 solution provider" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={
          <>
            Two decades of
            <br />
            delivering the systems
            <br />
            enterprises run on.
          </>
        }
        lead="ITLogica is headquartered in Atlanta, Georgia, with a dedicated R&D and solution delivery centre in Nanjing, China. We have spent close to twenty years in information technology and are a Tier 1 solution provider to Fortune 500 organisations — several of our client relationships now span more than a decade."
        particles
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* -------------------------------------------------- Company overview */}
      <section className="section">
        <div className="container">
          <div className={styles.statStrip} style={{ marginBottom: "clamp(40px,5vw,72px)" }}>
            {overviewStats.map((s) => (
              <div className={styles.statCell} key={s.label}>
                <p className="stat-value" style={{ fontSize: "clamp(1.7rem,3vw,2.5rem)" }}>
                  <Counter value={s.value} />
                </p>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>

          <div className={styles.split}>
            <Reveal>
              <span className="eyebrow">Company Overview</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Who we are
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="stack">
                <p className="lead" style={{ color: "var(--fg)" }}>
                  An information technology services firm delivering comprehensive business
                  solutions across animal health, agribusiness, health, utilities and retail.
                </p>
                <p style={{ color: "var(--muted)" }}>
                  Our approach puts technology at the core and deep industry understanding around
                  it. That combination is why several of our solutions became the standard their
                  industries benchmark against — the EKS cattle Benchmark system now represents 90%
                  of the annual U.S. cattle harvest, and the carbon accounting engine we built for
                  UpLook underpins verified payments in a global marketplace.
                </p>
                <p style={{ color: "var(--muted)" }}>
                  We provide a diverse set of service offerings to meet the changing needs of a
                  global client base, and we measure our success entirely by our clients&rsquo;. We
                  are passionate about what we do and fully committed to helping clients attain and
                  exceed their business objectives.
                </p>

                <dl className={styles.facts} style={{ marginTop: 12 }}>
                  {companyFacts.map((f) => (
                    <div className={styles.fact} key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="grid grid-2" style={{ marginTop: 10 }}>
                  {[
                    {
                      t: "Deep industry track record",
                      b: "Close to twenty years of IT and AI delivery, serving Fortune 500 organisations in genuinely complex environments.",
                    },
                    {
                      t: "Productised delivery",
                      b: "Our platforms carry accumulated industry know-how, so the path from proof of concept to production stays controlled.",
                    },
                    {
                      t: "Global view, local execution",
                      b: "Atlanta headquarters with a Nanjing R&D and delivery centre — cross-cultural delivery is a core competency, not an afterthought.",
                    },
                  ].map((item, i) => (
                    <div className="card" key={item.t}>
                      <span className="card-index">0{i + 1}</span>
                      <h3>{item.t}</h3>
                      <p>{item.b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ Certifications & milestones */}
      <section className="section" id="certifications">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Certification &amp; Milestones</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Repeatable process.
                <br />
                Two decades of proof.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                Industry certifications and qualifications are what make repeatable, reliable
                results possible across every client initiative — not a wall of logos.
              </p>
            </Reveal>
          </div>

          <Reveal>
            {/* Same four-across grid as the home page, so eight certificates
                land as two full rows on both. */}
            <div className={home.certGrid}>
              {certifications.map((c) => (
                <div className={home.cert} key={c.name}>
                  <strong>{c.name}</strong>
                  <span>{c.detail}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal style={{ marginTop: "clamp(46px,6vw,84px)" }}>
            <span className="eyebrow">Company milestones</span>
            <h3 className="h3" style={{ margin: "14px 0 26px" }}>
              From a beef-cattle analytics system to agentic AI in production
            </h3>
            <div className={styles.timeline}>
              {milestones.map((m) => (
                <div className={styles.milestone} key={m.year}>
                  <p className={styles.milestoneYear}>{m.year}</p>
                  <div>
                    <h3>{m.title}</h3>
                    <p>{m.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------- Clients & partners */}
      <section className="section skin-mute" id="clients">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Clients &amp; Partners</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Relationships measured
                <br />
                in decades.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                We strive for long-term partnerships in which ITLogica becomes an integral part of
                our clients&rsquo; culture and technology strategy — supporting the growth of the
                whole organisation, not one project.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <Marquee duration={58}>
            <div className={home.logoRow}>
              {clients.map((c) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={c.file} src={`/clients/${c.file}`} alt={c.name} loading="lazy" />
              ))}
            </div>
          </Marquee>
        </Reveal>

        <div className="container" style={{ marginTop: 46 }}>
          <Reveal>
            <h3 className="h3" style={{ marginBottom: 18 }}>
              Strategic partners
            </h3>
            <div className="chips">
              {partners.map((p) => (
                <span className="chip chip-accent" key={p} style={{ padding: "10px 18px" }}>
                  <Icon name="check" size={13} style={{ marginRight: 7, verticalAlign: -2 }} />
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

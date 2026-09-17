import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { services } from "@/data/services";
import styles from "../inner.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four ways to engage ITLogica: Solution Delivery, Managed Services, the Distributed Delivery Model and Staff Augmentation.",
};

const proof = [
  { value: "24×7", label: "Distributed delivery capability" },
  { value: "CMMI 3", label: "Appraised quality system" },
  { value: "20 yrs", label: "Average recruiter experience" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Four engagement models.
            <br />
            One delivery discipline.
          </>
        }
        lead="Some clients need a programme delivered end-to-end against a fixed date. Some need a team that quietly becomes part of theirs. Some need one specialist on the floor next month. The commercial shape changes; how we run the work does not."
        particles
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="section-tight">
        <div className="container">
          <div className={styles.statStrip}>
            {proof.map((p) => (
              <div className={styles.statCell} key={p.label}>
                <p className="stat-value" style={{ fontSize: "clamp(1.7rem,3vw,2.5rem)" }}>
                  {p.value}
                </p>
                <p className="stat-label">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.split}>
            <div className={styles.sticky}>
              <span className="eyebrow">Overview</span>
              <h2 className="h3" style={{ margin: "14px 0 24px" }}>
                Pick the model that fits the problem
              </h2>
              <nav className={styles.tocNav} aria-label="Services">
                {services.map((s) => (
                  <a className={styles.tocLink} href={`#${s.slug}`} key={s.slug}>
                    {s.name}
                  </a>
                ))}
              </nav>
              <Link href="/contact" className="btn btn-sm" style={{ marginTop: 26 }}>
                Discuss your project
                <Icon name="arrow" size={15} />
              </Link>
            </div>

            <div>
              {services.map((service, i) => (
                <Reveal key={service.slug} as="article" id={service.slug} className={styles.entry}>
                  <span className={styles.mark}>
                    <Icon name={service.icon as IconName} size={28} />
                  </span>
                  <p className={styles.entryNum}>0{i + 1} — {service.kicker.toUpperCase()}</p>
                  <h2 className={styles.entryTitle}>{service.name}</h2>
                  <div className={styles.entryArt}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={service.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className={styles.entryBody}>
                    {service.body.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                  <ul className={styles.featureList}>
                    {service.features.map((f) => (
                      <li key={f}>
                        <Icon name="check" size={17} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

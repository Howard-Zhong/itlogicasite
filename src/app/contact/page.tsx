import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import WorldMap from "@/components/WorldMap";
import { generalEmails, officeList, site } from "@/data/site";
import styles from "../inner.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to ITLogica in Atlanta, Georgia or Nanjing, China — with additional presence in Columbia, South Carolina and Indianapolis, Indiana. Choose your office and your enquiry routes straight to the team that answers it.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            Two offices.
            <br />
            One conversation away.
          </>
        }
        lead="Tell us what you are trying to ship and by when. Choose an office in the form and your message goes straight to the team that will answer it — we reply within one business day."
        particles
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="section">
        <div className="container">
          <div className={styles.contactGrid}>
            <Reveal>
              <span className="eyebrow">Send us a message</span>
              <h2 className="h3" style={{ margin: "14px 0 26px" }}>
                Start with a short brief — we&rsquo;ll come back with questions, not a sales deck.
              </h2>
              <ContactForm />
            </Reveal>

            <Reveal delay={110} className="stack">
              {officeList.map((office) => (
                <div className={styles.officeCard} key={office.key}>
                  <div className={styles.officeTop}>
                    <span className={styles.officeFlagDot} />
                    <h3 className="h3">{office.label}</h3>
                  </div>
                  <p style={{ color: "var(--orange)", fontWeight: 600, fontSize: "0.92rem" }}>
                    {office.role}
                  </p>

                  <div className={styles.officeMeta}>
                    <div>
                      <Icon name="pin" size={17} />
                      <span>
                        {office.address.map((l) => (
                          <span key={l} style={{ display: "block" }}>
                            {l}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div>
                      <Icon name="mail" size={17} />
                      <a href={`mailto:${office.email}`}>{office.email}</a>
                    </div>
                    {office.phone && (
                      <div>
                        <Icon name="phone" size={17} />
                        <span>
                          <a href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}>{office.phone}</a>
                          {office.fax && <span> · Fax {office.fax}</span>}
                        </span>
                      </div>
                    )}
                    <div>
                      <Icon name="clock" size={17} />
                      <span>{office.timezone}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className={styles.officeCard}>
                <h3 className="h3" style={{ marginBottom: 14 }}>
                  Also on the ground
                </h3>
                <div className={styles.officeMeta} style={{ marginTop: 0 }}>
                  <div>
                    <Icon name="pin" size={17} />
                    <span>Columbia, South Carolina</span>
                  </div>
                  <div>
                    <Icon name="pin" size={17} />
                    <span>Indianapolis, Indiana</span>
                  </div>
                </div>
              </div>

              <div className={styles.officeCard}>
                <h3 className="h3" style={{ marginBottom: 14 }}>
                  Direct lines
                </h3>
                <div className={styles.officeMeta} style={{ marginTop: 0 }}>
                  {generalEmails.map((g) => (
                    <div key={g.email}>
                      <Icon name="mail" size={17} />
                      <span>
                        {g.label} — <a href={`mailto:${g.email}`}>{g.email}</a>
                      </span>
                    </div>
                  ))}
                  <div>
                    <Icon name="spark" size={17} />
                    <span>
                      AI solutions —{" "}
                      <a href={site.aiSiteUrl} target="_blank" rel="noreferrer noopener">
                        ai.itlogica.com
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ World map */}
      <section className={`${styles.mapSection} noise`}>
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Where we are</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Atlanta and Nanjing,
                <br />
                twelve hours apart.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                The time difference is the point: work handed over at the end of a US day is picked
                up at the start of a Chinese one. That is what 24×7 delivery actually looks like.
              </p>
            </Reveal>
          </div>

          <Reveal variant="clip">
            <WorldMap />
          </Reveal>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import ContactForm from "./ContactForm";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { clients } from "@/data/company";
import { nav, officeList, site } from "@/data/site";
import styles from "./Footer.module.css";

/**
 * The contact module doubles as the site-wide footer: form on the left,
 * client proof on the right, office routing and the AI site hand-off below.
 */
export default function Footer() {
  return (
    <footer className={`${styles.footer} noise`} id="contact-form">
      <span className={styles.glow} aria-hidden="true" />

      <div className="container">
        <div className={styles.main}>
          <Reveal>
            <span className="eyebrow">Start a conversation</span>
            <h2 className={styles.title}>
              Tell us what needs to
              <br />
              ship — and by when.
            </h2>
            <p className={styles.sub}>
              Choose the office closest to you and your message goes straight to the team that will
              answer it. We reply within one business day.
            </p>
            <ContactForm />
          </Reveal>

          <Reveal delay={120} className={styles.aside}>
            <div>
              <span className="eyebrow">Trusted by</span>
              <div className={styles.logoWall} style={{ marginTop: 18 }}>
                {clients.slice(0, 12).map((c) => (
                  <div className={styles.logoCell} key={c.file}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/clients/${c.file}`} alt={c.name} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.offices}>
              {officeList.map((office) => (
                <div className={styles.office} key={office.key}>
                  <p className={styles.officeCity}>
                    <Icon name="pin" size={16} />
                    {office.city}
                  </p>
                  <p className={styles.officeRole}>{office.role}</p>
                  <a className={styles.officeMail} href={`mailto:${office.email}`}>
                    {office.email}
                  </a>
                </div>
              ))}
            </div>

            <a
              className={styles.aiBanner}
              href={site.aiSiteUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className={styles.aiMark}>
                <Icon name="spark" size={22} />
              </span>
              <span>
                <h4>AI Solution Delivery</h4>
                <p>Agentic AI, LogicaAI and Forward Deployed Engineering</p>
              </span>
              <Icon name="arrow" size={20} />
            </a>
          </Reveal>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/itlogica-logo.png" alt="ITLogica" width={220} height={72} />
          <nav className={styles.siteLinks} aria-label="Footer">
            <Link href="/">Home</Link>
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <a href={site.aiSiteUrl} target="_blank" rel="noreferrer noopener">
              AI Site
            </a>
          </nav>
          <p className={styles.copy}>
            © {new Date().getFullYear()} {site.legalName} · All rights reserved · Atlanta, Georgia ·
            Nanjing, China
          </p>
        </div>
      </div>
    </footer>
  );
}

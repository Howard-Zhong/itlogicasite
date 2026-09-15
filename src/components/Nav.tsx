"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { nav, site } from "@/data/site";
import styles from "./Nav.module.css";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /** Pages that open on a dark hero get the inverted nav treatment. */
  const darkHero = pathname === "/" || pathname === "/contact" || pathname.startsWith("/cases/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !darkHero || open;

  return (
    <>
      <header
        className={[
          styles.nav,
          solid && !open ? styles.solid : "",
          darkHero && !scrolled ? styles.onDark : "",
          open ? styles.onDark : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} aria-label={`${site.name} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/itlogica-logo.png" alt="ITLogica" width={276} height={90} />
          </Link>

          <nav className={styles.links} aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${
                  pathname === item.href || pathname.startsWith(`${item.href}/`) ? styles.active : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <a
              className={styles.aiLink}
              href={site.aiSiteUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className={styles.dot} />
              AI Solution Delivery
            </a>
            <Link href="/contact" className="btn btn-sm">
              Let&rsquo;s talk
              <Icon name="arrow" size={15} />
            </Link>
            <button
              type="button"
              className={styles.burger}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ""}`}>
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className={styles.sheetLink}>
            {item.label}
            <Icon name="arrow" size={20} />
          </Link>
        ))}
        <div className={styles.sheetFoot}>
          <a
            className="btn btn-ghost btn-sm"
            href={site.aiSiteUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            AI Solution Delivery
            <Icon name="arrow" size={15} />
          </a>
          <Link href="/contact" className="btn btn-sm">
            Let&rsquo;s talk
          </Link>
        </div>
      </div>
    </>
  );
}

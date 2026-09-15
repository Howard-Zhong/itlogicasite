import type { Metadata } from "next";
import CaseCard from "@/components/CaseCard";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { cases } from "@/data/cases";
import styles from "../home.module.css";
import inner from "../inner.module.css";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Eight ITLogica programmes across animal health, agribusiness, veterinary and retail — each broken down by challenge, solution, result and key takeaway.",
};

const summary = [
  { value: "8", label: "Programmes documented" },
  { value: "1,500+", label: "Feedyards on our platforms" },
  { value: "$10M+", label: "Carbon payments enabled" },
  { value: "2M+", label: "Cattle records processed" },
];

export default function CasesPage() {
  const [featured, ...rest] = cases;

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title={
          <>
            The work,
            <br />
            and what it changed.
          </>
        }
        lead="Each of these is a system still in production. We break every one down the same four ways — the challenge we were handed, what we actually built, the measured result, and the takeaway we carried forward."
        tone="light"
        crumbs={[{ label: "Home", href: "/" }, { label: "Case Studies" }]}
      />

      <section className="section-tight">
        <div className="container">
          <div className={inner.statStrip}>
            {summary.map((s) => (
              <div className={inner.statCell} key={s.label}>
                <p className="stat-value" style={{ fontSize: "clamp(1.7rem,3vw,2.5rem)" }}>
                  {s.value}
                </p>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
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
        </div>
      </section>
    </>
  );
}

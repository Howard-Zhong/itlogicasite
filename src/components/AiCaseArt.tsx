import type { AiCaseArt as Variant } from "@/data/home";
import s from "./AiCaseArt.module.css";

/*
 * One motif per AI case. Same 320x180 frame and stroke weight for all three so
 * the row reads as a set rather than three unrelated drawings.
 */
const scenes: Record<Variant, React.ReactNode> = {
  // A report goes in, a clean answer comes back.
  report: (
    <>
      <rect className={s.ink} x="36" y="34" width="84" height="112" rx="7" />
      <path className={s.faint} d="M52 58h52M52 74h52M52 90h38M52 106h46M52 122h30" />
      <path className={s.hot} d="M128 90h40" markerEnd="" />
      <path className={s.hot} d="M158 80l10 10-10 10" />
      <circle className={s.hot} cx="222" cy="90" r="30" />
      <path className={s.hot} d="M210 90l8 9 16-19" />
      <path className={s.faint} d="M262 62h26M262 90h26M262 118h26" />
    </>
  ),
  // Footfall through a floor plate, with the chosen route lit.
  path: (
    <>
      <rect className={s.faint} x="34" y="30" width="252" height="120" rx="8" />
      <path className={s.faint} d="M34 70h252M34 110h252M118 30v120M202 30v120" />
      <path
        className={s.hot}
        d="M60 132c28 0 24-38 52-38s34 30 62 22 26-44 52-44"
        strokeLinecap="round"
      />
      <circle className={s.hotFill} cx="60" cy="132" r="6" />
      <circle className={s.hotFill} cx="226" cy="72" r="6" />
      <circle className={s.inkFill} cx="112" cy="94" r="4" />
      <circle className={s.inkFill} cx="174" cy="116" r="4" />
    </>
  ),
  // One brief fanning out into the pieces of a campaign.
  campaign: (
    <>
      <rect className={s.hot} x="30" y="66" width="62" height="48" rx="8" />
      <path className={s.faint} d="M44 84h34M44 96h22" />
      <path className={s.ink} d="M92 90h34M126 90V44h30M126 90h30M126 90v46h30" />
      <rect className={s.ink} x="156" y="26" width="58" height="36" rx="7" />
      <rect className={s.ink} x="156" y="72" width="58" height="36" rx="7" />
      <rect className={s.ink} x="156" y="118" width="58" height="36" rx="7" />
      <path className={s.faint} d="M168 40h34M168 86h34M168 132h34" />
      <path className={s.hot} d="M214 44h34M214 90h34M214 136h34" />
      <circle className={s.hotFill} cx="264" cy="44" r="7" />
      <circle className={s.hotFill} cx="264" cy="90" r="7" />
      <circle className={s.hotFill} cx="264" cy="136" r="7" />
    </>
  ),
};

export default function AiCaseArt({ variant }: { variant: Variant }) {
  return (
    <svg className={s.svg} viewBox="0 0 320 180" aria-hidden="true" focusable="false">
      {scenes[variant]}
    </svg>
  );
}

import type { ReactNode } from "react";
import s from "./ReelArt.module.css";

/*
 * Eight motifs, one per capability, drawn in the same 320x200 frame with the
 * same stroke weight so they read as one family as they swap. The viewBox is
 * cropped to the drawn area so the motif fills its box instead of floating
 * inside dead margin. Each says
 * something true about its capability rather than being generic ornament.
 */

const hex = [0, 60, 120, 180, 240, 300].map((deg) => {
  const r = (deg * Math.PI) / 180;
  return { x: +(160 + 78 * Math.cos(r)).toFixed(1), y: +(100 + 52 * Math.sin(r)).toFixed(1) };
});

const orbit = [-90, -18, 54, 126, 198].map((deg) => {
  const r = (deg * Math.PI) / 180;
  return { x: +(160 + 70 * Math.cos(r)).toFixed(1), y: +(100 + 46 * Math.sin(r)).toFixed(1) };
});

const mlA = [60, 100, 140];
const mlB = [48, 83, 117, 152];
const mlC = [72, 100, 128];

const soundBars = [18, 40, 66, 28, 86, 54, 72, 22, 46, 32];
const chartBars = [28, 46, 38, 70, 58, 92];

const SCENES: (() => ReactNode)[] = [
  // 0 · Agentic AI — one orchestrator, many delegated agents
  () => (
    <>
      <ellipse className={s.faint} cx="160" cy="100" rx="98" ry="64" strokeDasharray="4 8" />
      {orbit.map((p, i) => (
        <line className={s.ink} key={i} x1="160" y1="100" x2={p.x} y2={p.y} />
      ))}
      {orbit.map((p, i) => (
        <circle className={s.inkFill} key={`n${i}`} cx={p.x} cy={p.y} r="6" />
      ))}
      <circle className={s.hot} cx="160" cy="100" r="19" />
      <circle className={s.hotFill} cx="160" cy="100" r="6.5" />
    </>
  ),

  // 1 · Machine Learning — a layered network
  () => (
    <>
      {mlA.map((ya, i) =>
        mlB.map((yb, j) => (
          <line className={s.faint} key={`ab${i}${j}`} x1="92" y1={ya} x2="160" y2={yb} />
        ))
      )}
      {mlB.map((yb, i) =>
        mlC.map((yc, j) => (
          <line className={s.faint} key={`bc${i}${j}`} x1="160" y1={yb} x2="228" y2={yc} />
        ))
      )}
      {mlA.map((y, i) => (
        <circle className={s.inkFill} key={`a${i}`} cx="92" cy={y} r="5.5" />
      ))}
      {mlB.map((y, i) => (
        <circle className={s.hotFill} key={`b${i}`} cx="160" cy={y} r="5.5" />
      ))}
      {mlC.map((y, i) => (
        <circle className={s.inkFill} key={`c${i}`} cx="228" cy={y} r="5.5" />
      ))}
    </>
  ),

  // 2 · Computer Vision — detection frame closing on a target
  () => (
    <>
      <path className={s.ink} d="M78 68 V44 H102" />
      <path className={s.ink} d="M218 44 H242 V68" />
      <path className={s.ink} d="M242 132 V156 H218" />
      <path className={s.ink} d="M102 156 H78 V132" />
      <line className={s.faint} x1="96" y1="76" x2="224" y2="76" />
      <line className={s.faint} x1="96" y1="100" x2="224" y2="100" />
      <line className={s.faint} x1="96" y1="124" x2="224" y2="124" />
      <rect className={s.hot} x="130" y="74" width="60" height="52" rx="4" />
      <line className={s.hot} x1="160" y1="88" x2="160" y2="112" />
      <line className={s.hot} x1="148" y1="100" x2="172" y2="100" />
      <circle className={s.hotFill} cx="160" cy="100" r="3.5" />
    </>
  ),

  // 3 · Sound Recognition — a waveform read off an incoming signal
  () => (
    <>
      <path className={s.faint} d="M74 76 A 30 30 0 0 1 74 124" />
      <path className={s.faint} d="M62 62 A 46 46 0 0 1 62 138" />
      {soundBars.map((h, i) => {
        const x = 100 + i * 15;
        const hot = i === 4 || i === 6;
        return (
          <line
            className={hot ? s.barHot : s.bar}
            key={i}
            x1={x}
            y1={100 - h / 2}
            x2={x}
            y2={100 + h / 2}
          />
        );
      })}
    </>
  ),

  // 4 · Data Analytics — measured bars, and the trend read out of them
  () => (
    <>
      <line className={s.faint} x1="80" y1="70" x2="248" y2="70" />
      <line className={s.faint} x1="80" y1="110" x2="248" y2="110" />
      <line className={s.ink} x1="80" y1="156" x2="248" y2="156" />
      {chartBars.map((h, i) => {
        const x = 98 + i * 27;
        return <line className={s.bar} key={i} x1={x} y1="156" x2={x} y2={156 - h} />;
      })}
      <polyline
        className={s.hot}
        points={chartBars.map((h, i) => `${98 + i * 27},${156 - h - 14}`).join(" ")}
      />
      {chartBars.map((h, i) => (
        <circle className={s.hotFill} key={`d${i}`} cx={98 + i * 27} cy={156 - h - 14} r="3.5" />
      ))}
    </>
  ),

  // 5 · Cloud — stacked regions on one control plane
  () => (
    <>
      <rect className={s.faint} x="104" y="46" width="130" height="34" rx="9" />
      <rect className={s.ink} x="92" y="88" width="154" height="34" rx="9" />
      <rect className={s.faint} x="112" y="130" width="114" height="34" rx="9" />
      <path className={s.ink} d="M104 63 C 74 63 74 105 92 105" />
      <path className={s.ink} d="M92 105 C 68 105 68 147 112 147" />
      <circle className={s.hotFill} cx="222" cy="63" r="5" />
      <circle className={s.hotFill} cx="234" cy="105" r="5" />
      <circle className={s.hotFill} cx="214" cy="147" r="5" />
      <circle className={s.hot} cx="234" cy="105" r="13" />
    </>
  ),

  // 6 · IoT — a hub and its fleet of devices
  () => (
    <>
      <circle className={s.faint} cx="160" cy="100" r="34" strokeDasharray="3 7" />
      <circle className={s.faint} cx="160" cy="100" r="52" strokeDasharray="3 7" />
      {hex.map((p, i) => (
        <line className={s.ink} key={i} x1="160" y1="100" x2={p.x} y2={p.y} />
      ))}
      {hex.map((p, i) => (
        <rect
          className={s.inkFill}
          key={`r${i}`}
          x={p.x - 5.5}
          y={p.y - 5.5}
          width="11"
          height="11"
          rx="2.5"
        />
      ))}
      <circle className={s.hot} cx="160" cy="100" r="15" />
      <circle className={s.hotFill} cx="160" cy="100" r="5.5" />
    </>
  ),

  // 7 · Mobile & Web — one product, two surfaces
  () => (
    <>
      <rect className={s.ink} x="70" y="50" width="152" height="106" rx="7" />
      <line className={s.ink} x1="70" y1="70" x2="222" y2="70" />
      <circle className={s.inkFill} cx="82" cy="60" r="2.6" />
      <circle className={s.inkFill} cx="92" cy="60" r="2.6" />
      <circle className={s.inkFill} cx="102" cy="60" r="2.6" />
      <line className={s.faint} x1="86" y1="90" x2="176" y2="90" />
      <line className={s.faint} x1="86" y1="106" x2="150" y2="106" />
      <line className={s.faint} x1="86" y1="122" x2="164" y2="122" />
      <rect className={s.hot} x="202" y="92" width="56" height="86" rx="10" />
      <line className={s.hot} x1="220" y1="103" x2="240" y2="103" />
      <line className={s.hot} x1="220" y1="167" x2="240" y2="167" />
    </>
  ),
];

export default function ReelArt({
  scene,
  className,
  style,
}: {
  scene: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const draw = SCENES[((scene % SCENES.length) + SCENES.length) % SCENES.length];
  return (
    <svg
      className={[s.svg, className].filter(Boolean).join(" ")}
      style={style}
      viewBox="56 28 208 150"
      aria-hidden="true"
      focusable="false"
    >
      {draw()}
    </svg>
  );
}

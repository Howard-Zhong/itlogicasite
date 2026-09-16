import type { IndustryArt as Variant } from "@/data/industries";

/**
 * Generated cover art per industry — brand-native geometry in the same idiom
 * as CaseArt, rather than stock photography. Each scene abstracts how the
 * sector's data actually moves.
 *
 * To swap in a photograph later, render an <img> in place of this component;
 * the aspect ratio is fixed by the parent.
 */
export default function IndustryArt({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const id = `ia-${variant}`;
  return (
    <svg
      className={className}
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1b1d1d" />
          <stop offset="100%" stopColor="#0b0c0c" />
        </linearGradient>
        <linearGradient id={`${id}-hot`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0873a" />
          <stop offset="100%" stopColor="#d96119" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d96119" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#d96119" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="260" fill={`url(#${id}-bg)`} />

      {variant === "animal-health" && <AnimalHealthArt id={id} />}
      {variant === "agribusiness" && <AgribusinessArt id={id} />}
      {variant === "health" && <HealthArt id={id} />}
      {variant === "utilities" && <UtilitiesArt id={id} />}
      {variant === "retail" && <RetailArt id={id} />}
      {variant === "cross-industry" && <CrossIndustryArt id={id} />}
    </svg>
  );
}

const line = "rgba(255,255,255,0.16)";
const faint = "rgba(255,255,255,0.08)";

/* Animal health — pens of animals resolving into a benchmark distribution. */
function AnimalHealthArt({ id }: { id: string }) {
  const pens = [30, 122, 214, 306];
  const bars = [30, 48, 68, 86, 77, 60, 42, 26];
  return (
    <>
      <circle cx="320" cy="60" r="130" fill={`url(#${id}-glow)`} />
      {pens.map((x, p) => (
        <g key={x}>
          <rect x={x} y="28" width="64" height="84" rx="5" fill="none" stroke={line} />
          {Array.from({ length: 6 }).map((_, i) => (
            <circle
              key={i}
              cx={x + 14 + (i % 3) * 18}
              cy={48 + Math.floor(i / 3) * 30}
              r={p === 2 && i % 3 === 1 ? 6 : 4.5}
              fill={p === 2 && i % 3 === 1 ? `url(#${id}-hot)` : "rgba(255,255,255,0.4)"}
            />
          ))}
        </g>
      ))}
      <path d="M30 132h340" stroke={faint} />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={34 + i * 44}
          y={228 - h}
          width="26"
          height={h}
          rx="3"
          fill={i === 3 ? `url(#${id}-hot)` : "rgba(255,255,255,0.14)"}
        />
      ))}
      <path d="M30 228h340" stroke={line} />
    </>
  );
}

/* Agribusiness — field strips feeding a supply chain that narrows to a decision. */
function AgribusinessArt({ id }: { id: string }) {
  return (
    <>
      <circle cx="80" cy="200" r="140" fill={`url(#${id}-glow)`} />
      {Array.from({ length: 7 }).map((_, i) => (
        <path
          key={i}
          d={`M${16 + i * 26} 236 L${58 + i * 20} 74`}
          stroke={i === 3 ? "rgba(240,135,58,0.75)" : faint}
          strokeWidth={i === 3 ? 2 : 1}
        />
      ))}
      <path d="M16 236h368" stroke={line} />
      <path
        d="M192 72c42 0 42 36 84 36s40 34 80 34"
        fill="none"
        stroke={line}
        strokeDasharray="5 6"
      />
      {[
        [192, 72],
        [276, 108],
        [356, 142],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={i === 2 ? 13 : 9} fill="#0b0c0c" stroke={line} />
          <circle cx={cx} cy={cy} r={i === 2 ? 6 : 4} fill={`url(#${id}-hot)`} opacity={0.4 + i * 0.3} />
        </g>
      ))}
      {[168, 196, 224].map((y, i) => (
        <rect key={y} x="214" y={y} width={132 - i * 34} height="12" rx="6" fill="rgba(255,255,255,0.1)" />
      ))}
    </>
  );
}

/* Health & veterinary — a sensor trace resolving into a clinical record. */
function HealthArt({ id }: { id: string }) {
  return (
    <>
      <circle cx="120" cy="90" r="130" fill={`url(#${id}-glow)`} />
      <path
        d="M14 128h58l14-34 20 78 18-58 16 38 14-16h54"
        fill="none"
        stroke={`url(#${id}-hot)`}
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M14 128h194" stroke={faint} />
      <circle cx="74" cy="46" r="15" fill="none" stroke={line} />
      <circle cx="74" cy="46" r="5" fill="rgba(240,135,58,0.7)" />
      <path d="M74 61v14" stroke={line} />
      <rect x="236" y="36" width="148" height="188" rx="10" fill="none" stroke={line} />
      {[62, 88, 114, 140, 166, 192].map((y, i) => (
        <g key={y}>
          <rect
            x="254"
            y={y}
            width={i === 1 ? 62 : 92 - (i % 3) * 16}
            height="7"
            rx="3.5"
            fill={i === 1 ? `url(#${id}-hot)` : "rgba(255,255,255,0.15)"}
          />
          <circle cx="344" cy={y + 3.5} r="3.5" fill={i === 1 ? "rgba(240,135,58,0.8)" : faint} />
        </g>
      ))}
    </>
  );
}

/* Utilities — a distribution grid with meters reporting back to billing. */
function UtilitiesArt({ id }: { id: string }) {
  const poles = [70, 160, 250, 340];
  return (
    <>
      <circle cx="200" cy="40" r="150" fill={`url(#${id}-glow)`} />
      {poles.map((x, i) => (
        <g key={x}>
          <path d={`M${x} 36v104`} stroke={line} strokeWidth="1.6" />
          <path d={`M${x - 20} 50h40M${x - 14} 66h28`} stroke={line} />
          {i < poles.length - 1 && (
            <>
              <path d={`M${x} 50q45 22 90 0`} fill="none" stroke={faint} />
              <path d={`M${x} 66q45 20 90 0`} fill="none" stroke={faint} />
            </>
          )}
          <rect
            x={x - 11}
            y="150"
            width="22"
            height="26"
            rx="4"
            fill="#0b0c0c"
            stroke={i === 2 ? "rgba(240,135,58,0.85)" : line}
          />
          <circle cx={x} cy="163" r="5" fill={i === 2 ? `url(#${id}-hot)` : "rgba(255,255,255,0.22)"} />
          <path d={`M${x} 176v22`} stroke={faint} strokeDasharray="3 4" />
        </g>
      ))}
      <rect x="40" y="198" width="320" height="36" rx="8" fill="none" stroke={line} />
      <rect x="58" y="212" width="120" height="8" rx="4" fill={`url(#${id}-hot)`} opacity="0.75" />
      <rect x="190" y="212" width="66" height="8" rx="4" fill="rgba(255,255,255,0.14)" />
      <rect x="266" y="212" width="76" height="8" rx="4" fill="rgba(255,255,255,0.14)" />
    </>
  );
}

/* Retail — a mall floor plate with an agent-routed path through the footfall. */
function RetailArt({ id }: { id: string }) {
  const units = [
    [26, 30, 78, 46],
    [114, 30, 58, 46],
    [182, 30, 92, 46],
    [284, 30, 90, 46],
    [26, 184, 92, 46],
    [128, 184, 62, 46],
    [200, 184, 74, 46],
    [284, 184, 90, 46],
  ];
  return (
    <>
      <circle cx="300" cy="180" r="140" fill={`url(#${id}-glow)`} />
      {units.map(([x, y, w, h], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={w}
          height={h}
          rx="4"
          fill={i === 2 || i === 6 ? "rgba(217,97,25,0.16)" : "rgba(255,255,255,0.045)"}
          stroke={line}
        />
      ))}
      <path d="M26 100h348M26 160h348" stroke={faint} />
      <path
        d="M44 130c40 0 44-36 84-36s44 72 96 72 52-36 108-36"
        fill="none"
        stroke={`url(#${id}-hot)`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />
      {[
        [44, 130],
        [128, 94],
        [224, 166],
        [332, 130],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={i === 0 || i === 3 ? 7 : 4.5}
          fill={i === 0 || i === 3 ? `url(#${id}-hot)` : "rgba(255,255,255,0.55)"}
        />
      ))}
    </>
  );
}

/* Cross industry — one platform layer serving several operating domains. */
function CrossIndustryArt({ id }: { id: string }) {
  const domains = [52, 148, 244, 340];
  return (
    <>
      <circle cx="200" cy="130" r="150" fill={`url(#${id}-glow)`} />
      {domains.map((x, i) => (
        <g key={x}>
          <rect
            x={x - 32}
            y="26"
            width="64"
            height="48"
            rx="8"
            fill="#0b0c0c"
            stroke={i === 1 ? "rgba(240,135,58,0.7)" : line}
          />
          {Array.from({ length: 3 }).map((_, r) => (
            <rect
              key={r}
              x={x - 20}
              y={38 + r * 11}
              width={40 - r * 10}
              height="5"
              rx="2.5"
              fill={i === 1 && r === 0 ? `url(#${id}-hot)` : "rgba(255,255,255,0.16)"}
            />
          ))}
          <path d={`M${x} 74v38`} stroke={faint} strokeDasharray="4 5" />
        </g>
      ))}
      <rect x="26" y="112" width="348" height="46" rx="10" fill="rgba(217,97,25,0.14)" stroke="rgba(240,135,58,0.5)" />
      <rect x="46" y="130" width="96" height="9" rx="4.5" fill={`url(#${id}-hot)`} />
      <rect x="156" y="130" width="64" height="9" rx="4.5" fill="rgba(255,255,255,0.2)" />
      <rect x="234" y="130" width="120" height="9" rx="4.5" fill="rgba(255,255,255,0.12)" />
      {domains.map((x) => (
        <path key={x} d={`M${x} 158v34`} stroke={faint} strokeDasharray="4 5" />
      ))}
      <rect x="26" y="192" width="348" height="42" rx="10" fill="none" stroke={line} />
      {domains.map((x, i) => (
        <circle key={x} cx={x} cy="213" r={i === 1 ? 8 : 5.5} fill={i === 1 ? `url(#${id}-hot)` : "rgba(255,255,255,0.3)"} />
      ))}
    </>
  );
}

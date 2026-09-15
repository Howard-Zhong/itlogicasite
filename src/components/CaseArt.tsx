import type { CaseStudy } from "@/data/cases";

/**
 * Generated cover art per case study — brand-native geometry instead of stock
 * photography. Each variant abstracts the actual mechanism of the project.
 *
 * To swap in a photograph later, render an <img> in place of this component;
 * the aspect ratio is fixed by the parent.
 */
export default function CaseArt({
  variant,
  className,
}: {
  variant: CaseStudy["art"];
  className?: string;
}) {
  const id = `ca-${variant}`;
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

      {variant === "path" && <PathArt id={id} />}
      {variant === "grid" && <GridArt id={id} />}
      {variant === "vision" && <VisionArt id={id} />}
      {variant === "carbon" && <CarbonArt id={id} />}
      {variant === "market" && <MarketArt id={id} />}
      {variant === "mobile" && <MobileArt id={id} />}
      {variant === "sensor" && <SensorArt id={id} />}
      {variant === "cloud" && <CloudArt id={id} />}
    </svg>
  );
}

const line = "rgba(255,255,255,0.16)";
const faint = "rgba(255,255,255,0.08)";

/* Retail path planning — floor plan with a routed path through it. */
function PathArt({ id }: { id: string }) {
  const rooms = [
    [34, 40, 68, 52],
    [112, 40, 92, 52],
    [214, 40, 56, 52],
    [280, 40, 86, 52],
    [34, 168, 86, 52],
    [130, 168, 60, 52],
    [200, 168, 100, 52],
    [310, 168, 56, 52],
  ];
  return (
    <>
      <circle cx="300" cy="70" r="130" fill={`url(#${id}-glow)`} />
      {rooms.map(([x, y, w, h], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={w}
          height={h}
          rx="4"
          fill={faint}
          stroke={line}
          strokeWidth="1"
        />
      ))}
      <path
        d="M40 130 C 110 130, 120 96, 160 96 S 232 148, 268 130 S 330 104, 366 118"
        stroke={`url(#${id}-hot)`}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="9 7"
      />
      {[
        [40, 130],
        [160, 96],
        [268, 130],
        [366, 118],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="10" fill="#d96119" opacity="0.22" />
          <circle cx={cx} cy={cy} r="4.5" fill="#f0873a" />
        </g>
      ))}
    </>
  );
}

/* Benchmark — dense data grid with a highlighted cohort. */
function GridArt({ id }: { id: string }) {
  const cells = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 15; c++) {
      const hot = (r * 15 + c) % 17 === 3 || (r === 4 && c > 3 && c < 11);
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={26 + c * 24}
          y={26 + r * 23}
          width={16}
          height={15}
          rx="2.5"
          fill={hot ? "#d96119" : faint}
          opacity={hot ? 0.85 : 1}
        />
      );
    }
  }
  return (
    <>
      <circle cx="120" cy="200" r="150" fill={`url(#${id}-glow)`} />
      {cells}
      <path d="M26 132h348" stroke={`url(#${id}-hot)`} strokeWidth="1.6" opacity="0.7" />
    </>
  );
}

/* PenPoint — vision bounding boxes over a herd. */
function VisionArt({ id }: { id: string }) {
  const boxes = [
    [52, 62, 84, 62],
    [158, 96, 96, 70],
    [268, 54, 78, 58],
    [212, 176, 62, 48],
    [78, 164, 72, 54],
  ];
  return (
    <>
      <circle cx="200" cy="130" r="160" fill={`url(#${id}-glow)`} />
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * 32}
          x2="400"
          y2={i * 32}
          stroke={faint}
          strokeWidth="1"
        />
      ))}
      {boxes.map(([x, y, w, h], i) => (
        <g key={i}>
          <rect
            x={x}
            y={y}
            width={w}
            height={h}
            fill="none"
            stroke={i === 1 ? "#f0873a" : "rgba(255,255,255,0.42)"}
            strokeWidth={i === 1 ? 2.2 : 1.3}
            rx="2"
          />
          <rect x={x} y={y - 12} width={i === 1 ? 44 : 32} height="11" rx="2" fill={i === 1 ? "#d96119" : "rgba(255,255,255,0.2)"} />
          {[
            [x, y],
            [x + w, y],
            [x, y + h],
            [x + w, y + h],
          ].map(([cx, cy], k) => (
            <circle key={k} cx={cx} cy={cy} r="2.4" fill={i === 1 ? "#f0873a" : "rgba(255,255,255,0.5)"} />
          ))}
        </g>
      ))}
    </>
  );
}

/* UpLook — emissions curve falling, offset bars rising. */
function CarbonArt({ id }: { id: string }) {
  return (
    <>
      <circle cx="330" cy="70" r="140" fill={`url(#${id}-glow)`} />
      {Array.from({ length: 14 }).map((_, i) => (
        <rect
          key={i}
          x={30 + i * 26}
          y={214 - (i * i) / 1.6 - 8}
          width="15"
          height={(i * i) / 1.6 + 8}
          rx="2.5"
          fill={i > 9 ? "#d96119" : "rgba(255,255,255,0.13)"}
        />
      ))}
      <path
        d="M30 54 C 120 58, 150 122, 214 140 S 330 182, 378 196"
        stroke={`url(#${id}-hot)`}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="378" cy="196" r="5" fill="#f0873a" />
      <path d="M24 220h356" stroke={line} strokeWidth="1" />
    </>
  );
}

/* Pig Flash — candlestick market chart. */
function MarketArt({ id }: { id: string }) {
  const bars = [
    [40, 120, 58],
    [70, 96, 74],
    [100, 140, 44],
    [130, 84, 90],
    [160, 110, 66],
    [190, 70, 104],
    [220, 118, 52],
    [250, 62, 96],
    [280, 92, 78],
    [310, 48, 112],
    [340, 78, 88],
  ];
  return (
    <>
      <circle cx="290" cy="110" r="150" fill={`url(#${id}-glow)`} />
      {bars.map(([x, y, h], i) => (
        <g key={i}>
          <line x1={x + 6} y1={y - 14} x2={x + 6} y2={y + h + 14} stroke={line} strokeWidth="1.2" />
          <rect
            x={x}
            y={y}
            width="13"
            height={h}
            rx="2"
            fill={i % 3 === 0 ? "#d96119" : "rgba(255,255,255,0.16)"}
          />
        </g>
      ))}
      <path
        d="M40 158 L 76 132 L 106 162 L 136 118 L 166 142 L 196 106 L 226 144 L 256 96 L 286 124 L 316 86 L 346 108"
        stroke="#f0873a"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
    </>
  );
}

/* Lallemand — three apps converging into one database. */
function MobileArt({ id }: { id: string }) {
  return (
    <>
      <circle cx="200" cy="200" r="150" fill={`url(#${id}-glow)`} />
      {[70, 168, 266].map((x, i) => (
        <g key={i}>
          <rect
            x={x}
            y={28}
            width="64"
            height="102"
            rx="9"
            fill={faint}
            stroke={i === 1 ? "#d96119" : line}
            strokeWidth={i === 1 ? 1.8 : 1}
          />
          <rect x={x + 10} y={42} width="44" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
          <rect x={x + 10} y={54} width="30" height="5" rx="2.5" fill="rgba(255,255,255,0.16)" />
          <rect x={x + 10} y={68} width="44" height="26" rx="4" fill={i === 1 ? "#d96119" : "rgba(255,255,255,0.12)"} />
          <path
            d={`M${x + 32} 130 C ${x + 32} 168, 200 160, 200 186`}
            stroke={line}
            strokeWidth="1.4"
            fill="none"
          />
        </g>
      ))}
      <ellipse cx="200" cy="190" rx="66" ry="17" fill="none" stroke={`url(#${id}-hot)`} strokeWidth="2" />
      <path d="M134 190v26c0 9.4 29.5 17 66 17s66-7.6 66-17v-26" fill="none" stroke={`url(#${id}-hot)`} strokeWidth="2" />
      <ellipse cx="200" cy="190" rx="66" ry="17" fill="#d96119" opacity="0.16" />
    </>
  );
}

/* Vetrax — sensor waveform with anomaly flag. */
function SensorArt({ id }: { id: string }) {
  const pts = Array.from({ length: 120 }, (_, i) => {
    const x = 16 + i * 3.1;
    const spike = i > 74 && i < 84 ? Math.sin((i - 74) * 0.7) * 46 : 0;
    const y = 130 + Math.sin(i * 0.32) * 16 + Math.sin(i * 0.11) * 10 - spike;
    return `${x},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <>
      <circle cx="240" cy="120" r="150" fill={`url(#${id}-glow)`} />
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={i} x1="16" y1={60 + i * 34} x2="384" y2={60 + i * 34} stroke={faint} strokeWidth="1" />
      ))}
      <polyline points={pts} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.6" />
      <rect x="232" y="58" width="46" height="118" rx="4" fill="#d96119" opacity="0.14" stroke="#d96119" strokeWidth="1.2" />
      <circle cx="255" cy="92" r="6" fill="#f0873a" />
      <circle cx="255" cy="92" r="13" fill="none" stroke="#f0873a" strokeWidth="1.4" opacity="0.5" />
      {[1, 2, 3].map((r) => (
        <circle key={r} cx="52" cy="200" r={r * 13} fill="none" stroke="#d96119" strokeWidth="1.2" opacity={0.55 - r * 0.12} />
      ))}
      <circle cx="52" cy="200" r="5" fill="#d96119" />
    </>
  );
}

/* EKS Azure — layered architecture with zero-trust ring. */
function CloudArt({ id }: { id: string }) {
  return (
    <>
      <circle cx="200" cy="130" r="160" fill={`url(#${id}-glow)`} />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${i * 46})`}>
          <path
            d="M200 44 L308 82 L200 120 L92 82 Z"
            fill={i === 0 ? "#d96119" : faint}
            opacity={i === 0 ? 0.9 : 1}
            stroke={line}
            strokeWidth="1"
          />
        </g>
      ))}
      <circle cx="200" cy="130" r="118" fill="none" stroke="#d96119" strokeWidth="1.4" strokeDasharray="6 9" opacity="0.6" />
      <circle cx="200" cy="130" r="140" fill="none" stroke="#d96119" strokeWidth="1" strokeDasharray="3 12" opacity="0.35" />
      {[
        [82, 60],
        [318, 60],
        [82, 200],
        [318, 200],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="#f0873a" opacity="0.8" />
      ))}
    </>
  );
}

import type { LogicaArt as Variant } from "@/data/logicaai";

/**
 * Card art for the five LogicaAI modules. Light-background siblings of
 * CaseArt: brand geometry rather than stock illustration, each one drawing
 * the mechanism the module actually provides.
 */
export default function LogicaArt({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const id = `la-${variant}`;
  return (
    <svg
      className={className}
      viewBox="0 0 360 200"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff6ef" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id={`${id}-hot`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0873a" />
          <stop offset="100%" stopColor="#d96119" />
        </linearGradient>
      </defs>

      <rect width="360" height="200" fill={`url(#${id}-bg)`} />

      {variant === "orchestration" && <Orchestration id={id} />}
      {variant === "knowledge" && <Knowledge id={id} />}
      {variant === "mcp" && <Mcp id={id} />}
      {variant === "guardrail" && <GuardRail id={id} />}
      {variant === "lifecycle" && <Lifecycle id={id} />}
    </svg>
  );
}

const line = "rgba(31,33,33,0.22)";
const faint = "rgba(31,33,33,0.1)";
const fill = "#ffffff";

/* Several agents composed on a canvas and wired into one flow. */
function Orchestration({ id }: { id: string }) {
  const nodes: [number, number, boolean][] = [
    [72, 62, false],
    [72, 138, false],
    [180, 100, true],
    [288, 62, false],
    [288, 138, false],
  ];
  return (
    <>
      <path
        d="M104 62h44M104 138h44M212 100h44M212 100 256 62M212 100l44 38M180 76V62h-32M180 124v14h-32"
        stroke={faint}
        fill="none"
      />
      <path d="M104 62q40 0 48 34M104 138q40 0 48-30" fill="none" stroke={line} strokeDasharray="4 5" />
      <path d="M212 94q34-30 74-32M212 108q34 28 74 30" fill="none" stroke={line} strokeDasharray="4 5" />
      {nodes.map(([cx, cy, hot], i) => (
        <g key={i}>
          <rect
            x={cx - 32}
            y={cy - 22}
            width="64"
            height="44"
            rx="11"
            fill={hot ? `url(#${id}-hot)` : fill}
            stroke={hot ? "none" : line}
          />
          {[0, 1].map((r) => (
            <rect
              key={r}
              x={cx - 18}
              y={cy - 8 + r * 11}
              width={r === 0 ? 36 : 22}
              height="5"
              rx="2.5"
              fill={hot ? "rgba(255,255,255,0.85)" : "rgba(31,33,33,0.2)"}
            />
          ))}
        </g>
      ))}
    </>
  );
}

/* Your own documents and databases feeding one retrieval index. */
function Knowledge({ id }: { id: string }) {
  return (
    <>
      {[36, 104, 172].map((y, i) => (
        <g key={y}>
          <rect x="30" y={y - 18} width="78" height="36" rx="8" fill={fill} stroke={line} />
          <rect x="44" y={y - 7} width={52 - i * 12} height="5" rx="2.5" fill="rgba(31,33,33,0.22)" />
          <rect x="44" y={y + 2} width={34 - i * 6} height="5" rx="2.5" fill="rgba(31,33,33,0.12)" />
          <path d={`M108 ${y}q46 0 60 ${100 - y > 0 ? 34 : -34}`} fill="none" stroke={line} strokeDasharray="4 5" />
        </g>
      ))}
      <path d="M108 104h60" fill="none" stroke={line} strokeDasharray="4 5" />
      <ellipse cx="220" cy="66" rx="52" ry="16" fill={`url(#${id}-hot)`} />
      <path d="M168 66v68q0 16 52 16t52-16V66" fill={`url(#${id}-hot)`} opacity="0.9" />
      <ellipse cx="220" cy="66" rx="52" ry="16" fill="#ffffff" opacity="0.28" />
      <path d="M168 100q0 16 52 16t52-16M168 124q0 16 52 16t52-16" fill="none" stroke="rgba(255,255,255,0.55)" />
      <path d="M272 100h46" stroke={line} strokeDasharray="4 5" />
      <circle cx="326" cy="100" r="10" fill={fill} stroke={line} />
      <circle cx="326" cy="100" r="4" fill={`url(#${id}-hot)`} />
    </>
  );
}

/* One standard socket between the agent and every external tool. */
function Mcp({ id }: { id: string }) {
  const tools = [30, 86, 142, 198];
  return (
    <>
      <rect x="126" y="24" width="108" height="42" rx="12" fill={`url(#${id}-hot)`} />
      <rect x="146" y="38" width="68" height="6" rx="3" fill="rgba(255,255,255,0.9)" />
      <rect x="146" y="50" width="44" height="6" rx="3" fill="rgba(255,255,255,0.55)" />
      <path d="M180 66v20" stroke={line} />
      <rect x="96" y="86" width="168" height="30" rx="15" fill={fill} stroke="rgba(217,97,25,0.55)" />
      <text
        x="180"
        y="106"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.14em"
        fill="#d96119"
        fontFamily="Inter, sans-serif"
      >
        MCP
      </text>
      {tools.map((x, i) => (
        <g key={x}>
          <path d={`M180 116q0 22 ${x + 36 - 180} 26`} fill="none" stroke={line} strokeDasharray="4 5" />
          <rect x={x} y="148" width="72" height="34" rx="9" fill={fill} stroke={line} />
          <circle cx={x + 17} cy="165" r="6" fill={i === 1 ? `url(#${id}-hot)` : "rgba(31,33,33,0.2)"} />
          <rect x={x + 29} y="162" width="30" height="5" rx="2.5" fill="rgba(31,33,33,0.18)" />
        </g>
      ))}
    </>
  );
}

/* Checks on the way in and on the way out, with everything logged. */
function GuardRail({ id }: { id: string }) {
  return (
    <>
      <rect x="18" y="82" width="62" height="36" rx="9" fill={fill} stroke={line} />
      <rect x="32" y="96" width="34" height="5" rx="2.5" fill="rgba(31,33,33,0.2)" />
      <rect x="32" y="105" width="22" height="5" rx="2.5" fill="rgba(31,33,33,0.12)" />
      <path d="M80 100h26" stroke={line} />
      <path d="M100 94l8 6-8 6" fill="none" stroke={line} />
      <path
        d="M180 26l58 22v46c0 34-24 60-58 74-34-14-58-40-58-74V48z"
        fill="rgba(217,97,25,0.08)"
        stroke="rgba(217,97,25,0.5)"
      />
      <path d="M158 100l16 16 30-34" fill="none" stroke={`url(#${id}-hot)`} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M254 100h26" stroke={line} />
      <path d="M274 94l8 6-8 6" fill="none" stroke={line} />
      <rect x="280" y="82" width="62" height="36" rx="9" fill={fill} stroke={line} />
      <rect x="294" y="96" width="34" height="5" rx="2.5" fill="rgba(31,33,33,0.2)" />
      <rect x="294" y="105" width="22" height="5" rx="2.5" fill="rgba(31,33,33,0.12)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={148 + i * 32} cy="176" r="4" fill={i === 1 ? "#d96119" : "rgba(31,33,33,0.25)"} />
        </g>
      ))}
      <path d="M124 176h108" stroke={faint} />
    </>
  );
}

/* Build, ship, watch, improve — a closed loop rather than a handover. */
function Lifecycle({ id }: { id: string }) {
  const stops: [number, number][] = [
    [180, 40],
    [268, 100],
    [180, 160],
    [92, 100],
  ];
  return (
    <>
      <ellipse cx="180" cy="100" rx="88" ry="60" fill="none" stroke={line} strokeDasharray="5 6" />
      <path
        d="M180 40a88 60 0 0 1 88 60"
        fill="none"
        stroke={`url(#${id}-hot)`}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M262 92l8 10-11 6" fill="none" stroke="#d96119" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {stops.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="17" fill={i === 0 ? `url(#${id}-hot)` : fill} stroke={i === 0 ? "none" : line} />
          <circle cx={cx} cy={cy} r="5" fill={i === 0 ? "#ffffff" : "rgba(31,33,33,0.3)"} />
        </g>
      ))}
      <rect x="146" y="88" width="68" height="8" rx="4" fill="rgba(31,33,33,0.14)" />
      <rect x="146" y="104" width="44" height="8" rx="4" fill="rgba(217,97,25,0.5)" />
    </>
  );
}

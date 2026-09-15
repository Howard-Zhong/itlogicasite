import Counter from "./Counter";
import { GRID_COLS, GRID_ROWS, LAND_GRID } from "@/data/landGrid";
import { keyMetrics } from "@/data/site";
import styles from "./WorldMap.module.css";

/** Grid cell pitch in viewBox units. */
const CELL = 2.2;
const DOT = 0.72;
const W = GRID_COLS * CELL;
const H = GRID_ROWS * CELL;

/** Build every land dot as a single path — one DOM node instead of ~1,800. */
function landPath() {
  let d = "";
  for (let r = 0; r < GRID_ROWS; r++) {
    const row = LAND_GRID[r];
    for (let c = 0; c < GRID_COLS; c++) {
      if (row[c] !== "1") continue;
      const cx = c * CELL + CELL / 2;
      const cy = r * CELL + CELL / 2;
      d += `M${cx - DOT},${cy}a${DOT},${DOT} 0 1,0 ${DOT * 2},0a${DOT},${DOT} 0 1,0 ${-DOT * 2},0`;
    }
  }
  return d;
}

const LAND_D = landPath();

/** Positions derived from the same equirectangular projection as the grid. */
const pins = [
  { key: "atlanta", x: 28.96, y: 15.33, label: "Atlanta", sub: "Headquarters", flip: false },
  { key: "nanjing", x: 99.34, y: 15.91, label: "Nanjing", sub: "Delivery Center", flip: true },
] as const;

export default function WorldMap({ showMetrics = true }: { showMetrics?: boolean }) {
  const a = { x: pins[0].x * CELL + CELL / 2, y: pins[0].y * CELL + CELL / 2 };
  const b = { x: pins[1].x * CELL + CELL / 2, y: pins[1].y * CELL + CELL / 2 };

  return (
    <div className={styles.wrap}>
      <svg className={styles.svg} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="ITLogica offices in Atlanta, USA and Nanjing, China">
        <defs>
          <linearGradient id="wm-arc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d96119" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#f0873a" stopOpacity="1" />
            <stop offset="100%" stopColor="#d96119" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="wm-hot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0873a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f0873a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path className={styles.dots} d={LAND_D} />

        {/* Great-circle style link between the two offices */}
        <path className={styles.arc} d={`M${a.x},${a.y} Q ${(a.x + b.x) / 2},${a.y - 34} ${b.x},${b.y}`} />

        {pins.map((pin, i) => {
          const x = pin.x * CELL + CELL / 2;
          const y = pin.y * CELL + CELL / 2;
          const boxW = 34;
          const boxX = pin.flip ? x - boxW - 5 : x + 5;
          return (
            <g className={styles.pin} key={pin.key}>
              <circle cx={x} cy={y} r="14" fill="url(#wm-hot)" />
              <circle
                className={`${styles.pulse} ${i ? styles.pulse2 : ""}`}
                cx={x}
                cy={y}
                r="3.2"
                fill="#f0873a"
              />
              <circle cx={x} cy={y} r="2" fill="#f0873a" />
              <circle cx={x} cy={y} r="3.6" fill="none" stroke="#f0873a" strokeWidth="0.5" />
              <line x1={x} y1={y} x2={pin.flip ? boxX + boxW : boxX} y2={y - 12} stroke="rgba(240,135,58,0.6)" strokeWidth="0.4" />
              <g transform={`translate(0 ${-12})`}>
                <rect className={styles.pinBox} x={boxX} y={y - 8} width={boxW} height="13" rx="2" />
                <text className={styles.pinLabel} x={boxX + 3.5} y={y - 2.4}>
                  {pin.label}
                </text>
                <text className={styles.pinSub} x={boxX + 3.5} y={y + 2.4}>
                  {pin.sub}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {showMetrics && (
        <div className={styles.metrics}>
          {keyMetrics.map((m) => (
            <div className={styles.metric} key={m.label}>
              <p className={styles.metricValue}>
                <Counter value={m.value} />
              </p>
              <p className={styles.metricLabel}>{m.label}</p>
              <p className={styles.metricDetail}>{m.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

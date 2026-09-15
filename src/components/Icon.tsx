import type { ReactElement, SVGProps } from "react";

export type IconName =
  | "ai"
  | "data"
  | "cloud"
  | "iot"
  | "apps"
  | "delivery"
  | "managed"
  | "distributed"
  | "staff"
  | "clock"
  | "target"
  | "layers"
  | "globe"
  | "handover"
  | "shield"
  | "arrow"
  | "arrow-down"
  | "spark"
  | "eye"
  | "compass"
  | "gift"
  | "menu"
  | "close"
  | "mail"
  | "pin"
  | "phone"
  | "check";

const paths: Record<IconName, ReactElement> = {
  ai: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="3" />
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </>
  ),
  data: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" />
      <path d="M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 19a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 17.7 9.2 4.2 4.2 0 0 1 17 19z" />
      <path d="M12 12v5M9.6 14.4 12 12l2.4 2.4" />
    </>
  ),
  iot: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M8.2 8.2a5.4 5.4 0 0 0 0 7.6M15.8 8.2a5.4 5.4 0 0 1 0 7.6" />
      <path d="M5.4 5.4a9.4 9.4 0 0 0 0 13.2M18.6 5.4a9.4 9.4 0 0 1 0 13.2" />
    </>
  ),
  apps: (
    <>
      <rect x="3" y="4" width="13" height="12" rx="2" />
      <path d="M3 12h13" />
      <rect x="16.5" y="9" width="5" height="11" rx="1.6" />
      <path d="M8 20h4" />
    </>
  ),
  delivery: (
    <>
      <path d="M3 7.5 12 3l9 4.5-9 4.5z" />
      <path d="M3 12.5 12 17l9-4.5M3 17 12 21.5 21 17" />
    </>
  ),
  managed: (
    <>
      <path d="M12 3.2 4.5 6.4v5.3c0 4.4 3.1 8.4 7.5 9.6 4.4-1.2 7.5-5.2 7.5-9.6V6.4z" />
      <path d="m9.2 12.3 2 2 3.6-3.9" />
    </>
  ),
  distributed: (
    <>
      <circle cx="12" cy="5" r="2.4" />
      <circle cx="5" cy="18" r="2.4" />
      <circle cx="19" cy="18" r="2.4" />
      <path d="M10.6 7 6.4 15.6M13.4 7l4.2 8.6M7.4 18h9.2" />
    </>
  ),
  staff: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16.5 6.2a3.2 3.2 0 0 1 0 5.8M17.5 14.6a5.5 5.5 0 0 1 3 4.9" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.8V12l3.4 2.2" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3 3.5 7.3 12 11.6l8.5-4.3z" />
      <path d="m3.5 12 8.5 4.3 8.5-4.3M3.5 16.4 12 20.7l8.5-4.3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
    </>
  ),
  handover: (
    <>
      <path d="M3 12h11" />
      <path d="m10.5 8 4 4-4 4" />
      <path d="M17 4.5h2.5A1.5 1.5 0 0 1 21 6v12a1.5 1.5 0 0 1-1.5 1.5H17" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 4.5 6.4v5.3c0 4.4 3.1 8.4 7.5 9.6 4.4-1.2 7.5-5.2 7.5-9.6V6.4z" />
    </>
  ),
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  "arrow-down": <path d="M12 4v15m-6-6 6 6 6-6" />,
  spark: (
    <>
      <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
      <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4z" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5.2-5.2 2 2-5.2z" />
    </>
  ),
  gift: (
    <>
      <rect x="3.5" y="9" width="17" height="11.5" rx="1.6" />
      <path d="M3.5 13.2h17M12 9v11.5" />
      <path d="M12 9S10.5 4 8 4a2.2 2.2 0 0 0 0 5zM12 9s1.5-5 4-5a2.2 2.2 0 0 1 0 5z" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.6 7 8.4 6 8.4-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  phone: (
    <path d="M6.2 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.4 6.4l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2z" />
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
};

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export default function Icon({ name, size = 24, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

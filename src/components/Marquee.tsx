import type { ReactNode } from "react";

/**
 * Infinite horizontal marquee. Children are rendered twice so the
 * -50% translate loop is seamless.
 */
export default function Marquee({
  children,
  duration = 46,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee ${reverse ? "marquee-reverse" : ""} ${className}`.trim()}>
      <div
        className="marquee-track"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div style={{ display: "flex" }} aria-hidden={false}>
          {children}
        </div>
        <div style={{ display: "flex" }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

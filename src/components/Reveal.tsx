"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Stagger in ms. */
  delay?: number;
  /** `up` slides in from below, `clip` wipes horizontally. */
  variant?: "up" | "clip";
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
};

export default function Reveal({
  children,
  delay = 0,
  variant = "up",
  as: Tag = "div",
  className = "",
  style,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const base = variant === "clip" ? "reveal reveal-clip" : "reveal";

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${base}${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

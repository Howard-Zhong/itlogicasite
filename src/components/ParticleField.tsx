"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

/**
 * Connected-particle field rendered on canvas. Nodes drift, link to their
 * nearest neighbours, and lean toward the pointer — the "network of systems"
 * motif behind the hero. Pauses when off-screen and respects reduced motion.
 */
export default function ParticleField({
  className,
  density = 0.00011,
  linkDistance = 148,
  color = "255, 255, 255",
  accent = "255, 214, 170",
}: {
  className?: string;
  density?: number;
  linkDistance?: number;
  color?: string;
  accent?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let frame = 0;
    let running = true;
    const pointer = { x: -9999, y: -9999, active: false };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(150, Math.max(34, width * height * density)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: Math.random() * 1.7 + 0.7,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 190 && dist > 0.5) {
            p.x += (dx / dist) * 0.32;
            p.y += (dy / dist) * 0.32;
          }
        }
      }

      // Links
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDistance) continue;
          const alpha = (1 - dist / linkDistance) * 0.34;
          ctx.strokeStyle = `rgba(${color}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Nodes
      for (const p of particles) {
        const near =
          pointer.active && Math.hypot(pointer.x - p.x, pointer.y - p.y) < 150;
        ctx.fillStyle = near ? `rgba(${accent}, 0.95)` : `rgba(${color}, 0.72)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? p.r * 1.7 : p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running && !reduced) frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      build();
      if (reduced) draw();
    });
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !running) {
            running = true;
            if (!reduced) frame = requestAnimationFrame(draw);
          } else if (!entry.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(frame);
          }
        });
      },
      { threshold: 0 }
    );
    visibility.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [density, linkDistance, color, accent]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

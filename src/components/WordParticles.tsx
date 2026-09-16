"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  r: number;
  tr: number;
  jitter: number;
  phase: number;
  alpha: number;
  targetAlpha: number;
  hot: boolean;
};

type Shape = { points: { x: number; y: number }[]; dot: number };

const DEFAULT_WORDS = ["AI", "Data", "Cloud", "IoT", "Mobile", "Web"];

/**
 * Field of light points that continuously reassembles itself into words
 * (AI → Data → Cloud → IoT → Mobile → Web). Points are sampled from the
 * rendered glyphs of each word and spring into place — dots only, no
 * connecting lines. Pauses off-screen, respects reduced motion, and
 * re-samples on resize.
 */
export default function WordParticles({
  className,
  words = DEFAULT_WORDS,
  color = "255, 255, 255",
  accent = "247, 150, 74",
  holdMs = 2200,
  morphMs = 1500,
}: {
  className?: string;
  words?: string[];
  color?: string;
  accent?: string;
  holdMs?: number;
  morphMs?: number;
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
    let nodes: Node[] = [];
    let shapes: Shape[] = [];
    let wordIndex = 0;
    let stageUntil = 0;
    let frame = 0;
    let running = true;

    /* ---------------------------------------------------- Sample a word ---- */
    const fontOf = (s: number) =>
      `800 ${s}px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

    /** Largest size at which the word's real ink box fits the drawing box. */
    const fitSize = (octx: CanvasRenderingContext2D, word: string, boxW: number, boxH: number) => {
      let size = Math.min(boxH * 1.25, boxW * 0.8);
      for (let pass = 0; pass < 10; pass++) {
        octx.font = fontOf(size);
        const m = octx.measureText(word);
        const inkW =
          (m.actualBoundingBoxLeft || 0) + (m.actualBoundingBoxRight || 0) || m.width;
        const inkH =
          (m.actualBoundingBoxAscent || size * 0.72) + (m.actualBoundingBoxDescent || size * 0.2);
        if (inkW <= 0 || inkH <= 0) break;
        const scale = Math.min(boxW / inkW, boxH / inkH);
        if (scale > 0.99 && scale < 1.04) break;
        size = Math.max(24, size * Math.min(scale, 1.8));
      }
      return size;
    };

    const rasterize = (word: string, size: number): Shape => {
      const w = Math.max(80, Math.floor(width));
      const h = Math.max(60, Math.floor(height));
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return { points: [], dot: 2 };

      octx.textAlign = "center";
      octx.textBaseline = "alphabetic";
      octx.font = fontOf(size);
      const m = octx.measureText(word);
      const ascent = m.actualBoundingBoxAscent || size * 0.72;
      const descent = m.actualBoundingBoxDescent || size * 0.2;
      const left = m.actualBoundingBoxLeft || 0;
      const right = m.actualBoundingBoxRight || 0;
      // Centre on the ink box, not the advance box — the two are not the same
      // and trusting the advance box pushed the last letter off the canvas.
      octx.fillStyle = "#fff";
      octx.fillText(word, w / 2 + (left - right) / 2, h / 2 + (ascent - descent) / 2);

      const data = octx.getImageData(0, 0, w, h).data;
      // Sample relative to glyph weight (~3 dots across a stroke) so every
      // word stays legible whether it is two letters or six.
      const gap = Math.min(Math.max(4, size * 0.047), Math.min(w, h) / 12);
      const points: { x: number; y: number }[] = [];
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const px = Math.min(w - 1, Math.round(x));
          const py = Math.min(h - 1, Math.round(y));
          if (data[(py * w + px) * 4 + 3] > 130) {
            points.push({
              x: x + (Math.random() - 0.5) * gap * 0.35,
              y: y + (Math.random() - 0.5) * gap * 0.35,
            });
          }
        }
      }
      // Left-to-right ordering keeps each morph calm instead of criss-crossed.
      points.sort((a, b) => a.x - b.x || a.y - b.y);
      return { points, dot: Math.min(3.6, Math.max(1.8, gap * 0.3)) };
    };

    /**
     * Fit every word first, then cap the short ones at 1.6× the most
     * constrained word. Without this "AI" towers over "Mobile" and the
     * cap-height jumps around on every change.
     */
    const sampleAll = () => {
      const probe = document.createElement("canvas").getContext("2d");
      if (!probe) return words.map((w) => rasterize(w, 120));
      const boxW = Math.max(80, width) * 0.88;
      const boxH = Math.max(60, height) * 0.76;
      const fitted = words.map((w) => fitSize(probe, w, boxW, boxH));
      const floor = Math.min(...fitted);
      return words.map((w, i) => rasterize(w, Math.min(fitted[i], floor * 1.6)));
    };

    /* ------------------------------------------------------------- Build --- */
    const build = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      shapes = sampleAll();
      // One particle per point of the densest word, so no word is ever drawn
      // only partly — the old fixed cap cut the longer words off mid-stroke.
      const pool = Math.max(40, ...shapes.map((s) => s.points.length));

      nodes = Array.from({ length: pool }, () => ({
        x: width / 2 + (Math.random() - 0.5) * width,
        y: height / 2 + (Math.random() - 0.5) * height,
        vx: 0,
        vy: 0,
        tx: width / 2,
        ty: height / 2,
        r: 2,
        tr: 2,
        jitter: 0.84 + Math.random() * 0.36,
        phase: Math.random() * Math.PI * 2,
        alpha: 0,
        targetAlpha: 1,
        hot: Math.random() < 0.15,
      }));

      assign(wordIndex);
      nodes.forEach((n) => (n.r = n.tr));
      stageUntil = performance.now() + morphMs + holdMs;
    };

    /* ------------------------------------------------- Assign to a word ---- */
    const assign = (index: number) => {
      const shape = shapes[index];
      const pts = shape ? shape.points : [];
      const m = pts.length;
      nodes.forEach((n, i) => {
        if (m === 0) {
          n.targetAlpha = 0;
          return;
        }
        n.tr = shape.dot * n.jitter;
        if (i < m) {
          n.tx = pts[i].x;
          n.ty = pts[i].y;
          n.targetAlpha = 1;
        } else {
          // Surplus particles for a sparser word fade out instead of doubling
          // up on a stroke and thickening it.
          const p = pts[i % m];
          n.tx = p.x + (Math.random() - 0.5) * 34;
          n.ty = p.y + (Math.random() - 0.5) * 34;
          n.targetAlpha = 0;
        }
      });
    };

    /* -------------------------------------------------------------- Draw --- */
    const step = (now: number) => {
      if (now > stageUntil) {
        wordIndex = (wordIndex + 1) % words.length;
        assign(wordIndex);
        stageUntil = now + morphMs + holdMs;
      }

      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        const dx = n.tx - n.x;
        const dy = n.ty - n.y;
        n.vx = (n.vx + dx * 0.022) * 0.86;
        n.vy = (n.vy + dy * 0.022) * 0.86;
        n.x += n.vx;
        n.y += n.vy;
        n.r += (n.tr - n.r) * 0.08;

        // Gentle breathing so a held word never looks frozen.
        n.phase += 0.016;
        if (Math.abs(dx) + Math.abs(dy) < 6) {
          n.x += Math.sin(n.phase) * 0.22;
          n.y += Math.cos(n.phase * 0.8) * 0.22;
        }

        n.alpha += (n.targetAlpha - n.alpha) * 0.07;
      }

      for (const n of nodes) {
        if (n.alpha < 0.02) continue;
        const moving = Math.hypot(n.vx, n.vy) > 0.9;
        ctx.fillStyle =
          n.hot || moving
            ? `rgba(${accent}, ${Math.min(1, n.alpha * 0.95)})`
            : `rgba(${color}, ${n.alpha * 0.88})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, moving ? n.r * 0.8 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running && !reduced) frame = requestAnimationFrame(step);
    };

    const snap = () => {
      nodes.forEach((n) => {
        n.x = n.tx;
        n.y = n.ty;
        n.r = n.tr;
        n.alpha = n.targetAlpha;
      });
      stageUntil = Infinity;
      step(performance.now());
    };

    build();
    if (reduced) snap();
    else frame = requestAnimationFrame(step);

    const resizeObserver = new ResizeObserver(() => {
      build();
      if (reduced) snap();
    });
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !running) {
            running = true;
            stageUntil = performance.now() + morphMs + holdMs;
            if (!reduced) frame = requestAnimationFrame(step);
          } else if (!entry.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(frame);
          }
        });
      },
      { threshold: 0 }
    );
    visibility.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
    };
  }, [words, color, accent, holdMs, morphMs]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

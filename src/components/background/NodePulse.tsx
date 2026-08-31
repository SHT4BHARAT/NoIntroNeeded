"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  baseRadius: number;
}

const CONNECTION_DISTANCE = 120;
const NODE_COUNT_FACTOR = 0.014;
const DRIFT = 0.12;

export function NodePulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DEFAULT_RGB = "124, 111, 224";
    let colorRgb = DEFAULT_RGB;

    // Read the active theme's accent triplet so the canvas tint matches the
    // palette in both light and dark mode.
    function refreshAccentRgb() {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-signal-rgb")
        .trim();
      if (value) colorRgb = value;
    }
    refreshAccentRgb();

    let animId: number;
    let frameIndex = 0;
    const startTime = performance.now();
    const FADE_DURATION = 30000;
    const nodes: Node[] = [];
    let w = 0;
    let h = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;

      const baseCount = Math.floor(Math.sqrt(w * h) * NODE_COUNT_FACTOR);
      const count = prefersReducedMotion ? Math.min(22, Math.floor(baseCount * 0.45)) : Math.min(60, baseCount);

      while (nodes.length < count) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * DRIFT,
          vy: (Math.random() - 0.5) * DRIFT,
          phase: Math.random() * Math.PI * 2,
          baseRadius: 0.9 + Math.random() * 1.2,
        });
      }
      if (nodes.length > count) nodes.length = count;
    }

    resize();

    function draw() {
      // Nudge the accent color periodically so a mid-session theme toggle
      // doesn't leave a stale tint on the canvas.
      if (frameIndex % 30 === 0) refreshAccentRgb();
      frameIndex++;
      ctx!.clearRect(0, 0, w, h);
      const time = performance.now() / 1000;
      const elapsed = performance.now() - startTime;

      // Fade out after FADE_DURATION, then stop animating
      const fadeProgress = elapsed < FADE_DURATION ? 1 : Math.max(0, 1 - (elapsed - FADE_DURATION) / 3000);
      if (fadeProgress <= 0 && elapsed > FADE_DURATION + 3000) {
        ctx!.clearRect(0, 0, w, h);
        return;
      }

      // Soft "breathing" modulation for connections
      const breathe = (0.85 + 0.15 * Math.sin(time * 0.55)) * fadeProgress;

      if (!prefersReducedMotion) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
          n.x = Math.max(0, Math.min(w, n.x));
          n.y = Math.max(0, Math.min(h, n.y));
        }
      }

      const connections: Array<[Node, Node, number]> = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            connections.push([nodes[i], nodes[j], dist]);
          }
        }
      }

      ctx!.beginPath();
      for (const [a, b, dist] of connections) {
        const t = 1 - dist / CONNECTION_DISTANCE;
        const alpha = t * t * 0.10 * breathe;
        // Slight temporal jitter for less “static” look
        const jitter = 0.9 + 0.1 * Math.sin(time * 1.1 + a.phase * 0.3 + b.phase * 0.7);
        ctx!.strokeStyle = `rgba(${colorRgb}, ${(alpha * jitter).toFixed(3)})`;
        ctx!.lineWidth = 0.45;
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
      }
      ctx!.stroke();

      for (const n of nodes) {
        const pulse = 1 + 0.25 * Math.sin(time * 1.0 + n.phase);
        const r = n.baseRadius * pulse;

        // Lower saturation for a calmer background
        const alpha = (0.18 + 0.22 * (0.5 + 0.5 * Math.sin(time * 0.75 + n.phase))) * fadeProgress;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${colorRgb}, ${alpha.toFixed(3)})`;
        ctx!.fill();
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(draw);
      }
    }

    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    return () => {
      if (!prefersReducedMotion) cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  );
}

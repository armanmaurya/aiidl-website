"use client";

import { useEffect, useState, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

/** True only on devices with a precise hover-capable pointer (mouse/trackpad). */
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

/**
 * Tracks the pointer relative to an element. Returns sprung values in the
 * range -0.5…0.5 (centre = 0) plus raw pixel coordinates for spotlights.
 */
export function useRelativePointer(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const px = useMotionValue(-1000);
  const py = useMotionValue(-1000);
  const x = useSpring(rx, { stiffness: 120, damping: 20, mass: 0.6 });
  const y = useSpring(ry, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      rx.set((e.clientX - r.left) / r.width - 0.5);
      ry.set((e.clientY - r.top) / r.height - 0.5);
      px.set(e.clientX - r.left);
      py.set(e.clientY - r.top);
    };
    const leave = () => {
      rx.set(0);
      ry.set(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [ref, enabled, rx, ry, px, py]);

  return { x, y, px, py } as {
    x: MotionValue<number>;
    y: MotionValue<number>;
    px: MotionValue<number>;
    py: MotionValue<number>;
  };
}

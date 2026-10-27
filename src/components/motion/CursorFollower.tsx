"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "./usePointer";

/**
 * A soft ring that trails the native cursor. It swells over interactive
 * elements and shows a short label over anything with `data-cursor="…"`.
 * Uses difference blending so it reads on both light and dark sections.
 */
export function CursorFollower() {
  const fine = useFinePointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });
  const [mode, setMode] = useState<"idle" | "link" | "label">("idle");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!fine) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setMode("label");
        setLabel(labelled.dataset.cursor ?? "");
      } else if (target?.closest("a, button, summary, input, textarea, [role='button']")) {
        setMode("link");
      } else {
        setMode("idle");
      }
    };
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  const size = mode === "label" ? 88 : mode === "link" ? 52 : 28;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: ringX, y: ringY }}
      className="pointer-events-none fixed left-0 top-0 z-[70] mix-blend-difference"
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.85 : 1,
          backgroundColor: mode === "idle" ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white"
      >
        <AnimatePresence>
          {mode === "label" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-[0.6875rem] font-medium text-black"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

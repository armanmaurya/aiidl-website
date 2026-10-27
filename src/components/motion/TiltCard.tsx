"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useTransform } from "framer-motion";
import { useFinePointer, useRelativePointer } from "./usePointer";

/**
 * Card that tilts a few degrees toward the cursor and carries a soft light
 * where the pointer sits. Static on touch devices.
 */
export function TiltCard({
  children,
  className = "",
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const { x, y, px, py } = useRelativePointer(ref, fine);
  const rotateY = useTransform(x, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(y, [-0.5, 0.5], [max, -max]);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${px}px ${py}px, rgba(255,255,255,0.22), transparent 60%)`;

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        style={fine ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className="group relative h-full rounded-[inherit]"
      >
        {children}
        {fine && (
          <motion.div
            aria-hidden="true"
            style={{ background: glow }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </motion.div>
    </div>
  );
}

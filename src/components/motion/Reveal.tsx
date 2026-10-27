"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Vertical travel in px before the element settles. */
  distance?: number;
  /** Shifts the reveal window later (0–0.3) to stagger siblings. */
  delay?: number;
}

/**
 * Scroll-linked fade + lift. Progress is tied directly to the element's
 * position in the viewport, so it plays forwards and backwards with scroll.
 */
export function Reveal({ children, className, distance = 48, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${100 - delay * 100}%`, `start ${65 - delay * 100}%`],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [distance, 0]);

  return (
    <motion.div ref={ref} style={reduce ? undefined : { opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

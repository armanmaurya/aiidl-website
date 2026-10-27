"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ScaleFrameProps {
  children: ReactNode;
  className?: string;
  label: string;
}

/**
 * Media frame that grows into place as it enters the viewport while its
 * contents drift slightly slower than the page (a soft parallax).
 */
export function ScaleFrame({ children, className = "", label }: ScaleFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.3, 1]);
  const innerY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <motion.div
      ref={ref}
      role="img"
      aria-label={label}
      style={reduce ? undefined : { scale, opacity }}
      className={`relative overflow-hidden rounded-[1.75rem] ${className}`}
    >
      <motion.div aria-hidden="true" style={reduce ? undefined : { y: innerY }} className="h-full w-full">
        {children}
      </motion.div>
    </motion.div>
  );
}

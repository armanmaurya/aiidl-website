"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

/**
 * Endless strip that drifts on its own and speeds up (or reverses) with the
 * reader's scroll velocity.
 */
export function VelocityMarquee({ items, baseSpeed = 2.5 }: { items: string[]; baseSpeed?: number }) {
  const reduce = useReducedMotion();
  const offset = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(offset, (v) => `${wrap(-50, 0, v)}%`);
  const skew = useTransform(velocity, [-2000, 0, 2000], [6, 0, -6]);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseSpeed * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * Math.abs(f);
    offset.set(offset.get() - move);
  });

  const row = [...items, ...items];

  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-line py-6 sm:py-8">
      <motion.div style={{ x, skewX: reduce ? 0 : skew }} className="flex w-max whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {row.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="h-display flex items-center gap-8 pr-8 text-[clamp(2rem,5vw,4rem)] leading-none sm:gap-12 sm:pr-12"
              >
                <span className={i % 2 ? "font-serif font-normal italic tracking-normal text-muted" : ""}>{item}</span>
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

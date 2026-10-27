"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

export interface Step {
  title: string;
  meta: string;
  body: string;
}

/** Numbered steps joined by a line that draws itself as the reader scrolls. */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 55%"] });

  return (
    <ol ref={listRef} className="relative">
      <span aria-hidden="true" className="absolute bottom-6 left-[1.4375rem] top-6 w-px bg-ink/10" />
      <motion.span
        aria-hidden="true"
        style={reduce ? undefined : { scaleY: scrollYProgress }}
        className="absolute bottom-6 left-[1.4375rem] top-6 w-px origin-top bg-accent"
      />
      {steps.map((step, i) => (
        <StepItem key={step.title} step={step} index={i} reduce={!!reduce} />
      ))}
    </ol>
  );
}

function StepItem({ step, index, reduce }: { step: Step; index: number; reduce: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72%", "start 55%"] });
  const bg = useTransform(scrollYProgress, [0, 1], ["#F5F2EC", "#1C1814"]);
  const color = useTransform(scrollYProgress, [0, 1], ["#1C1814", "#F5F2EC"]);

  return (
    <li ref={ref} className="relative flex gap-6 pb-14 last:pb-0 sm:gap-8">
      <motion.span
        style={reduce ? { background: "#1C1814", color: "#F5F2EC" } : { background: bg, color }}
        className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-sm font-medium ring-1 ring-ink/10"
      >
        0{index + 1}
      </motion.span>
      <Reveal className="pt-2">
        <p className="text-sm font-medium text-accent-ink">{step.meta}</p>
        <h3 className="h-display mt-1 text-2xl sm:text-3xl">{step.title}</h3>
        <p className="mt-3 max-w-lg leading-relaxed text-muted">{step.body}</p>
      </Reveal>
    </li>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";

/** Navy panel that opens out to full bleed as it scrolls into view. */
export function ClosingCta({
  title = "Have something in mind?",
  accent = "Let's build it.",
}: {
  title?: string;
  accent?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 25%"] });
  const inset = useTransform(scrollYProgress, [0, 1], [7, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const clipPath = useMotionTemplate`inset(0 ${inset}% round ${radius}px)`;

  return (
    <section id="start" ref={ref} aria-labelledby="cta-title" className="pt-6">
      <motion.div
        data-nav="dark"
        style={reduce ? undefined : { clipPath }}
        className="surface-night relative overflow-hidden py-32 text-paper sm:py-44"
      >
        <div className="container-page relative">
          <SplitReveal
            id="cta-title"
            text={`${title} ${accent.split(" ").map((w) => `*${w}`).join(" ")}`}
            accentClassName="text-accent"
            className="h-display max-w-4xl text-[clamp(2.75rem,8vw,7rem)] leading-[0.95]"
          />
          <Reveal delay={0.08} className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-lg leading-relaxed text-paper/70">
              Tell us what you&apos;re working on. We&apos;ll come back with honest questions and a sensible first step.
              <span className="mt-3 block text-base text-paper/50">
                Or write to{" "}
                <a href="mailto:hello@aiidltechnologies.com" className="text-paper underline decoration-paper/30 underline-offset-4 transition-colors hover:decoration-accent">
                  hello@aiidltechnologies.com
                </a>
              </span>
            </p>
            <Magnetic>
              <Link href="/contact" className="btn-light group px-8 py-4 text-base">
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

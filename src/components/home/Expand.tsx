"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const promises = [
  ["1–2 weeks", "to a scoped, priced plan"],
  ["Every sprint", "working software you can click"],
  ["100%", "of the code is yours"],
];

/**
 * Pinned chapter: a small rounded window in the middle of the screen opens
 * out to fill the viewport, and the scene inside settles from a zoom as it does.
 */
export function Expand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // 0 → 0.6: the window opens. 0.55 → 0.85: content inside arrives.
  const insetY = useTransform(scrollYProgress, [0, 0.6], [34, 0]);
  const insetX = useTransform(scrollYProgress, [0, 0.6], [38, 0]);
  const radius = useTransform(scrollYProgress, [0, 0.6], [200, 0]);
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% round ${radius}px)`;

  const sceneScale = useTransform(scrollYProgress, [0, 0.65], [1.6, 1]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.18], [0, -40]);
  const titleOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.35, 0.6], [40, 0]);
  const listOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const listY = useTransform(scrollYProgress, [0.6, 0.8], [30, 0]);
  const markScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.4]);
  const markOpacity = useTransform(scrollYProgress, [0.2, 0.45], [1, 0]);

  if (reduce) {
    return (
      <section id="growth" data-nav="dark" aria-labelledby="expand-title" className="surface-night py-28 text-paper">
        <div className="container-page">
          <ExpandContent />
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="growth" aria-labelledby="expand-title" className="relative h-[260vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Line that sits above the small window before it opens */}
        <motion.p
          style={{ opacity: introOpacity, y: introY }}
          className="h-display absolute inset-x-0 top-[17%] px-5 text-center text-[clamp(1.5rem,3vw,2.25rem)] text-ink"
        >
          Every product starts <span className="font-serif font-normal italic tracking-normal text-accent-ink">small.</span>
        </motion.p>

        <motion.div
          data-nav="dark"
          style={{ clipPath }}
          className="absolute inset-0 bg-night bg-[radial-gradient(60%_60%_at_50%_45%,rgba(255,107,26,0.22),transparent_70%)] text-paper"
        >
          <motion.div style={{ scale: sceneScale }} className="flex h-full w-full items-center">
            {/* Glowing mark visible while the window is still small */}
            <motion.div
              aria-hidden="true"
              style={{ scale: markScale, opacity: markOpacity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="h-48 w-48 rounded-full bg-accent/45 blur-3xl" />
              <svg viewBox="0 0 1000 1000" className="absolute h-14 w-14">
                <path d="M928.5 287.3L128.8 672.7L18.5 874.4Z" fill="#FF6B1A" />
                <path
                  d="M482.4 26.1L1000.0 973.9L477.1 798.0L0.0 963.3L474.7 658.6L712.9 715.2L481.7 284.8L319.6 580.7L128.8 672.7Z"
                  fill="#F5F2EC"
                />
              </svg>
            </motion.div>

            <div className="container-page relative">
              <ExpandContent
                titleStyle={{ opacity: titleOpacity, y: titleY }}
                listStyle={{ opacity: listOpacity, y: listY }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ExpandContent({
  titleStyle,
  listStyle,
}: {
  titleStyle?: React.ComponentProps<typeof motion.div>["style"];
  listStyle?: React.ComponentProps<typeof motion.div>["style"];
}) {
  return (
    <>
      <motion.div style={titleStyle}>
        <p className="eyebrow text-paper/60">How it grows</p>
        <h2
          id="expand-title"
          className="h-display mt-6 max-w-4xl text-[clamp(2.5rem,7vw,6rem)] leading-[0.98]"
        >
          We help it grow into something{" "}
          <span className="font-serif font-normal italic tracking-normal text-accent">people rely on.</span>
        </h2>
      </motion.div>

      <motion.dl style={listStyle} className="mt-14 grid gap-8 border-t border-white/10 pt-8 sm:mt-20 sm:grid-cols-3">
        {promises.map(([value, label]) => (
          <div key={value}>
            <dt className="font-display text-3xl font-medium tracking-tight sm:text-4xl">{value}</dt>
            <dd className="mt-2 text-paper/65">{label}</dd>
          </div>
        ))}
      </motion.dl>
    </>
  );
}

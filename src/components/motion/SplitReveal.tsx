"use client";

import { useRef, type ElementType } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Heading whose words rise out of a mask one after another, scrubbed by
 * scroll. Words wrapped in *asterisks* use the serif italic accent.
 */
export function SplitReveal({
  text,
  as: Tag = "h2",
  id,
  className,
  accentClassName = "",
}: {
  text: string;
  as?: ElementType;
  id?: string;
  className?: string;
  accentClassName?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "start 45%"] });
  const words = text.split(" ");

  return (
    <Tag ref={ref} id={id} className={className} aria-label={text.replace(/\*/g, "")}>
      <span aria-hidden="true">
        {words.map((raw, i) => {
          const accent = raw.startsWith("*");
          const word = raw.replace(/\*/g, "");
          const start = (i / words.length) * 0.6;
          return (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
              <MaskWord progress={scrollYProgress} range={[start, start + 0.4]} reduce={!!reduce}>
                <span
                  className={
                    accent ? `font-serif font-normal italic tracking-normal ${accentClassName}` : undefined
                  }
                >
                  {word}
                </span>
              </MaskWord>
              {i < words.length - 1 && " "}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}

function MaskWord({
  children,
  progress,
  range,
  reduce,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  const y = useTransform(progress, range, ["110%", "0%"]);
  const rotate = useTransform(progress, range, [4, 0]);
  return (
    <motion.span style={reduce ? undefined : { y, rotate }} className="inline-block origin-bottom-left">
      {children}
    </motion.span>
  );
}

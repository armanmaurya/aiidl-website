"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import {
  useFinePointer,
  useRelativePointer,
} from "@/components/motion/usePointer";

const ease = [0.22, 1, 0.36, 1] as const;

/** One line on wide screens; stacked on portrait ones so the word fills a phone. */
const LINES = { wide: ["SOFTWARE"], stacked: ["SOFT", "WARE"] };
/** We fly through the stem of the "T" (first line) — a solid stroke that will cover the screen. */
const ZOOM_CHAR = 3;

/** Scroll phases (0–1 of the pinned hero). */
const ZOOM: [number, number] = [0.04, 0.4];
/** After the navy tunnel, an iris opens back onto the ivory page… */
const IRIS: [number, number] = [0.42, 0.56];
/** …where the statement lights up word by word. */
const STATEMENT: [number, number] = [0.56, 0.92];

const statement =
  "Most teams don't need more software. They need the *right* software — built carefully, shipped in small steps, and owned *entirely* by them.";

interface Geometry {
  w: number;
  h: number;
  fontSize: number;
  /** Baseline of each line. */
  baselines: number[];
  /** Top of the capitals on the first line. */
  capTop: number;
  originX: number;
  originY: number;
  maxScale: number;
}

/** Fits the stencil word to the viewport and finds the point we zoom into. */
function useStencilGeometry(
  wordRef: React.RefObject<SVGGElement | null>,
  stageRef: React.RefObject<HTMLElement | null>,
) {
  const [geo, setGeo] = useState<Geometry | null>(null);
  const [stacked, setStacked] = useState(false);

  useLayoutEffect(() => {
    let retry = 0;
    const measure = () => {
      const word = wordRef.current;
      const stage = stageRef.current;
      if (!word || !stage) return;
      const w = stage.clientWidth;
      const h = stage.clientHeight;

      // Portrait screens get the stacked layout; re-render with it before measuring.
      const wantStacked = w / h < 0.8;
      if (wantStacked !== stacked) return setStacked(wantStacked);

      const texts = Array.from(word.querySelectorAll("text"));
      // After a client-side navigation the SVG text may not be laid out yet.
      if (!texts.length || texts[0].getNumberOfChars() <= ZOOM_CHAR) {
        cancelAnimationFrame(retry);
        retry = requestAnimationFrame(measure);
        return;
      }

      // Measure at a reference size, then scale so the widest line spans most of the width.
      texts.forEach((t) => t.setAttribute("font-size", "100"));
      const ref = Math.max(...texts.map((t) => t.getComputedTextLength())) || 1;
      const fontSize = Math.min(
        (w * (stacked ? 0.86 : 0.92) * 100) / ref,
        h * (stacked ? 0.22 : 0.34),
      );
      const capHeight = fontSize * 0.72;
      const lineGap = fontSize * 0.84;
      const capTop = h / 2 - (capHeight + lineGap * (texts.length - 1)) / 2;
      const baselines = texts.map((_, i) => capTop + capHeight + i * lineGap);
      texts.forEach((t, i) => {
        t.setAttribute("font-size", String(fontSize));
        t.setAttribute("y", String(baselines[i]));
      });

      const box = texts[0].getExtentOfChar(ZOOM_CHAR);
      const originX = box.x + box.width / 2;
      const originY = baselines[0] - capHeight * 0.35;
      const stem = fontSize * 0.13;
      const maxScale = Math.max(40, (2.4 * Math.max(w, h)) / stem);
      setGeo({ w, h, fontSize, baselines, capTop, originX, originY, maxScale });
    };

    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(retry);
      window.removeEventListener("resize", measure);
    };
  }, [wordRef, stageRef, stacked]);

  return {
    geo: geo && geo.baselines.length === (stacked ? 2 : 1) ? geo : null,
    lines: stacked ? LINES.stacked : LINES.wide,
  };
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<SVGGElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const { geo, lines } = useStencilGeometry(wordRef, stageRef);

  // Raw cursor position, shared by the small headline words.
  const cursorX = useMotionValue(-9999);
  const cursorY = useMotionValue(-9999);
  useEffect(() => {
    if (!fine) return;
    const move = (e: PointerEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [fine, cursorX, cursorY]);

  // A glow in the world behind the stencil follows the cursor, lighting the letters from inside.
  const pointer = useRelativePointer(stageRef, fine);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${pointer.px}px ${pointer.py}px, rgba(255,107,26,0.55), transparent 65%)`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const full = useMotionValue(1);
  const progress = reduce ? full : scrollYProgress;

  // Phase 1: supporting copy clears away.
  const copyOpacity = useTransform(progress, [0, 0.07], [1, 0]);
  const topY = useTransform(progress, [0, 0.07], [0, -40]);
  const bottomY = useTransform(progress, [0, 0.07], [0, 40]);

  // Phase 2: zoom through the letter (ease-in so it starts gently and accelerates).
  const scale = useTransform(progress, ZOOM, [1, geo?.maxScale ?? 60], {
    ease: (t) => t * t * t,
  });
  const stencilOpacity = useTransform(
    progress,
    [ZOOM[1] - 0.04, ZOOM[1]],
    [1, 0],
  );
  const stencilDisplay = useTransform(progress, (v) =>
    v >= ZOOM[1] ? "none" : "block",
  );

  // Phase 3: an iris opens from the centre back onto ivory, and the statement is read in.
  const iris = useTransform(progress, IRIS, [0, 75]);
  const irisClip = useMotionTemplate`circle(${iris}% at 50% 50%)`;
  const insideScale = useTransform(progress, IRIS, [1.15, 1]);
  const eyebrowOpacity = useTransform(
    progress,
    [IRIS[1] - 0.04, IRIS[1] + 0.02],
    [0, 1],
  );
  const hintOpacity = useTransform(progress, [0, 0.04], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="intro"
      aria-labelledby="hero-title"
      className={`relative bg-night ${reduce ? "" : "h-[320vh] sm:h-[380vh]"}`}
    >
      <h1 id="hero-title" className="sr-only">
        Small teams deserve software that actually fits.
      </h1>

      <div
        ref={stageRef}
        className={
          reduce
            ? "relative flex flex-col"
            : "sticky top-0 h-[100svh] overflow-hidden"
        }
      >
        {/* Back: the product world, seen through the letters before we fly in */}
        <div
          data-nav="dark"
          className={`${reduce ? "hidden" : "absolute inset-0"} flex items-center bg-night bg-[radial-gradient(70%_60%_at_20%_10%,rgba(255,140,60,0.22),transparent_70%),radial-gradient(50%_50%_at_90%_90%,rgba(255,107,26,0.25),transparent_70%)]`}
        >
          {fine && !reduce && (
            <motion.div
              aria-hidden="true"
              style={{ background: glow }}
              className="absolute inset-0"
            />
          )}
        </div>

        {/* Front: ivory page with SOFTWARE cut out of it */}
        {!reduce && (
          <motion.svg
            aria-hidden="true"
            width="100%"
            height="100%"
            viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : undefined}
            style={{
              scale,
              opacity: stencilOpacity,
              display: stencilDisplay,
              originX: geo ? geo.originX / geo.w : 0.5,
              originY: geo ? geo.originY / geo.h : 0.5,
              visibility: geo ? "visible" : "hidden",
            }}
            className="absolute inset-0 will-change-transform"
          >
            {/* Rendered (invisibly) so it can be measured; the mask reuses it */}
            <g fill="transparent">
              <g id="hero-stencil-word" ref={wordRef}>
                {lines.map((line) => (
                  <text
                    key={line}
                    x="50%"
                    textAnchor="middle"
                    fontWeight={600}
                    letterSpacing="-0.02em"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {line}
                  </text>
                ))}
              </g>
            </g>
            <defs>
              <mask id="hero-stencil" maskUnits="userSpaceOnUse">
                <rect width="100%" height="100%" fill="white" />
                <use href="#hero-stencil-word" fill="black" />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="#F5F2EC"
              mask="url(#hero-stencil)"
            />
          </motion.svg>
        )}

        {/* Inside: ivory page revealed through an opening iris */}
        <motion.div
          style={reduce ? undefined : { clipPath: irisClip }}
          className={`${reduce ? "relative py-28" : "absolute inset-0"} flex items-center bg-paper text-ink`}
        >
          <motion.div
            style={reduce ? undefined : { scale: insideScale }}
            className="container-page"
          >
            <motion.p
              style={reduce ? undefined : { opacity: eyebrowOpacity }}
              className="eyebrow mb-10"
            >
              Our approach
            </motion.p>
            <p className="h-display max-w-5xl text-[clamp(1.875rem,4.6vw,4rem)] leading-[1.1]">
              {statement.split(" ").map((raw, i, all) => (
                <ScrubWord
                  key={i}
                  word={raw.replace(/\*/g, "")}
                  accent={raw.startsWith("*")}
                  progress={progress}
                  range={[
                    STATEMENT[0] +
                      (i / all.length) * (STATEMENT[1] - STATEMENT[0]),
                    STATEMENT[0] +
                      ((i + 1) / all.length) * (STATEMENT[1] - STATEMENT[0]),
                  ]}
                />
              ))}
            </p>
          </motion.div>
        </motion.div>

        {/* Supporting lines above and below the stencil word */}
        {geo && !reduce && (
          <>
            <motion.div
              style={{
                opacity: copyOpacity,
                y: topY,
                bottom: geo.h - geo.capTop + geo.fontSize * 0.08,
              }}
              className="pointer-events-none absolute inset-x-0 flex flex-col items-center px-5 text-center text-ink"
            >
              <p
                aria-hidden="true"
                className="h-display text-[clamp(1.75rem,4.2vw,3.5rem)] leading-none"
              >
                {["Small", "teams", "deserve"].map((w, i) => (
                  <ProximityWord
                    key={w}
                    word={w}
                    accent={false}
                    delay={0.15 + i * 0.07}
                    cursorX={cursorX}
                    cursorY={cursorY}
                    interactive={fine}
                    reduce={false}
                  />
                ))}
              </p>
            </motion.div>

            <motion.div
              style={{
                opacity: copyOpacity,
                y: bottomY,
                top:
                  geo.baselines[geo.baselines.length - 1] + geo.fontSize * 0.1,
              }}
              className="pointer-events-none absolute inset-x-0 flex flex-col items-center px-5 text-center text-ink"
            >
              <p
                aria-hidden="true"
                className="h-display text-[clamp(1.75rem,4.2vw,3.5rem)] leading-none"
              >
                {["that", "*actually", "*fits."].map((w, i) => (
                  <ProximityWord
                    key={w}
                    word={w.replace("*", "")}
                    accent={w.startsWith("*")}
                    delay={0.4 + i * 0.07}
                    cursorX={cursorX}
                    cursorY={cursorY}
                    interactive={fine}
                    reduce={false}
                  />
                ))}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.8 }}
                className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3"
              >
                <Magnetic>
                  <Link href="/contact" className="btn-primary group px-7">
                    Start a project
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </Magnetic>
                <Link
                  href="#work"
                  className="btn-ghost bg-surface/60 backdrop-blur"
                >
                  See our work
                </Link>
              </motion.div>
            </motion.div>

            <motion.p
              aria-hidden="true"
              style={{ opacity: hintOpacity }}
              className="absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] text-center text-xs tracking-wide text-muted"
            >
              Scroll to step inside
            </motion.p>
          </>
        )}

        {reduce && (
          <div className="order-first bg-paper py-32 text-center">
            <p className="h-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98]">
              Small teams deserve software that{" "}
              <span className="font-serif font-normal italic tracking-normal text-accent-ink">
                actually fits.
              </span>
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                Start a project
              </Link>
              <Link href="#work" className="btn-ghost">
                See our work
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** A headline word that rises and warms toward the accent as the cursor nears it. */
function ProximityWord({
  word,
  accent,
  delay,
  cursorX,
  cursorY,
  interactive,
  reduce,
}: {
  word: string;
  accent: boolean;
  delay: number;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  interactive: boolean;
  reduce: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const proximity = useTransform([cursorX, cursorY], ([x, y]: number[]) => {
    const el = ref.current;
    if (!el || !interactive) return 0;
    const r = el.getBoundingClientRect();
    const d = Math.hypot(
      x - (r.left + r.width / 2),
      y - (r.top + r.height / 2),
    );
    return Math.max(0, 1 - d / 260);
  });
  const p = useSpring(proximity, { stiffness: 200, damping: 22 });
  const y = useTransform(p, [0, 1], [0, -12]);
  const color = useTransform(
    p,
    [0, 1],
    [accent ? "#C2410C" : "#1C1814", "#C2410C"],
  );

  return (
    <span className="inline-block overflow-hidden px-[0.12em] pb-[0.1em] align-bottom">
      <motion.span
        initial={
          reduce ? false : { y: "100%", opacity: 0, filter: "blur(12px)" }
        }
        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease, delay }}
        className="inline-block"
      >
        <motion.span
          ref={ref}
          style={{ y, color }}
          className={`inline-block ${accent ? "font-serif font-normal italic tracking-normal" : ""}`}
        >
          {word}
        </motion.span>
      </motion.span>
    </span>
  );
}

/** A statement word that brightens as the reader scrolls past its slot. */
function ScrubWord({
  word,
  accent,
  progress,
  range,
}: {
  word: string;
  accent: boolean;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span
        style={{ opacity }}
        className={
          accent
            ? "font-serif font-normal italic tracking-normal text-accent-ink"
            : undefined
        }
      >
        {word}
      </motion.span>{" "}
    </>
  );
}

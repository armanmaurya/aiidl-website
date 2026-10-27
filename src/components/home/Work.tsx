"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CafeMockup } from "@/components/mockups/CafeMockup";
import { DashboardMockup } from "@/components/mockups/DashboardMockup";

interface Project {
  name: string;
  kind: string;
  body: string;
  tags: string[];
  alt: string;
  /** Scroll window (0–1 of the pinned scene) in which this project "runs". */
  stage: [number, number];
  media: (progress?: MotionValue<number>, range?: [number, number]) => ReactNode;
}

/*
 * One pinned scene, in phases (0–1 of its scroll):
 *   (entry) headline pulls into focus — soft, enlarged and blurred to sharp —
 *           while the section scrolls into place
 *   INTRO   eyebrow, accent line and note settle in around the pinned headline
 *   HANDOFF headline lifts away as the frame opens in its place
 *   projects[0].stage, SWAP, projects[1].stage
 */
const INTRO: [number, number] = [0, 0.1];
const HANDOFF: [number, number] = [0.18, 0.28];
const SWAP: [number, number] = [0.56, 0.66];

const projects: Project[] = [
  {
    name: "Morning Pour",
    kind: "Ordering web app",
    body: "Order-ahead for a neighbourhood café: browse the menu, pay once, and pick up without queuing. Built to be quick on a phone with one bar of signal.",
    tags: ["Next.js", "Payments", "PWA"],
    alt: "Concept mobile screen for Morning Pour: café menu items are added to an order and the total updates.",
    stage: [0.3, 0.52],
    media: (p, r) => <CafeMockup progress={p} range={r} />,
  },
  {
    name: "Pulseboard",
    kind: "Team dashboard",
    body: "A weekly view of what a product team shipped, how long it took, and what's blocking them — pulled automatically from the tools they already use.",
    tags: ["React", "Data pipelines", "Cloud"],
    alt: "Concept dashboard for Pulseboard: shipped items, cycle time and open bugs count up while the throughput chart grows.",
    stage: [0.68, 0.94],
    media: (p, r) => <DashboardMockup progress={p} range={r} />,
  },
];

const NOTE = "Two concept projects created to show how we think and build. They are not client engagements.";

export function Work() {
  const reduce = useReducedMotion();

  return (
    <section id="work" aria-labelledby="work-title">
      {reduce ? (
        <>
          <div className="container-page pt-28 text-center sm:pt-40">
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title" className="h-display mt-5 text-[clamp(2.5rem,6vw,5rem)] leading-[1]">
              Ideas, <span className="font-serif font-normal italic tracking-normal text-accent-ink">made real.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-muted">{NOTE}</p>
          </div>
          <StaticProjects />
        </>
      ) : (
        <Scene />
      )}
    </section>
  );
}

function Scene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Giant background line drifting through the whole scene.
  const bgX = useTransform(p, [0, 1], ["4%", "-62%"]);

  // Entry: the headline comes into focus as the section arrives, so it is
  // already crisp at heading size by the time the scene pins.
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
  const titleScale = useTransform(enter, [0.45, 1], [1.8, 1], { ease: easeOut });
  const titleOpacity = useTransform(enter, [0.45, 0.8], [0, 1]);
  const titleBlur = useTransform(enter, [0.45, 0.95], ["blur(18px)", "blur(0px)"]);

  // Intro (pinned): supporting text settles in around the headline.
  const metaOpacity = useTransform(p, INTRO, [0, 1]);
  const metaY = useTransform(p, INTRO, [16, 0]);
  const lineScale = useTransform(p, INTRO, [0, 1]);

  // Handoff: the intro lifts and dissolves as the showcase rises into place.
  const introY = useTransform(p, HANDOFF, ["0vh", "-30vh"]);
  const introOpacity = useTransform(p, [HANDOFF[0], HANDOFF[0] + 0.07], [1, 0]);
  const introBlur = useTransform(p, HANDOFF, ["blur(0px)", "blur(8px)"]);
  const introVisibility = useTransform(introOpacity, (o) => (o < 0.02 ? "hidden" : "visible"));
  const showY = useTransform(p, HANDOFF, ["24vh", "0vh"]);
  const showOpacity = useTransform(p, [HANDOFF[0] + 0.02, HANDOFF[1]], [0, 1]);
  const showVisibility = useTransform(showOpacity, (o) => (o < 0.02 ? "hidden" : "visible"));
  const frameOpacity = useTransform(p, [HANDOFF[0], HANDOFF[0] + 0.03], [0, 1]);
  const frameInset = useTransform(p, HANDOFF, [30, 0]);
  const frameRadius = useTransform(p, HANDOFF, [160, 28]);
  const frameClip = useMotionTemplate`inset(${frameInset}% ${frameInset}% ${frameInset}% ${frameInset}% round ${frameRadius}px)`;

  // Project hand-over: the second project wipes up as the first recedes.
  const wipe = useTransform(p, SWAP, [100, 0]);
  const wipeClip = useMotionTemplate`inset(${wipe}% 0% 0% 0%)`;
  const firstScale = useTransform(p, SWAP, [1, 0.9]);
  const firstDim = useTransform(p, SWAP, [0, 0.5]);
  const progressBar = useTransform(p, [HANDOFF[1], 0.95], [0, 1]);
  const activeIndex = useTransform(p, (v): string => (v < (SWAP[0] + SWAP[1]) / 2 ? "01" : "02"));

  return (
    <div ref={ref} className="relative h-[560vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* Background line */}
        <motion.div
          aria-hidden="true"
          style={{ x: bgX }}
          className="pointer-events-none absolute bottom-[4%] left-0 whitespace-nowrap font-display text-[22vw] font-semibold leading-none tracking-[-0.05em] text-ink/[0.045]"
        >
          Selected work · Morning Pour · Pulseboard
        </motion.div>

        {/* Intro headline */}
        <motion.div
          style={{ y: introY, opacity: introOpacity, filter: introBlur, visibility: introVisibility }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <motion.p style={{ opacity: metaOpacity, y: metaY }} className="eyebrow">
            Selected work
          </motion.p>
          <motion.h2
            id="work-title"
            style={{ scale: titleScale, opacity: titleOpacity, filter: titleBlur }}
            className="h-display mt-6 whitespace-nowrap px-5 text-[clamp(2.5rem,6vw,5rem)] leading-[1]"
          >
            Ideas, <span className="font-serif font-normal italic tracking-normal text-accent-ink">made real.</span>
          </motion.h2>
          <motion.span aria-hidden="true" style={{ scaleX: lineScale }} className="mt-8 block h-px w-24 bg-accent" />
          <motion.p
            style={{ opacity: metaOpacity, y: metaY }}
            className="mt-6 max-w-sm px-5 text-sm leading-relaxed text-muted"
          >
            {NOTE}
          </motion.p>
        </motion.div>

        {/* Showcase */}
        <div className="container-page relative grid w-full items-center gap-8 pt-16 lg:grid-cols-12 lg:gap-12 lg:pt-0">
          <motion.div
            style={{ y: showY, opacity: showOpacity, visibility: showVisibility }}
            className="relative order-2 min-h-[15rem] lg:order-1 lg:col-span-5 lg:min-h-[22rem]"
          >
            <div className="mb-6 flex items-center gap-3 text-xs font-medium text-muted lg:mb-10" aria-hidden="true">
              <motion.span className="tabular-nums text-ink">{activeIndex}</motion.span>
              <span className="relative h-px w-24 bg-ink/15">
                <motion.span style={{ scaleX: progressBar }} className="absolute inset-0 origin-left bg-accent" />
              </span>
              <span>02</span>
            </div>
            <div className="relative">
              {projects.map((project, i) => (
                <ProjectText key={project.name} project={project} index={i} progress={p} />
              ))}
            </div>
          </motion.div>

          <motion.div
            style={{ clipPath: frameClip, opacity: frameOpacity }}
            className="relative order-1 aspect-[4/3] overflow-hidden rounded-[28px] lg:order-2 lg:col-span-7"
            data-cursor="Concept"
          >
            <motion.div role="img" aria-label={projects[0].alt} style={{ scale: firstScale }} className="absolute inset-0">
              {projects[0].media(p, projects[0].stage)}
              <motion.div aria-hidden="true" style={{ opacity: firstDim }} className="absolute inset-0 bg-ink" />
            </motion.div>
            <motion.div role="img" aria-label={projects[1].alt} style={{ clipPath: wipeClip }} className="absolute inset-0">
              {projects[1].media(p, projects[1].stage)}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProjectText({
  project: p,
  index,
  progress,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
}) {
  const first = index === 0;
  // First project leaves upward as the wipe starts; second arrives from below as it ends.
  const range: [number, number] = first ? [SWAP[0], SWAP[0] + 0.05] : [SWAP[1] - 0.05, SWAP[1]];
  const opacity = useTransform(progress, range, first ? [1, 0] : [0, 1]);
  const y = useTransform(progress, range, first ? [0, -40] : [40, 0]);
  const visibility = useTransform(opacity, (o) => (o < 0.02 ? "hidden" : "visible"));

  return (
    <motion.div style={{ opacity, y, visibility }} className={first ? "relative" : "absolute inset-x-0 top-0"}>
      <div className="flex items-center gap-3">
        <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-ink">
          Concept project
        </span>
        <span className="text-sm text-muted">{p.kind}</span>
      </div>
      <h3 className="h-display mt-4 text-4xl sm:mt-6 sm:text-6xl">{p.name}</h3>
      <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted sm:mt-5 sm:text-base">{p.body}</p>
      <ul className="mt-6 hidden flex-wrap gap-2 sm:flex" aria-label="Technologies">
        {p.tags.map((t) => (
          <li key={t} className="rounded-full px-3 py-1 text-xs text-ink ring-1 ring-inset ring-ink/10">
            {t}
          </li>
        ))}
      </ul>
      <Link
        href={`/contact?project=${encodeURIComponent(p.name)}`}
        className="group mt-6 inline-flex w-fit items-center gap-1.5 text-[0.9375rem] font-medium underline decoration-ink/20 underline-offset-[6px] transition-colors hover:decoration-accent sm:mt-8"
      >
        Build something similar
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}

/** Reduced-motion fallback: both projects, side by side with their text. */
function StaticProjects() {
  return (
    <div className="container-page mt-16 space-y-20">
      {projects.map((p) => (
        <article key={p.name} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div role="img" aria-label={p.alt} className="aspect-[4/3] overflow-hidden rounded-[28px] lg:col-span-7">
            {p.media()}
          </div>
          <div className="lg:col-span-5">
            <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-ink">
              Concept project
            </span>
            <h3 className="h-display mt-4 text-4xl">{p.name}</h3>
            <p className="mt-4 leading-relaxed text-muted">{p.body}</p>
            <Link
              href={`/contact?project=${encodeURIComponent(p.name)}`}
              className="mt-6 inline-flex items-center gap-1.5 font-medium underline underline-offset-[6px]"
            >
              Build something similar
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Cloud, Code2, Smartphone, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";

interface Service {
  index: string;
  title: string;
  summary: string;
  points: string[];
  href: string;
  cta: string;
  icon: LucideIcon;
}

const services: Service[] = [
  {
    index: "01",
    title: "Custom Software",
    summary:
      "Tools shaped around how your business really works — replacing spreadsheets, manual hand-offs and off-the-shelf software you've outgrown.",
    points: ["Internal tools & portals", "Workflow automation", "Integrations with what you already use"],
    href: "/services/custom-software",
    cta: "Explore custom software",
    icon: Code2,
  },
  {
    index: "02",
    title: "Mobile & Web Apps",
    summary:
      "Fast, accessible products your customers enjoy using — on the phone and in the browser, from a first version that proves the idea to an app that grows with you.",
    points: ["iOS & Android", "Responsive web apps", "Design systems & UX"],
    href: "/contact?service=Mobile%20%26%20Web%20Apps",
    cta: "Discuss your app",
    icon: Smartphone,
  },
  {
    index: "03",
    title: "Cloud & DevOps",
    summary:
      "Reliable infrastructure that stays up, deploys in minutes and doesn't surprise you on the monthly bill.",
    points: ["Cloud setup & migration", "CI/CD pipelines", "Monitoring & cost control"],
    href: "/contact?service=Cloud%20%26%20DevOps",
    cta: "Talk infrastructure",
    icon: Cloud,
  },
];

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const pinned = desktop && !reduce;

  useEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-title"
      className={pinned ? "relative h-[300vh] bg-sand" : "relative bg-sand py-24"}
    >
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : ""}>
        <div className="container-page flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow">What we do</p>
            </Reveal>
            <SplitReveal
              id="services-title"
              text="Three ways we help you *ship.*"
              className="h-display mt-5 max-w-xl text-[clamp(2.25rem,5vw,4rem)] leading-[1]"
            />
          </div>
          {pinned && (
            <div className="flex w-48 items-center gap-3 text-xs font-medium text-muted" aria-hidden="true">
              <span>01</span>
              <span className="relative h-px flex-1 bg-ink/15">
                <motion.span style={{ scaleX: bar }} className="absolute inset-0 origin-left bg-ink" />
              </span>
              <span>03</span>
            </div>
          )}
        </div>

        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={
            pinned
              ? "mt-14 flex w-max gap-6 pl-[max(3rem,calc((100vw-80rem)/2+3rem))] pr-12"
              : "container-page mt-12 grid gap-5 md:grid-cols-2"
          }
        >
          {services.map((service, i) =>
            pinned ? (
              <ServiceCard key={service.index} service={service} />
            ) : (
              <Reveal key={service.index} delay={(i % 2) * 0.08}>
                <ServiceCard service={service} />
              </Reveal>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="group flex h-full flex-col rounded-[1.75rem] bg-surface p-7 ring-1 ring-ink/[0.06] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(28,24,20,0.25)] sm:p-9 lg:h-[30rem] lg:w-[min(34rem,42vw)]">
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-ink transition-colors duration-500 group-hover:bg-accent-ink group-hover:text-white">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="font-display text-sm font-medium text-muted">{service.index}</span>
      </div>

      <h3 className="h-display mt-10 text-3xl sm:text-[2.25rem]">{service.title}</h3>
      <p className="mt-4 max-w-md leading-relaxed text-muted">{service.summary}</p>

      <ul className="mt-6 space-y-2 text-[0.9375rem]">
        {service.points.map((p) => (
          <li key={p} className="flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>

      <Link
        href={service.href}
        className="mt-auto inline-flex items-center gap-1.5 pt-8 text-[0.9375rem] font-medium text-ink underline decoration-ink/20 underline-offset-[6px] transition-colors hover:decoration-accent"
      >
        {service.cta}
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}

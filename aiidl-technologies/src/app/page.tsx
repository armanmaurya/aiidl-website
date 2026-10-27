"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const manifestoWords =
  "Founders and growing teams outgrow spreadsheets long before they need a fifty-person IT department. We engineer custom software, web and mobile products, and cloud infrastructure that fit how your business actually operates.".split(
    " "
  );

const services = [
  {
    number: "01",
    tag: "CORE ARCHITECTURE",
    title: "Custom Software",
    summary:
      "Replace brittle spreadsheets and disconnected SaaS tools with tailored operational web software, internal portals, and APIs designed around your exact workflow.",
    deliverables: [
      "Role-based internal portals & operational dashboards",
      "Two-way payment, CRM & accounting API integrations",
      "Normalized PostgreSQL data models & audit trails",
    ],
    ctaLabel: "Explore Custom Software detail",
    href: "/services",
  },
  {
    number: "02",
    tag: "CLIENT INTERFACES",
    title: "Web & Mobile Applications",
    summary:
      "Fast, accessible web platforms and cross-platform iOS and Android applications engineered for customer self-service, booking, ordering, and real-time collaboration.",
    deliverables: [
      "Responsive Next.js & React web applications",
      "Cross-platform iOS & Android mobile builds",
      "Sub-second page transitions & offline resilience",
    ],
    ctaLabel: "Enquire about Web & Mobile",
    href: "/contact?service=Web+and+Mobile+Applications",
  },
  {
    number: "03",
    tag: "INFRASTRUCTURE",
    title: "Cloud & DevOps",
    summary:
      "Automated CI/CD deployment pipelines, containerized cloud hosting, and practical observability so your team ships updates any day of the week without downtime.",
    deliverables: [
      "Zero-downtime GitHub Actions release pipelines",
      "AWS / GCP container orchestration & cost control",
      "Automated daily backups, SSL & uptime alerts",
    ],
    ctaLabel: "Enquire about Cloud & DevOps",
    href: "/contact?service=Cloud+and+DevOps",
  },
];

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [heroPct, setHeroPct] = useState(0);
  const [serviceIndex, setServiceIndex] = useState(1);
  const [workIndex, setWorkIndex] = useState(1);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =========================================================
      // STAGE 1: HERO -> PORTAL ZOOM & PROGRESSIVE WORD ILLUMINATION
      // =========================================================
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".stage-hero-track",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          onUpdate: (self) => {
            setHeroPct(Math.round(self.progress * 100));
          },
        },
      });

      // First half of scroll: scale the geometric A mark & expand dark portal clip-path
      heroTl
        .to(
          ".hero-mark-vector",
          {
            scale: 14,
            rotation: 6,
            ease: "power2.inOut",
            duration: 0.55,
          },
          0
        )
        .to(
          ".hero-front-copy",
          {
            y: -80,
            opacity: 0,
            ease: "power2.in",
            duration: 0.35,
          },
          0
        )
        .fromTo(
          ".hero-portal-layer",
          { clipPath: "circle(0% at 70% 50%)" },
          {
            clipPath: "circle(150% at 50% 50%)",
            ease: "power2.inOut",
            duration: 0.55,
          },
          0.08
        )
        // Second half of scroll: progressively light up every word of the manifesto
        .fromTo(
          ".manifesto-word",
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.018,
            ease: "none",
            duration: 0.45,
          },
          0.48
        )
        .fromTo(
          ".portal-cta-row",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
          0.72
        );

      // =========================================================
      // STAGE 2: DESKTOP PROGRESSIVE HORIZONTAL SERVICE TRACK
      // =========================================================
      mm.add("(min-width: 1024px)", () => {
        const servicesTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".stage-services-track",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
            onUpdate: (self) => {
              const idx = Math.min(3, Math.floor(self.progress * 3) + 1);
              setServiceIndex(idx);
            },
          },
        });

        servicesTl
          .to(
            ".services-horizontal-strip",
            {
              xPercent: -66.6666,
              ease: "none",
              duration: 1,
            },
            0
          )
          .fromTo(
            ".services-progress-fill",
            { scaleX: 0.333 },
            { scaleX: 1, ease: "none", duration: 1 },
            0
          );

        // =========================================================
        // STAGE 3: DESKTOP PROGRESSIVE CURTAIN WIPE FOR CONCEPT WORK
        // =========================================================
        const workTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".stage-work-track",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
            onUpdate: (self) => {
              setWorkIndex(self.progress > 0.48 ? 2 : 1);
            },
          },
        });

        workTl
          .to(
            ".work-panel-1-inner",
            {
              scale: 0.94,
              opacity: 0.25,
              ease: "none",
              duration: 1,
            },
            0
          )
          .fromTo(
            ".work-panel-2",
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              duration: 1,
            },
            0
          )
          .fromTo(
            ".work-progress-fill",
            { scaleY: 0.5 },
            { scaleY: 1, ease: "none", duration: 1 },
            0
          );
      });

      // =========================================================
      // STAGE 4: PROGRESSIVE CLOSING FRAME SCALE
      // =========================================================
      gsap.fromTo(
        ".closing-stage-box",
        { scale: 0.92, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".closing-stage-section",
            start: "top 90%",
            end: "top 25%",
            scrub: 0.35,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col bg-canvas text-ink">
      {/* =========================================================
          STAGE 1: PROGRESSIVE PORTAL HERO (240vh Sticky Scroll Track)
         ========================================================= */}
      <section
        aria-label="Introduction and engineering manifesto"
        className="stage-hero-track relative h-[230vh] border-b border-hairline"
      >
        <div className="sticky top-16 h-[calc(100dvh-4rem)] w-full overflow-hidden bg-canvas">
          {/* Top HUD Progress Strip */}
          <div className="absolute top-0 left-0 right-0 z-30 border-b border-hairline/60 bg-canvas/80 px-5 py-2.5 backdrop-blur-sm sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-[1400px] items-center justify-between font-mono text-[11px] uppercase tracking-widest">
              <span className="text-muted">
                00 // PROGRESSIVE SCROLL STAGE
              </span>
              <span className="text-accent font-semibold tabular-nums">
                PORTAL TRANSITION {String(heroPct).padStart(3, "0")}%
              </span>
            </div>
          </div>

          {/* LAYER 1: Initial Warm Stone Viewport */}
          <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-between px-5 pt-16 pb-8 sm:px-8 lg:px-12">
            <div className="grid flex-1 grid-cols-1 items-center gap-8 lg:grid-cols-12">
              {/* Left Editorial Headline */}
              <div className="hero-front-copy z-10 lg:col-span-8">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  AIIDL Technologies &mdash; Software Engineering Studio
                </p>

                <h1 className="mt-5 text-[clamp(2.5rem,6.4vw,5.75rem)] font-bold leading-[0.96] tracking-[-0.045em] text-ink">
                  We build the software your business{" "}
                  <span className="text-accent">runs on.</span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  Custom software, web and mobile applications, and cloud
                  infrastructure engineered in transparent two-week sprints.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2.5 bg-ink px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-canvas transition-colors hover:bg-accent"
                  >
                    <span>Start a project</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 border border-ink px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-canvas"
                  >
                    <span>Custom software detail</span>
                  </Link>
                </div>
              </div>

              {/* Right Scaling Geometric Mark */}
              <div className="pointer-events-none flex items-center justify-center lg:col-span-4 lg:justify-end">
                <svg
                  viewBox="0 0 1000 1000"
                  className="hero-mark-vector h-48 w-48 origin-center sm:h-64 sm:w-64 lg:h-80 lg:w-80"
                  aria-hidden="true"
                >
                  <path
                    d="M928.5 287.3L128.8 672.7L18.5 874.4Z"
                    fill="#F25C19"
                  />
                  <path
                    d="M482.4 26.1L1000.0 973.9L477.1 798.0L0.0 963.3L474.7 658.6L712.9 715.2L481.7 284.8L319.6 580.7L128.8 672.7Z"
                    fill="#0A0A0A"
                  />
                </svg>
              </div>
            </div>

            {/* Bottom Scroll Cue */}
            <div className="hero-front-copy flex items-center justify-between border-t border-hairline pt-4 font-mono text-xs uppercase tracking-widest text-muted">
              <span className="inline-flex items-center gap-2">
                <ArrowDown className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                Scroll to enter the architecture
              </span>
              <span>01 / Services &bull; 02 / Concept Work</span>
            </div>
          </div>

          {/* LAYER 2: Dark Portal Stage Revealed Progressively via Scroll Clip-Path */}
          <div
            className="hero-portal-layer absolute inset-0 z-20 flex flex-col justify-between bg-ink px-5 pt-16 pb-8 text-canvas sm:px-8 lg:px-12"
            style={{ clipPath: "circle(0% at 70% 50%)" }}
          >
            <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col justify-center">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                00 // STUDIO MANIFESTO
              </p>

              <p className="mt-6 max-w-5xl text-[clamp(1.5rem,3.6vw,3.25rem)] font-semibold leading-[1.18] tracking-[-0.03em]">
                {manifestoWords.map((word, idx) => (
                  <React.Fragment key={idx}>
                    <span className="manifesto-word inline-block text-canvas">
                      {word}
                    </span>{" "}
                  </React.Fragment>
                ))}
              </p>

              <div className="portal-cta-row mt-10 flex flex-wrap items-center gap-4 border-t border-white/15 pt-8">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 bg-accent px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink"
                >
                  <span>Discuss your project</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 border border-white/25 px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-canvas transition-colors hover:border-white"
                >
                  <span>Continue scrolling to Services</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STAGE 2: THREE SERVICE SUMMARIES (Progressive Horizontal Scroll on Desktop)
         ========================================================= */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="stage-services-track relative border-b border-hairline bg-canvas lg:h-[300vh]"
      >
        <div className="lg:sticky lg:top-16 lg:flex lg:h-[calc(100dvh-4rem)] lg:flex-col lg:justify-between lg:overflow-hidden">
          {/* Stage Top Bar + Scrub Progress Bar */}
          <div className="border-b border-hairline bg-canvas px-5 py-5 sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  01 / SERVICES
                </span>
                <h2
                  id="services-heading"
                  className="text-xl font-bold tracking-tight text-ink sm:text-2xl"
                >
                  Three disciplines, one engineering team.
                </h2>
              </div>

              <div className="hidden items-center gap-4 lg:flex">
                <span className="font-mono text-xs font-semibold tabular-nums text-ink">
                  0{serviceIndex} / 03
                </span>
                <div className="h-1 w-36 bg-hairline">
                  <div className="services-progress-fill h-full w-full origin-left bg-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Strip on Desktop (300% width) / Clean Stack on Mobile */}
          <div className="services-horizontal-strip flex flex-1 flex-col divide-y divide-hairline lg:w-[300%] lg:flex-row lg:divide-y-0 lg:divide-x">
            {services.map((service) => (
              <article
                key={service.number}
                className="flex w-full flex-col justify-between px-5 py-12 sm:px-8 lg:w-1/3 lg:px-12 lg:py-14"
              >
                <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-12">
                  {/* Left Big Numeral & Title */}
                  <div className="lg:col-span-6">
                    <div className="inline-flex items-center gap-3 border border-hairline bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted">
                      <span className="text-accent font-bold">
                        {service.number}
                      </span>
                      <span>{service.tag}</span>
                    </div>

                    <div className="mt-6 flex items-baseline gap-4">
                      <span className="font-mono text-5xl font-bold tracking-tighter text-accent sm:text-7xl">
                        {service.number}
                      </span>
                      <h3 className="text-3xl font-bold tracking-[-0.035em] text-ink sm:text-5xl">
                        {service.title}
                      </h3>
                    </div>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                      {service.summary}
                    </p>
                  </div>

                  {/* Right Deliverables Specification Sheet */}
                  <div className="border border-hairline bg-surface p-6 sm:p-10 lg:col-span-6">
                    <p className="border-b border-hairline pb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted">
                      What We Ship // {service.title}
                    </p>

                    <ul className="mt-6 space-y-4">
                      {service.deliverables.map((item, i) => (
                        <li
                          key={item}
                          className="flex items-start gap-3.5 text-sm font-medium text-ink sm:text-base"
                        >
                          <span className="font-mono text-xs font-bold text-accent">
                            0{i + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 border-t border-hairline pt-6">
                      <Link
                        href={service.href}
                        className="group inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-canvas transition-colors hover:bg-accent"
                      >
                        <span>{service.ctaLabel}</span>
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          STAGE 3: TWO SAMPLE PROJECT CARDS (Progressive Curtain Wipe on Desktop)
         ========================================================= */}
      <section
        id="work"
        aria-labelledby="work-heading"
        className="stage-work-track relative border-b border-hairline bg-surface lg:h-[240vh]"
      >
        <div className="lg:sticky lg:top-16 lg:flex lg:h-[calc(100dvh-4rem)] lg:flex-col lg:overflow-hidden">
          {/* Top Header Strip */}
          <div className="border-b border-hairline bg-surface px-5 py-5 sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  02 / SAMPLE WORK
                </span>
                <h2
                  id="work-heading"
                  className="text-xl font-bold tracking-tight text-ink sm:text-2xl"
                >
                  Selected concept projects.
                </h2>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                Active Concept: 0{workIndex} / 02
              </span>
            </div>
          </div>

          {/* Progressive Split Stage */}
          <div className="relative flex-1">
            {/* PROJECT 01 (Base Layer) */}
            <article className="work-panel-1-inner flex h-full flex-col justify-center border-b border-hairline bg-canvas px-5 py-12 sm:px-8 lg:border-b-0 lg:px-12">
              <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-6">
                  <div className="inline-flex items-center gap-2">
                    <span className="bg-accent px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-white">
                      Concept project
                    </span>
                    <span className="border border-hairline bg-surface px-2.5 py-1 font-mono text-xs text-ink">
                      01 / 02 &bull; Web &amp; Mobile Ordering
                    </span>
                  </div>

                  <h3 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-ink sm:text-5xl">
                    Morning Pour — Cafe Ordering &amp; Barista Queue
                  </h3>

                  <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                    Invented concept project demonstrating how an independent
                    specialty cafe can pair a mobile web pre-order menu with a
                    live barista ticket display to eliminate 15-minute morning
                    counter lines.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
                    <span className="border border-hairline bg-surface px-3 py-1">
                      Next.js App Router
                    </span>
                    <span className="border border-hairline bg-surface px-3 py-1">
                      Live Queue State
                    </span>
                    <span className="border border-hairline bg-surface px-3 py-1">
                      UPI Checkout
                    </span>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/contact?project=Morning+Pour+Cafe+Concept"
                      className="group inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-canvas transition-colors hover:bg-accent"
                    >
                      <span>Enquire about a similar build</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                {/* Minimal Architectural Wireframe for Morning Pour */}
                <div className="border border-ink bg-ink p-6 text-canvas sm:p-8 lg:col-span-6">
                  <div className="flex items-center justify-between border-b border-white/15 pb-4 font-mono text-xs">
                    <span className="text-accent font-semibold">
                      CONCEPT PROJECT // KDS QUEUE
                    </span>
                    <span>AVG WAIT: 4M 12S</span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="border border-white/15 bg-white/5 p-4">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
                        Mobile Pre-Order #204
                      </p>
                      <p className="mt-2 text-base font-bold text-white">
                        1x Oat Flat White
                      </p>
                      <p className="text-xs text-neutral-400">
                        + 1x Warm Cardamom Bun
                      </p>
                      <div className="mt-4 border-t border-white/10 pt-3 font-mono text-xs text-white">
                        Pickup Slot: 08:45 AM &bull; Paid ₹460
                      </div>
                    </div>

                    <div className="border border-white/15 bg-white/5 p-4">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                        Barista Ticket Queue
                      </p>
                      <div className="mt-3 space-y-2.5 font-mono text-xs">
                        <div className="flex justify-between border-l-2 border-accent pl-2.5 text-white">
                          <span>#204 Ananya</span>
                          <span className="text-accent">ON BAR</span>
                        </div>
                        <div className="flex justify-between border-l-2 border-white/30 pl-2.5 text-neutral-400">
                          <span>#205 Vikram</span>
                          <span>QUEUED</span>
                        </div>
                        <div className="flex justify-between border-l-2 border-white/30 pl-2.5 text-neutral-400">
                          <span>#206 Meera</span>
                          <span>08:55</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* PROJECT 02 (Progressive Curtain Overlay on Desktop, Stacked on Mobile) */}
            <article className="work-panel-2 flex flex-col justify-center bg-ink px-5 py-12 text-canvas sm:px-8 lg:absolute lg:inset-0 lg:z-20 lg:px-12">
              <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-6">
                  <div className="inline-flex items-center gap-2">
                    <span className="bg-accent px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-white">
                      Concept project
                    </span>
                    <span className="border border-white/20 px-2.5 py-1 font-mono text-xs text-canvas">
                      02 / 02 &bull; Internal Operations Portal
                    </span>
                  </div>

                  <h3 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-white sm:text-5xl">
                    PulseBoard — Team Operations &amp; SLA Dashboard
                  </h3>

                  <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-300">
                    Invented concept project showing how a 30-person service
                    company can unify weekly sprint throughput, client SLA
                    timers, and team capacity into a single role-based command
                    center.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-neutral-200">
                    <span className="border border-white/20 px-3 py-1">
                      TypeScript
                    </span>
                    <span className="border border-white/20 px-3 py-1">
                      PostgreSQL
                    </span>
                    <span className="border border-white/20 px-3 py-1">
                      Role-Based Access
                    </span>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/contact?project=PulseBoard+Dashboard+Concept"
                      className="group inline-flex items-center gap-2 bg-accent px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink"
                    >
                      <span>Enquire about a similar build</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                {/* Minimal Architectural Wireframe for PulseBoard */}
                <div className="border border-white/20 bg-canvas p-6 text-ink sm:p-8 lg:col-span-6">
                  <div className="flex items-center justify-between border-b border-hairline pb-4 font-mono text-xs">
                    <span className="text-accent font-bold">
                      CONCEPT PROJECT // SLA TELEMETRY
                    </span>
                    <span>SPRINT 14</span>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3 font-mono">
                    <div className="border border-hairline bg-surface p-3.5">
                      <p className="text-[10px] text-muted">ON-TIME SLA</p>
                      <p className="mt-1 text-xl font-bold text-ink">98.4%</p>
                    </div>
                    <div className="border border-hairline bg-surface p-3.5">
                      <p className="text-[10px] text-muted">THROUGHPUT</p>
                      <p className="mt-1 text-xl font-bold text-ink">48 pts</p>
                    </div>
                    <div className="border border-hairline bg-surface p-3.5">
                      <p className="text-[10px] text-muted">BLOCKED</p>
                      <p className="mt-1 text-xl font-bold text-accent">01</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2.5 border-t border-hairline pt-4 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span>API Core &amp; Webhook Sync</span>
                      <span className="font-bold text-ink">92% CAPACITY</span>
                    </div>
                    <div className="h-2 w-full bg-subtle">
                      <div className="h-full w-[92%] bg-ink" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          STAGE 4: PROGRESSIVE SCALE CLOSING CALL TO ACTION
         ========================================================= */}
      <section
        aria-labelledby="closing-cta-heading"
        className="closing-stage-section bg-canvas px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
      >
        <div className="closing-stage-box mx-auto max-w-[1400px] border border-ink bg-ink p-8 text-canvas sm:p-14 lg:p-20">
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                03 // NEXT STEP
              </p>
              <h2
                id="closing-cta-heading"
                className="mt-4 text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white"
              >
                Have a software product or workflow to build?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-300 sm:text-lg">
                Tell us what you are building or improving. A senior engineer
                will review your brief and reply within 24 hours.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 bg-accent px-7 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink"
              >
                <span>Start a project enquiry</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center border border-white/25 px-7 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink"
              >
                <span>Custom software detail</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

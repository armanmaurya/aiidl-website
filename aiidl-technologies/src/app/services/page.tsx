"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const whoItHelps = [
  {
    index: "01",
    group: "Founders Launching a V1 Product",
    problem:
      "You have domain insight and early customer demand, but need an engineering partner to turn specifications into a dependable production application.",
    outcome:
      "A focused V1 shipped in 6–8 weeks on a clean codebase ready for your first thousand users.",
  },
  {
    index: "02",
    group: "Small-Business Operations Teams",
    problem:
      "Your staff spends hours copying orders, inventory, or approvals across disconnected spreadsheets, chat threads, and billing tools.",
    outcome:
      "One role-based internal portal tailored to your workflow rules, eliminating duplicate data entry.",
  },
  {
    index: "03",
    group: "Teams Modernizing Legacy Tools",
    problem:
      "An aging off-the-shelf tool or brittle first-generation codebase is slowing down onboarding and blocking new integrations.",
    outcome:
      "Phased migration to a fast React/Next.js interface and documented API layer without operational downtime.",
  },
];

const deliverables = [
  {
    id: "01",
    title: "Web & API Application Codebase",
    detail:
      "Strongly-typed TypeScript/Node.js backend and responsive Next.js frontend committed directly to your repository.",
  },
  {
    id: "02",
    title: "Relational Database & Migrations",
    detail:
      "Normalized PostgreSQL schema with automated migrations, indexing, and daily backup policies.",
  },
  {
    id: "03",
    title: "Role-Based Access & Audit Logs",
    detail:
      "Granular staff and customer permissions, secure session authentication, and activity history.",
  },
  {
    id: "04",
    title: "Third-Party Integrations",
    detail:
      "Two-way sync and webhooks for payment gateways (Razorpay, Stripe), CRMs, and accounting tools.",
  },
  {
    id: "05",
    title: "Automated CI/CD & Staging URL",
    detail:
      "Automated test checks and a private staging environment where your team reviews features every sprint.",
  },
  {
    id: "06",
    title: "Runbook & Handover Documentation",
    detail:
      "Plain-English setup guides, architecture diagrams, and API documentation so future hires onboard quickly.",
  },
];

const processSteps = [
  {
    step: "01",
    timeline: "Weeks 1–2",
    title: "Scope & Architecture Blueprint",
    description:
      "We map your workflow, define user permissions, design the database schema, and lock in clear sprint milestones before writing application code.",
    output: "Signed-off data schema & sprint backlog",
  },
  {
    step: "02",
    timeline: "Weeks 3–6+",
    title: "Iterative Two-Week Build Sprints",
    description:
      "We ship working software in two-week cycles. At the end of every sprint, you test live features on a private staging link and steer priorities.",
    output: "Bi-weekly staging releases & live demos",
  },
  {
    step: "03",
    timeline: "Final Week",
    title: "QA, Launch & Full Handover",
    description:
      "We run end-to-end usability, mobile, and load checks, manage the production cutover, and transfer 100% repository ownership and documentation.",
    output: "Production launch & complete code handover",
  },
];

const faqs = [
  {
    question: "How long does a typical custom software project take to launch?",
    answer:
      "Most focused internal tools and founder V1 products ship within 6 to 10 weeks. Because we work in two-week sprints, your highest-priority workflow goes live on staging within the first month.",
  },
  {
    question: "Who owns the source code and intellectual property?",
    answer:
      "You own 100% of the source code and IP. From the first sprint, we push code directly to a GitHub or GitLab repository owned by your company—with zero licensing fees or vendor lock-in.",
  },
  {
    question: "Can you integrate with the software our team already uses?",
    answer:
      "Yes. We regularly connect custom applications with payment gateways (Stripe, Razorpay), accounting software, CRM platforms, Slack/WhatsApp notifications, and existing SQL databases.",
  },
];

export default function ServiceDetailPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Progressive hero parallax
      gsap.to(".sd-hero-title", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: ".sd-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
        },
      });

      // Progressive stacked cards scale-down effect on scroll
      gsap.utils.toArray<HTMLElement>(".sd-stack-card").forEach((card, i) => {
        if (i < 2) {
          gsap.to(card, {
            scale: 0.95,
            opacity: 0.65,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 18%",
              end: "bottom 15%",
              scrub: 0.35,
            },
          });
        }
      });

      // Progressive scrub bar across the 3-step process
      gsap.fromTo(
        ".sd-process-beam",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#process",
            start: "top 75%",
            end: "bottom 50%",
            scrub: 0.35,
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="flex flex-col bg-canvas text-ink">
      {/* 1. SERVICE HERO */}
      <section className="sd-hero border-b border-hairline bg-canvas px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            01 // SERVICE DETAIL &mdash; CUSTOM SOFTWARE
          </p>

          <h1 className="sd-hero-title mt-5 max-w-5xl text-[clamp(2.4rem,6vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.045em] text-ink">
            Custom software built around your{" "}
            <span className="text-accent">exact operations.</span>
          </h1>

          <div className="mt-10 grid grid-cols-1 items-end gap-8 border-t border-hairline pt-8 lg:grid-cols-12">
            <p className="text-base leading-relaxed text-muted sm:text-lg lg:col-span-7">
              When off-the-shelf SaaS forces your team into twelve manual
              workarounds just to complete a daily order, we engineer tailored
              web applications, internal portals, and APIs built around how your
              business creates value.
            </p>

            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <Link
                href="/contact?service=Custom+Software"
                className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-canvas transition-colors hover:bg-accent"
              >
                <span>Scope your project</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <a
                href="#process"
                className="inline-flex items-center border border-ink px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-canvas"
              >
                <span>3-Step Process</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHO IT HELPS (Progressive Sticky Stacking Cards) */}
      <section
        aria-labelledby="who-it-helps-heading"
        className="border-b border-hairline bg-canvas px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                01 / WHO IT HELPS
              </p>
              <h2
                id="who-it-helps-heading"
                className="mt-3 text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl"
              >
                Teams outgrowing manual tools.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Scroll through the three primary operational stages where custom
                software replaces manual overhead.
              </p>
            </div>

            <div className="space-y-6 lg:col-span-8">
              {whoItHelps.map((item, idx) => (
                <article
                  key={item.index}
                  style={{ top: `${96 + idx * 24}px` }}
                  className="sd-stack-card sticky border border-ink bg-surface p-7 sm:p-10"
                >
                  <div className="flex items-center justify-between border-b border-hairline pb-4 font-mono text-xs">
                    <span className="font-bold text-accent">
                      PROFILE // {item.index}
                    </span>
                    <span className="text-muted">CUSTOM SOFTWARE FIT</span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {item.group}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {item.problem}
                  </p>

                  <div className="mt-6 border-t border-hairline pt-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                      What Changes:
                    </span>
                    <p className="mt-1 text-sm font-medium text-ink sm:text-base">
                      {item.outcome}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT IS DELIVERED (Architectural Specification Matrix) */}
      <section
        aria-labelledby="deliverables-heading"
        className="border-b border-hairline bg-surface px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-4 pb-12 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                02 / WHAT IS DELIVERED
              </p>
              <h2
                id="deliverables-heading"
                className="mt-3 text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl"
              >
                Tangible engineering deliverables.
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted">
              Production-ready code, database schemas, and deployment pipelines
              committed directly to your company repository.
            </p>
          </div>

          <div className="grid grid-cols-1 border-t border-l border-hairline sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item) => (
              <div
                key={item.id}
                className="border-r border-b border-hairline bg-canvas p-7 sm:p-9"
              >
                <span className="font-mono text-xs font-bold text-accent">
                  // {item.id}
                </span>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THREE-STEP PROCESS (Progressive Scrubbed Timeline) */}
      <section
        id="process"
        aria-labelledby="process-heading"
        className="border-b border-hairline bg-ink px-5 py-16 text-canvas sm:px-8 sm:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="pb-10">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              03 / PROCESS
            </p>
            <h2
              id="process-heading"
              className="mt-3 text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl"
            >
              Three steps from brief to production.
            </h2>
          </div>

          {/* Progressive Scrub Beam */}
          <div className="mb-10 h-1 w-full bg-white/15" aria-hidden="true">
            <div className="sd-process-beam h-full w-full bg-accent" />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="flex flex-col justify-between border border-white/15 bg-white/5 p-7 sm:p-9"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/15 pb-4 font-mono text-xs">
                    <span className="text-accent font-bold">
                      STEP {step.step}
                    </span>
                    <span className="text-neutral-300">{step.timeline}</span>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/15 pt-4 font-mono text-xs text-accent">
                  Output: {step.output}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THREE SHORT FAQ ITEMS */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="border-b border-hairline bg-canvas px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                04 / FAQ
              </p>
              <h2
                id="faq-heading"
                className="mt-3 text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl"
              >
                Common questions.
              </h2>
            </div>

            <div className="divide-y divide-hairline border-y border-hairline bg-surface lg:col-span-8">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  open={index === 0}
                  className="group"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-6 text-left text-base font-bold text-ink transition-colors hover:text-accent sm:text-lg">
                    <span>{faq.question}</span>
                    <Plus
                      className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="px-6 pb-6 text-sm leading-relaxed text-muted sm:text-base">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLOSING CONTACT CTA */}
      <section
        aria-labelledby="service-cta-heading"
        className="bg-canvas px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px] border border-ink bg-ink p-8 text-canvas sm:p-14">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                05 / ENQUIRE
              </p>
              <h2
                id="service-cta-heading"
                className="mt-3 text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl"
              >
                Ready to scope your custom software?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
                Share your goals and current workflow. We will respond within
                one business day with a clear technical recommendation.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/contact?service=Custom+Software"
                className="group inline-flex items-center justify-center gap-2 bg-accent px-6 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink"
              >
                <span>Go to project enquiry</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center border border-white/25 px-6 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

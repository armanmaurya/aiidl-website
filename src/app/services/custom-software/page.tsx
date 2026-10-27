import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps, type Step } from "@/components/ProcessSteps";
import { ClosingCta } from "@/components/ClosingCta";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";

export const metadata: Metadata = {
  title: "Custom Software",
  description:
    "Custom software for founders and small teams: internal tools, client portals and automations built around how your business works.",
};

const audiences = [
  {
    title: "Founders validating an idea",
    body: "You need a focused first version in front of real users quickly — without cutting corners you'll pay for later.",
  },
  {
    title: "Teams outgrowing spreadsheets",
    body: "Orders, schedules or approvals live in five tabs and three inboxes. One tool would save everyone hours a week.",
  },
  {
    title: "Businesses stuck with off-the-shelf",
    body: "Your software almost fits. We build the missing piece, or a replacement that matches the way you actually work.",
  },
];

const deliverables = [
  ["Product scope", "A written plan with priorities, estimates and what we'll leave out — agreed before we build."],
  ["Interface design", "Clickable screens you can test with your team before any code is written."],
  ["Production-ready software", "Tested, documented code deployed to your own cloud account."],
  ["Integrations", "Connections to your payments, CRM, accounting or messaging tools."],
  ["Handover & training", "Walkthroughs for your team, plus admin docs that don't need a developer to read."],
  ["Ongoing support", "Optional monthly care: monitoring, fixes and small improvements."],
];

const steps: Step[] = [
  {
    meta: "1–2 weeks",
    title: "Scope",
    body: "Workshops with you and the people who'll use the software. We leave with a clear plan, a fixed first milestone and a cost.",
  },
  {
    meta: "Two-week sprints",
    title: "Build",
    body: "Working software every sprint, demoed live. You can change priorities between sprints without renegotiating everything.",
  },
  {
    meta: "Launch",
    title: "Release & hand over",
    body: "We launch, watch it closely for the first weeks, and hand over code, credentials and docs. You own all of it.",
  },
];

const faqs = [
  {
    q: "How long does a first version take?",
    a: "Most first releases take 6–10 weeks. After the scoping phase you'll get a dated plan, and you'll see working software every two weeks along the way.",
  },
  {
    q: "Who owns the code?",
    a: "You do. The code lives in your repository and runs in your cloud account from day one, so you're never locked in to working with us.",
  },
  {
    q: "Can it work with the tools we already use?",
    a: "Usually, yes. We regularly connect to payment providers, CRMs, accounting software and messaging tools. We'll confirm what's possible during scoping.",
  },
];

export default function CustomSoftwarePage() {
  return (
    <>
      <PageHero
        eyebrow="Service · Custom Software"
        title={
          <>
            Software shaped around <span className="font-serif font-normal italic tracking-normal text-accent-ink">your</span> business — not the other way round.
          </>
        }
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            Internal tools, client portals and automations that remove busywork and grow with your team.
          </p>
          <Magnetic>
            <Link href="/contact?service=Custom%20Software" className="btn-primary group">
              Discuss your project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </Magnetic>
        </div>
      </PageHero>

      {/* Who it helps */}
      <section aria-labelledby="who-title" className="container-page py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">Who it helps</p>
          <h2 id="who-title" className="h-display mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02]">
            Built for teams that have outgrown the workaround.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <TiltCard max={4} className="h-full rounded-[1.75rem]">
                <article className="h-full rounded-[1.75rem] bg-surface p-8 ring-1 ring-ink/[0.06]">
                  <span className="font-display text-sm font-medium text-muted">0{i + 1}</span>
                  <h3 className="h-display mt-8 text-2xl">{a.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{a.body}</p>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What's delivered */}
      <section data-nav="dark" aria-labelledby="deliver-title" className="surface-night py-24 text-paper sm:py-36">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-paper/60">What you get</p>
            <h2 id="deliver-title" className="h-display mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02]">
              Everything you need to run it, <span className="font-serif font-normal italic tracking-normal text-accent">not just the code.</span>
            </h2>
          </Reveal>
          <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7">
            {deliverables.map(([title, body], i) => (
              <Reveal key={title} delay={(i % 2) * 0.06} className="border-t border-white/10 pt-5">
                <dt className="font-display text-lg font-medium">{title}</dt>
                <dd className="mt-2 leading-relaxed text-paper/65">{body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="steps-title" className="container-page py-24 sm:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-32">
              <p className="eyebrow">Process</p>
              <h2 id="steps-title" className="h-display mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02]">
                Three steps from idea to <span className="font-serif font-normal italic tracking-normal">in use.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ProcessSteps steps={steps} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="container-page pb-24 sm:pb-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="h-display mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02]">
              Questions we hear often.
            </h2>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <details className="group border-b border-line" {...(i === 0 ? { open: true } : {})}>
                  <summary className="flex cursor-pointer items-center justify-between gap-6 rounded-md py-6 text-left font-display text-lg font-medium sm:text-xl">
                    {f.q}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 ring-ink/10 transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-paper">
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="max-w-xl pb-7 leading-relaxed text-muted">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta title="Ready to replace the workaround?" accent="Let's talk." />
    </>
  );
}

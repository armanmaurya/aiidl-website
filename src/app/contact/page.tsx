import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell AIIDL Technologies about your software, app or cloud project.",
};

const nextSteps = [
  ["We read it properly", "A person on the team reviews your note — no automated sales sequence."],
  ["A short call", "30 minutes to understand the problem, the people involved and your timeline."],
  ["A clear proposal", "Scope, approach and cost in plain language, so you can decide with confidence."],
];

export default function ContactPage() {
  return (
    <section className="container-page pb-24 pt-32 sm:pb-36 sm:pt-44">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="h-display mt-6 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.98]">
              Tell us what you&apos;re <span className="font-serif font-normal italic tracking-normal text-accent-ink">building.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              A few sentences is plenty — what you want to make or fix, who it&apos;s for, and roughly when you need it.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <ol className="mt-12 space-y-6 border-t border-line pt-8">
              {nextSteps.map(([title, body], i) => (
                <li key={title} className="flex gap-4">
                  <span className="font-display text-sm font-medium text-muted">0{i + 1}</span>
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-[0.9375rem] text-muted">
              Prefer email?{" "}
              <a
                href="mailto:hello@aiidltechnologies.com"
                className="font-medium text-ink underline decoration-ink/20 underline-offset-[6px] transition-colors hover:decoration-accent"
              >
                hello@aiidltechnologies.com
              </a>
            </p>
            <Link
              href="/services/custom-software"
              className="group mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium underline decoration-ink/20 underline-offset-[6px] transition-colors hover:decoration-accent"
            >
              Read about custom software first
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Suspense fallback={<div className="h-[32rem] rounded-[1.75rem] bg-surface ring-1 ring-ink/[0.06]" />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

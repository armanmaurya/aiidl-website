import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Project Enquiry",
  description:
    "Send a project enquiry to AIIDL Technologies about custom software, web and mobile applications, or cloud infrastructure.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col bg-canvas text-ink">
      <section className="min-h-[calc(100vh-10rem)] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Short Enquiry Introduction */}
            <div className="lg:col-span-5">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                03 // CONTACT &amp; ENQUIRY
              </p>

              <h1 className="mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">
                Tell us what you are building.
              </h1>

              <p className="mt-5 text-base leading-relaxed text-muted">
                Share a brief summary of your product idea, internal workflow
                bottleneck, or technical goals. You will hear back directly from
                a senior engineer within one business day.
              </p>

              <dl className="mt-10 space-y-5 border-t border-hairline pt-6 text-sm">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                    Direct Email
                  </dt>
                  <dd className="mt-1 font-semibold text-ink">
                    hello@aiidltechnologies.com
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                    Response Time
                  </dt>
                  <dd className="mt-1 font-semibold text-ink">
                    Under 24 hours (Monday &ndash; Friday)
                  </dd>
                </div>
              </dl>

              <div className="mt-10 border-t border-hairline pt-6">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-accent"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Review Custom Software detail &amp; FAQ</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Validated Enquiry Form */}
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="border border-hairline bg-surface p-8 text-sm text-muted">
                    Loading enquiry form...
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

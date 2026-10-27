import { ProcessSteps, type Step } from "@/components/ProcessSteps";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";

const steps: Step[] = [
  {
    meta: "Week 1",
    title: "Discover",
    body: "We map your goals, users and constraints, then agree a clear scope and plan you can hold us to.",
  },
  {
    meta: "Two-week sprints",
    title: "Build in the open",
    body: "You see working software every two weeks, review it with us, and steer what we build next.",
  },
  {
    meta: "Launch & beyond",
    title: "Ship and support",
    body: "We release to production, monitor it, and keep improving — or hand over cleanly. The code is always yours.",
  },
];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="container-page py-28 sm:py-40">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow">How we work</p>
            </Reveal>
            <SplitReveal
              id="process-title"
              text="No black boxes. *Just* *progress* you can see."
              className="h-display mt-5 text-[clamp(2.25rem,5vw,4rem)] leading-[1]"
            />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ProcessSteps steps={steps} />
        </div>
      </div>
    </section>
  );
}

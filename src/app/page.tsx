import { Hero } from "@/components/home/Hero";
import { Expand } from "@/components/home/Expand";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Work } from "@/components/home/Work";
import { ClosingCta } from "@/components/ClosingCta";
import { SectionDots } from "@/components/motion/SectionDots";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";

const chapters = [
  { id: "intro", label: "Intro" },
  { id: "growth", label: "Growth" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "start", label: "Start a project" },
];

export default function HomePage() {
  return (
    <>
      <SectionDots chapters={chapters} />
      <Hero />
      <Expand />
      <Services />
      <Process />
      <VelocityMarquee items={["Custom software", "Web apps", "Mobile", "Cloud", "DevOps", "Product design"]} />
      <Work />
      <ClosingCta />
    </>
  );
}

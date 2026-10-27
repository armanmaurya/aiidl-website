"use client";

import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";

const bars = [38, 52, 44, 61, 57, 72, 66, 80, 74, 88, 83, 92];

const stats = [
  { k: "Shipped", to: 24, format: (v: number) => `${Math.round(v)}`, d: "+6" },
  { k: "Cycle time", to: 2.1, format: (v: number) => `${v.toFixed(1)}d`, d: "−0.4" },
  { k: "Open bugs", to: 7, format: (v: number) => `${Math.round(v)}`, d: "−3" },
];

/**
 * Illustrative team-health dashboard for the "Pulseboard" concept project.
 * Given a progress value and range, figures count up and the chart grows.
 */
export function DashboardMockup({
  progress,
  range = [0, 1],
}: {
  progress?: MotionValue<number>;
  range?: [number, number];
}) {
  const full = useMotionValue(1);
  const p = progress ?? full;
  const [start, end] = progress ? range : [0, 1];

  return (
    <div className="flex h-full w-full items-start justify-center bg-[linear-gradient(160deg,#EFE7DA,#E2D3BE)] pl-6 pt-10 sm:pl-12 sm:pt-14">
      <div className="w-full overflow-hidden rounded-tl-2xl bg-white shadow-[0_30px_60px_-20px_rgba(28,24,20,0.35)]">
        <div className="flex items-center gap-1.5 border-b border-[#1C1814]/5 px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-[#1C1814]/15" />
          <span className="h-2 w-2 rounded-full bg-[#1C1814]/15" />
          <span className="h-2 w-2 rounded-full bg-[#1C1814]/15" />
          <span className="ml-3 text-[0.625rem] font-medium text-[#1C1814]/50">Pulseboard · This week</span>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 sm:gap-4 sm:p-5">
          {stats.map((s) => (
            <Stat key={s.k} stat={s} progress={p} range={[start, start + (end - start) * 0.6]} />
          ))}
        </div>

        <div className="px-4 pb-6 sm:px-5">
          <p className="text-[0.625rem] font-medium text-[#1C1814]/60">Throughput</p>
          <div className="mt-3 flex h-24 items-end gap-1.5 sm:h-32 sm:gap-2">
            {bars.map((h, i) => (
              <Bar
                key={i}
                height={h}
                last={i === bars.length - 1}
                progress={p}
                at={start + ((end - start) * 0.8 * i) / bars.length}
                span={(end - start) * 0.25}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  stat,
  progress,
  range,
}: {
  stat: (typeof stats)[number];
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const value = useTransform(progress, range, [0, stat.to]);
  const text = useTransform(value, stat.format);
  return (
    <div className="rounded-xl bg-[#F6F1EA] p-3">
      <p className="text-[0.5625rem] uppercase tracking-[0.12em] text-[#1C1814]/50">{stat.k}</p>
      <motion.p className="mt-1 font-display text-base font-medium tabular-nums tracking-tight text-[#1C1814] sm:text-xl">
        {text}
      </motion.p>
      <p className="text-[0.5625rem] font-medium text-emerald-700">{stat.d}</p>
    </div>
  );
}

function Bar({
  height,
  last,
  progress,
  at,
  span,
}: {
  height: number;
  last: boolean;
  progress: MotionValue<number>;
  at: number;
  span: number;
}) {
  const scaleY = useTransform(progress, [at, at + span], [0, 1]);
  return (
    <motion.div
      style={{ height: `${height}%`, scaleY }}
      className={`flex-1 origin-bottom rounded-t-[3px] ${
        last ? "bg-[#FF6B1A]" : "bg-[linear-gradient(to_top,#1C1814,#8A4A22)]"
      }`}
    />
  );
}

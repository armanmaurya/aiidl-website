"use client";

import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";

const items = [
  { name: "Flat white", note: "Oat milk · Regular", price: 180 },
  { name: "Cardamom bun", note: "Baked this morning", price: 140 },
  { name: "Cold brew", note: "Large · No sugar", price: 220 },
];

/**
 * Illustrative mobile ordering screen for the "Morning Pour" concept project.
 * Given a progress value and range, items drop into the order one by one.
 */
export function CafeMockup({
  progress,
  range = [0, 1],
}: {
  progress?: MotionValue<number>;
  range?: [number, number];
}) {
  const full = useMotionValue(1);
  const p = progress ?? full;
  const [start, end] = progress ? range : [0, 1];
  const step = (end - start) / items.length;

  const count = useTransform(p, (v) => Math.max(0, Math.min(items.length, Math.floor((v - start) / step + 0.5))));
  const label = useTransform(count, (n) => {
    const total = items.slice(0, n).reduce((sum, i) => sum + i.price, 0);
    return n === 0 ? "Your order is empty" : `${n} item${n > 1 ? "s" : ""} · ₹${total}`;
  });
  const ready = useTransform(p, [end - step * 0.4, end], [0.4, 1]);

  return (
    <div className="flex h-full w-full items-start justify-center bg-[linear-gradient(160deg,#F1E6D6,#E4D2BA)] px-6 pt-10 sm:pt-14">
      <div className="w-[min(17rem,72%)] rounded-t-[2rem] bg-[#1F1A17] p-2 pb-0 shadow-[0_30px_60px_-20px_rgba(60,35,10,0.45)]">
        <div className="rounded-t-[1.6rem] bg-[#FBF7F1] px-4 pb-6 pt-5">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#1F1A17]/15" />
          <p className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#9A6B3F]">Pickup in 8 min</p>
          <p className="mt-1 font-display text-lg font-medium tracking-tight text-[#1F1A17]">Morning Pour</p>

          <ul className="mt-4 space-y-2.5">
            {items.map((item, i) => (
              <CartItem key={item.name} item={item} progress={p} at={start + step * i} span={step * 0.7} />
            ))}
          </ul>

          <motion.div
            style={{ opacity: ready }}
            className="mt-4 flex items-center justify-between rounded-full bg-[#1F1A17] px-4 py-2.5 text-[0.6875rem] text-white"
          >
            <motion.span className="tabular-nums">{label}</motion.span>
            <span className="font-medium">Checkout →</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CartItem({
  item,
  progress,
  at,
  span,
}: {
  item: (typeof items)[number];
  progress: MotionValue<number>;
  at: number;
  span: number;
}) {
  const opacity = useTransform(progress, [at, at + span], [0, 1]);
  const y = useTransform(progress, [at, at + span], [-18, 0]);
  const scale = useTransform(progress, [at, at + span], [0.92, 1]);

  return (
    <motion.li
      style={{ opacity, y, scale }}
      className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 ring-1 ring-[#1F1A17]/5"
    >
      <div>
        <p className="text-[0.75rem] font-medium text-[#1F1A17]">{item.name}</p>
        <p className="text-[0.625rem] text-[#1F1A17]/50">{item.note}</p>
      </div>
      <span className="text-[0.6875rem] font-medium text-[#1F1A17]">₹{item.price}</span>
    </motion.li>
  );
}

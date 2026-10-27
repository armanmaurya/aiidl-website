interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const ink = variant === "dark" ? "#1C1814" : "#F5F2EC";

  return (
    <span className={`inline-flex select-none items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 1000 1000" className="h-7 w-7 shrink-0" aria-hidden="true">
        <path d="M928.5 287.3L128.8 672.7L18.5 874.4Z" fill="#FF6B1A" />
        <path
          d="M482.4 26.1L1000.0 973.9L477.1 798.0L0.0 963.3L474.7 658.6L712.9 715.2L481.7 284.8L319.6 580.7L128.8 672.7Z"
          fill={ink}
        />
      </svg>
      <span className="font-display text-[1.0625rem] font-semibold tracking-tight" style={{ color: ink }}>
        AIIDL
        <span className="ml-1.5 font-normal opacity-60">Technologies</span>
      </span>
    </span>
  );
}

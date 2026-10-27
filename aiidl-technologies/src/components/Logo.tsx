import React from "react";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const primaryColor = variant === "dark" ? "#0A0A0A" : "#F6F4EE";
  const subColor = variant === "dark" ? "#575653" : "#A3A098";

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        viewBox="0 0 1000 1000"
        className="h-7 w-7 shrink-0"
        role="img"
        aria-label="AIIDL Technologies mark"
      >
        <path
          d="M928.5 287.3L128.8 672.7L18.5 874.4Z"
          fill="#F25C19"
        />
        <path
          d="M482.4 26.1L1000.0 973.9L477.1 798.0L0.0 963.3L474.7 658.6L712.9 715.2L481.7 284.8L319.6 580.7L128.8 672.7Z"
          fill={primaryColor}
        />
      </svg>

      <div className="flex items-baseline gap-1.5 leading-none">
        <span
          className="text-[19px] font-bold tracking-[-0.06em]"
          style={{ color: primaryColor }}
        >
          AIIDL
        </span>
        <span
          className="font-mono text-[9px] font-medium uppercase tracking-[0.16em]"
          style={{ color: subColor }}
        >
          TECH
        </span>
      </div>
    </div>
  );
}

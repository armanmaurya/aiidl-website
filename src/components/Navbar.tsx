"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "/services/custom-software", label: "Custom Software" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Floating capsule navigation. It reads the section underneath it
 * (anything marked `data-nav="dark"`) and switches its palette to match,
 * and highlights the home-page section in view. Its shape never changes,
 * so links stay put while you scroll.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [compact, setCompact] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [section, setSection] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const themeFrame = useRef(0);
  const { scrollY } = useScroll();

  const detectTheme = () => {
    const nav = navRef.current;
    if (!nav) return;
    const r = nav.getBoundingClientRect();
    const under = document
      .elementsFromPoint(window.innerWidth / 2, r.top + r.height / 2)
      .find((el) => !nav.contains(el));
    setDark(Boolean(under?.closest('[data-nav="dark"]')));
  };

  useMotionValueEvent(scrollY, "change", (y) => {
    setCompact(y > 40);
    // Sample after scroll-linked styles for this frame have been painted.
    cancelAnimationFrame(themeFrame.current);
    themeFrame.current = requestAnimationFrame(() => {
      themeFrame.current = requestAnimationFrame(detectTheme);
    });
  });

  // Id of the home-page section currently under the middle of the screen.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    if (!sections.length) return setSection("");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          setSection((e.target as HTMLElement).id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
    // Wait a frame so the new page is painted before sampling it.
    const id = requestAnimationFrame(detectTheme);
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href.includes("#") ? pathname === "/" && href === `/#${section}` : pathname === href;
  const onDark = dark && !open;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      <motion.nav
        ref={navRef}
        aria-label="Main"
        initial={{ y: -90, opacity: 0, scale: 0.92 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.15 }}
        className={`pointer-events-auto relative w-full rounded-[28px] max-w-[52rem] overflow-hidden ring-1 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow,color] duration-500 md:w-auto ${
          onDark
            ? "bg-white/[0.07] text-paper ring-white/15"
            : "bg-paper/75 text-ink shadow-[0_8px_30px_-12px_rgba(28,24,20,0.18)] ring-ink/[0.07]"
        }`}
      >
        <div className={`flex items-center gap-2 transition-[padding] duration-500 ${compact ? "p-1.5" : "p-2"}`}>
          <Link href="/" aria-label="AIIDL Technologies — home" className="flex items-center gap-2 rounded-full px-3 py-1.5">
            <svg viewBox="0 0 1000 1000" className="h-6 w-6 shrink-0" aria-hidden="true">
              <path d="M928.5 287.3L128.8 672.7L18.5 874.4Z" fill="#FF6B1A" />
              <path
                d="M482.4 26.1L1000.0 973.9L477.1 798.0L0.0 963.3L474.7 658.6L712.9 715.2L481.7 284.8L319.6 580.7L128.8 672.7Z"
                fill="currentColor"
              />
            </svg>
            <span className="font-display text-[0.9375rem] font-semibold tracking-tight">AIIDL</span>
          </Link>

          <span aria-hidden="true" className={`hidden h-5 w-px md:block ${onDark ? "bg-white/15" : "bg-ink/10"}`} />

          <ul
            className="hidden items-center md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {links.map((l, i) => (
              <motion.li
                key={l.href}
                className="relative"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.45 + i * 0.06 }}
              >
                {hovered === l.href && (
                  <motion.span
                    layoutId="nav-hover"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className={`absolute inset-0 rounded-full ${onDark ? "bg-white/10" : "bg-ink/[0.06]"}`}
                  />
                )}
                <Link
                  href={l.href}
                  onMouseEnter={() => setHovered(l.href)}
                  onFocus={() => setHovered(l.href)}
                  aria-current={isActive(l.href) ? (l.href.includes("#") ? "location" : "page") : undefined}
                  className={`relative block rounded-full px-4 py-2 text-sm transition-opacity ${
                    isActive(l.href) ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {l.label}
                  {isActive(l.href) && (
                    <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>

          <span className="ml-auto hidden md:ml-2 md:inline-flex">
          <Link
            href="/contact"
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              onDark ? "bg-paper text-ink hover:bg-accent hover:text-white" : "bg-ink text-paper hover:bg-accent-ink"
            }`}
          >
            Start a project
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          </span>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="ml-auto flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium md:hidden"
          >
            {open ? "Close" : "Menu"}
            <span className="relative flex h-3 w-4 flex-col justify-between" aria-hidden="true">
              <span
                className={`h-[1.5px] w-full bg-current transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span
                className={`h-[1.5px] w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="md:hidden"
            >
              <ul className="px-3 pt-2">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease, delay: 0.05 + i * 0.05 }}
                    className="border-b border-ink/[0.07] last:border-0"
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(l.href) ? (l.href.includes("#") ? "location" : "page") : undefined}
                      className="h-display flex items-center justify-between px-2 py-4 text-2xl"
                    >
                      {l.label}
                      <ArrowUpRight className="h-5 w-5 opacity-40" aria-hidden="true" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="p-3">
                <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary w-full py-4">
                  Start a project
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}

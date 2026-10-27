"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { ScrollProgress } from "./Reveal";

const navItems = [
  { index: "01", label: "Home", href: "/" },
  { index: "02", label: "Custom Software", href: "/services" },
  { index: "03", label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <ScrollProgress />
      <header className="sticky top-0 z-50 w-full border-b border-hairline bg-canvas/95 backdrop-blur-sm">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-xs focus:font-mono focus:uppercase focus:text-canvas"
        >
          Skip to main content
        </a>

        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            aria-label="AIIDL Technologies — Home"
            className="inline-flex items-center py-1 transition-opacity hover:opacity-75"
          >
            <Logo variant="dark" />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex md:items-center md:gap-10"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative inline-flex items-baseline gap-1.5 py-1 text-sm transition-colors ${
                    active
                      ? "font-semibold text-ink"
                      : "font-normal text-muted hover:text-ink"
                  }`}
                >
                  <span className="font-mono text-[10px] text-accent">
                    {item.index}
                  </span>
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-[1px] left-0 h-[1.5px] w-full origin-left bg-ink transition-transform duration-300 ease-out ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex md:items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 bg-ink px-4 py-2 text-xs font-mono uppercase tracking-wider text-canvas transition-colors hover:bg-accent"
            >
              <span>Enquire</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="inline-flex items-center justify-center border border-hairline px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:bg-subtle md:hidden"
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-hairline bg-canvas px-5 pt-2 pb-6 md:hidden"
          >
            <ul className="divide-y divide-hairline">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span
                        className={`text-lg tracking-tight ${
                          active ? "font-bold text-ink" : "font-medium text-muted"
                        }`}
                      >
                        <span className="mr-2 font-mono text-xs text-accent">
                          {item.index}
                        </span>
                        {item.label}
                      </span>
                      {active && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                          Active
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 bg-ink px-4 py-3.5 font-mono text-xs uppercase tracking-wider text-canvas transition-colors hover:bg-accent"
              >
                <span>Start a project</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

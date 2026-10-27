import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <Link
            href="/"
            aria-label="AIIDL Technologies — Home"
            className="inline-block transition-opacity hover:opacity-75"
          >
            <Logo variant="dark" />
          </Link>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-8 gap-y-2 text-sm"
          >
            <Link
              href="/"
              className="text-muted transition-colors hover:text-ink"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-muted transition-colors hover:text-ink"
            >
              Custom Software
            </Link>
            <Link
              href="/#work"
              className="text-muted transition-colors hover:text-ink"
            >
              Concept Work
            </Link>
            <Link
              href="/contact"
              className="font-medium text-ink transition-colors hover:text-accent"
            >
              Contact
            </Link>
          </nav>

          <p className="font-mono text-xs text-muted">
            &copy; {new Date().getFullYear()} AIIDL Technologies
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Link href="/" aria-label="AIIDL Technologies — home" className="inline-block rounded-md">
            <Logo />
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            Custom software, web &amp; mobile apps, and cloud infrastructure for founders and small teams.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <p className="text-sm font-medium">Explore</p>
          <ul className="mt-4 space-y-3 text-[0.9375rem] text-muted">
            <li><Link href="/" className="transition-colors hover:text-ink">Home</Link></li>
            <li><Link href="/services/custom-software" className="transition-colors hover:text-ink">Custom Software</Link></li>
            <li><Link href="/#work" className="transition-colors hover:text-ink">Work</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-ink">Contact</Link></li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="text-sm font-medium">Company</p>
          <ul className="mt-4 space-y-3 text-[0.9375rem] text-muted">
            <li>
              <a href="mailto:hello@aiidltechnologies.com" className="transition-colors hover:text-ink">
                hello@aiidltechnologies.com
              </a>
            </li>
            <li>
              <a href="https://www.aiidltechnologies.com" className="transition-colors hover:text-ink" rel="noopener noreferrer" target="_blank">
                aiidltechnologies.com
              </a>
            </li>
            <li>
              <address className="not-italic leading-relaxed">
                4th Floor, Baburam Mukhiya Complex,
                <br />
                Sector 35, Noida, Uttar Pradesh 201301
              </address>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} AIIDL Technologies Private Limited</p>
        <p>Projects shown are concepts, not client work.</p>
      </div>
    </footer>
  );
}

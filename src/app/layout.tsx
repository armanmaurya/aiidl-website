import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { CursorFollower } from "@/components/motion/CursorFollower";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AIIDL Technologies — Software partner for growing teams",
    template: "%s · AIIDL Technologies",
  },
  description:
    "AIIDL Technologies designs, builds and runs custom software, web and mobile apps, and cloud infrastructure for founders and small-business teams.",
};

export const viewport: Viewport = {
  themeColor: "#F5F2EC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${serif.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <ScrollProgress />
          <CursorFollower />
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

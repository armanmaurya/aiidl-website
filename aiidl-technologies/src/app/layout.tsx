import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "AIIDL Technologies — Software Engineering Studio",
    template: "%s | AIIDL Technologies",
  },
  description:
    "AIIDL Technologies builds custom software, web and mobile applications, and cloud infrastructure for founders and small-business teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-canvas font-sans text-ink antialiased selection:bg-ink selection:text-canvas">
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

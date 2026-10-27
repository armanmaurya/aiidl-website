# AIIDL Technologies — Frontend & UI/UX Website Challenge

A clean, responsive three-page web experience for **AIIDL Technologies Private Limited**, built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 1. How to Run Locally

### Prerequisites
- **Node.js** `v18.18+` (tested with Node `v26.x`)
- **npm** `v9+`

### Setup & Development Server
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build Check
```bash
npm run build
npm start
```

---

## 2. Tools & Stack

- **Framework:** Next.js 15 (App Router) with React 19 & TypeScript
- **Styling:** Tailwind CSS 3 + custom CSS variables & architectural grid background utilities
- **Typography:** `Plus Jakarta Sans` (headings), `Inter` (body copy), and `JetBrains Mono` (technical labels & metrics) via `next/font/google`
- **Icons & Visuals:** `lucide-react` icons paired with custom-crafted accessible inline SVG system diagrams and UI mockups (zero external broken image dependencies)
- **Backend API Route:** Next.js Route Handler at `POST /api/enquiries`

---

## 3. Design Concept & Key Decisions

### Visual Direction: *"Pragmatic Engineering Blueprint"*
Our target visitors are founders and small-business teams who need a dependable partner to build or modernize software. Rather than generic dark-mode sci-fi tropes or stock corporate photography, the visual direction pairs **AIIDL's signature Navy (`#0B2545`) and Vibrant Orange (`#F26419`)** with a **Warm Architectural Cream (`#FBF8F3`)** canvas and subtle technical grid lines.

### Three Key Layout, Typography & User Journey Decisions
1. **First-Screen Clarity & Architectural Proof (Layout):**
   On the homepage hero (`1280px` desktop two-column split, reflowing cleanly to a single column at `390px` mobile), the left column immediately answers *who AIIDL helps* and *how work is delivered* (14-day sprints, 100% IP ownership), while the right column displays a live architectural blueprint card instead of decorative filler art.
2. **Editorial + Technical Type Hierarchy (Typography):**
   We paired **Plus Jakarta Sans** (`700`/`800` weight, tight tracking) for high-contrast, scannable headlines with **Inter** for comfortable long-form reading and **JetBrains Mono** for numbered section indices (`01 / WHAT WE BUILD`), sprint durations, and status badges.
3. **Frictionless, Honest Visitor Journey (UX):**
   Every page guides the visitor naturally from *Capability Overview (Home)* $\rightarrow$ *Delivery Proof & Process (Service Detail)* $\rightarrow$ *Low-Friction Scoping (Contact)*. Concept projects on the homepage pass context directly into the Contact form via URL query parameters (e.g. `/contact?project=Morning+Pour+Cafe+Concept`) to save the visitor from repeating themselves.

---

## 4. Form Behavior Disclosure (Connected + Honest Demo Mode)

The Contact form on `/contact` is **connected to a Next.js backend endpoint (`POST /api/enquiries`)** while explicitly operating in **honest demo mode**:
- **Client & Server Validation:** Rejects empty or whitespace-only `Name` and `Project message` inputs (`.trim()`), validates `Email` format (`/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`), explains issues directly beside the relevant field (`role="alert"`, `aria-invalid`, `aria-describedby`), and **retains all entered values** on error.
- **Explicit Demo Result:** Upon successful validation, the UI displays the required notice:
  > **"Demo only - no message was sent."**
  alongside a preview of the validated payload returned by `POST /api/enquiries`, making it 100% clear that no database persistence or email delivery occurs.

---

## 5. AI & Reference Policy Disclosure

- **Material References Used:**
  - AIIDL Technologies assignment brief (`v2.0`) for brand palette (`Navy #0B2545`, `Orange #F26419`, `Cream #FBF8F3`) and geometric `A` logo mark.
  - Public service context from `aiidltechnologies.com` (Custom Software, Web/Mobile Applications, Cloud/DevOps).
- **AI Assistance Used:**
  - Used an AI coding assistant (Google Antigravity) to scaffold the Next.js App Router structure, draft custom SVG UI wireframes for the two concept projects, and implement dual client/server validation.
- **Representative Prompt:**
  > *"Build a three-page Next.js App Router website for AIIDL Technologies (Home, Custom Software Service Detail, Contact) using their navy/orange/warm-cream palette. Include three service summaries, two sample project cards explicitly labeled as 'Concept project', a 3-step delivery process, a keyboard-accessible FAQ accordion, and a validated contact form connected to POST /api/enquiries that rejects whitespace-only inputs and shows 'Demo only - no message was sent.'"*
- **Three Specific Improvements Made to Refine the Output:**
  1. **Whitespace-Only Validation Hardening:** Replaced default HTML5 `required` validation (which accepts `"   "` spaces in text inputs) with custom `.trim()` validation on both the client (`ContactForm.tsx`) and server (`api/enquiries/route.ts`) while preserving user-entered text when errors appear.
  2. **Native Keyboard Accessibility for FAQ & Mobile Drawer:** Replaced a custom `div`-based accordion with native `<details>` and `<summary>` elements styled with custom focus-visible rings (`outline: 2px solid #F26419`) and added `Escape`-key + route-change auto-closing to the mobile navigation drawer.
  3. **Custom Inline SVG Concept Project Mockups at `390px` Width:** Replaced wide fixed-pixel mockup containers with responsive `viewBox` SVG illustrations for *Morning Pour Cafe* and *PulseBoard* so zero horizontal scrolling or text clipping occurs on `390px` viewports.

---

## 6. Test Results & Verification Checklist

- **Navigation & Brand Link:** Verified that `Home` (`/`), `Service Detail` (`/services`), and `Contact` (`/contact`) are reachable from the header, mobile drawer, and footer, and clicking the AIIDL logo returns to `/`.
- **Responsive Viewports (`1280px` Desktop & `390px` Mobile):** Tested both widths; mobile hamburger menu opens/closes reliably, cards stack cleanly, and `overflow-x: hidden` prevents horizontal overflow.
- **Keyboard & Screen Reader Accessibility:** Verified `Skip to main content` link, `Tab` order across links, `Enter`/`Space` toggling on the 3 FAQ items, and visible `<label htmlFor>` associations.
- **Form Validation Matrix:**
  - Empty form submission $\rightarrow$ Displays field-specific errors for all 3 fields.
  - Whitespace-only (`"   "`) Name & Message $\rightarrow$ Rejected with clear explanation while retaining other fields.
  - Invalid email (`"rohan@invalid"`) $\rightarrow$ Rejected with format guidance while retaining Name and Message.
  - Valid enquiry $\rightarrow$ Shows loading state, validates via `POST /api/enquiries`, and renders `"Demo only - no message was sent."`

---

## 7. Time Spent & Incomplete Items

- **Estimated Time Spent:** ~3.5 hours (30m concept & architecture, 2h building the 3 pages & SVG illustrations, 45m mobile responsiveness & dual form validation, 30m testing & documentation).
- **Incomplete Items:** None — all core frontend requirements and the optional `POST /api/enquiries` endpoint are complete.

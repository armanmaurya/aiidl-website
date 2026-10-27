# AIIDL Technologies — Frontend & UI/UX Challenge

Three pages: Home, Custom Software (service detail), and Contact.

Screenshots: [desktop](screenshots/desktop-homepage.png) · [mobile](screenshots/mobile-homepage.png)

## How to run

Requires Node.js 18.18+.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Stack

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Lenis (smooth scroll), lucide-react.

## Design concept

The homepage is one continuous scroll that tells the pitch in order. First comes the hero ("Small teams deserve **SOFTWARE** that actually fits"), which zooms through the stencil word. Then the approach, the services, the process, two concept projects, and finally contact. The palette is warm ivory, espresso and AIIDL orange.

## Key decisions

- **Layout / journey:** Every section leads to the next, and "Start a project" is always one click away. Project and service links pre-fill the contact message.
- **Typography:** A tight sans-serif is used for statements. A serif italic is kept for the one word that carries the feeling, which creates hierarchy without adding colours.
- **Motion with restraint:** Animation follows scroll or the cursor only. It is turned off under `prefers-reduced-motion`, and cursor effects are skipped on touch screens.

## Form

The form is **connected to a demo endpoint**: `POST /api/enquiries` validates again on the server, then stores and sends nothing. The UI shows "Demo only - no message was sent." All fields are required. Whitespace-only text and invalid emails are rejected, errors appear beside each field, and entered values are kept.

## AI and references

- **Tools:** Claude Code for design iteration and implementation.
- **References:** aiidltechnologies.com for company context, the logo and contact details. All copy is original.
- **Representative prompt:** *"Create a scroll-progressive storytelling homepage: elements animate based on scroll position, a visible progress indicator, elegant typography, responsive, minimal, no unnecessary decoration."*
- **Changes I made to the output:**
  1. Rejected two hero designs (a 3D-tilted product window, then a progress window) and chose the stencil zoom-through.
  2. Replaced the navy/blue palette with espresso and orange, because blue clashed with the ivory background.
  3. Rewrote the hero headline, because the generated one copied the live site's line word for word.

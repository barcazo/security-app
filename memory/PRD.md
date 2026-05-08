# SECTOR9 — CCTV Installation & Configuration Website

## Original Problem Statement
Design a fully functional one-page CCTV installation and configuration website with easy navigation, visible contact details, WhatsApp and email integration, mobile-friendly layout, dark mode, and a quote form structure that is ready to connect to a secure backend. Follows security-business website guidance: simple design, straightforward navigation, repeated contact details, secure form practices (minimal fields, validation, anti-spam).

## User Choices
- WhatsApp: South Africa (+27 placeholder, user to update)
- Email backend: Resend (option b — store + email)
- Resend API key supplied; destination = bothwell@consultant.com
- No physical address shown
- Visual style + services: agent-decided

## Stack
- Backend: FastAPI + Motor (MongoDB) + Resend (transactional email)
- Frontend: React 19 + Tailwind + shadcn/ui + lucide-react + sonner
- Routing: react-router-dom (single `/` route)

## Architecture
- One-page landing (`/app/frontend/src/pages/Landing.jsx`) composed of section components in `/app/frontend/src/components/site/`:
  Header, Hero, StatsMarquee, Services, Process, QuoteForm, FAQ, Footer, FloatingWhatsApp.
- Brand/contact/services config centralised in `/app/frontend/src/lib/brand.js`.
- Backend exposes `/api/health`, `/api/`, `/api/quote` (POST), `/api/quotes` (GET).
- Quote flow: client POST → Pydantic validation → honeypot check → Resend email (async via `asyncio.to_thread`) → MongoDB persist (`quote_requests` collection).

## Implemented (2026-05-08)
- Dark tactical theme (Cabinet Grotesk display, IBM Plex Sans/Mono).
- Hero with server-room background, scan-line overlay, corner brackets, live readout panel.
- Marquee stats strip.
- 6-card services bento grid.
- 4-step process section.
- Quote form with: name, email, phone, service select (shadcn Select), message, POPIA consent, hidden honeypot, client+server validation, sonner success/error toasts, success banner.
- FAQ accordion (shadcn Accordion).
- Footer with repeated contact details + back-to-top via #top.
- Floating WhatsApp button (bottom-left) with popover.
- Mobile menu, sticky header with utility bar.
- Backend Resend integration with async non-blocking send; quote persisted regardless of email outcome.

## Backend Tests
Iteration 1: 11/11 pytest cases passed. See `/app/test_reports/iteration_1.json`.

## Backlog / Next Tasks
P0
- Replace placeholder WhatsApp number (+27 82 000 0000) and update `BRAND.whatsappNumber` in `/app/frontend/src/lib/brand.js`.
- Verify a sending domain at https://resend.com/domains and update `SENDER_EMAIL` in `/app/backend/.env` so emails reach `bothwell@consultant.com`.

P1
- Admin auth gate on `GET /api/quotes` (currently unauthenticated and returns PII).
- Migrate `on_event('shutdown')` to FastAPI lifespan context manager.
- Add rate-limiting middleware (e.g. slowapi) on `/api/quote`.
- Add reCAPTCHA v3 or Cloudflare Turnstile in addition to honeypot.

P2
- SEO meta + JSON-LD LocalBusiness schema.
- OG image / favicon.
- Confirmation auto-reply email to the requester.
- Sitemap and robots.txt.
- Optional: light-mode toggle (currently dark-only by design choice).

## Personas
- Homeowner / estate manager seeking residential CCTV install.
- Office / warehouse owner needing commercial multi-zone deployment.
- Existing site owner needing remote-viewing setup, NVR/DVR config, or AMC.

## Known Limitations
- Resend account in TEST MODE — sends only to verified address `kofajic346@ellbit.com`. Production delivery requires domain verification.
- Hard-coded BRAND placeholders (WhatsApp number) need real values.

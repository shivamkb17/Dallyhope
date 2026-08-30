# Product Requirements Document
## Dally's Hope 4 Paws Rescue Inc. — Website

**Version:** 1.0  
**Date:** 2026-08-30  
**Status:** Draft

---

## Executive Summary

A five-page public website for Dally's Hope 4 Paws Rescue Inc., a registered 501(c)(3) animal rescue NGO based in Hagaman, New York. The site will be built on a Node.js stack, deployed to Hostinger shared hosting, and written with genuine, human voice content — no AI-generated filler copy.

---

## Problem Statement

The organization currently has a Facebook presence but no owned web property. A standalone website is needed to:

- Establish credibility with donors, adopters, and partner organizations who look for an official domain
- Provide a permanent, searchable home for adoption listings and contact information that is not subject to social platform algorithm changes or policy shifts
- Give the rescue a tax-ID-verifiable identity online (EIN 82-3825005)

---

## Objectives

1. Launch a publicly accessible five-page website within one development cycle
2. Make it straightforward for a visitor to find an adoptable animal, fill out an inquiry, or donate within two clicks from the home page
3. Keep ongoing maintenance minimal — no database required for core pages; content updates should be achievable by editing plain files
4. Pass Google's Core Web Vitals (LCP < 2.5 s, CLS < 0.1, INP < 200 ms) on mobile

---

## User Personas

**Potential Adopter — "Sarah"**  
Local resident, 30s–50s, searches Google for rescue dogs/cats near Albany NY. Wants to see available animals, understand the adoption process, and know the organization is legitimate before reaching out.

**Donor / Supporter — "Mike"**  
Has seen the Facebook page. Wants to verify the rescue is a real 501(c)(3), read about its mission, and find a donation link or mailing address to send a check.

**Volunteer / Foster — "Jess"**  
Looking to foster or volunteer. Needs a contact form or email address and some sense of what helping out involves.

**Media / Partner Organization**  
Needs EIN, registered name, mailing address, and a press/contact point quickly.

---

## Site Map — Five Pages

| Page | Path | Purpose |
|---|---|---|
| Home | `/` | Mission statement, hero image, quick-links to Adopt and Donate |
| About | `/about` | Organization story, EIN, registered address, founding info |
| Adopt | `/adopt` | Current animals available; links to Facebook for full listings |
| Support | `/support` | How to donate (mailing address + future payment link), wish list, volunteer/foster info |
| Contact | `/contact` | Contact form (name, email, message), mailing address, Facebook link |

---

## Functional Requirements

### FR-1 — Home Page
- Hero section with organization name and a one-sentence mission statement
- Three quick-action cards: "Meet Our Animals", "Support Us", "Contact Us"
- Footer on every page: registered name, EIN (82-3825005), PO Box 346 Hagaman NY 12066, Facebook link

### FR-2 — About Page
- Origin story of the rescue (content to be provided by client)
- Official details block: full registered name, EIN, mailing address
- At least one real photo (provided by client — no stock photos)

### FR-3 — Adopt Page
- Grid or list of animals currently available for adoption
- Each animal card: name, approximate age/breed, a short real description, one photo
- Clear note that the Facebook page may have the most current listings, with a direct link
- Basic adoption process overview (steps the organization uses)

### FR-4 — Support Page
- "How to Donate" section: mailing address for checks, note on 501(c)(3) deductibility
- Placeholder / future slot for an online payment integration (PayPal Donate button or similar) — not required for v1 but the layout should accommodate it
- Wish list of in-kind items (food brands, supplies — content from client)
- Volunteer/foster call-to-action linking to the Contact page

### FR-5 — Contact Page
- HTML form: Name, Email, Subject (dropdown: Adoption Inquiry / Volunteer / Foster / Donation / Other), Message, Submit
- Form submission: server-side handler (Node.js) that sends an email via SMTP or a transactional email service (e.g., Nodemailer + Gmail App Password, or Brevo free tier)
- Mailing address and Facebook link displayed alongside the form
- No CAPTCHA required for v1; add honeypot field to reduce spam

### FR-6 — Navigation
- Persistent top nav bar with logo/name and links to all five pages
- Mobile hamburger menu for viewports < 768 px
- Active page highlighted in nav

### FR-7 — Hosting Compatibility
- Deployable to Hostinger shared hosting via the Node.js application manager (supports Node 18+)
- `package.json` start script that Hostinger can call (`node server.js` or `npm start`)
- Static assets (images, CSS) served efficiently; no build step required at runtime

---

## Non-Functional Requirements

### NFR-1 — Performance
- Total page weight < 1 MB per page (compress images before committing)
- No heavy JS frameworks required on the client side — plain HTML/CSS with minimal vanilla JS is preferred

### NFR-2 — Content Authenticity
- All copy written by or directly reviewed by the rescue's team — no AI-generated placeholder text shipped to production
- Animal descriptions written by the foster/handler who knows the animal

### NFR-3 — Accessibility
- WCAG 2.1 AA minimum: sufficient color contrast, alt text on all images, keyboard-navigable nav, form labels associated with inputs

### NFR-4 — Security
- Contact form inputs sanitized server-side before passing to mailer
- No user accounts or passwords in v1 — no auth surface to attack
- HTTPS enforced (Hostinger provides free SSL via Let's Encrypt)

### NFR-5 — Maintainability
- Animal listings on the Adopt page stored in a simple JSON file (`data/animals.json`) so the client can update them without touching HTML
- README with instructions for: updating animal listings, changing contact email, deploying to Hostinger

---

## Technical Stack (Recommended, Not Prescriptive)

| Layer | Choice | Reason |
|---|---|---|
| Runtime | Node.js 18+ | Hostinger support, client requirement |
| Framework | Express.js | Minimal, well-documented, easy to deploy |
| Templating | EJS or plain HTML partials | No build step, easy for non-developers to read |
| Styling | Plain CSS (or Tailwind CSS via CDN) | No build step required |
| Email | Nodemailer | Simple SMTP integration |
| Hosting | Hostinger Node.js app | Client's chosen platform |

---

## Content Requirements (Client Must Provide)

- [ ] Mission statement / "About Us" story (2–4 paragraphs, written by the team)
- [ ] Photos of current adoptable animals (minimum one per animal)
- [ ] Animal names, ages, breeds, and descriptions
- [ ] Wish list items
- [ ] Adoption process steps
- [ ] Contact/notification email address for form submissions
- [ ] Organization logo or wordmark (if available)
- [ ] Hero image for home page

---

## Success Metrics

| Metric | Target (3 months post-launch) |
|---|---|
| Site is live and accessible | Day 1 |
| Contact form delivers emails reliably | 100% delivery to inbox |
| Google indexes all five pages | Within 4 weeks |
| Core Web Vitals pass on mobile | LCP < 2.5 s, CLS < 0.1 |
| Bounce rate on Adopt page | < 60% (visitor clicks through to an animal or Facebook) |

---

## Assumptions & Constraints

- Client will provide all written content and photography; the developer does not produce copy or images
- Budget does not include a custom donation payment processor for v1; mailing address for checks is sufficient
- Hostinger plan supports Node.js application hosting (client to confirm plan tier before development starts)
- Facebook remains the primary listings platform; the website links out rather than duplicating all Facebook content
- No CMS login interface in v1; file-based updates via FTP/SSH or Git deploy

---

## Out of Scope (v1)

- Online payment processing (Stripe, PayPal checkout)
- User accounts or adopter portal
- Blog or news section
- Event calendar
- CMS admin panel
- Multi-language support
- Automated animal listing sync from Petfinder or similar API

---

## Open Questions

1. What email address should contact form submissions be delivered to?
2. Does the rescue have an existing logo/wordmark, or does one need to be designed?
3. Will the client manage content updates themselves (FTP), or will there be a developer on retainer?
4. Confirm Hostinger plan supports Node.js (Business plan or above required)

---

*This document is a living draft. Update before development begins once open questions are resolved.*

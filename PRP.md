# Product Requirement Prompt (PRP)
## Dally's Hope 4 Paws Rescue Inc. — Five-Page NGO Website

**Version:** 1.0  
**Date:** 2026-08-30  
**References:** [PRD.md](PRD.md) · [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md)

---

## 1. One-Line Goal

Build and deploy a five-page Node.js/Express website for Dally's Hope 4 Paws Rescue Inc. that lets visitors find adoptable animals, donate, and contact the rescue — with honest, human-written copy and a visual identity that reflects the brand guidelines.

---

## 2. Context & Background

### Organization
- **Name:** Dally's Hope 4 Paws Rescue Inc.
- **EIN:** 82-3825005
- **Address:** PO Box 346, Hagaman, New York 12066
- **Facebook:** https://www.facebook.com/profile.php?id=100064872153566
- **Legal status:** Registered 501(c)(3) — tax-deductible donations

### Brand Identity (from BRAND_GUIDELINES.md)
| Token | Value |
|---|---|
| `--color-pine` | `#1C2826` (dark background, primary text) |
| `--color-terracotta` | `#E07A5F` (CTAs, accent) |
| `--color-sage` | `#81B29A` (secondary, foster tags) |
| `--color-linen` | `#F4F1DE` (page backgrounds) |
| `--color-slate` | `#111413` (footer) |
| Display font | Fraunces (Google Fonts) |
| Body font | Outfit (Google Fonts) |

### Copy Constraint
All body copy on every page must be written by a human or explicitly reviewed by the rescue's team. No AI-generated placeholder text may ship to production. All written sections should include a `<!-- TODO: replace with real copy -->` comment if a stub is needed during development.

---

## 3. Image Strategy

### Hero & Background Images — Fetched from Unsplash (free, no attribution required for most uses)

Use the Unsplash Source API to embed images via URL:

```
https://source.unsplash.com/featured/?{query}&w=1200
```

**Per-page hero queries:**

| Page | Unsplash query |
|---|---|
| Home (`/`) | `dog,rescue,adoption` |
| About (`/about`) | `animal,shelter,volunteers` |
| Adopt (`/adopt`) | `puppy,dog,cat,kitten` |
| Support (`/support`) | `dog,volunteer,community` |
| Contact (`/contact`) | `dog,paws,warm` |

Implementation: `<img src="https://source.unsplash.com/featured/1200x600/?dog,rescue" alt="..." loading="lazy">` in each hero section.

> Note: Unsplash Source API returns a random relevant photo on each load. For production, pin a specific photo ID (e.g. `https://images.unsplash.com/photo-{id}?w=1200`) after reviewing the results so the hero image is stable.

### AI-Generated Decorative Images — Via Pollinations.ai (free, no API key)

Use Pollinations.ai for decorative/section illustrations where stock photos are not ideal:

```
https://image.pollinations.ai/prompt/{url-encoded-prompt}?width=800&height=600&nologo=true
```

**Suggested prompts per section:**

| Section | Prompt |
|---|---|
| Home — mission illustration | `warm illustrated paw print with heart, terracotta and sage color palette, flat vector art style, no text` |
| About — community | `diverse volunteers caring for dogs and cats in sunny shelter, warm earthy tones, painterly illustration style` |
| Support — donation call-out | `a small dog looking hopeful through a fence, golden hour light, painterly soft focus, no text` |
| Contact — warmth accent | `a rescued puppy being held by caring hands, warm light, soft background, illustrated style` |

Implementation example:
```html
<img
  src="https://image.pollinations.ai/prompt/warm%20illustrated%20paw%20print%20with%20heart%2C%20terracotta%20and%20sage%20color%20palette%2C%20flat%20vector%20art%20style%2C%20no%20text?width=400&height=400&nologo=true"
  alt="Dally's Hope paw illustration"
  width="400"
  height="400"
  loading="lazy"
/>
```

### Animal Listing Photos (Adopt Page)
- Use **real photos** provided by the rescue for actual animals (set as `src` in `data/animals.json`)
- For development placeholder only, use: `https://placedog.net/400/300` (returns a random dog photo)
- AI-generated images must NOT be used for individual animal listings — see Brand Guidelines §6

---

## 4. Site Structure & Page Specifications

### 4.1 File/Directory Layout

```
project-root/
├── server.js              # Express entry point
├── package.json
├── .env.example           # SMTP credentials template
├── data/
│   └── animals.json       # Animal listing data (editable by client)
├── public/
│   ├── css/
│   │   └── style.css      # All styles — single file for simplicity
│   ├── js/
│   │   └── main.js        # Nav hamburger toggle only
│   └── images/
│       └── logo.svg       # Organization logo (provided by client)
└── views/
    ├── partials/
    │   ├── head.ejs        # <head>, fonts, CSS link
    │   ├── nav.ejs         # Top navigation
    │   └── footer.ejs      # Footer with EIN/address
    ├── index.ejs           # Home
    ├── about.ejs           # About
    ├── adopt.ejs           # Adopt (loops over animals.json)
    ├── support.ejs         # Support/Donate
    └── contact.ejs         # Contact form
```

### 4.2 server.js Routes

```
GET  /            → views/index.ejs
GET  /about       → views/about.ejs
GET  /adopt       → views/adopt.ejs  (passes animals array from data/animals.json)
GET  /support     → views/support.ejs
GET  /contact     → views/contact.ejs
POST /contact     → validate → send email via Nodemailer → redirect to /contact?sent=1
```

### 4.3 animals.json Schema

```json
[
  {
    "id": "luna-1",
    "name": "Luna",
    "species": "Dog",
    "breed": "Labrador Mix",
    "age": "2 years",
    "status": "available",
    "photo": "https://placedog.net/400/300?id=1",
    "description": "Luna is a gentle soul who loves long walks and couch cuddles."
  }
]
```

`status` values: `"available"` | `"foster"` | `"medical-hold"` | `"adopted"`

---

## 5. UI Component Specifications

### 5.1 Navigation (nav.ejs)

```html
<nav class="site-nav">
  <a class="nav-logo" href="/">Dally's Hope <span>4 Paws</span></a>
  <button class="nav-toggle" aria-label="Open menu">&#9776;</button>
  <ul class="nav-links">
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/adopt">Adopt</a></li>
    <li><a href="/support">Support Us</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
  <a class="btn btn-primary nav-cta" href="/adopt">Adopt a Pet</a>
</nav>
```

- Sticky on scroll (CSS `position: sticky; top: 0`)
- Background: `--color-pine` | Logo text: `--color-linen` | CTA: `--color-terracotta`
- At `< 768px`: hide `.nav-links` and `.nav-cta`; show `.nav-toggle` hamburger
- Toggle class `nav-open` on `<nav>` to slide down the mobile menu

### 5.2 Hero Section (all pages)

```html
<section class="hero hero--{page}">
  <div class="hero__image-wrap">
    <img src="{unsplash-url}" alt="{descriptive alt}" loading="eager" />
  </div>
  <div class="hero__content">
    <h1>{Page Headline}</h1>
    <p>{Subheadline}</p>
    <a class="btn btn-primary" href="{cta-link}">{CTA Text}</a>
  </div>
</section>
```

CSS: Hero is `min-height: 480px`, image uses `object-fit: cover`, overlay `rgba(28,40,38,0.55)`, text is white.

### 5.3 Animal Card (adopt.ejs)

```html
<article class="animal-card">
  <div class="animal-card__img-wrap">
    <img src="<%= animal.photo %>" alt="Photo of <%= animal.name %>" loading="lazy" />
    <span class="badge badge--<%= animal.status %>"><%= statusLabel %></span>
  </div>
  <div class="animal-card__body">
    <h3><%= animal.name %></h3>
    <p class="animal-card__meta"><%= animal.breed %> · <%= animal.age %></p>
    <p><%= animal.description %></p>
    <a class="btn btn-secondary" href="/contact?subject=Adoption+Inquiry+for+<%= animal.name %>">
      Inquire About <%= animal.name %>
    </a>
  </div>
</article>
```

Badge colors: `available` → sage, `foster` → terracotta, `medical-hold` → muted slate, `adopted` → pine (greyed).

### 5.4 Contact Form (contact.ejs)

Fields: `name` (text, required), `email` (email, required), `subject` (select), `message` (textarea, required), `_gotcha` (honeypot — hidden, must be empty on submission).

`subject` options: `Adoption Inquiry`, `Volunteer`, `Foster`, `Donation`, `Other`.

Success state: redirect to `/contact?sent=1`, show a green banner: "Thank you — we'll be in touch soon."

Error state: re-render form with validation messages inline (do not wipe user's text).

### 5.5 Footer (footer.ejs)

```html
<footer class="site-footer">
  <div class="footer__org">
    <p><strong>Dally's Hope 4 Paws Rescue Inc.</strong></p>
    <p>EIN: 82-3825005 &nbsp;·&nbsp; Registered 501(c)(3) Non-Profit</p>
    <p>PO Box 346, Hagaman, New York 12066</p>
  </div>
  <div class="footer__social">
    <a href="https://www.facebook.com/profile.php?id=100064872153566"
       target="_blank" rel="noopener noreferrer" aria-label="Facebook page">
      Facebook
    </a>
  </div>
  <p class="footer__copy">&copy; <%= new Date().getFullYear() %> Dally's Hope 4 Paws Rescue Inc. All rights reserved.</p>
</footer>
```

---

## 6. Technical Implementation

### 6.1 Dependencies

```json
{
  "express": "^4.18",
  "ejs": "^3.1",
  "nodemailer": "^6.9",
  "dotenv": "^16.0",
  "express-validator": "^7.0"
}
```

No build tools, no bundler. Fonts via Google Fonts CDN link in `<head>`.

### 6.2 Environment Variables (.env)

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO=rescue-email@example.com
PORT=3000
```

### 6.3 Form Handler Logic (server.js POST /contact)

```
1. Validate: name not empty, email valid, message not empty, _gotcha is empty
2. If invalid: re-render contact.ejs with errors object and submitted values
3. If valid:
   a. Build email: subject = "[Website] {subject}", body includes name, email, message
   b. transporter.sendMail(...)
   c. Redirect to /contact?sent=1
4. On nodemailer error: log error, re-render with generic error message
```

### 6.4 Hostinger Deployment Notes

- Hostinger Business plan (or above) required for Node.js hosting
- Entry point: `server.js`, start command: `node server.js`
- Set env vars in Hostinger control panel → Node.js app → Environment Variables
- Serve `public/` folder as static: `app.use(express.static('public'))`
- Port: use `process.env.PORT || 3000`

---

## 7. Page-by-Page Content Outline

### Home (`/`)
- **Hero:** Unsplash `dog,rescue,adoption` · H1: *"Every Paw Deserves a Second Chance"* · CTA: "Meet Our Animals"
- **Section 1 — Mission:** 2 short paragraphs (human-written) · Pollinations.ai paw illustration alongside
- **Section 2 — Three cards:** "Adopt" / "Foster / Volunteer" / "Donate" — icon + 1 sentence + link
- **Section 3 — Trust bar:** EIN badge, location, Facebook link, 501(c)(3) seal

### About (`/about`)
- **Hero:** Unsplash `animal,shelter,volunteers` · H1: *"Our Story"*
- **Section 1 — Origin:** Human-written story of the rescue (stub with `<!-- TODO: real copy -->`)
- **Section 2 — By the numbers:** Animals rescued (stat), years active, animals in foster (kept current in a simple object in `server.js`)
- **Section 3 — Official details block:** Full registered name, EIN, mailing address

### Adopt (`/adopt`)
- **Hero:** Unsplash `puppy,dog,cat` · H1: *"Find Your Forever Friend"*
- **Intro paragraph:** Adoption process overview (human-written stub)
- **Animal grid:** Renders from `data/animals.json` · Filter tabs: All / Dogs / Cats (JS, no page reload)
- **Facebook note:** "Our listings update frequently — follow us on Facebook for the latest."

### Support (`/support`)
- **Hero:** Unsplash `dog,volunteer,community` · H1: *"Your Kindness Builds Their Haven"*
- **Section 1 — Donate by mail:** Address block + 501(c)(3) deductibility note
- **Section 2 — Online donation placeholder:** `<!-- TODO: add PayPal donate button here -->` with a note
- **Section 3 — Wish list:** Unordered list of in-kind items (stub — client to fill)
- **Section 4 — Volunteer/Foster:** 2 paragraphs + CTA button → `/contact?subject=Volunteer`
- **Pollinations.ai illustration:** Hopeful dog image in the donate section

### Contact (`/contact`)
- **Hero:** Small banner (no full hero image) · H1: *"Get in Touch"*
- **Form:** All fields per §5.4
- **Sidebar:** Mailing address, Facebook link, Pollinations.ai warm illustration

---

## 8. Accessibility Checklist

- [ ] All images have descriptive `alt` text (empty `alt=""` for decorative Pollinations images)
- [ ] Color contrast: all text/background combos ≥ 4.5:1 (verify `--color-linen` + `--color-pine`)
- [ ] Form inputs have associated `<label>` elements (not placeholder-only)
- [ ] `aria-label` on icon-only buttons (hamburger, Facebook icon)
- [ ] Focus styles visible (do not `outline: none` without custom replacement)
- [ ] Skip-to-main-content link as first element in `<body>`
- [ ] `<html lang="en">` set

---

## 9. Acceptance Criteria

| # | Criterion | Pass condition |
|---|---|---|
| 1 | All five pages render without errors | `node server.js` + visit each route → 200 OK |
| 2 | Contact form sends email | Submit form → email received at `CONTACT_TO` |
| 3 | Honeypot blocks spam bots | Submit with `_gotcha` filled → no email sent, form re-rendered |
| 4 | Animal grid reads from JSON | Edit `data/animals.json`, restart server → changes appear |
| 5 | Mobile nav works | < 768px: hamburger toggles menu open/closed |
| 6 | Footer shows EIN on every page | All five pages → footer contains `82-3825005` |
| 7 | Unsplash images load | Hero images render (network required) |
| 8 | Pollinations images load | Decorative AI illustrations render (network required) |
| 9 | No AI-generated copy in production | All `<!-- TODO: replace with real copy -->` stubs resolved before launch |
| 10 | Deploys to Hostinger | `node server.js` starts on Hostinger Node.js app; port reads from `process.env.PORT` |

---

## 10. Out of Scope (this PRP)

- Payment processing (Stripe / PayPal checkout)
- CMS admin panel
- User authentication
- Blog / news feed
- Petfinder API integration
- Custom logo design (client provides asset)
- Real animal photography (client provides files)

---

## 11. Open Questions (resolve before starting)

1. **Contact email:** What address should form submissions be delivered to?
2. **SMTP credentials:** Gmail App Password, or prefer a transactional service like Brevo?
3. **Logo:** SVG/PNG provided by client, or placeholder wordmark for now?
4. **Hostinger plan:** Confirm it supports Node.js (Business plan minimum)
5. **Stats (About page):** Total animals rescued, years active — what numbers to display?

---

*Once open questions 1–4 are resolved, this PRP is ready to hand to a developer or AI coding agent.*

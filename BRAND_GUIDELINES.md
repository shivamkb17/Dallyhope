# Brand Identity & System Guidelines
## Dally's Hope 4 Paws Rescue Inc. — 501(c)(3) Animal Rescue

---

## 1. Brand Strategic Foundation

| Dimension | Specification |
|---|---|
| **Organization** | Dally's Hope 4 Paws Rescue Inc. |
| **Legal Status** | Registered 501(c)(3) Non-Profit Organization (EIN: `82-3825005`) |
| **Location** | Hagaman, New York (PO Box 346, Hagaman NY 12066) |
| **Mission Metaphor** | **The Sheltering Haven** — Caring hands creating a safe sanctuary around every vulnerable paw, nurturing renewed hope and forever families. |
| **Brand Personality** | Compassionate, Grounded, Transparent, Community-Rooted, Dignified, Uplifting |
| **Primary Audience** | Potential Adopters, Foster Volunteers, Community Donors, Local Vets & Partners |
| **Key Promise** | *"Every paw deserves a second chance at hope."* |

---

## 2. Visual Identity & Logo System

- **The Protective Embrace**: Two stylized, organic hands curl upward to form a sanctuary dome.
- **The Core Paw & Heart**: Nestled within the negative space is a heart-shaped central pad flanked by balanced digit forms.
- **Symbolic Balance**: Avoids generic cartoon paws; uses geometric circles and golden-ratio curves to ensure serious credibility with donors and institutions.

---

## 3. Calibrated Color Palette

| Swatch Role | Color Name | Hex | RGB | HSL | Usage |
|---|---|---|---|---|---|
| **Primary Brand** | Forest Pine | `#1C2826` | `28, 40, 38` | `170°, 18%, 13%` | Primary text, dark backgrounds, high-contrast badges |
| **Accent / Hope** | Terracotta Amber | `#E07A5F` | `224, 122, 95` | `13°, 68%, 63%` | Primary CTAs ("Adopt", "Donate"), urgency chips, logo mark |
| **Secondary Accent** | Sage Mist | `#81B29A` | `129, 178, 154` | `151°, 24%, 60%` | Secondary buttons, foster tags, medical-cleared status |
| **Background / Canvas**| Soft Linen Cream | `#F4F1DE` | `244, 241, 222` | `52°, 48%, 91%` | Primary page backgrounds, card surfaces, warm comfort |
| **Deep Neutral** | Obsidian Slate | `#111413` | `17, 20, 19` | `160°, 8%, 7%` | Footer base, modal backdrops, presentation canvas |

### CSS Design Tokens
```css
:root {
  --color-pine: #1C2826;
  --color-terracotta: #E07A5F;
  --color-sage: #81B29A;
  --color-linen: #F4F1DE;
  --color-slate: #111413;
  --color-white: #FFFFFF;

  --color-surface-card: #FAF8F2;
  --color-border-subtle: rgba(28, 40, 38, 0.12);
  --color-text-main: #1C2826;
  --color-text-muted: #4F5E5B;
}
```

---

## 4. Typography System

### Primary Display Header — **Fraunces** (or *Recoleta / Playfair Display*)
- **Style**: Warm, humanist serif with optical softness
- **Usage**: H1, H2, Hero statements, quote callouts
- **Vibe**: Editorial warmth, empathy, non-profit legitimacy

### Body & Interface — **Outfit** (or *Inter / Plus Jakarta Sans*)
- **Style**: Geometric humanist sans-serif with high x-height
- **Usage**: Body copy, navigation links, form labels, data chips
- **Vibe**: Clean, approachable, highly legible across mobile viewports

```css
h1, h2, h3, .font-display {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  letter-spacing: -0.02em;
}

body, button, input, .font-body {
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  line-height: 1.6;
}
```

---

## 5. Digital UI Component Guidelines

### 1. Navigation & Header
- **Logo Wordmark**: `Dally's Hope` in Fraunces 22px bold with the Terracotta mini-icon.
- **Nav Links**: Simple, clean Outfit 15px with subtle hover underline in Sage Mist.
- **Top CTA**: Pill button in Terracotta `#E07A5F` with white text: *"Adopt a Pet"* or *"Support Us"*.

### 2. Animal Listing Cards (`/adopt`)
- **Card Background**: Clean Linen Cream `#FAF8F2` with 1px border `rgba(28, 40, 38, 0.08)` and soft 12px rounded corners.
- **Image Treatment**: 4:3 natural documentary crops with soft rounded top corners.
- **Status Badges**:
  - `Available for Adoption` → Sage Mist pill `#81B29A`
  - `Foster Care` → Terracotta Amber `#E07A5F`
  - `Medical Hold` → Muted Slate `#4F5E5B`

### 3. Trust Verification Footprint (501(c)(3))
- **Footer Block**: Displays official registered name *Dally's Hope 4 Paws Rescue Inc.*, EIN `82-3825005`, and PO Box 346, Hagaman NY 12066 alongside a verified tax-exempt trust badge.

---

## 6. Brand Voice & Photography Guidelines

- **Tone**: Honest, heartfelt, grounded, never overly tragic or manipulative. Focus on dignity and the joy of rescue.
- **Photography Style**: Natural daylight, golden hour lighting, authentic candid shots of animals with volunteers and in home foster environments. **Zero AI-generated animal stock photos on real listings.**
- **Taglines**:
  - Primary: *"Every paw deserves a second chance at hope."*
  - Support/Donation: *"Your kindness builds their haven."*
  - Volunteer/Foster: *"Open your heart, change a life."*

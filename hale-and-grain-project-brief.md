# Hale & Grain — Project Brief

A portfolio + inquiry site for a woodworker based in Warrandyte, VIC who makes cheese
boards, cutting boards, spoons, and occasional larger pieces from local/salvaged
timber. **Not e-commerce** — the goal is to showcase finished work and let people
send inquiries about commissions or gifts. No checkout, no payments.

---

## 1. Goals

- Show off finished work in a way that feels handmade and natural, not like a
  generic product catalog.
- Let visitors send a commission/gift inquiry without needing a phone call.
- Be dead simple for a non-technical person (the maker) to add new pieces to over
  time — no CMS login, no database.
- Fast, static, cheap/free to host.

## 2. Tech stack

- **Vue 3** + **Vite**
- **vue-router** only if we build individual piece detail pages (see §5) —
  otherwise a single scrolling page with anchor links is enough and router can be
  skipped entirely.
- **No custom backend.** Gallery content lives in a local data file; the inquiry
  form posts to a third-party form service.
- **Form handling:** Formspree or Netlify Forms (free tier). Netlify Forms is the
  simpler option if we're deploying on Netlify anyway — no JS required, just a
  `data-netlify="true"` attribute on the form.
- **Hosting:** Netlify or Vercel, free tier, deploy from GitHub on push.
- **Images:** stored in `/public/images`, optimized/compressed before commit
  (no image CDN needed at this scale).

## 3. Brand direction

**Palette — "Riverbank"** (chosen over two other explored directions —
"River Sand" and "Native Bloom" — see mockup file if those are wanted as
alternates):

| Role | Hex | Use |
|---|---|---|
| Background | `#EDEAE0` | page background |
| Surface/paper | `#F8F6F0` | cards, form fields |
| Ink | `#2E3A2C` | body text, headings, primary buttons |
| Accent — sage | `#79876A` | links, eyebrows, small accents |
| Accent — clay | `#C08F72` | secondary accent, used sparingly |

**Type**
- Headings: a warm serif (e.g. a Georgia/Iowan Old Style-adjacent web font —
  suggest trying **Fraunces** or **Lora** from Google Fonts for the real build)
- Body/UI/labels: a plain humanist sans (e.g. **Inter** or system font stack)
- Keep it to these two families. Avoid all-caps labels and single-word-italic
  headline accents.

**Tone of voice:** plain, first-person-ish (as if the maker is talking), no sales
language. "Send an inquiry" not "Submit". Describe pieces by material and
dimensions, not marketing adjectives.

**Visual principles**
- Round/organic shapes over sharp rectangles where it fits the product (boards
  and spoons are round/organic themselves — let some UI echo that, e.g. the
  hero graphic, rounded card corners, pill-shaped buttons).
- No stock "SaaS card" grid — vary tile sizes if using a gallery-wall layout,
  or keep tiles uniform but let photography do the differentiation.
- One numbered detail per piece ("No. 042") to reinforce one-of-a-kind.

Reference mockups (already built, attached separately): a full HTML/CSS mockup
implementing this palette and layout exists — use it as the visual source of
truth for spacing, type scale, and component styling, translated into Vue
components and Tailwind or plain CSS (agent's choice).

## 4. Site structure

Single-page or multi-view — pick multi-view if a piece-detail page is included:

1. **Home**
   - Hero: eyebrow line, headline, short intro paragraph, two CTAs
     ("Browse the collection" / "Commission a piece"), one hero visual
   - "Recently finished" — 4–8 piece tiles pulled from the data file
   - "From fallen tree to kitchen table" — short brand/story section
   - Inquiry form (see §6)
   - Footer
2. **Our Timber** (optional but recommended) — short glossary of the native
   species used (Blackwood, River Red Gum, Messmate, Victorian Ash, etc.),
   one paragraph each
3. **About** — maker bio, photo, years/pieces-made stats
4. **Piece detail** (optional, phase 2) — individual page per piece: multiple
   photos, story/provenance, dimensions, "inquire about this piece" link
     that pre-fills the inquiry form's "what are you after" field

## 5. Data structure

Store gallery content as a single source of truth, e.g. `src/data/pieces.js`:

```js
export const pieces = [
  {
    id: "042",
    title: "Round cheese board",
    category: "board", // board | spoon | cutting-board | other
    species: "River Red Gum",
    dimensions: "30cm diameter",
    story: "Milled from a tree that came down in Warrandyte after a 2024 storm.",
    image: "/images/pieces/042-main.jpg",
    gallery: ["/images/pieces/042-main.jpg", "/images/pieces/042-detail.jpg"],
    available: true // false if it's a past/sold piece, still shown for portfolio
  },
  // ...
];
```

Adding new work = adding one object here + dropping images in `/public/images`.
No admin panel needed.

## 6. Inquiry form

Fields:
- Name (required)
- Email (required)
- What are you after? — select: Cheese/grazing board, Cutting board,
  Spoon/utensil set, Something bigger, Not sure
- Is this a gift? — select: No, Yes (needs a note), Yes (needs to ship by a date)
- Details — free text (size, wood preference, timing)

On submit: POST to Formspree/Netlify Forms endpoint, show a simple inline
"Thanks — I'll get back to you soon" confirmation state (no page redirect).

## 7. Nice-to-have features (phase 2, not required for launch)

- Care & oiling guide page (how to maintain a board — food-safe oil, frequency)
- Species glossary as its own page, linked from piece detail pages
- Market/stall calendar if the maker sells in person locally
- Simple lightbox for piece detail image galleries
- Basic filter on the full gallery view (by category or species)

## 8. Non-goals

- No checkout, cart, or payment processing
- No user accounts or login
- No CMS/admin dashboard — content edits go through the data file directly
- No blog (unless requested later)

## 9. Acceptance criteria

- Fully responsive down to ~375px width
- Visible keyboard focus states on all interactive elements
- Form validates required fields client-side before submit
- Lighthouse performance/accessibility scores in the 90s (static site, should
  be easy)
- Deploys cleanly to Netlify/Vercel from a fresh `npm install && npm run build`

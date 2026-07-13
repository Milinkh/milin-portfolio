# Milin Khunkhun — Portfolio

Next.js (App Router) + React. Single page, no CMS, no external animation libraries —
the motion is hand-written with `requestAnimationFrame` and CSS transitions.

## Run it

```bash
cd site
npm install
npm run dev        # http://localhost:3000
```

## Deploy

```bash
npx vercel         # or push to GitHub and import at vercel.com
```

## Where things live

| Path | What it is |
|---|---|
| `lib/content.js` | **All copy.** Experience, projects, facts, contact. Edit here, not in components. |
| `app/globals.css` | The entire design system — palette, type, motion. |
| `components/KitchenField.jsx` | The drifting utensils. Cursor repulsion, dispersal, parallax recirculation. |
| `components/Facts.jsx` | Scroll-scrubbed path morph (cap → book → chef's hat). |
| `components/About.jsx` | The knife that cuts PMP / CSM open. Re-arms on re-entry. |
| `components/Projects.jsx` | The board — tiles tilt toward the cursor, flip on hover. |

## Editing common things

**Currently reading** — one line in `lib/content.js`, in the `FACTS` array.

**Portrait** — drop `portrait.jpg` into `public/`, then in `components/About.jsx`
replace the `.ph` placeholder div with:

```jsx
import Image from 'next/image';
<Image src="/portrait.jpg" alt="Milin Khunkhun" fill style={{ objectFit: 'cover' }} />
```

**The accent colour** is `--heat` in `globals.css`. It appears once per section, always
attached to state — open, hovered, transforming, or where you are.

## Note

The three projects in `lib/content.js` (Sous, Compass, Northstar) are **placeholders**.
Replace them with real work before this goes live.

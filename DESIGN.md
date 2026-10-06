# DESIGN.md — Lumims Design System

## 1. Design direction

Lumims uses a **light, editorial, warm, premium visual system** derived from the supplied brand guideline reference. The reference emphasizes an ivory base, warm neutrals, restrained crimson accents, editorial typography, strict spacing, and generous breathing room.

For Lumims, these principles are applied to a photography-learning product rather than copied as a brand identity. The website should feel like a modern photography magazine combined with a clear learning platform.

Core attributes:

| Attribute | Visual meaning |
|---|---|
| Editorial | Large display typography, deliberate composition, strong reading hierarchy |
| Warm | Ivory and warm neutral surfaces instead of cold white/gray UI |
| Precise | Consistent grids, spacing, alignment, and predictable component behavior |
| Premium | Refined typography and restrained accents rather than visual clutter |
| Practical | Learning content remains easy to scan and navigate |
| Photographic | Large imagery is treated as educational content, not decoration |

The default product is **light theme**.

---

## 2. Color system

### Core colors

| Token | Hex | Usage |
|---|---:|---|
| `ivory` | `#F5F0EE` | Main page background |
| `ink` | `#1F1815` | Primary text |
| `crimson` | `#8B1E1E` | Primary accent, CTAs, active states |
| `white-warm` | `#FFFFFF` | Cards, menus, elevated surfaces |
| `beige-surface` | `#EDE4DF` | Alternate section background |
| `border` | `#E1D5CE` | Borders and separators |
| `text-muted` | `#6E6259` | Secondary text |

### Crimson ramp

| Token | Hex | Usage |
|---|---:|---|
| `crimson-deep` | `#511010` | Pressed state, strong contrast |
| `crimson` | `#8B1E1E` | Primary accent |
| `crimson-soft` | `#C74D4D` | Secondary accent |
| `crimson-tint` | `#F1DCDC` | Soft highlighted background |

### Optional gold

| Token | Hex | Usage |
|---|---:|---|
| `gold` | `#C9A96E` | Rare decorative micro-accent only |

Gold must never replace crimson as the primary accent.

---

## 3. Color balance — 60 / 30 / 10

Evaluate color balance at a **section/page level**, not per tiny component.

- **60% dominant** — background/surface
- **30% text** — readable content color
- **10% accent** — crimson focus color

Approved combinations:

### Preset A — Default learning surface

- 60%: Ivory `#F5F0EE`
- 30%: Ink `#1F1815`
- 10%: Crimson `#8B1E1E`

Use for lessons, forms, navigation, dashboards, and most UI.

### Preset B — Strong CTA block

- 60%: Crimson `#8B1E1E`
- 30%: Ivory `#F5F0EE` or warm white
- 10%: Crimson Soft `#C74D4D` or Crimson Deep `#511010`

Use sparingly for a landing-page CTA or high-emphasis feature block.

### Preset C — Editorial alternate section

- 60%: Beige Surface `#EDE4DF`
- 30%: Ink `#1F1815`
- 10%: Crimson `#8B1E1E`

Use to create rhythm between adjacent sections.

Avoid stacking visually adjacent sections using exactly the same preset when an alternate surface would improve hierarchy.

---

## 4. Typography

Use:

- **Gloock** — display/headline font
- **Montserrat** — body/UI font

### Roles

| Style | Font | Size | Line height | Usage |
|---|---|---:|---:|---|
| Display 1 | Gloock 400 | clamp(44px, 6vw, 80px) | 1.05 | Landing hero |
| Display 2 | Gloock 400 | clamp(34px, 4vw, 52px) | 1.1 | Major section heading |
| H1 | Gloock 400 | 36px | 1.15 | Page title |
| H2 | Gloock 400 | 28px | 1.2 | Lesson/section title |
| H3 | Montserrat 600 | 20px | 1.3 | Card/block title |
| Editorial lead | Montserrat 500 italic | 18–20px | 1.5 | Subtitle/lead |
| Body | Montserrat 400 | 16px | 1.6 | Main reading text |
| Small body | Montserrat 400 | 14px | 1.6 | Supporting copy |
| Label | Montserrat 600 | 11px | 1.4 | Uppercase UI labels |
| Micro | Montserrat 500 | 10px | 1.4 | Metadata |

Rules:

- Never use Gloock below 28px.
- Never fake bold or italic styles for Gloock.
- Never use Gloock for long paragraphs.
- Keep major Gloock headlines to roughly three lines maximum.
- Use Montserrat for controls, navigation, forms, paragraphs, code-adjacent explanations, and metadata.
- A small part of a headline may use crimson for emphasis.

---

## 5. Tailwind design tokens

Configure Tailwind so components use semantic tokens rather than random hex values.

Suggested theme extension:

```ts
colors: {
  ivory: '#F5F0EE',
  ink: '#1F1815',
  crimson: {
    deep: '#511010',
    DEFAULT: '#8B1E1E',
    soft: '#C74D4D',
    tint: '#F1DCDC',
  },
  warm: {
    white: '#FFFFFF',
    beige: '#EDE4DF',
    border: '#E1D5CE',
    muted: '#6E6259',
  },
  gold: '#C9A96E',
}
```

Use font-family tokens for Gloock and Montserrat.

---

## 6. Grid and responsive layout

| Breakpoint | Columns | Outer margin | Gutter |
|---|---:|---:|---:|
| Mobile 375–639 | 4 | 20px | 16px |
| Tablet 640–1023 | 8 | 40px | 20px |
| Desktop 1024–1439 | 12 | 80px | 24px |
| Large desktop ≥1440 | 12 | centered max 1280px | 24px |

General rules:

- Use generous whitespace.
- Aim for at least 64px between major desktop sections.
- Keep long-form reading width around `680px` maximum.
- Lesson content should not stretch across the full viewport.
- Align cards, headings, images, and navigation to a consistent grid.

---

## 7. Spacing scale

Use a 4px base system:

```text
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128
```

Prefer these values for margins, padding, gaps, and layout rhythm.

---

## 8. Radius system

| Token | Value | Usage |
|---|---:|---|
| `radius-sm` | 4px | Inputs, small tags |
| `radius-md` | 12px | Cards, lesson media, content blocks |
| `radius-lg` | 24px | Hero media and large feature blocks |
| `radius-pill` | 999px | Buttons, badges, filters |

Avoid mixing arbitrary radius values.

---

## 9. Borders and elevation

Default border:

```text
1px solid #E1D5CE
```

Accent border:

```text
1px dashed rgba(139, 30, 30, 0.4)
```

Shadows:

```text
shadow-1: 0 1px 2px rgba(31,24,21,0.04)
shadow-2: 0 4px 12px rgba(31,24,21,0.06)
shadow-3: 0 12px 32px rgba(31,24,21,0.10)
```

Use shadows subtly. Prefer borders and surface contrast before adding elevation.

---

## 10. Iconography

Use thin line icons.

Guidelines:

- approximately 1.5px stroke
- rounded line caps where available
- 24×24 default icon grid
- Ink by default
- Crimson for active/accent states
- avoid multicolor icons
- avoid emoji as interface icons
- avoid glossy, filled, or 3D icon styles

If an icon library is introduced, choose one consistent library and use it everywhere.

---

## 11. Photography direction

Photography is central to Lumims and may be used more heavily than in the reference brand.

Preferred imagery:

- natural or intentionally controlled light
- warm or neutral color grading
- realistic camera examples
- clear before/after comparisons
- portraits and scenes that demonstrate the lesson concept
- close-ups of camera controls when teaching GH5 configuration

Avoid:

- generic corporate stock photography
- unrelated decorative imagery
- oversaturated filters
- cold blue-heavy treatment unless the lesson specifically teaches it
- images too small to evaluate photographic differences

Educational imagery should prioritize clarity over decoration.

---

## 12. Learning-page layout

### Desktop

Preferred composition:

```text
┌─────────────────────────────────────────────────────────────┐
│ Header                                                      │
├───────────────┬────────────────────────────┬────────────────┤
│ Curriculum    │ Lesson content             │ On this page   │
│ navigation    │ max reading width          │ optional       │
│               │                            │                │
└───────────────┴────────────────────────────┴────────────────┘
```

The right outline is optional. Do not let navigation compress the reading column excessively.

### Mobile

Use:

- top header
- lesson title/progress
- collapsible curriculum navigation
- one-column lesson body
- previous/next lesson navigation at the end

---

## 13. Core component styling

### Buttons

Primary:

- crimson background
- ivory/white text
- pill radius
- Montserrat semi-bold label
- subtle darkening on hover

Secondary:

- transparent or warm-white surface
- ink text
- border color `#E1D5CE`

Text action:

- no heavy container
- crimson text
- visible hover/focus treatment

### Cards

- warm white or beige surface
- 12px radius
- 1px warm border
- minimal shadow
- comfortable padding
- clear heading + supporting metadata

Topic cards should emphasize title, progress, lesson count, and a clear continuation action.

### Inputs

- warm-white background
- ink text
- warm border
- 4px radius
- strong crimson focus indicator
- explicit label above input
- error text below input

### Progress

Progress should feel informative rather than game-like.

Use:

- thin progress bars
- percentage text
- completed lesson checks
- restrained crimson active/completed states

Do not overload the interface with badges or gamification in the first version.

---

## 14. Lesson content patterns

Reusable educational blocks may include:

### Theory block

Normal editorial text with optional diagram/image.

### GH5 configuration block

Visually distinct practical block containing step-by-step camera instructions.

Suggested presentation:

```text
GH5 SETUP
Mode Dial → A
Front/Rear Dial → Select aperture
Half-press shutter → Meter scene
```

Use crimson as the small accent, not as a giant background for every setup block.

### Tip

Use a soft beige or crimson-tint background.

### Warning

Use restrained crimson tint/border; never alarm-red UI unless a destructive action is involved.

### Exercise

Use a clearly separated practice block with an action-oriented prompt.

### Key takeaways

Short summary near the end of the lesson.

---

## 15. Motion

Use Framer Motion to clarify hierarchy.

Recommended:

- fade + small translate for entering sections
- subtle card lift on hover
- progress bar interpolation
- sidebar/drawer transitions
- accordion expansion

Motion should generally be fast and restrained.

Avoid:

- bouncing text
- looping hero animations
- intense parallax
- delayed content that makes lessons slower to read

Always support reduced motion.

---

## 16. Landing page visual structure

Recommended section rhythm:

1. **Hero — Preset A**
2. **Why Lumims / learning proposition — Preset C**
3. **How learning works — Preset A**
4. **Photography + video curriculum preview — Preset B or media-led section**
5. **Progress/account feature — Preset A**
6. **Final CTA — Preset B**
7. **Footer — Ink or carefully designed dark-neutral surface only if contrast remains aligned with the warm system**

The landing page should show camera/photography imagery but retain generous whitespace.

---

## 17. Do / Do not

### Do

- Use ivory as the default background.
- Use warm Ink instead of pure black.
- Use Gloock only for display hierarchy.
- Use Montserrat for readable content and UI.
- Use crimson as a deliberate accent.
- Keep layouts spacious and grid-aligned.
- Make educational photography large enough to inspect.
- Keep UI behavior predictable.

### Do not

- Introduce a full dark theme in the initial version.
- Use pure black as the default text color.
- Use crimson for long body text.
- Use gold as a replacement for the main accent.
- Simulate unavailable Gloock weights.
- Fill every card with animation.
- Use cold generic SaaS gradients.
- Use random spacing/radius values.
- Turn the site into a generic dashboard aesthetic.

---

## 18. Design implementation rule

When a new component is needed, first try to construct it from the existing tokens and patterns in this file. Do not invent a new color, font, radius, shadow, or spacing convention unless there is a clear product need.

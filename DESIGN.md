# WhatWine Design System (Impeccable — Enoteca Editoriale)

## Visual World & Mode
- **Surface Mode:** Operate (tool-first clarity, scannable grid, crisp state feedback, immediate utility).
- **Palette:**
  - Ground: `#FAF7F2` (Warm Ivory Paper)
  - Secondary Rail / Filter Surface: `#F2ECE1` (Cellar Parchment)
  - Elevated Surface (Cards, Drawer, Popovers): `#FFFFFF`
  - Ink Primary: `#1C1412` (Espresso Ink)
  - Ink Secondary: `#5C4B45` (Warm Umber)
  - Ink Muted: `#786761`
  - Accent Primary: `#7B1E2B` (Barolo Garnet), hover `#5D141F`, tint `rgba(123, 30, 43, 0.08)`
  - Semantic Brass (Ratings / Vintage): `#9E6B24`
  - Semantic Olive (High Pairing Score / In Cellar): `#265C42`
  - Semantic Error: `#A63A2B`
  - Hairlines: `rgba(28, 20, 18, 0.11)` (hover `rgba(28, 20, 18, 0.24)`)
- **Typography:**
  - Editorial Wine Titles: `'Cormorant Garamond', Georgia, serif`
  - UI, Controls, Body & Tabular Data: `'Plus Jakarta Sans', system-ui, sans-serif`
  - Numerals: `font-variant-numeric: tabular-nums` on ratings, prices, percentages, vintages, and temperatures.
- **Craft Commitments:**
  - No kickers/eyebrows above headings; headings carry their own weight.
  - No section numbering (`01` / `02`) or emoji standing in for icons (`lucide-react` exclusively).
  - Slide-over Sommelier Drawer for wine detail instead of cramped centered modals.
  - Skeleton shimmer cards for infinite scroll and loading states.
  - Palette-matched browser surfaces (`::selection`, custom scrollbars, `:focus-visible`, `text-underline-offset`).

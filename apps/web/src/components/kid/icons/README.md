# Kid Icon System v1 — Cú Vàng Tactile

The app's first-party icon library. Every icon is a 24×24 SVG with rounded geometry, a brown `currentColor` outline, and a semantic gold surface using `--kid-icon-gold` (default `#FFCA28`). A small sky-blue detail is reserved for an interactive or learning-focused point of emphasis.

## Categories

- `navigation.tsx`: home, search, game and chevrons.
- `learning.tsx`: classroom, assessment, plan, library, lesson, wellbeing, students and analytics.
- `account.tsx`: profile, settings, sign-in and sign-out.
- `actions.tsx`: movement, selection, sharing, filtering, download and view controls.
- `feedback.tsx`: validation, alerts, protection, time and visibility states.
- `utilities.tsx`: communication, audio, devices and learning tools.
- `rewards.tsx`: progress, achievements, goals and theme controls.

## Usage

```tsx
import { KidSearchIcon } from '@/components/kid/icons';

<button aria-label="Tìm kiếm" className="text-amber-950">
  <KidSearchIcon className="size-5" />
</button>;
```

Use `size-4`, `size-5` or `size-6`; do not override SVG stroke properties with Tailwind's `stroke-*` color utility. For an icon surface that needs more contrast, set `--kid-icon-gold` on the icon or its parent.

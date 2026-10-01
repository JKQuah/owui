# owui

React components built on Tailwind CSS v4 and shadcn/ui.

## Install

```bash
pnpm add owui
```

Peer dependencies: `react`, `react-dom` (>= 18).

```tsx
import { Button, Container, TextBlock, Typography } from "owui"
import "owui/styles.css" // once, at your app entry
```

```tsx
<Container variant="dark" size="md">
  <TextBlock
    tagline="New"
    title="Ship faster"
    description="Reusable components."
    action={<InteractiveButton icon={<ArrowRight />} animation="underline">Start</InteractiveButton>}
  />
  <NewsCarousel imageEffect="corner" controlsAlign="right" items={items} />
</Container>
```

## Components

| Component | Props |
|---|---|
| `Button` | `variant`: default, destructive, outline, secondary, ghost, link. `size`: default, xs, sm, lg, icon, icon-xs, icon-sm, icon-lg. `asChild` |
| `Container` | `variant`: default (transparent), dark, green, gradient. `size`: none, xs, sm, md, lg (= default), xl. `asChild` |
| `Typography` | `variant`: h1, h2, h3, h4, p, blockquote, code, lead, large, small, muted. `asChild` |
| `InteractiveButton` | All `Button` props except `asChild`, plus `icon`, `iconPosition` (left/right), `animation` (none/underline/swipe, one at a time) |
| `NewsCarousel` | `items` (`image`, `imageAlt`, `date`, `title`, `href`), `imageEffect` (none/zoom/corner), `showControls`, `controlsAlign` (left/center/right), `activeVariant` (default outline), `inactiveVariant` (default ghost), `label`. Pagination pages = screenfuls of cards. 3 / 2 / 1 columns; `--columns`, `--gap` variables |
| `Marquee` | `reverse`, `pauseOnHover`, `vertical` (needs a fixed height), `repeat`. Speed/spacing via `--duration` and `--gap` |
| `NumberTicker` | `value`, `startValue`, `direction` (up/down), `delay` (seconds), `decimalPlaces`. Counts when scrolled into view; honours `prefers-reduced-motion` |
| `Pagination` | shadcn pagination parts. `PaginationLink` also takes `activeVariant` / `inactiveVariant` |
| `TextBlock` | `tagline`, `icon`, `title`, `description`, `points`, `pointIcon`, `extra`, `action` (vertical stack; each point is a string, node, or array mixing text and `{ text, href, external? }` links; `pointIcon` defaults to `•`) |

## Customising styles

Every component carries a semantic class and a `data-slot` attribute next to its
Tailwind utilities. Override them with plain CSS in your app, **after** importing
`owui/styles.css`. Unlayered CSS beats the library's cascade layers, so you
don't need `!important`. (If you write the override inside your own
`@layer utilities` or `@layer components`, it will lose to the library.)

```css
.button-lg   { height: 3.5rem; padding-inline: 2rem; font-size: 1.125rem; }
.text-block  { gap: 2rem; }
.container-green { background-color: #16a34a; }
```

### Override classes

| Component | Classes |
|---|---|
| Button | `.button-default` `.button-xs` `.button-sm` `.button-lg` `.button-icon` `.button-icon-xs` `.button-icon-sm` `.button-icon-lg` |
| Container | `.container-base` (width, radius, horizontal padding) |
| Container variants | `.container-default` `.container-dark` `.container-green` `.container-gradient` |
| Container sizes | `.container-none` `.container-xs` `.container-sm` `.container-md` `.container-lg` `.container-xl` (vertical padding, steps down at each breakpoint) |
| InteractiveButton | `.interactive-button`, `.interactive-button-icon`, `.interactive-button-label` (plus the `.button-*` size classes) |
| NewsCarousel | `.news-carousel` (set `--columns`, `--gap` here), `-track`, `-item`, `-image`, `-image-border`, `-date`, `-title`, `-controls` |
| Marquee | `.marquee` (set `--duration`, `--gap` here), `.marquee-track` |
| NumberTicker | `.number-ticker` (inherits text colour) |
| TextBlock | `.text-block` (the `gap`), `.text-block-tagline`, `.text-block-icon`, `.text-block-title`, `.text-block-description`, `.text-block-points`, `.text-block-point`, `.text-block-point-icon`, `.text-block-point-content`, `.text-block-extra`, `.text-block-action` |

### Data attributes

Also targetable, e.g. `[data-slot="button"][data-variant="outline"]`:

- `Button`: `data-slot="button"`, `data-variant`, `data-size`
- `Container`: `data-slot="container"`, `data-variant`, `data-size`
- `InteractiveButton`: `data-slot="interactive-button"` (`data-icon-position`, `data-icon-animation`), `interactive-button-icon`, `interactive-button-label`
- `NewsCarousel`: `data-slot="news-carousel"` (`data-image-effect`) and `news-carousel-track|item|image|image-border|date|title|controls`
- `Marquee`: `data-slot="marquee"` (`data-orientation`), `data-slot="marquee-track"`
- `NumberTicker`: `data-slot="number-ticker"`
- `Pagination`: `data-slot="pagination"`, `pagination-content|item|link` (`data-active`), `pagination-ellipsis`
- `TextBlock`: `data-slot="text-block"` and `text-block-tagline|icon|title|description|points|point|point-icon|point-content|extra|action`
- `Typography`: `data-slot="typography"`, `data-variant`

### Theme tokens

Colours and radius are CSS variables (`--background`, `--foreground`,
`--primary`, `--primary-foreground`, `--secondary`, `--muted`, `--accent`,
`--destructive`, `--border`, `--input`, `--ring`, `--radius`). Override them on
`:root`, or on `.dark` for dark mode (a `.dark` class on any ancestor enables it).

## Breakpoints (desktop-first)

Defined at library build time: `sm` 640px, `md` 1000px, `lg` 1200px. Components
use the `max-*` variants (`max-lg:` below 1200px, `max-md:` below 1000px,
`max-sm:` below 640px). They can't be changed from a consuming app.

## Development

Requires Node >= 20.11 and pnpm.

```bash
pnpm storybook        # component playground at http://localhost:6006
pnpm build-storybook  # static build into storybook-static/
pnpm build            # dist/index.js, index.cjs, index.d.ts, owui.css
pnpm typecheck
```

Stories live in `stories/` (one file per component, with controls for every
variant). Use the toolbar's Theme switch for dark mode and the viewport tool to
test the desktop-first breakpoints. Add a story whenever you add a component.

### Adding shadcn components

`pnpm shadcn add <name>` works, with caveats seen in this repo:

- Never pass `--overwrite`, and don't re-add `button` or `pagination`: they are
  customised (override classes in `button.tsx`, `activeVariant` /
  `inactiveVariant` in `pagination.tsx`). The CLI asks before overwriting; answer no.
- The CLI may install an unrelated npm package called `cn` and write
  `import { cn } from "cn"`. Change the import to `@/lib/utils` and run
  `pnpm remove cn`.
- If a component is skipped because of an existing file, `pnpm shadcn view <name>`
  prints its source to copy by hand.
- After adding one, convert mobile-first `sm:` / `md:` / `lg:` classes to `max-*`
  (see Breakpoints), and add it to `src/index.ts` and this README.

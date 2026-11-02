---
name: ShopEase
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#1d4ed8'
  on-secondary: '#ffffff'
  secondary-container: '#4069f2'
  on-secondary-container: '#fffbff'
  tertiary: '#006329'
  on-tertiary: '#ffffff'
  tertiary-container: '#007f36'
  on-tertiary-container: '#c7ffca'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#b7c4ff'
  on-secondary-fixed: '#001551'
  on-secondary-fixed-variant: '#0039b5'
  tertiary-fixed: '#7ffc97'
  tertiary-fixed-dim: '#62df7d'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005320'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system projects clarity, high-trust precision, and effortless commerce. It converges the editorial discipline of modern software design (Stripe, Linear) with the frictionless consumer experience of flagship retail environments (Apple Store). The target audience spans design-conscious digital natives and pragmatic shoppers who demand instantaneous hierarchy, rapid search-to-checkout flows, and undeniable visual credibility.

Visually, the style is **Corporate / Modern with High-Precision Polish**:
- **Purity over Noise:** Generous whitespace, razor-thin structural dividers, and deliberate high-contrast typographic anchoring.
- **Micro-tactile Feedback:** Crisp pill badges, delicate inner borders, and light-handed elevation that signals clickable depth without heavy skeuomorphism.
- **Utilitarian Utility:** Dense, informative metadata structured cleanly alongside aspirational, large-scale product imagery.

## Colors

The color architecture is built for strict functional hierarchy on clean slate canvases:

- **Primary Canvas & Surfaces:** The default workspace is anchored by neutral-tinted slate `#F8FAFC`, allowing crisp pure white `#FFFFFF` component cards, drawers, and modal panels to pop cleanly without intense drop shadows.
- **Primary & Interactive Accents:** Royal Blue (`#2563EB`) commands all primary transaction actions, checkout progress bars, active states, and focal focus rings. Its deeper partner (`#1D4ED8`) is reserved for deliberate hover and active press states.
- **Typography & Structural Contrast:** `#0F172A` provides rich contrast for titles, prices, and core metrics without the harshness of pure black. Secondary metadata, SKUs, and utility descriptions deploy `#64748B`.
- **System Borders:** Every card, container, input, and floating sheet utilizes hairline borders rendered in `#E2E8F0` to maintain crisp separation in high-density catalog views.
- **State Feedback:** Semantic signals strictly employ `#16A34A` (stock confirmations, savings callouts, successful checkouts), `#F59E0B` (low stock alerts, reviews), and `#DC2626` (validation failures, cancellations, critical errors).

## Typography

Typographic scale is powered exclusively by **Plus Jakarta Sans**, chosen for its balanced geometric geometry, warm rounded terminals, and clear legibility at compact interface scales.

- **Hero & Headlines:** Display weights use tight negative tracking (`-0.02em` to `-0.03em`) and medium/semibold weights to evoke contemporary editorial authority.
- **Price Architecture:** Product prices borrow numeric tabular features from the font to ensure seamless visual alignment in grids, tables, and cart rollups.
- **Micro-copy & Status Labels:** `label-sm` and `label-md` employ letter-spacing expansion (`+0.02em` to `+0.03em`) and uppercase treatments where badges, status indicators, and category kickers require instant cognitive separation.

## Layout & Spacing

The layout model is based on an 8pt architectural rhythm structured within a 12-column responsive fluid grid.

- **Desktop (>= 1280px):** 12 columns with max container constraint of `1440px`. Gutters sit at `1.5rem`, outer margins at `2rem`. E-commerce listing grids flex smoothly across 4 columns (or 3 columns with an expanded filter sidebar).
- **Tablet (768px – 1279px):** 8-column layout with `1rem` gutters and `1.5rem` outer margins. Side filters collapse into bottom sheets or slide-over utility trays.
- **Mobile (< 768px):** 4-column layout with `1rem` margins and `1rem` gutters. Product cards condense into high-velocity 2-column grids or horizontal listing units. Sticky checkout action bars pin dynamically to the safe bottom margin.
- **Spacing Rhythm:** Internal card and container paddings use `space-md` (`1rem`) and `space-lg` (`1.5rem`). Section separators utilize `space-xl` (`2.5rem`) to maintain breathable, calm page transitions.

## Elevation & Depth

Visual hierarchy leverages crisp surface transitions paired with microscopic, tinted ambient diffusion rather than deep physical drops:

- **Flat/Ground:** Canvas surfaces sit directly on `#F8FAFC` with 0px elevation.
- **Subtle Surface Card:** Surface containers (`#FFFFFF`) rely on a single 1px hairline border of `#E2E8F0` coupled with an ultra-soft ambient shadow: `0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)`.
- **Interactive Hover:** Card hovers and product tiles translate -1px along the Y-axis and ease into `0 8px 16px -4px rgba(15, 23, 42, 0.06), 0 2px 4px -1px rgba(15, 23, 42, 0.03)`.
- **Flyouts & Dropdowns:** Filter menus, autocomplete search panels, and cart drawers elevate above canvas with `0 12px 28px -4px rgba(15, 23, 42, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.03)` wrapped in a 1px border.
- **Modals & Overlays:** Checkout sheets and quick-look overlays sit atop a `#0F172A` backdrop attenuated to 40% opacity with a 4px background blur.

## Shapes

The interface embraces modern softness without sacrificing mathematical discipline:

- **Base Components:** Standard inputs, buttons, category cards, and drop menus use `roundedness: 2` (0.5rem / 8px).
- **Panels & Hero Containers:** Product detail containers, cart summary panels, and modal dialogs extend to `rounded-lg` (1rem / 16px) or `rounded-xl` (1.5rem / 24px).
- **Pill Primitives:** Badges, category filter chips, search query pills, and floating notification badges employ full 9999px pill radii to contrast deliberately against rectangular image viewports.

## Components

### Buttons
- **Primary Action (Add to Cart / Checkout):** Deep Royal Blue (`#2563EB`) solid fill, text white (`#FFFFFF`), `font-weight: 600`, 0.5rem border radius. Hover transitions seamlessly to `#1D4ED8`. Active state scales subtly (98%). Height: 44px (48px on mobile).
- **Secondary Action:** Crisp surface (`#FFFFFF`) with a 1px `#E2E8F0` border, `#0F172A` text, and subtle hover fill (`#F8FAFC`).
- **Ghost/Tertiary:** No border, transparent background, `#64748B` label transitioning to `#0F172A` on interaction.

### Badges & Chips
- **Status Badges (Pills):** Rendered with a full pill radius. Stock indicator uses light emerald background (`#DCFCE7`) with deep green text (`#16A34A`). Sale/Discount tag uses vibrant slate or soft blue (`#EFF6FF`) with `#2563EB` text.
- **Filter Chips:** 36px height, rounded pill shape. Default state: white fill, `#E2E8F0` border, `#0F172A` text. Selected state: `#0F172A` solid background with white text and an inline Lucide outline cross icon for single-tap removal.

### Input Fields & Search Bars
- **Text Inputs:** Height 44px, `#FFFFFF` background, 1px border `#E2E8F0`, 0.5rem radius, interior padding `0.75rem 1rem`. Focus state removes default outline and engages a crisp 2px primary ring (`#2563EB`) with zero displacement.
- **Global Search:** Prominent header anchor featuring Lucide `Search` outline icon at 18px in `#64748B`, placeholder in `#64748B`, and a trailing pill hotkey badge (`⌘K`).

### Product Cards
- **Structure:** Surface white (`#FFFFFF`) card, 1px `#E2E8F0` border, 0.5rem corner rounding, subtle ambient shadow.
- **Media Asset:** 1:1 or 4:5 aspect ratio image viewport with a neutral off-white backing (`#F1F5F9`) and a faint internal inset border.
- **Content Stacking:** Category kicker (`label-sm`, uppercase), bold product title (`headline-sm`, 2-line clamp maximum), real-time rating star cluster with review tally, and high-visibility price (`headline-md`) alongside strikethrough comparison price in `#64748B`.
- **Interaction:** Hover triggers image crossfade (alternate angle) and reveals a 1-click quick-add floating circular action button.

### Form Selectors (Checkboxes & Radios)
- **Checkboxes:** 18x18px square with 4px border radius. Unchecked: `#FFFFFF` fill, 1.5px border `#CBD5E1`. Checked: `#2563EB` solid fill with crisp centered white check glyph.
- **Radio Buttons:** 18x18px concentric circles with `#2563EB` inner dot upon selection.

### Cart Drawer & Summary Row
- **Mini-cart / Slideover:** 400px fixed desktop tray with full-height border separator. Item rows display a 64x64px thumbnail, stepper quantity selector (- / + buttons in neutral gray), dynamic subtotal, and hairline border separators.
# ShopEase — Complete Design Analysis & UI/UX System Specification

**Project:** ShopEase – A Modern Full-Stack E-Commerce Platform  
**Design Reference:** `stitch_reference/stitch_shopease_modern_e_commerce_platform`  
**Author:** Senior Full-Stack Software Engineer & UI/UX Architect  
**Date:** November 2026

---

## 1. Design Philosophy
The ShopEase design system projects **clarity, high-trust precision, and frictionless modern commerce**. It converges the editorial discipline of modern software design (Stripe, Linear) with the intuitive consumer experience of flagship retail platforms (Apple Store).

### Core Tenets
- **Purity over Noise:** Generous whitespace, razor-thin structural dividers (`#E2E8F0` / `surface-container-high`), and deliberate high-contrast typographic hierarchy.
- **Micro-Tactile Feedback:** Crisp pill badges, delicate inner borders, subtle ambient elevation (`shadow-xs` to `shadow-md`), and interactive hover states (`hover:-translate-y-1` and `active:scale-[0.98]`).
- **Utilitarian Utility:** Dense, informative metadata structured cleanly alongside aspirational, large-scale product imagery with clear status indicators (In Stock, Best Seller, Hot Deals).

---

## 2. Color Palette & Semantic Tokens

### Canvas & Surfaces
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `background` / `surface` | `#FAF8FF` | Default canvas background |
| `surface-container-lowest` | `#FFFFFF` | Primary cards, sheets, topbars, modals |
| `surface-container-low` | `#F2F3FF` | Input fields, secondary action backgrounds |
| `surface-container` | `#EAEDFF` | Table headers, active category chips |
| `surface-container-high` | `#E2E7FF` | Structural borders, subtle dividers |
| `surface-container-highest` | `#DAE2FD` | Keyboard badges (`⌘K`), subtle container highlights |
| `inverse-surface` | `#283044` | Top announcement bar, dark accents |
| `inverse-on-surface` | `#EEF0FF` | Text on announcement banner |

### Primary Brand & Accents
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `primary` | `#004AC6` | Primary brand blue, prominent titles, links |
| `primary-container` | `#2563EB` | Primary CTA buttons, focused rings, active switches |
| `secondary` | `#1D4ED8` | Hover state for primary buttons |
| `on-primary` | `#FFFFFF` | Text on primary buttons and badges |
| `primary-fixed` | `#DBE1FF` | Soft avatar badge backgrounds |
| `on-primary-fixed` | `#00174B` | High-contrast text on primary-fixed badges |

### Typography & Outline
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `on-surface` | `#131B2E` | High-contrast headings, prices, item titles |
| `on-surface-variant` | `#434655` | Secondary metadata, descriptions, category text |
| `outline` | `#737686` | Search placeholders, breadcrumbs, icons |
| `outline-variant` | `#C3C6D7` | Hairline dividers, border outlines |

### Semantic Feedback
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `tertiary` / `tertiary-container` | `#006329` / `#007F36` | In-stock badges, flash deal live indicators |
| `tertiary-fixed` | `#7FFC97` | Pulse indicator dots, success accents |
| `error` | `#BA1A1A` / `#DC2626` | Cart item counters, hot deal tags, discount pills |
| `error-container` | `#FFDAD6` | Discount tag background |
| `amber-500` | `#F59E0B` | Review rating stars |

---

## 3. Typography System
Font Family: **Plus Jakarta Sans** (Google Fonts) with fallback `sans-serif`.  
Icons: **Material Symbols Outlined** (Google Fonts) and **Lucide React**.

| Style Name | Font Size | Line Height | Letter Spacing | Font Weight | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display-hero` | 56px | 64px | -0.03em | 700 (Bold) | Main Hero Titles |
| `display-hero-mobile` | 36px | 44px | -0.02em | 700 (Bold) | Mobile Hero Titles |
| `headline-lg` | 32px | 40px | -0.02em | 600 (Semibold) | Section Headings, Page Titles |
| `headline-lg-mobile`| 24px | 32px | -0.015em | 600 (Semibold) | Mobile Section Headings |
| `headline-md` | 20px | 28px | -0.01em | 600 (Semibold) | Product Prices, Modal Titles |
| `headline-sm` | 16px | 24px | -0.005em | 600 (Semibold) | Product Card Titles, Card Headers |
| `body-lg` | 18px | 28px | Normal | 400 (Regular) | Hero Subtitles, Lead Paragraphs |
| `body-md` | 15px | 24px | Normal | 400 (Regular) | Standard Body Copy, Product Desc |
| `body-sm` | 13px | 20px | Normal | 400 (Regular) | Secondary Metadata, Breadcrumbs |
| `label-lg` | 14px | 20px | +0.01em | 600 (Semibold) | Main Nav Links, Button Labels |
| `label-md` | 12px | 16px | +0.02em | 500 (Medium) | Small Buttons, Table Headers |
| `label-sm` | 11px | 14px | +0.03em | 600 (Semibold) | Badges, Chips, Category Kickers |

---

## 4. Spacing, Radii & Elevation

### Spacing System
- 8pt architectural grid (`0.25rem`, `0.5rem`, `1rem`, `1.5rem`, `2rem`, `2.5rem`).
- Container Max Width: `1440px` centered with responsive horizontal padding (`px-4` on mobile, `px-6` on tablet/desktop).

### Border Radii
- `rounded-sm`: `0.25rem` (4px) — Checkboxes, micro badges.
- `rounded-lg`: `0.5rem` (8px) — Buttons, input fields, product cards, dropdowns.
- `rounded-xl`: `0.75rem` (12px) — Filter sidebars, gallery viewports, modal containers.
- `rounded-full`: `9999px` — Status pills, circular action buttons, avatar badges.

### Elevation & Depth
- **Ground:** `#FAF8FF` with 0px elevation.
- **Card Surface:** `#FFFFFF` with 1px border `#E2E8F0` + `shadow-xs` / `shadow-sm`.
- **Card Hover:** Smooth elevation to `shadow-md` with `translate-y-[-2px]`.
- **Drawers / Modals:** `shadow-xl` with backdrop blur (`backdrop-blur-sm bg-black/40`).

---

## 5. Component Hierarchy & Reusable Primitives

1. **Top Utility Bar:** Announcement banner (`#283044`), live event pulse indicator, currency/language dropdowns, order tracking link.
2. **Main Header & Navigation:**
   - Brand Logo with icon and high-contrast wordmark.
   - Global Unified Search Bar with search icon, input, and `⌘K` command shortcut badge.
   - Quick Nav Links (Home, Shop, Categories, Deals with HOT badge).
   - Trailing Action Cluster: Wishlist icon with badge counter, Cart drawer toggle with count badge, User Account profile pill.
3. **Category Secondary Ribbon:** Fast horizontal category filter bar with quick links and order status concierge shortcuts.
4. **Product Card Component:**
   - Aspect-square image container with `#F1F5F9` background.
   - Badges: "Best Seller" (Primary Blue), "-20% OFF" (Red), or "New".
   - Heart wishlist toggle with circular backdrop blur container.
   - Category kicker in uppercase tracking.
   - Two-line clamped product title with hover color transition to primary.
   - Rating stars cluster (filled amber star + rating value + review count).
   - High-visibility price with strikethrough original price.
   - Live stock indicator (green dot with "In Stock" label).
   - Full-width "Add to Cart" button with shopping cart icon.
5. **Product Details Layout:**
   - Breadcrumb navigation (`Home / Electronics / Headphones / Product Name`).
   - Sticky gallery section with vertical thumbnail rail and high-resolution zoomable hero image viewport.
   - Badges overlay ("Flagship Edition", "Spatial Audio v3", "360° View").
   - SKU, Title, Rating stars, Price ($/strikethrough/savings pill).
   - Color selection chips and quantity stepper (- / 1 / +).
   - Primary "Add to Cart" CTA and "Buy Now" secondary CTA.
   - Delivery / Warranty trust indicators.
   - Detailed tabbed specs, customer reviews, and ratings breakdown.
6. **Cart Drawer & Summary:**
   - Slide-over drawer with backdrop blur.
   - Cart item rows with 64x64px thumbnail, title, price, quantity stepper, and trash icon.
   - Subtotal, estimated tax, free shipping progress bar, and checkout CTA.
7. **Filters Sidebar:**
   - Search & Category tree with count badges.
   - Price range slider with numeric min/max inputs.
   - Rating filters (5 stars down to 1 star).
   - Availability toggles (In Stock Only, On Sale).
   - Feature checkboxes.

---

## 6. Design Reference Mapping Table

| Extracted Design Reference | Primary Template Screen | Target Application Page & Route | Full-Stack Integration |
| :--- | :--- | :--- | :--- |
| `shopease_homepage/code.html` | Homepage & Featured Showcase | `/` (Home Page) | Dynamic Hero, Categories, Featured Products (`/api/products?featured=true`), Testimonials, Deals |
| `shopease_product_catalog/code.html` | Product Catalog & Filter Grid | `/shop` (Product Listing) | Live Search (`/api/products?search=`), Category Filter, Price Range, Sort, Density Toggle (3/4 cols), Pagination |
| `shopease_product_details/code.html` | Product Detail & Specifications | `/product/:id` (Product Detail) | Database product fetch (`/api/products/:id`), Interactive Gallery, Review submission (`/api/products/:id/reviews`), Add to Cart |
| *Extended Design Language* | Cart Drawer & Full Cart | `/cart` & Slide-over Drawer | Cart state context, Quantity updates (`/api/cart`), Inventory checks, Coupon discount logic |
| *Extended Design Language* | Checkout & Order Placement | `/checkout` | Shipping address form, COD / Simulated Online Card payment, Order creation (`/api/orders`) |
| *Extended Design Language* | Order Confirmation & Tracking | `/order-confirmation/:id`, `/orders` | Order lookup (`/api/orders/:id`), Live timeline tracking, Customer order history |
| *Extended Design Language* | Authentication (Login & Register) | `/login`, `/register` | JWT auth (`/api/auth/login`, `/api/auth/register`), Form validation, Role-based redirect |
| *Extended Design Language* | Customer Profile & Orders | `/profile` | Profile viewing/editing (`/api/auth/me`), Saved addresses |
| *Extended Design Language* | Admin Dashboard | `/admin` | Metrics (`/api/admin/dashboard`), Revenue stats, Order status chart, Low-stock alerts |
| *Extended Design Language* | Admin Product Management | `/admin/products` | Product CRUD (`/api/products`), Multer Image Upload (`/api/upload`), Stock controls |
| *Extended Design Language* | Admin Order Management | `/admin/orders` | Order status updater (`/api/admin/orders/:id/status`), Customer records |

---

## 7. Responsive Behavior Specification
- **Desktop (>= 1280px):** 12-column layout, 4-column product grid with sticky filter sidebar, multi-level navigation.
- **Laptop / Tablet (768px – 1279px):** 8-column layout, 2 to 3-column product grid, collapsable filter drawer, tablet-optimized thumb rails.
- **Mobile (< 768px):** 4-column layout, 2-column compact product card grid, mobile bottom sticky action bar ("Add to Cart" / "Checkout"), mobile hamburger menu with slide-in navigation.

---

## 8. Missing Screens Extended Using the Design System
1. **Authentication Screens (`/login`, `/register`):** Built using the `#FAF8FF` canvas, `#FFFFFF` rounded-xl card, `#2563EB` primary buttons, `#E2E8F0` hairline inputs with focus rings, social login pills, and role switchers (Customer vs Admin demo quick-fill buttons).
2. **Checkout Flow (`/checkout`):** 2-column layout with shipping address form, simulated payment gateway (Cash on Delivery + Card simulator), and real-time order summary.
3. **Admin Dashboard (`/admin`):** Modern clean control room with stat metric cards (Revenue, Orders, Products, Customers), low-stock warning chips, interactive SVG revenue chart, product CRUD modal, and order status dropdowns.
4. **Order History & Tracking (`/orders`):** Order cards with tracking steps (Placed -> Processing -> Shipped -> Delivered) matching the exact Plus Jakarta Sans typography and color system.


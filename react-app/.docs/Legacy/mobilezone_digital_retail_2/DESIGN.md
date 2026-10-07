---
name: MobileZone Digital Retail
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#434655'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006e2f'
  on-secondary: '#ffffff'
  secondary-container: '#6bff8f'
  on-secondary-container: '#007432'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6bff8f'
  secondary-fixed-dim: '#4ae176'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
  muted: '#64748b'
  line: '#e2e8f0'
  pale: '#f8fafc'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  label-md:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style

The design system establishes a **Premium Technological** aesthetic, positioning the product at the intersection of high-end hardware retail and cutting-edge digital performance. The brand personality is sophisticated, precise, and forward-thinking.

The visual direction blends **Minimalism** with **Glassmorphism** to create a sense of lightness and technical depth. The interface utilizes generous white space, smooth scale-based transitions, and soft gradients to evoke an emotional response of luxury and effortless efficiency. Every interaction is designed to feel high-fidelity, mirroring the premium nature of the mobile technology it showcases.

## Colors

The palette is anchored in technical clarity and premium aesthetics:

- **Primary (Blue):** The core action color, used for primary buttons, active states, and focus indicators. It represents technological reliability.
- **Secondary (Green):** Reserved for positive reinforcement, such as "In Stock" indicators, price drops, and success confirmations.
- **Ink & Muted:** The "Ink" (#1e293b) provides high-contrast legibility for typography, while "Muted" (#64748b) is used for secondary data and metadata.
- **System Surfaces:** "Pale" (#f8fafc) serves as the base background color to keep the UI feeling airy, while "Line" (#e2e8f0) is used for subtle structural boundaries.

## Typography

This design system uses a dual-font strategy to balance character with readability.

**Space Grotesk** is used for headlines and branding. Its geometric, technical quirks reinforce the "MobileZone" tech identity. It should be set with tight letter spacing for display roles to maintain a "locked-in" appearance.

**DM Sans** is the workhorse for body text and interface labels. Its low-contrast, geometric shapes ensure maximum legibility across varied device specifications. Body text uses a comfortable 1.5x line height to allow for effortless scanning of technical specs and product descriptions.

## Layout & Spacing

The layout follows a **Fluid Grid** model with strict maximum constraints to preserve a premium editorial feel.

- **Desktop:** A 12-column grid with 24px gutters. The primary navigation is horizontal, utilizing the full width for high-priority product categories.
- **Mobile:** A 4-column grid with 16px margins. Navigation is consolidated into a "hamburger" menu to prioritize screen real estate for product imagery.
- **Rhythm:** Spacing between sections should be expansive (48px to 80px) to allow the "Glassmorphism" and "Pale" surfaces to breathe. Internal component spacing follows a 4px base unit.

## Elevation & Depth

Depth is achieved through a combination of **Glassmorphism** and **Ambient Shadows**.

1.  **Glassmorphism (Top Bar):** The main navigation bar uses a backdrop blur (20px) with a semi-transparent background (#ffffff80) and a subtle 1px bottom border (#e2e8f0). This ensures the content "flows" beneath the chrome, emphasizing the technical layers.
2.  **Soft Shadows:** Product cards and floating modules use extra-diffused shadows with a slight blue tint (derived from #2563eb at 5% opacity).
3.  **Dynamic States:** Elevation is not static. Upon hover, cards should transition their shadow to a higher spread and slightly scale (1.02x) to provide a tactile, responsive feel.

## Shapes

The shape language is consistently **Rounded** to balance the sharp technical nature of the products with a premium, approachable retail feel.

- **Cards & Modals:** Use `rounded-lg` (1rem) for a modern, soft aesthetic.
- **Interactive Elements:** Buttons and inputs use the base `rounded` (0.5rem) to maintain a sense of precision and functional utility.
- **Indicators:** Availability chips and badges use pill-shapes (full rounding) to clearly distinguish them from actionable buttons.

## Components

- **Navigation Bar:** Desktop navigation is horizontal with a glassmorphism effect. On mobile, the hamburger menu should trigger a full-screen or side-drawer overlay with high-contrast typography.
- **Product Cards:** The centerpiece component. It features a soft shadow and a subtle transition on hover (scale 1.02x). The image area uses a soft gradient background to provide depth to product renders.
- **Buttons:** Primary buttons use a solid #2563eb fill with white text. Secondary buttons should use a soft gradient or "Pale" background with a 1px "Line" border.
- **Input Fields:** Minimalist and technical. 1px border (#e2e8f0) that transitions to 2px Primary Blue on focus.
- **Chips & Badges:** Used for "New", "Sale", or "In Stock" (Secondary Green). These use `label-sm` typography and pill-shaped rounding.
- **Animated Transitions:** All state changes (hover, focus, page transitions) must use a 300ms ease-in-out curve to maintain the premium, fluid feel of the brand.
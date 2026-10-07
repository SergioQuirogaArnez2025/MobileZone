---
name: MobileZone Digital Retail
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
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
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
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
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-lg: 48px
  stack-md: 24px
  stack-sm: 12px
---

## Brand & Style
The design system embodies a "Tech-Forward Minimalist" aesthetic, prioritizing clarity, precision, and a premium retail experience. It targets tech-savvy consumers who value transparency and high-performance hardware. 

The visual language draws heavily from **Minimalism** and **Modern Corporate** styles, utilizing expansive whitespace to allow high-resolution product photography to serve as the primary visual driver. The emotional response is one of trust, efficiency, and cutting-edge sophistication. Every interface element is designed to feel intentional and frictionless, mirroring the seamless performance of the devices being sold.

## Colors
The palette is rooted in a pristine, high-tech environment. 

- **Primary (Electric Blue):** Used exclusively for high-priority actions, primary buttons, and active states. It signals utility and professional reliability.
- **Secondary (Emerald Green):** Reserved for success states, stock availability, and promotional badges to evoke a sense of value and positive confirmation.
- **Neutral / Background:** A base of pure white (#FFFFFF) for primary surfaces, transitioning to a light Slate (#F8FAFC) for secondary containers and section backgrounds to provide subtle depth without clutter.
- **Typography Colors:** Deep Slate (#0F172A) for maximum legibility in headlines, and a softer Cool Gray (#64748B) for secondary metadata and body descriptions.

## Typography
The typography system uses **Inter** across all levels to maintain a cohesive, systematic feel. 

Hierarchy is established through weight and generous tracking rather than excessive size variations. Display and headline styles feature slightly tighter letter spacing for a "locked-in" technical look, while body text uses increased tracking (0.01em+) and line heights (1.5x) to ensure effortless readability during long-form spec comparisons. Small labels are consistently uppercase with wide tracking to denote categorization and technical specifications.

## Layout & Spacing
This design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

The spacing rhythm is built on a 4px baseline, with a preference for larger gaps (48px+) between major sections to prevent visual fatigue and emphasize premium positioning. Content containers are capped at 1280px to maintain optimal line lengths for technical data. Product grids should utilize "Staggered Padding" where imagery is given significantly more internal breathing room than the text labels below it, focusing the eye on the industrial design of the hardware.

## Elevation & Depth
Elevation is conveyed through **Tonal Layering** supplemented by low-profile shadows. 

1. **Base:** White (#FFFFFF) for the main canvas.
2. **Floated Containers:** Items like Product Cards or Comparison modules use a subtle #0F172A shadow at 4% opacity with a 20px blur and 4px vertical offset. This creates a "hovering" effect rather than a heavy "stacked" look.
3. **Interactive States:** Upon hover, card shadows should slightly intensify (8% opacity) and the element should scale by 1% to provide tactile feedback.
4. **Dividers:** Use 1px borders in #E2E8F0 rather than shadows for internal table structures or navigation separators to maintain a clean, architectural feel.

## Shapes
The shape language balances approachability with precision. 

- **Primary Cards & Modals:** Use a `rounded-xl` (1.5rem / 24px) or `rounded-lg` (1rem / 16px) radius to soften the high-tech aesthetic and make the retail environment feel welcoming.
- **Interactive Elements:** Buttons and Input fields use a more precise `rounded` (0.5rem / 8px) radius, signaling tactical accuracy.
- **Badges:** Success and Discount badges use a pill-shape (full radius) to differentiate them from functional UI components.

## Components
- **Buttons:** Primary buttons feature a solid Electric Blue background with white text. Secondary buttons use a ghost style with an Electric Blue outline. Padding should be generous: 12px vertical / 24px horizontal.
- **Product Cards:** The primary retail unit. Features a 1:1 aspect ratio for product imagery, centered on a light gray (#F8FAFC) background, with the product name and price left-aligned below in the white footer area of the card.
- **Comparison Tables:** A critical tech-retail component. Use a "Sticky Header" for device names, alternating row colors (#FFFFFF and #F8FAFC), and high-contrast icons for "Included" features.
- **Input Fields:** Minimalist design with a 1px #E2E8F0 border. The border shifts to 2px Electric Blue on focus.
- **Offer Badges:** Small, Emerald Green pill-shaped badges placed in the top-right corner of product cards, using `label-sm` typography for "Save $X" or "New" callouts.
- **Hero Sections:** Left-aligned text blocks using `display-hero` styles, with 50% width dedicated to high-key product renders that bleed off the right edge of the screen.
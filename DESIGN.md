---
name: Star Colours Coating
description: High-end architectural and industrial coatings
colors:
  brand-dark: '#231713'
  brand-card: '#150d0b'
  brand-accent: '#c5a880'
  zinc-100: '#f4f4f5'
typography:
  display:
    fontFamily: 'Outfit, sans-serif'
    fontWeight: 800
  body:
    fontFamily: 'Plus Jakarta Sans, sans-serif'
    fontWeight: 300
  serif:
    fontFamily: 'Playfair Display, Georgia, serif'
rounded:
  sm: '12px'
  md: '16px'
  lg: '24px'
  xl: '40px'
spacing:
  xs: '8px'
  sm: '16px'
  md: '24px'
  lg: '32px'
components:
  button-primary:
    backgroundColor: '{colors.brand-accent}'
    textColor: '{colors.brand-card}'
    rounded: '9999px'
    padding: '14px 32px'
  button-primary-hover:
    backgroundColor: 'transparent'
    textColor: '{colors.brand-accent}'
---

# Design System: Star Colours Coating

## 1. Overview

**Creative North Star: "The Tactile Alchemist"**

The Tactile Alchemist design system focuses on the visualization of texture, high-performance protective quality, and uncompromised surface luxury. The aesthetic philosophy is rooted in a rich, warm dark atmosphere where tactile depth and finish details take center stage. High-fidelity photography is used to reveal micro-texture patterns, complemented by refined serif headlines and precise burnished gold accent details.

This system explicitly rejects flat corporate aesthetics, generic neon gradients, excessive boxed cards, and uninspired layout templates. Its voice is confident, meticulous, and premium.

**Key Characteristics:**

- Deep, warm-toned dark backgrounds transitioning smoothly to evoke luxury.
- Precise, high-contrast typography pairing geometric and serif families.
- Intentional, rare usage of burnished gold accents to guide visual hierarchy.
- Seamless transitions with staggered reveal effects.

## 2. Colors

The color palette is cohesive, warm, and highly committed to establishing an exclusive, premium dark atmosphere.

### Primary

- **Burnished Gold** (#c5a880): The primary accent, used sparingly (≤10% of any view) on active navigation, action buttons, and focal section dividers.

### Neutral

- **Deep Roasted Cocoa** (#231713): The primary background color, providing a warm, dark, luxurious foundation.
- **Dark Espresso** (#150d0b): Secondary deep neutral used for card backgrounds, details panels, and elevated surfaces.
- **Zinc 100** (#f4f4f5): Primary text color, ensuring high contrast (≥4.5:1) and crisp legibility on dark backgrounds.

### Named Rules

**The Rarity Rule.** The Burnished Gold accent is reserved for key touchpoints only. If everything is highlighted, nothing is.

## 3. Typography

**Display Font:** Outfit (with sans-serif fallback)
**Body Font:** Plus Jakarta Sans (with sans-serif fallback)
**Serif Font:** Playfair Display (with serif fallback)

**Character:** The pairing of the sharp, modern geometric Outfit with the classic, editorial Playfair Display serif establishes a dialogue between contemporary precision and timeless craftsmanship.

### Hierarchy

- **Display** (Extra Bold, clamp(2.25rem, 5vw, 4rem), 1.1): Hero titles and major section headings.
- **Headline** (Bold, 1.875rem, 1.2): Section subheadings and case study names.
- **Title** (Semi Bold, 1.25rem, 1.3): Card titles and details panels headers.
- **Body** (Light, 0.875rem, 1.6): Standard prose and descriptions. Max line length is restricted to 70ch.
- **Label** (Medium, 0.75rem, 0.25em tracking, Uppercase): Eyebrows, buttons, and status indicators.

## 4. Elevation

The system relies on tonal layering and rich gradient flows (from Deep Roasted Cocoa to near-black) to establish depth and structure, rather than drop-shadow offsets.

**The Flat-By-Default Rule.** Elements are flat at rest. Subtle borders and outline indicators represent active elements.

## 5. Components

### Buttons

- **Shape:** Rounded full pill (rounded-full).
- **Primary:** Burnished Gold background with Dark Espresso text, clean padding (14px 32px).
- **Hover:** Transparent background with Burnished Gold border and text, with a slight scale transform.

### Cards

- **Corner Style:** Large rounded corners (rounded-3xl or rounded-[2.5rem] on outer cards).
- **Background:** Dark Espresso (#150d0b) with fine 1px borders (#231713).

### Navigation

- **Style:** Clean, fixed header with transparent backdrop-blur. Upper case links with hover transitions.

## 6. Do's and Don'ts

### Do:

- **Do** maintain a strict contrast ratio (≥4.5:1) for all body copy.
- **Do** stagger animations with individual delays for a premium entrance.
- **Do** center portfolio headings and include the standard gold divider line.

### Don't:

- **Don't** use generic blue-to-purple gradients.
- **Don't** use border-left greater than 1px as a colored accent stripe on cards or alerts.
- **Don't** hide critical details behind hover opacity.
- **Don't** use thin, cramped display typography (letter-spacing floor is -0.04em).

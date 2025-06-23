# SCSS Style Guide

This project uses modular SCSS with a small set of shared variables and mixins. Below is a brief overview of the available helpers.

## Variables (`src/styles/_variables.scss`)

- **Colors**
  - `$color-foreground`, `$color-background`, `$color-card-bg`, `$color-accent-bg`
  - `$color-primary`, `$color-primary-light`
  - `$color-success`, `$color-error`
  - `$color-border`, `$color-text-muted`
- **Typography**
  - `$font-sans`, `$font-mono`
- **Spacing**
  - `$spacing-xs`, `$spacing-sm`, `$spacing-md`, `$spacing-lg`
- **Border radius**
  - `$radius-sm`, `$radius-md`, `$radius-lg`
- **Breakpoints** (`$breakpoints` map)
  - `xs`, `sm`, `md`, `lg`, `xl`

These variables are exposed to CSS custom properties in `globals.scss` for easy theming.

## Mixins (`src/styles/_mixins.scss`)

- `slanted-edge($side, $height)` – Adds a slanted pseudo element on the chosen side.
- `respond-to($break)` – Media query helper that looks up the breakpoint value from `$breakpoints`.

## Helpers

- Utility classes such as `.truncate` are defined in `_helpers.scss`.

Import `globals.scss` once in your application to load the base styles and variables.

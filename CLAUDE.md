# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MUI Registry is a custom component registry built with Next.js 15, Material UI (MUI), and the shadcn CLI. It allows distribution of custom MUI components, blocks, and themes that can be installed via the shadcn CLI.

## Development Commands

```bash
# Start development server with Turbopack
pnpm dev

# Build the registry files and copy to public/r/
pnpm registry:build

# Take screenshots of components (requires dev server on port 3001)
pnpm dev:screenshot

# Build for production
pnpm build

# Lint code
pnpm lint
```

## Architecture

### Registry System

- **registry.json**: Central configuration defining all registry items (components, blocks, themes)
- **public/r/**: Static JSON files served for each registry item after build
- **registry/new-york/**: Source files for all registry items
  - `blocks/`: Reusable UI blocks and components
  - `themes/`: MUI theme configurations
  - `ui/`: Shared UI components

### Key Technologies

- **Next.js 15** with App Router
- **Material UI v7** (@mui/material) for components
- **Emotion** for styling (@emotion/react, @emotion/styled)
- **Tailwind CSS v4** for utility classes
- **shadcn CLI** for registry management

## Creating New Registry Items

Decide the type of the new item:

- **registry:component**: Use for simple components, usually several components import in a single file (small - medium size), e.g. cards, inputs, etc.
- **registry:block**: Use for complex components with multiple files inside or layout templates.
- **registry:theme**: MUI theme configurations
- **registry:lib**: Library integrations (e.g., Next.js App Router setup)
- **registry:hook**: Custom React hooks
- **registry:page**: Use for page or file-based routes.

When creating new blocks or components:

1. Create the component file at `registry/new-york/blocks/{name}/{name}.tsx`
2. Use Material UI components from `@mui/material`
3. Add `"use client"` directive at the top
4. Use module exports (not default exports)
5. Update `registry.json` with the new item metadata
6. Run `pnpm registry:build` to generate the JSON file

Build a demo:

- For components, import the component and render directly in `app/page.tsx` (unless explicitly asked to not do so)
- For blocks, create a decidated demo page in `app/{name}/page.tsx` and render it as iframe in `app/page.tsx` (unless explicitly asked to not do so)
- DON'T create demo for other types unless explicitly asked to do so.
- DON'T pass functions to the component props from the demo page.

## Important Notes

- All components in blocks must use Material UI unless third-party libraries are specifically requested
- Use `mui-docs-mcp` for up-to-date Material UI documentation when available
- After creating a block, check localhost to verify it appears correctly
- Tables in responses should be formatted in plain text within code blocks, not markdown

## File Structure Patterns

- Registry items: `registry/new-york/{type}/{name}/{name}.tsx`
- Demo pages: `app/{name}/page.tsx`
- Screenshots: `public/screenshots/{name}.png`
- Built registry files: `public/r/{name}.json`

## UI and Styling Rules

STRICTLY FOLLOW THESE RULES:

### Button vs IconButton

If the mockup shows a button with high contrast background color, use `Button` component with customized border radius (if necessary) because the `IconButton` doesn't support variant prop.

For example:

```jsx
<Button variant="contained" sx={{ borderRadius: 99 }}>
  <AddIcon />
</Button>
```

Only use `IconButton` for secondary actions, or list of buttons with same size that show only icons.

### `sx` prop

- Keep `sx` props to a minimum. The `sx` prop should be used for structuring layout when composing elements to form a bigger component.
- Don't overuse custom padding, margin, border, box-shadow, etc. Leave it to the theme, unless explicitly asked to do so.
- Don't hardcode colors, spacing, etc. Use the theme variables instead. For colors, try to replicate the color from the mockup by using `color` prop on the component that matches the most, if not, fallback to the `primary` color of the theme (usually don't need to specify the color prop). However, some cases can be allowed, for example, a CTA button with solid background color.
- Avoid setting explicit `height` on components - let the padding and line-height determine the natural height
- Avoid direct access static tokens (palette, spacing, borderRadius, shadows) from the theme, use alias tokens as much as possible.

  ```diff
  - sx={theme => ({ borderRadius: (theme) => (theme.vars || theme).shape.borderRadius * 3 })}
  + sx={{ borderRadius: 3 }}

  - sx={theme => ({ color: (theme.vars || theme).palette.primary.main })}
  + sx={{ color: "primary.main" }}
  ```

- To access the theme, use callback as a value (recommended) or as an array item (DON'T use callback within an object):

  ```js
  // ✅ Correct, use callback as a value
  sx={theme => ({
    color: (theme.vars || theme).palette.primary.main,
  })}

  // ✅ Correct, use callback as an array item
  sx={[
    {
      borderRadius: 2,
    },
    theme => ({
      color: (theme.vars || theme).palette.primary.main,
    })
  ]}

  // ❌ Incorrect, use callback within an object
  sx={{
    borderRadius: 2,
    ...theme => ({
      color: (theme.vars || theme).palette.primary.main,
    })
  }}
  ```

- For responsive design, if it's a single field that needs to be responsive, use `sx={{ width: { xs: "100%", md: "50%" } }}`. For multiple fields, use `theme.breakpoints.up` to create a responsive layout.

  ```tsx
  <Box sx={theme => ({
    width: "100%",
    fontSize: 16,
    [theme.breakpoints.up("md")]: {
      width: "50%",
      fontSize: 14,
    },
  })}>
  ```

- For container queries, use `theme.containerQueries.up()` instead of hardcoded pixel values:

  ```tsx
  <Box sx={theme => ({
    // Use theme.containerQueries.up() for container queries
    [theme.containerQueries?.up("sm") || "@container (min-width: 600px)"]: {
      gridColumn: "span 6",
    },
    [theme.containerQueries?.up("md") || "@container (min-width: 900px)"]: {
      gridColumn: "span 7",
    },
  })}>
  ```

- When supporting both container and media queries, use class selectors for conditional styling:

  ```tsx
  <Box sx={theme => ({
    // Default container query styles
    [theme.containerQueries?.up("md") || "@container (min-width: 900px)"]: {
      width: "50%",
    },
    // Media query styles when parent has specific class
    ".responsive-media &": {
      [theme.breakpoints.up("md")]: {
        width: "50%",
      },
    },
  })}>
  ```

### Theme usage

- Use callback functions with `theme.vars` instead of raw CSS variable strings for type safety
- When using `theme.vars` for getting `palette|shape`, always fallback to the theme like this `(theme.vars || theme).*`.
- For typography properties, use `theme.typography` directly (NOT `theme.vars.typography` or `(theme.vars || theme).typography`).
- Finally, there should be no type errors after created/updated the component theme file.

### Mockup images or videos

- Don't use fake divs to replicate images from the mockup. Instead, use `<Box component="img" />` with empty `src` and proper `alt`, style it via the `sx` prop with proper `aspectRatio` and other CSS that is needed.
- When real images or videos are not provided or could not be found, use [placeholder](https://placehold.co/) to generate a placeholder image or video. Make sure to use the correct aspect ratio and proper size, for example, if the mockup is 3:4, the src should be `https://placehold.co/600x400` or for square, use `https://placehold.co/400`.

### Spacing guidelines

When using `Stack` component or `Box` component with `display: flex`, the spacing should follow:

- Spacing value should be 0.5 step. Don't use random decimal like `1.2` just to match the mockup.
- For texts and icons, the spacing should be between 0.5 and 1.5 depending on the font size of the texts.
- For components, the spacing should be between 1 and 2 depending on the size of the components.

### Dark mode

- If the provided mockup comes with dark styles, don't try to replicate the mockup with dark palette. Instead, build the component as if it's in light mode, and then use `className="dark"` at the root of the component to apply dark mode styles.
- Don't ever import the them from `useTheme` hook to check dark mode. Instead, use `theme.applyStyles('dark', styles)` to apply dark mode styles.

  ```diff
  - const theme = useTheme();
  - const isDarkMode = theme.palette.mode === "dark";

    <Card
      sx={theme => ({
        maxWidth: 600,
        mx: "auto",
        borderRadius: 2,
  -     bgcolor: isDarkMode ? "grey.900" : "background.paper",
  +     bgcolor: "background.paper",
  +     ...theme.applyStyles('dark', {
  +       bgcolor: "grey.900",
  +     }),
      })}
    >
  ```

  ```js
  // ✅ Correct, use callback as a value
  <Card
    sx={theme => ({
      maxWidth: 600,
      mx: "auto",
      borderRadius: 2,
      bgcolor: "background.paper",
      ...theme.applyStyles('dark', {
        bgcolor: "grey.900",
      }),
    })}
  >
  ```

  ```js
  // ❌ Incorrect, use callback within an object
  <Card
    sx={{
      maxWidth: 600,
      mx: "auto",
      borderRadius: 2,
      bgcolor: "background.paper",
      ...theme => theme.applyStyles('dark', {
        bgcolor: "grey.900",
      }),
    }}
  >
  ```

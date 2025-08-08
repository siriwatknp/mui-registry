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

### Component Types

- **registry:block**: Complete UI sections (login forms, dashboards, etc.)
- **registry:component**: Reusable components (cards, inputs, etc.)
- **registry:theme**: MUI theme configurations
- **registry:lib**: Library integrations (e.g., Next.js App Router setup)
- **registry:hook**: Custom React hooks

### Key Technologies

- **Next.js 15** with App Router
- **Material UI v7** (@mui/material) for components
- **Emotion** for styling (@emotion/react, @emotion/styled)
- **Tailwind CSS v4** for utility classes
- **shadcn CLI** for registry management

## Creating New Registry Items

Decide the type of the new item:

- **registry:block**: Use for complex components with multiple files or layout templates.
- **registry:component**: Use for simple components (small - medium size), e.g. cards, inputs, etc.
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

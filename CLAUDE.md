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
  - `components/`: Reusable components
  - `blocks/`: Complex UI blocks
  - `themes/`: MUI theme configurations
  - `ui/`: internal UI components

### Key Technologies

- **Next.js 15** with App Router
- **Material UI v7** (@mui/material) for components
- **Emotion** for styling (@emotion/react, @emotion/styled)
- **Tailwind CSS v4** for utility classes
- **shadcn CLI** for registry management

---

## Goal

Your goal is to build a component that closely matches the given mockup and render it to the a page.

## Workflow

You MUST follow the following steps to build the component, this is non-negotiable:

### Step 1: Prepare the context

In order to achieve the best result, you MUST create a new context session file for the new registry item.
The file is located at @.claude/tasks/<registry-name>/context-session.md.

Next, you MUST act as the [UX/UI Designer](#uxui-designer) to analyze the mockup and write down the important structure to build the component.

### Step 2: Build the component

You MUST check the context session file to understand the requirements and act as the [UI Engineer](#ui-engineer) to build the registry item.

Then, you MUST the gather the required MUI components and follow the links from the [avaiable MUI components](#available-mui-components) to get the latest information of the components.

Finally, build the registry at @registry/new-york/{type}/{name}/{name}.tsx and render it to the preview page at @app/{name}/page.tsx.

Before moving to the next step, you MUST ensure there are no errors in the code by running `pnpm lint` and `npx tsc --noEmit` (DO NOT run `pnpm build`).

**RULES for this step**:

- DO NOT read other files in the project.
- DO NOT read the main page `app/page.tsx`.

### Step 3: Review/Update Iteration

At the beginning of this step, run the development server and USE [PlayWright MCP tool](#playwright-mcp-tool) to open the preview page.

There are 3 iterations in total for this step:

For each iteration, take a screenshot of the component and save it to the context folder with the name `{component_name}-{iteration_number}.png` (DO NOT save to other places). The review process will be done by [Accessibility Expert](#accessibility-expert) and/or [UX/UI Designer](#uxui-designer) depending on the iteration. 2. You MUST act as the [Accessibility Expert](#accessibility-expert) to audit the component for accessibility. 3. You MUST act as the [UX/UI Designer](#uxui-designer) to visualize the screenshot and gave feedbacks comparing to the initial mockup.

At the end of each iteration, you MUST write down the bullet points that need to be fixed to the context session file in this format:

```md
...previous content...

---

## Review Iteration <iteration_number>

**Critical Issues:**

- <issue_1>
- <issue_2>
- ...

**Improvements:**

- <improvement_1>
- <improvement_2>
- ...

---
```

Then you MUST act as the [UI Engineer](#ui-engineer) to fix those issues and you MUST ensure there are no errors in the code by running `pnpm lint` and `npx tsc --noEmit` (DO NOT run `pnpm build`).

**Iteration 1**: focus on the accessibility issues and overall design consistency.

- You MUST act as the [Accessibility Expert](#accessibility-expert) to audit the critical accessibility issues that require immediate attention.
- You MUST act as the [UX/UI Designer](#uxui-designer) to visualize the screenshot and gave feedbacks on the overall design consistency comparing to the initial mockup.

**Iteration 2**: focus on the design improvements and minor accessibility issues.

- You MUST act as the [UX/UI Designer](#uxui-designer) to visualize the screenshot and propose design improvements that can be made to the component (e.g. consistent spacing, meaningful color, etc.).
- You MUST act as the [Accessibility Expert](#accessibility-expert) to find minor accessibility issues that can lift up the quality without changing the design.

**Iteration 3**: Refine on the small design details WITHOUT accesibility audit.

- You MUST act as the [UX/UI Designer](#uxui-designer) to visualize the screenshot and do the pixel-perfect adjustments to the component.

### Step 4: Post task

- Kill the dev server and close the MCP playwright browser
- At the root terminal, run `node scripts/create-registry-json.js <registry_name> "Title" "Description"` with meaningful title and description.
- Check the screenshots location and move them to the context folder if the location is not correct.
- Duplicate the latest iteration screenshot and save it to the `public/screenshots/{registry_name}.png`.

## UX/UI Designer

You are a Staff UX/UI Designer with profound expertise in visual design extraction and has deep understanding of the MUI theming system.

You have great taste and aesthetic from world class design agencies and companies like Apple, Netflix, Vercel, Linear, etc. to build the component.

Your goal is to do [Visual Design Analysis](#visual-design-analysis) to create a detailed context session that captures the visual hierarchy, layout patterns, and component relationships that map to MUI ecosystem design language. It's not about identifying specific hard-coded values of the mockup, but the design language of the [built-in theme](#built-in-theme) that translated from the mockup.

## UI Engineer

You are a Staff Design Engineer with comprehensive MUI expertise and an exceptional eye for pixel-perfect implementations. You combine deep technical knowledge of MUI with meticulous attention to visual detail, ensuring both code excellence and design fidelity.

You are strictly adhering to the these rules when building the component:

### Strict Rule Adherence

You follow the project's UI and styling rules with unwavering discipline:

1. **Minimal sx Props**: Use sx primarily for layout structure, not decorative styling
2. **Theme-First Approach**: Always use theme variables over hardcoded values
3. **Proper Token Usage**: Use alias tokens, never direct static tokens
4. **Responsive Patterns**: Follow established patterns for breakpoints and container queries
5. **Dark Mode Compliance**: Use `theme.applyStyles('dark', styles)` exclusively
6. **No Unnecessary Comments**: Keep code clean unless documentation is explicitly requested
7. **TypeScript**: Ensure there are no type errors after on changed files.

### Visual Accuracy Methodology

1. **Spacing Precision**:

   - Use 0.5 step increments (0.5, 1, 1.5, 2, etc.)
   - Text/icon spacing: 0.5-1.5 based on font size
   - Component spacing: 1-2 based on component size
   - Never use arbitrary decimals like 1.2

2. **Image & Media Handling**:

   - Use `<Box component="img" />` with proper aspectRatio
   - Implement placeholders with correct dimensions (e.g., https://placehold.co/600x400) WITHOUT using any query params
   - Never use fake divs to simulate images

3. **Container & Media Queries**:
   ```tsx
   sx={theme => ({
     // Container queries with proper fallbacks
     [theme.containerQueries?.up("md") || "@container (min-width: 900px)"]: {
       gridColumn: "span 7"
     },
     // Media queries for responsive parent
     ".responsive-media &": {
       [theme.breakpoints.up("md")]: {
         width: "50%"
       }
     }
   })}
   ```

### Button vs IconButton

If the mockup shows a button with high contrast background color, use `Button` component with customized border radius (if necessary) because the `IconButton` doesn't support variant prop.

For example:

```jsx
<Button variant="contained" sx={{ borderRadius: 99 }}>
  <AddIcon />
</Button>
```

Only use `IconButton` for secondary actions, or list of buttons with same size that show only icons.

### Charts

Always start with this configuration to remove the default margin and axis:

```tsx
import { BarChart } from "@mui/x-charts/BarChart";

<BarChart
  // ...
  margin={{
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }}
  xAxis={[
    {
      height: 0, // minimum 28 to display the label
      position: "none", // 'top' or 'bottom'
    },
  ]}
  yAxis={[
    {
      width: 0, // minimum 28 to display the label
      position: "none", // 'left' or 'right'
    },
  ]}
/>;
```

Then, you can adjust the spacing/padding of the chart to match the design analysis.

### TextField and Form Best Practices

1. **Label Integration**:

   - **ALWAYS use built-in `label` prop** instead of separate Typography components
   - Ensures proper accessibility and screen reader support
   - Maintains semantic HTML structure

2. **Modern API Usage**:

   - Use `slotProps` instead of deprecated `InputProps`, `InputLabelProps`
   - Proper slot configuration: `slotProps.input`, `slotProps.inputLabel`, `slotProps.htmlInput`
   - Never use deprecated props that trigger TypeScript warnings

3. **Form State Management**:

   - Implement controlled components with proper state handling
   - Add real-time validation with error states
   - Clear errors on user interaction
   - Use proper TypeScript types for form data

4. **Accessibility Requirements**:

   - Include `required` prop for mandatory fields
   - Provide `error` and `helperText` for validation feedback
   - Ensure proper ARIA attributes
   - Support full keyboard navigation

5. **Input Constraints & Validation**:

   ```tsx
   // ✅ CORRECT: Proper TextField with all best practices
   <TextField
     fullWidth
     required
     label="Card Number"
     placeholder="1234 5678 9012 3456"
     variant="outlined"
     value={formData.cardNumber}
     onChange={handleInputChange("cardNumber")}
     error={!!errors.cardNumber}
     helperText={errors.cardNumber || "Enter 16-digit card number"}
   />

   // ❌ INCORRECT: Poor accessibility and deprecated API
   <Box>
     <Typography variant="body2">CARD NUMBER</Typography>
     <TextField
       fullWidth
       placeholder="1234..."
       InputProps={{ /* deprecated */ }}
     />
   </Box>
   ```

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

```tsx
// ✅ CORRECT: Using theme tokens properly
sx={{
  borderRadius: 3,
  color: "primary.main",
  p: 2,
  ...theme.applyStyles('dark', {
    bgcolor: "grey.900"
  })
}}

// ❌ INCORRECT: Hardcoded values and improper dark mode
sx={{
  borderRadius: "12px",
  color: "#1976d2",
  padding: "16px",
  bgcolor: isDarkMode ? "grey.900" : "white"
}}
```

### Mockup images or videos

- Don't use fake divs to replicate images from the mockup. Instead, use `<Box component="img" />` with empty `src` and proper `alt`, style it via the `sx` prop with proper `aspectRatio` and other CSS that is needed.
- When real images or videos are not provided or could not be found, use [placeholder](https://placehold.co/) to generate a placeholder image or video. Make sure to use the correct aspect ratio and proper size, for example, if the mockup is 3:4, the src should be `https://placehold.co/600x400` or for square, use `https://placehold.co/400`.

### Spacing guidelines

When using `Stack` component or `Box` component with `display: flex`, the spacing should follow:

- Spacing value should be 0.5 step. Don't use random decimal like `1.2` just to match the mockup.
- For texts and icons, the spacing should be between 0.5 and 1.5 depending on the font size of the texts.
- For components, the spacing should be between 1 and 2 depending on the size of the components.

### Dark mode

- If the provided mockup comes with dark styles, don't try to replicate the mockup with dark palette. Instead, build the component as if it's in light mode.
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

## Accessibility Expert

You are a Web Accessibility Expert with extensive experience auditing high-standard websites from industry leaders like Airbnb, Netflix, and Apple. You possess deep knowledge of WCAG 2.1 AA/AAA standards, ARIA specifications, modern accessible design patterns, and Material UI's accessibility features.

When reviewing code or designs, you will:

1. **Material UI Accessibility Assessment**: Understand Material UI's baseline accessibility features:

   - Recognize that MUI components come with built-in keyboard navigation, focus management, and ARIA attributes
   - Identify when additional ARIA attributes are needed beyond MUI's defaults (e.g., aria-describedby for complex forms, aria-live for dynamic content)
   - Know when to use MUI's accessibility props (e.g., Button's aria-label, TextField's helperText for error messages)
   - Understand MUI's theme accessibility features (color contrast, focus indicators, typography scales)
   - Recognize patterns where composing MUI components requires additional accessibility considerations

2. **Analyze Semantic Structure**: Identify the true interactive purpose behind visual designs. For example:

   - Card selections that allow only one choice should use radio buttons with proper labeling (or MUI's RadioGroup/Radio components)
   - Multi-select cards should use checkboxes (or MUI's Checkbox component with proper FormGroup)
   - Clickable cards should have the primary action on the title with CSS ::after pseudo-element extending the click area
   - Navigation elements should use appropriate landmark roles (consider MUI's AppBar, Drawer components)

3. **Evaluate Keyboard Navigation**: Ensure all interactive elements are keyboard accessible with proper focus management, including:

   - Logical tab order
   - Focus visible indicators
   - Keyboard shortcuts where appropriate
   - Focus trapping for modals and overlays

4. **Assess Screen Reader Compatibility**: Verify that content is properly announced by screen readers:

   - Meaningful labels and descriptions
   - Proper heading hierarchy
   - Live regions for dynamic content
   - Appropriate use of aria-label, aria-labelledby, and aria-describedby

5. **Review Color and Contrast**: Check visual accessibility:

   - WCAG contrast ratios (4.5:1 for normal text, 3:1 for large text)
   - Not relying solely on color to convey information
   - Ensuring focus indicators meet contrast requirements

6. **Provide Specific Recommendations**: When issues are found, you will:

   - Explain why the current implementation is problematic
   - Identify if MUI components already provide the needed accessibility features
   - Suggest MUI-specific accessibility props and patterns when applicable
   - Provide the exact HTML/ARIA pattern that should be used when additional attributes are needed
   - Include code examples demonstrating the accessible approach with MUI components
   - Reference specific WCAG criteria being violated
   - Clarify when custom ARIA is needed vs when MUI's defaults are sufficient

7. **Suggest Industry-Standard Patterns**: Draw from your experience with leading websites to recommend:
   - Proven accessible patterns from companies like Airbnb (e.g., their date picker accessibility)
   - Netflix's approach to keyboard navigation in media players
   - Apple's use of progressive enhancement for complex interactions

Your responses should be:

- Technically precise with specific WCAG criterion references
- Practical with implementable solutions using Material UI components
- Educational, explaining the 'why' behind recommendations
- Clear about what MUI provides out-of-the-box vs what needs additional implementation
- Prioritized by impact (critical vs nice-to-have improvements)

Material UI Specific Guidance:

- Always check if MUI components already provide the accessibility feature before suggesting custom ARIA
- Understand that MUI follows WAI-ARIA authoring practices by default
- Know common MUI accessibility gotchas (e.g., IconButton needs aria-label, Tooltip shouldn't wrap disabled buttons)
- Recognize when composition of MUI components needs additional accessibility attributes
- Be aware of MUI's built-in support for screen readers, keyboard navigation, and focus management

Always consider the balance between ideal accessibility and practical implementation constraints, but never compromise on critical accessibility requirements that would exclude users with disabilities.

When uncertain about a specific pattern, acknowledge the ambiguity and provide multiple accessible approaches with their trade-offs, preferring MUI's built-in solutions when available.

## PlayWright MCP tool

- Use `mcp\_\_playwright` tool to open the browser.
- The browser size should be 1200x630 pixels (width: 1200, height: 630).
- The screenshots MUST be saved to the context folder that you are working on with the image name `{component_name}-{iteration_number}.png`.

## Visual design analysis

Before coding, you MUST act as the [UX/UI Designer](#uxui-designer) to breakdown the visual design of the mockup into container and sections.

Think hard to answer the following questions:

### Key components

- What's the primary action/purpose of the section?
- Map elements to [available MUI components](#available-mui-components).

### Theme mapping

The [built-in theme](#built-in-theme) is being used for the component. You MUST map the visual design of the section to the theme design language.

- How many palette colors of the interactive elements that used in this section?
- What's the proper size of the text that used in this section?
- What's the proper spacing, border radius, shadow, etc. should be?
- Does the section need a border? If yes, what's the border color?

### Layout

- Which elements should be in the same row/column?
- What layout (Flebox or CSS Grid) to use to build the section?
- What size of the components should be?

### Ascii mockup representation

**IMPORTANT**: You MUST provide the ascii mockup representation of the section. Build it as close as possible to the mockup because it's significant to the final result quality.

All lines MUST have aligned ending/closing tag.

## Available MUI components

### `@mui/material` components

- [App Bar React component](https://mui.com/material-ui/react-app-bar.md): The App Bar displays information and actions relating to the current screen.
- [Backdrop React Component](https://mui.com/material-ui/react-backdrop.md): The Backdrop component narrows the user's focus to a particular element on the screen.
- [Bottom Navigation React component](https://mui.com/material-ui/react-bottom-navigation.md): The Bottom Navigation bar allows movement between primary destinations in an app.
- [Circular, Linear progress React components](https://mui.com/material-ui/react-progress.md): Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process.
- [CSS Baseline](https://mui.com/material-ui/react-css-baseline.md): The CssBaseline component helps to kickstart an elegant, consistent, and simple baseline to build upon.
- [Detect click outside React component](https://mui.com/material-ui/react-click-away-listener.md): The Click-Away Listener component detects when a click event happens outside of its child element.
- [How to customize](https://mui.com/material-ui/customization/how-to-customize.md): Learn how to customize Material UI components by taking advantage of different strategies for specific use cases.
- [Image List React component](https://mui.com/material-ui/react-image-list.md): The Image List displays a collection of images in an organized grid.
- [InitColorSchemeScript component](https://mui.com/material-ui/react-init-color-scheme-script.md): The InitColorSchemeScript component eliminates dark mode flickering in server-side-rendered applications.
- [No SSR React component](https://mui.com/material-ui/react-no-ssr.md): The No-SSR component defers the rendering of children components from the server to the client.
- [React Accordion component](https://mui.com/material-ui/react-accordion.md): The Accordion component lets users show and hide sections of related content on a page.
- [React Alert component](https://mui.com/material-ui/react-alert.md): Alerts display brief messages for the user without interrupting their use of the app.
- [React Autocomplete component](https://mui.com/material-ui/react-autocomplete.md): The autocomplete is a normal text input enhanced by a panel of suggested options.
- [React Avatar component](https://mui.com/material-ui/react-avatar.md): Avatars are found throughout material design with uses in everything from tables to dialog menus.
- [React Box](https://mui.com/material-ui/react-box.md): The Box component is a generic, theme-aware container with access to CSS utilities from MUI System.
- [React Breadcrumbs component](https://mui.com/material-ui/react-breadcrumbs.md): A breadcrumbs is a list of links that help visualize a page's location within a site's hierarchical structure, it allows navigation up to any of the ancestors.
- [React Button component](https://mui.com/material-ui/react-button.md): Buttons allow users to take actions, and make choices, with a single tap.
- [React Button Group component](https://mui.com/material-ui/react-button-group.md): The ButtonGroup component can be used to group related buttons.
- [React Card component](https://mui.com/material-ui/react-card.md): Cards contain content and actions about a single subject.
- [React Checkbox component](https://mui.com/material-ui/react-checkbox.md): Checkboxes allow the user to select one or more items from a set.
- [React Chip component](https://mui.com/material-ui/react-chip.md): Chips are compact elements that represent an input, attribute, or action.
- [React Container component](https://mui.com/material-ui/react-container.md): The container centers your content horizontally. It's the most basic layout element.
- [React Dialog component](https://mui.com/material-ui/react-dialog.md): Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.
- [React Divider component](https://mui.com/material-ui/react-divider.md): The Divider component provides a thin, unobtrusive line for grouping elements to reinforce visual hierarchy.
- [React Drawer component](https://mui.com/material-ui/react-drawer.md): The navigation drawers (or "sidebars") provide ergonomic access to destinations in a site or app functionality such as switching accounts.
- [React Floating Action Button (FAB) component](https://mui.com/material-ui/react-floating-action-button.md): A Floating Action Button (FAB) performs the primary, or most common, action on a screen.
- [React Grid component](https://mui.com/material-ui/react-grid.md): The responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.
- [React GridLegacy component](https://mui.com/material-ui/react-grid-legacy.md): The Material Design responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.
- [React Icon Component](https://mui.com/material-ui/icons.md): Guidance and suggestions for using icons with Material UI.
- [React List component](https://mui.com/material-ui/react-list.md): Lists are continuous, vertical indexes of text or images.
- [React Masonry component](https://mui.com/material-ui/react-masonry.md): Masonry lays out contents of varying dimensions as blocks of the same width and different height with configurable gaps.
- [React Menu component](https://mui.com/material-ui/react-menu.md): Menus display a list of choices on temporary surfaces.
- [React Modal component](https://mui.com/material-ui/react-modal.md): The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.
- [React Pagination component](https://mui.com/material-ui/react-pagination.md): The Pagination component enables the user to select a specific page from a range of pages.
- [React Popover component](https://mui.com/material-ui/react-popover.md): A Popover can be used to display some content on top of another.
- [React Portal component](https://mui.com/material-ui/react-portal.md): The Portal component lets you render its children into a DOM node that exists outside of the Portal's own DOM hierarchy.
- [React Radio Group component](https://mui.com/material-ui/react-radio-button.md): The Radio Group allows the user to select one option from a set.
- [React Rating component](https://mui.com/material-ui/react-rating.md): Ratings provide insight regarding others' opinions and experiences, and can allow the user to submit a rating of their own.
- [React Select component](https://mui.com/material-ui/react-select.md): Select components are used for collecting user provided information from a list of options.
- [React Skeleton component](https://mui.com/material-ui/react-skeleton.md): Display a placeholder preview of your content before the data gets loaded to reduce load-time frustration.
- [React Slider component](https://mui.com/material-ui/react-slider.md): Sliders allow users to make selections from a range of values.
- [React Snackbar component](https://mui.com/material-ui/react-snackbar.md): Snackbars (also known as toasts) are used for brief notifications of processes that have been or will be performed.
- [React Speed Dial component](https://mui.com/material-ui/react-speed-dial.md): When pressed, a floating action button can display three to six related actions in the form of a Speed Dial.
- [React Stack component](https://mui.com/material-ui/react-stack.md): Stack is a container component for arranging elements vertically or horizontally.
- [React Stepper component](https://mui.com/material-ui/react-stepper.md): Steppers convey progress through numbered steps. It provides a wizard-like workflow.
- [React Switch component](https://mui.com/material-ui/react-switch.md): Switches toggle the state of a single setting on or off.
- [React Table component](https://mui.com/material-ui/react-table.md): Tables display sets of data. They can be fully customized.
- [React Tabs component](https://mui.com/material-ui/react-tabs.md): Tabs make it easy to explore and switch between different views.
- [React Text Field component](https://mui.com/material-ui/react-text-field.md): Text Fields let users enter and edit text.
- [React Timeline component](https://mui.com/material-ui/react-timeline.md): The timeline displays a list of events in chronological order.
- [React Tooltip component](https://mui.com/material-ui/react-tooltip.md): Tooltips display informative text when users hover over, focus on, or tap an element.
- [React Transition component](https://mui.com/material-ui/transitions.md): Transitions help to make a UI expressive and easy to use.
- [Textarea Autosize React component](https://mui.com/material-ui/react-textarea-autosize.md): The Textarea Autosize component automatically adjusts its height to match the length of the content within.
- [Toggle Button React component](https://mui.com/material-ui/react-toggle-button.md): A Toggle Button can be used to group related options.

### `@mui/x-date-pickers` components

#### Date components

- [Date Picker](/x/react-date-pickers/date-picker.md): The Date Picker component lets users select a date.
- [Date Field](/x/react-date-pickers/date-field.md): The Date Field component lets users select a date with the keyboard.
- [Date Calendar](/x/react-date-pickers/date-calendar.md): The Date Calendar component lets users select a date without any input or popper / modal.

#### Time components

- [Time Picker](/x/react-date-pickers/time-picker.md): The Time Picker component lets the user select a time.
- [Time Field](/x/react-date-pickers/time-field.md): The Time Field component lets the user select a time with the keyboard.
- [Time Clock](/x/react-date-pickers/time-clock.md): The Time Clock component lets the user select a time without any input or popper / modal.
- [Digital Clock](/x/react-date-pickers/digital-clock.md): The Digital Clock lets the user select a time without any input or popper / modal.

#### Date Time components

- [Date Time Picker](/x/react-date-pickers/date-time-picker.md): The Date Time Picker component lets users select a date and time.
- [Date Time Field](/x/react-date-pickers/date-time-field.md): The Date Time Field component lets users select a date and a time with the keyboard.

#### Date Range components

- [Date Range Picker](/x/react-date-pickers/date-range-picker.md): The Date Range Picker lets the user select a range of dates.
- [Date Range Field](/x/react-date-pickers/date-range-field.md): The Date Range Field lets the user select a date range with the keyboard.
- [Date Range Calendar](/x/react-date-pickers/date-range-calendar.md): The Date Range Calendar lets the user select a range of dates without any input or popper / modal.

#### Time Range components

- [Time Range Picker](/x/react-date-pickers/time-range-picker.md): The Time Range Picker lets users select a range of time values. 🆕
- [Time Range Field](/x/react-date-pickers/time-range-field.md): The Time Range Field lets the user select a range of time with the keyboard.

#### Date Time Range components

- [Date Time Range Picker](/x/react-date-pickers/date-time-range-picker.md): The Date Time Range Picker lets the user select a range of dates with an explicit starting and ending time.
- [Date Time Range Field](/x/react-date-pickers/date-time-range-field.md): The Date Time Range Field lets the user select a range of dates with an explicit starting and ending time with the keyboard.

- [Field components](/x/react-date-pickers/fields.md): The field components let the user input date and time values with a keyboard and refined keyboard navigation.

### `@mui/x-charts` components

#### Bars

- [Bars overview](/x/react-charts/bars.md): Bar charts express quantities through a bar's length, using a common baseline.
- [Demos](/x/react-charts/bar-demo.md): This page groups demonstration using bar charts.

#### Lines

- [Lines overview](/x/react-charts/lines.md): Line charts can express qualities about data, such as hierarchy, highlights, and comparisons.
- [Lines demo](/x/react-charts/line-demo.md): This page groups demonstration using line charts.
- [Area demo](/x/react-charts/areas-demo.md): This page groups demonstration using area charts.

#### Pie

- [Pie overview](/x/react-charts/pie.md): Pie charts express portions of a whole, using arcs or angles within a circle.
- [Demo](/x/react-charts/pie-demo.md): This page groups demonstration using pie charts.

#### Scatter

- [Scatter overview](/x/react-charts/scatter.md): Scatter charts express the relation between two variables, using points in a surface.
- [Demo](/x/react-charts/scatter-demo.md): This page groups demonstration using scatter charts.

- [Sparkline](/x/react-charts/sparkline.md): Sparkline chart can provide an overview of data trends.
- [Gauge](/x/react-charts/gauge.md): Gauge let the user evaluate metrics.
- [Radar](/x/react-charts/radar.md): Radar allows to compare multivariate data in a 2D chart.
- [Heatmap](/x/react-charts/heatmap.md): Heatmap charts visually represents data with color variations to highlight patterns and trends across two dimensions. (pro)

#### Funnel

- [Funnel overview](/x/react-charts/funnel.md): Funnel charts allow to express quantity evolution along a process, such as audience engagement, population education levels or yields of multiple processes.
- [Pyramid demo](/x/react-charts/pyramid.md): The pyramid chart is a variation of the funnel chart.

### `@mui/x-tree-view` components

- [Quickstart](/x/react-tree-view/quickstart.md): Install the MUI X Tree View package and start building.

### `@mui/x-data-grid` components

- [Quickstart](/x/react-data-grid/quickstart.md): Install the MUI X Data Grid package and start building your React data table.

## Built-in theme

The minimal theme embodies a refined, restrained aesthetic with a monochromatic primary palette (pure black in light mode, pure white in dark mode) and system-native font stacks. It features deliberately subdued interaction states with reduced opacity values, system colors for semantic states (success, error, warning, info), and subtle shadow variations that create depth without visual heaviness. This design philosophy prioritizes clarity and restraint, making it ideal for professional applications and productivity tools where content should take precedence over decorative elements, while maintaining excellent accessibility through carefully calibrated contrast ratios.

### Palette color

- **primary**: Monochromatic branding palette - pure black (#000) in light mode, pure white (#fff) in dark mode for maximum contrast
- **secondary**: System gray tones for supporting UI elements - subtle backgrounds and secondary text
- **success**: Green palette for positive actions and states - rgb(52, 199, 89) in light, rgb(48, 209, 88) in dark
- **error**: Red palette for error states and destructive actions - rgb(255, 56, 60) in light, rgb(255, 69, 58) in dark
- **warning**: Yellow/amber palette for warning states - rgb(255, 204, 0) in light, rgb(255, 214, 10) in dark
- **info**: Blue palette for informational elements - rgb(0, 136, 255) in light, rgb(0, 145, 255) in dark
- **action**: Deliberately reduced opacity values for subtle interactions - 0.06 for selection, 0.08 for focus, 0.2 for disabled states
- **text.icon**: Semi-transparent icon colors - 48% opacity in light mode, 60% opacity in dark mode

### Spacing

The theme uses MUI's default spacing with a base unit of 8px, allowing consistent spacing throughout the application.

### Border radius

- **Default radius**: 8px for all rounded corners, providing a modern, soft appearance without being overly rounded

### Shadows

- **24 elevation levels**: Subtle, layered shadows with low opacity (0.05 to 0.26) creating depth without heaviness
- **Progressive scaling**: Shadows increase gradually in blur, spread, and offset as elevation increases
- **Dual-layer approach**: Most shadows combine two layers for more realistic depth perception

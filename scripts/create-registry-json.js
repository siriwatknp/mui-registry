#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

// Usage: node scripts/create-registry-json.js <component-name> <component-title> <component-description>
const [, , componentName, componentTitle, componentDescription] = process.argv;

if (!componentName) {
  console.error(
    "Usage: node scripts/create-registry-json.js <component-name> [title] [description]"
  );
  process.exit(1);
}

const COMPONENT_PATH = path.join(
  process.cwd(),
  "registry",
  "new-york",
  "components",
  componentName,
  `${componentName}.tsx`
);

const OUTPUT_PATH = path.join(
  process.cwd(),
  "public",
  "r",
  `${componentName}.json`
);

function extractDependencies(content) {
  const dependencies = new Set();

  // Extract @mui imports
  const muiImports = content.match(/from\s+["']@mui\/[^"']+["']/g) || [];
  muiImports.forEach((imp) => {
    const pkg = imp.match(/@mui\/[^"'/]+/)[0];
    dependencies.add(pkg);
  });

  // Always add emotion dependencies if MUI is used
  if (dependencies.size > 0) {
    dependencies.add("@emotion/react");
    dependencies.add("@emotion/styled");
  }

  return Array.from(dependencies);
}

function createRegistryJson() {
  // Check if component file exists
  if (!fs.existsSync(COMPONENT_PATH)) {
    console.error(`Component file not found: ${COMPONENT_PATH}`);
    process.exit(1);
  }

  // Read the component file
  const componentContent = fs.readFileSync(COMPONENT_PATH, "utf-8");

  // Extract dependencies
  const dependencies = extractDependencies(componentContent);

  // Create the registry JSON structure
  const registryJson = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: componentName,
    type: "registry:component",
    title:
      componentTitle ||
      componentName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    description: componentDescription || `A ${componentName} component.`,
    dependencies: dependencies,
    registryDependencies: [],
    files: [
      {
        path: `registry/new-york/components/${componentName}/${componentName}.tsx`,
        content: componentContent,
        type: "registry:component",
      },
    ],
    meta: {
      screenshot: `/screenshots/${componentName}.png`,
    },
  };

  // Ensure the output directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the JSON file
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(registryJson, null, 2));

  console.log(`✓ Created registry JSON: ${OUTPUT_PATH}`);
  console.log(`  Component: ${registryJson.title}`);
  console.log(`  Dependencies: ${dependencies.join(", ")}`);
}

// Run the script
createRegistryJson();

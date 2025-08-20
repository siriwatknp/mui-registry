#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

// Usage: node scripts/create-registry-json.js <item-name> <item-title> <item-description>
const [, , itemName, itemTitle, itemDescription] = process.argv;

if (!itemName) {
  console.error(
    "Usage: node scripts/create-registry-json.js <item-name> [title] [description]",
  );
  process.exit(1);
}

// Check if it's a component or block
const COMPONENT_PATH = path.join(
  process.cwd(),
  "registry",
  "new-york",
  "components",
  itemName,
  `${itemName}.tsx`,
);

const BLOCK_PATH = path.join(
  process.cwd(),
  "registry",
  "new-york",
  "blocks",
  itemName,
  `${itemName}.tsx`,
);

// Determine which path exists
let ITEM_PATH;
let ITEM_TYPE;
if (fs.existsSync(COMPONENT_PATH)) {
  ITEM_PATH = COMPONENT_PATH;
  ITEM_TYPE = "component";
} else if (fs.existsSync(BLOCK_PATH)) {
  ITEM_PATH = BLOCK_PATH;
  ITEM_TYPE = "block";
} else {
  ITEM_PATH = null;
  ITEM_TYPE = null;
}

const OUTPUT_PATH = path.join(process.cwd(), "public", "r", `${itemName}.json`);

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
  // Check if item file exists
  if (!ITEM_PATH) {
    console.error(`Item file not found in components or blocks: ${itemName}`);
    process.exit(1);
  }

  // Read the item file
  const itemContent = fs.readFileSync(ITEM_PATH, "utf-8");

  // Extract dependencies
  const dependencies = extractDependencies(itemContent);

  // Create the registry JSON structure
  const registryJson = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: itemName,
    type: ITEM_TYPE === "block" ? "registry:block" : "registry:component",
    title:
      itemTitle ||
      itemName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    description: itemDescription || `A ${itemName} ${ITEM_TYPE}.`,
    dependencies: dependencies,
    registryDependencies: [],
    files: [
      {
        path: `registry/new-york/${ITEM_TYPE}s/${itemName}/${itemName}.tsx`,
        content: itemContent,
        type: ITEM_TYPE === "block" ? "registry:block" : "registry:component",
      },
    ],
    meta: {
      screenshot: `/screenshots/${itemName}.png`,
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
  console.log(
    `  ${ITEM_TYPE === "block" ? "Block" : "Component"}: ${registryJson.title}`,
  );
  console.log(`  Dependencies: ${dependencies.join(", ")}`);
}

// Run the script
createRegistryJson();

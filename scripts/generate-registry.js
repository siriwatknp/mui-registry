#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const PUBLIC_R_DIR = path.join(process.cwd(), "public", "r");
const OUTPUT_FILE = path.join(PUBLIC_R_DIR, "registry.json");

function generateRegistry() {
  // Read all JSON files from public/r directory
  const files = fs
    .readdirSync(PUBLIC_R_DIR)
    .filter((file) => file.endsWith(".json") && file !== "registry.json");

  const items = [];

  // Process each file
  for (const file of files) {
    try {
      const filePath = path.join(PUBLIC_R_DIR, file);
      const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      // Extract the item data (without the content field in files)
      const item = {
        name: content.name,
        type: content.type,
        title: content.title,
        description: content.description,
        dependencies: content.dependencies,
        registryDependencies: content.registryDependencies,
        files: content.files?.map((f) => ({
          path: f.path,
          type: f.type,
          target: f.target,
        })),
        meta: content.meta,
      };

      // Remove undefined fields
      Object.keys(item).forEach((key) => {
        if (item[key] === undefined) {
          delete item[key];
        }
      });

      items.push(item);
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  // Sort items by name for consistency
  items.sort((a, b) => a.name.localeCompare(b.name));

  // Create the registry object
  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "MUI Registry",
    homepage: "https://mui-registry.vercel.app",
    items: items,
  };

  // Write the registry file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(registry, null, 2));
  console.log(`✓ Generated registry.json with ${items.length} items`);
}

// Run the script
generateRegistry();

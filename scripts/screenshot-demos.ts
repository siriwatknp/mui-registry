import { chromium, expect } from "@playwright/test";
import fs from "fs/promises";
import path from "path";

// Helper to get port from CLI, env, or default
function getPort() {
  // CLI: --port=xxxx or --port xxxx
  const portArg = process.argv.find((arg) => arg.startsWith("--port"));
  if (portArg) {
    const parts = portArg.split("=");
    if (parts.length === 2) return parseInt(parts[1], 10);
    const idx = process.argv.indexOf(portArg);
    if (process.argv[idx + 1]) return parseInt(process.argv[idx + 1], 10);
  }
  // Env
  if (process.env.PORT) return parseInt(process.env.PORT, 10);
  if (process.env.NEXT_PUBLIC_PORT)
    return parseInt(process.env.NEXT_PUBLIC_PORT, 10);
  // Default
  return 3000;
}

const SCREENSHOTS_DIR = path.join(process.cwd(), "public", "screenshots");
const REGISTRY_PATH = path.join(process.cwd(), "registry.json");

export async function screenshotAndUpdateRegistry() {
  const port = getPort();
  const baseUrl = `http://localhost:${port}`;

  // Ensure screenshots directory exists
  await fs.mkdir(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Screenshot all preview blocks on homepage using data-preview attribute
  await page.goto(baseUrl + "/");
  const previewBlocks = await page.locator("main > div[data-preview]");
  const count = await previewBlocks.count();
  for (let i = 0; i < count; i++) {
    const block = previewBlocks.nth(i);
    const previewName = await block.getAttribute("data-preview");
    if (!previewName) continue;
    const screenshotPath = path.join(SCREENSHOTS_DIR, `${previewName}.png`);
    await expect(block).toBeVisible();
    await block.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved: ${previewName}`);
  }

  await browser.close();

  // 3. Update registry.json with meta.screenshot fields
  const registryRaw = await fs.readFile(REGISTRY_PATH, "utf-8");
  const registry = JSON.parse(registryRaw);
  const items = registry.items;

  // Build a set of all screenshot names
  const screenshotFiles = await fs.readdir(SCREENSHOTS_DIR);
  const nameToFile = new Map();
  for (const file of screenshotFiles) {
    if (file.endsWith(".png")) {
      nameToFile.set(file.replace(/\.png$/, ""), `/screenshots/${file}`);
    }
  }

  for (const item of items) {
    // Remove top-level screenshot field if present
    if (item.screenshot) {
      delete item.screenshot;
    }
    // Match by registry name
    const screenshot = nameToFile.get(item.name);
    if (screenshot) {
      if (!item.meta) item.meta = {};
      item.meta.screenshot = screenshot;
    } else if (item.meta && item.meta.screenshot) {
      delete item.meta.screenshot;
    }
  }

  await fs.writeFile(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");
  console.log("registry.json updated with meta.screenshot fields.");
}

// If run directly, execute the function
if (require.main === module) {
  screenshotAndUpdateRegistry().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

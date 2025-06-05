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

// Registry names and their routes/selectors
const iframeDemos = [
  { name: "dashboard-layout", url: "/dashboard-layout" },
  { name: "dashboard-layout-02", url: "/dashboard-layout-02" },
  { name: "dashboard-layout-03", url: "/dashboard-layout-03" },
  { name: "dashboard-layout-04", url: "/dashboard-layout-04" },
];

const homepageDemos = [
  { name: "avatar-dropdown", heading: "Avatar Dropdown" },
  { name: "login-form", heading: "A simple login form" },
  { name: "login-dialog", heading: "Login Dialog" },
  { name: "feedback-form", heading: "A contact form with Zod validation." },
  { name: "stats-card", heading: "Stats Card" },
  { name: "order-table", heading: "Order Table" },
  { name: "field-pin-input", heading: "Field Pin Input" },
  { name: "input-siblings", heading: "Input Siblings" },
];

const SCREENSHOTS_DIR = path.join(process.cwd(), "public", "screenshots");
const REGISTRY_PATH = path.join(process.cwd(), "registry.json");

export async function screenshotAndUpdateRegistry() {
  const port = getPort();
  const baseUrl = `http://localhost:${port}`;

  // Ensure screenshots directory exists
  await fs.mkdir(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 1. Screenshot iframe-based demos
  for (const demo of iframeDemos) {
    await page.goto(baseUrl + demo.url);
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, `${demo.name}.png`),
      fullPage: true,
    });
    console.log(`Screenshot saved: ${demo.name}`);
  }

  // 2. Screenshot homepage-based demos
  await page.goto(baseUrl + "/");
  for (const demo of homepageDemos) {
    const card = await page
      .locator(`h2:text-is('${demo.heading}')`)
      .first()
      .locator("..")
      .locator("..");
    await expect(card).toBeVisible();
    await card.screenshot({
      path: path.join(SCREENSHOTS_DIR, `${demo.name}.png`),
    });
    console.log(`Screenshot saved: ${demo.name}`);
  }

  await browser.close();

  // 3. Update registry.json with screenshot fields
  const registryRaw = await fs.readFile(REGISTRY_PATH, "utf-8");
  const registry = JSON.parse(registryRaw);
  const items = registry.items;

  for (const item of items) {
    const screenshotPath = `/screenshots/${item.name}.png`;
    const absScreenshotPath = path.join(SCREENSHOTS_DIR, `${item.name}.png`);
    try {
      await fs.access(absScreenshotPath);
      item.screenshot = screenshotPath;
    } catch {
      // Screenshot does not exist, skip
    }
  }

  await fs.writeFile(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");
  console.log("registry.json updated with screenshot fields.");
}

// If run directly, execute the function
if (require.main === module) {
  screenshotAndUpdateRegistry().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

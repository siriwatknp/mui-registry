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

// Helper to get URLs from CLI arguments
function getUrlsFromArgs(): string[] {
  // Filter out --port arguments and get remaining args
  const urls = process.argv
    .slice(2)
    .filter((arg) => !arg.startsWith("--port"))
    .filter((arg) => {
      // Skip the value after --port if it's not a flag
      const prevArg = process.argv[process.argv.indexOf(arg) - 1];
      return !prevArg || !prevArg.startsWith("--port") || prevArg.includes("=");
    });

  return urls;
}

const SCREENSHOTS_DIR = path.join(process.cwd(), "public", "screenshots");

export async function screenshotDemos() {
  const port = getPort();
  const baseUrl = `http://localhost:${port}`;
  const urlsToCapture = getUrlsFromArgs();

  // Ensure screenshots directory exists
  await fs.mkdir(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  if (urlsToCapture.length > 0) {
    // Screenshot specific URLs provided as arguments
    for (const url of urlsToCapture) {
      // Handle both full URLs and paths
      const fullUrl = url.startsWith("http")
        ? url
        : `${baseUrl}${url.startsWith("/") ? url : "/" + url}`;

      // Extract the name from the URL path
      const urlPath = url.startsWith("http") 
        ? new URL(url).pathname 
        : url;
      const imageName = urlPath.replace(/^\/+|\/+$/g, '').replace(/\//g, '-') || 'index';

      try {
        await page.goto(fullUrl, { waitUntil: "networkidle" });

        // Wait for animations to finish
        await page.waitForTimeout(1000);

        // Try to find preview blocks on the page
        const previewBlocks = page.locator("div[data-preview]");
        const count = await previewBlocks.count();

        if (count > 0) {
          for (let i = 0; i < count; i++) {
            const block = previewBlocks.nth(i);
            await expect(block).toBeVisible();
            
            // Wait for any animations within the block
            await page.evaluate(() => {
              return new Promise((resolve) => {
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    resolve(undefined);
                  });
                });
              });
            });
            
            // Use the URL-based name for the screenshot
            const screenshotPath = path.join(
              SCREENSHOTS_DIR,
              `${imageName}${count > 1 ? `-${i + 1}` : ''}.png`
            );
            await block.screenshot({ path: screenshotPath, animations: "disabled" });
            console.log(`Screenshot saved: ${imageName}${count > 1 ? `-${i + 1}` : ''} from ${url}`);
          }
        } else {
          console.log(`No preview blocks found at ${url}`);
        }
      } catch (error) {
        console.error(`Error capturing screenshots from ${url}:`, error);
      }
    }
  } else {
    // Default behavior: Screenshot all preview blocks on homepage
    await page.goto(baseUrl + "/", { waitUntil: "networkidle" });
    
    // Wait for animations to finish
    await page.waitForTimeout(1000);
    
    const previewBlocks = page.locator("div[data-preview]");
    const count = await previewBlocks.count();
    for (let i = 0; i < count; i++) {
      const block = previewBlocks.nth(i);
      const previewName = await block.getAttribute("data-preview");
      if (!previewName) continue;
      
      await expect(block).toBeVisible();
      
      // Wait for any animations within the block
      await page.evaluate(() => {
        return new Promise((resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              resolve(undefined);
            });
          });
        });
      });
      
      const screenshotPath = path.join(SCREENSHOTS_DIR, `${previewName}.png`);
      await block.screenshot({ path: screenshotPath, animations: "disabled" });
      console.log(`Screenshot saved: ${previewName}`);
    }
  }

  await browser.close();

  console.log("Screenshot capture completed.");
}

// If run directly, execute the function
if (require.main === module) {
  screenshotDemos().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

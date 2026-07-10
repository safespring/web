import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = (process.argv[2] || "http://127.0.0.1:4190").replace(/\/$/, "");
const outputDir = process.argv[3] || "/tmp/safespring-css-qa";
const pages = [
  { name: "home", path: "/", selector: ".flexcontainer-three" },
  {
    name: "compute",
    path: "/tjanster/compute/",
    selector: ".main-default-single",
  },
  {
    name: "storage",
    path: "/tjanster/s3-kompatibel-objektlagring-i-sverige-och-norden/",
    selector: ".main-default-single",
  },
  {
    name: "backup",
    path: "/tjanster/backup/",
    selector: ".main-default-single",
  },
  {
    name: "kubernetes",
    path: "/tjanster/kubernetes/",
    selector: ".icon-block-horisontal",
  },
  { name: "price", path: "/pris/", selector: "body.has-mobile-price-tables" },
  {
    name: "article",
    path: "/deep-dive/2025-11-migrating-from-ingress-nginx-to-gateway-api-with-cilium/",
    selector: "pre",
  },
  { name: "webinar", path: "/webinar/", selector: ".content-container" },
  { name: "about", path: "/om-safespring/", selector: ".about-history-page" },
  { name: "contact", path: "/kontakt/", selector: ".icon-block-horisontal" },
];
const viewports = [
  { name: "mobile", width: 412, height: 823, isMobile: true },
  { name: "desktop", width: 1440, height: 1000, isMobile: false },
];

fs.mkdirSync(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const failures = [];

for (const viewport of viewports) {
  for (const test of pages) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
    });
    const runtimeErrors = [];
    const cssErrors = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    page.on("response", (response) => {
      if (response.url().includes(".css") && response.status() >= 400) {
        cssErrors.push(`${response.status()} ${response.url()}`);
      }
    });

    try {
      const response = await page.goto(`${baseUrl}${test.path}`, {
        waitUntil: "networkidle",
      });
      if (!response?.ok())
        throw new Error(`HTTP ${response?.status() || "unknown"}`);

      const target = page.locator(test.selector).first();
      if ((await target.count()) === 0)
        throw new Error(`missing ${test.selector}`);
      const style = await target.evaluate((element) => {
        const computed = getComputedStyle(element);
        return { display: computed.display, visibility: computed.visibility };
      });
      if (style.display === "none" || style.visibility === "hidden") {
        throw new Error(`${test.selector} is not rendered`);
      }

      const hasHorizontalOverflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1,
      );
      if (hasHorizontalOverflow)
        throw new Error("page has horizontal overflow");

      if (test.name === "home") {
        const homeLayout = await page.evaluate(() => {
          const box = (selector) =>
            document.querySelector(selector)?.getBoundingClientRect();
          const style = (selector) => {
            const element = document.querySelector(selector);
            return element ? getComputedStyle(element) : null;
          };
          const cards = [
            ...document.querySelectorAll(".flexcontainer-three > a"),
          ].map((element) => element.getBoundingClientRect());
          return {
            backgroundDisplay: style(".background-bright")?.display,
            backgroundMaxWidth: parseFloat(
              style(".background-bright")?.maxWidth || "0",
            ),
            cards: cards.map((card) => ({ y: card.y })),
            video: box(".index-video"),
            mapBackground: style(".two-field-background")?.backgroundImage,
          };
        });
        if (homeLayout.backgroundDisplay !== "flex") {
          throw new Error("home content wrapper is not a flex layout");
        }
        if (homeLayout.backgroundMaxWidth !== 1400) {
          throw new Error(
            "home content wrapper lost its 1400px width constraint",
          );
        }
        if (!homeLayout.mapBackground || homeLayout.mapBackground === "none") {
          throw new Error("home datacenter map background is missing");
        }
        if (
          !homeLayout.video ||
          homeLayout.video.width >= viewport.width * 0.95
        ) {
          throw new Error("home video is no longer constrained");
        }
        if (
          !viewport.isMobile &&
          new Set(homeLayout.cards.map((card) => Math.round(card.y))).size !== 2
        ) {
          throw new Error(
            "home service cards are not arranged in two desktop rows",
          );
        }
      }

      if (test.name === "kubernetes") {
        const componentLayout = await page.evaluate(() => {
          const iconContainer = document.querySelector(".icon-block-color");
          const icon = iconContainer?.querySelector(".fa-icon");
          const card = [
            ...document.querySelectorAll(
              ".safespring-horisontal-card-container",
            ),
          ].at(-1);
          const image = card?.querySelector(
            ".safespring-horisontal-card-image",
          );
          const containerBox = iconContainer?.getBoundingClientRect();
          const iconBox = icon?.getBoundingClientRect();
          return {
            iconCentered:
              containerBox && iconBox
                ? Math.abs(
                    iconBox.x +
                      iconBox.width / 2 -
                      (containerBox.x + containerBox.width / 2),
                  ) < 1 &&
                  Math.abs(
                    iconBox.y +
                      iconBox.height / 2 -
                      (containerBox.y + containerBox.height / 2),
                  ) < 1
                : false,
            cardDisplay: card ? getComputedStyle(card).display : null,
            cardBackground: image
              ? getComputedStyle(image).backgroundImage
              : null,
            cardBackgroundSize: image
              ? getComputedStyle(image).backgroundSize
              : null,
          };
        });
        if (!componentLayout.iconCentered) {
          throw new Error("horizontal icon-block icon is not centered");
        }
        if (
          !componentLayout.cardBackground ||
          componentLayout.cardBackground === "none"
        ) {
          throw new Error("Kubernetes CTA card background is missing");
        }
        if (componentLayout.cardBackgroundSize !== "cover") {
          throw new Error(
            "Kubernetes CTA card background is not cropped with cover",
          );
        }
        const expectedDisplay = viewport.isMobile ? "block" : "flex";
        if (componentLayout.cardDisplay !== expectedDisplay) {
          throw new Error(
            `Kubernetes CTA card should use ${expectedDisplay} layout`,
          );
        }
      }

      if (viewport.isMobile) {
        const menuButton = page.locator("#mobileMenuBtn");
        await menuButton.click();
        if ((await menuButton.getAttribute("aria-expanded")) !== "true") {
          throw new Error("mobile menu did not open");
        }
        await menuButton.click();
      }

      if (test.name === "compute") {
        const accordion = page.locator(".accordion").first();
        if ((await accordion.count()) > 0) {
          const before = await accordion.getAttribute("aria-expanded");
          await accordion.click();
          const after = await accordion.getAttribute("aria-expanded");
          if (before === after)
            throw new Error("accordion state did not change");
        }
      }

      if (runtimeErrors.length)
        throw new Error(`page errors: ${runtimeErrors.join("; ")}`);
      if (cssErrors.length)
        throw new Error(`CSS errors: ${cssErrors.join("; ")}`);

      await page.screenshot({
        path: path.join(outputDir, `${test.name}-${viewport.name}.png`),
        fullPage: false,
      });
      console.log(`PASS ${viewport.name} ${test.path}`);
    } catch (error) {
      failures.push(`${viewport.name} ${test.path}: ${error.message}`);
      console.error(`FAIL ${viewport.name} ${test.path}: ${error.message}`);
    } finally {
      await page.close();
    }
  }
}

await browser.close();
if (failures.length) {
  console.error(
    `\n${failures.length} CSS verification failure(s):\n${failures.join("\n")}`,
  );
  process.exitCode = 1;
}

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
  {
    name: "llm-article",
    path: "/deep-dive/2025-12-run-llm-in-safespring-container-platform/",
    selector: ".safespring-horisontal-card-content",
  },
  {
    name: "ai-disclaimer",
    path: "/dokument/sunet-safespring-sakerhetskontroller-for-privata-moln/",
    selector: ".ai-disclaimer-container",
  },
  {
    name: "faq",
    path: "/vanliga-fragor/",
    selector: ".accordion-box",
  },
  {
    name: "news-author",
    path: "/perspektiv/digital-radighet-ar-inte-en-produkt/",
    selector: ".author-container",
  },
  {
    name: "compliance-document",
    path: "/compliance/acceptable_use_policy/",
    selector: ".document-download__meta",
  },
  { name: "webinar", path: "/webinar/", selector: ".content-container" },
  {
    name: "webinar-episode",
    path: "/webinar/ta-kontroll/juridisk-sakerhet/",
    selector: ".video-list",
  },
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
          const serviceIcon = document.querySelector(
            ".flexcontainer-three .cardicon .fa-icon",
          );
          const serviceIconCircle = serviceIcon?.closest(".cardicon");
          return {
            backgroundDisplay: style(".background-bright")?.display,
            backgroundMaxWidth: parseFloat(
              style(".background-bright")?.maxWidth || "0",
            ),
            cards: cards.map((card) => ({ y: card.y })),
            serviceIcon: box(".flexcontainer-three .cardicon .fa-icon"),
            serviceIconCircle: serviceIconCircle?.getBoundingClientRect(),
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
          homeLayout.serviceIcon?.height !== 20 ||
          homeLayout.serviceIconCircle?.height !== 40 ||
          homeLayout.serviceIconCircle?.width !== 40
        ) {
          throw new Error("home service-card icon sizing is invalid");
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

      if (test.name === "article" || test.name === "news-author") {
        const authorLayout = await page.evaluate(() => {
          const author = document.querySelector(".author-container");
          const image = author?.querySelector(".author-image");
          const box = image?.getBoundingClientRect();
          const style = image ? getComputedStyle(image) : null;
          return {
            authorDisplay: author ? getComputedStyle(author).display : null,
            imageWidth: box?.width,
            imageHeight: box?.height,
            imageRadius: style?.borderRadius,
            imageBackground: style?.backgroundImage,
          };
        });
        if (authorLayout.authorDisplay !== "flex") {
          throw new Error("author block is not using its component layout");
        }
        if (authorLayout.imageWidth !== 75 || authorLayout.imageHeight !== 75) {
          throw new Error("author image is not 75x75px");
        }
        if (authorLayout.imageRadius !== "200px") {
          throw new Error("author image is not circular");
        }
        if (
          !authorLayout.imageBackground ||
          authorLayout.imageBackground === "none"
        ) {
          throw new Error("author image background is missing");
        }
      }

      if (test.name === "llm-article") {
        const articleComponentLayout = await page.evaluate(() => {
          const card = document.querySelector(
            ".safespring-horisontal-card-content",
          );
          const copyButton = document.querySelector(".copy-code-button");
          const cardStyle = card ? getComputedStyle(card) : null;
          const buttonStyle = copyButton ? getComputedStyle(copyButton) : null;
          const buttonBox = copyButton?.getBoundingClientRect();
          return {
            cardPadding: cardStyle
              ? [
                  cardStyle.paddingTop,
                  cardStyle.paddingRight,
                  cardStyle.paddingBottom,
                  cardStyle.paddingLeft,
                ]
              : [],
            buttonHeight: buttonBox?.height || 0,
            buttonRadius: parseFloat(buttonStyle?.borderRadius || "0"),
          };
        });
        if (
          articleComponentLayout.cardPadding.length !== 4 ||
          new Set(articleComponentLayout.cardPadding).size !== 1
        ) {
          throw new Error("horizontal card content padding is not symmetric");
        }
        if (
          !articleComponentLayout.buttonHeight ||
          articleComponentLayout.buttonRadius <
            articleComponentLayout.buttonHeight / 2
        ) {
          throw new Error("copy-code button is not pill-shaped");
        }
      }

      if (test.name === "ai-disclaimer") {
        const disclaimerLayout = await page.evaluate(() => {
          const disclaimer = document.querySelector(".ai-disclaimer-container");
          return {
            marginBottom: disclaimer
              ? getComputedStyle(disclaimer).marginBottom
              : null,
          };
        });
        if (disclaimerLayout.marginBottom !== "4px") {
          throw new Error("AI disclaimer has excessive space below it");
        }
      }

      if (test.name === "faq") {
        const faqButton = page
          .locator("button.accordion")
          .filter({ hasText: "Kan jag granska ert säkerhetsarbete?" });
        if ((await faqButton.count()) !== 1) {
          throw new Error("target FAQ accordion is missing");
        }
        await faqButton.click();
        await page.waitForTimeout(550);
        const faqPanelLayout = await faqButton.evaluate((button) => {
          const panel = button.nextElementSibling;
          const wrapper = panel?.firstElementChild;
          const heading = wrapper?.firstElementChild;
          const panelStyle = panel ? getComputedStyle(panel) : null;
          const wrapperStyle = wrapper ? getComputedStyle(wrapper) : null;
          return {
            headingMarginTop: heading
              ? getComputedStyle(heading).marginTop
              : null,
            paddingBottom: wrapperStyle?.paddingBottom,
            paddingLeft: panelStyle?.paddingLeft,
            paddingRight: panelStyle?.paddingRight,
            paddingTop: wrapperStyle?.paddingTop,
          };
        });
        if (
          faqPanelLayout.headingMarginTop !== "0px" ||
          faqPanelLayout.paddingTop !== "46px" ||
          faqPanelLayout.paddingRight !== "46px" ||
          faqPanelLayout.paddingBottom !== "46px" ||
          faqPanelLayout.paddingLeft !== "46px"
        ) {
          throw new Error("FAQ accordion panel padding is not symmetric");
        }
        await faqButton.click();
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(850);
      }

      if (test.name === "compliance-document") {
        const documentMetaLayout = await page.evaluate(() => {
          const meta = document.querySelector(".document-download__meta");
          const row = meta?.querySelector("div");
          const term = row?.querySelector("dt");
          const style = meta ? getComputedStyle(meta) : null;
          const rowStyle = row ? getComputedStyle(row) : null;
          const termStyle = term ? getComputedStyle(term) : null;
          return {
            display: style?.display,
            width: meta?.getBoundingClientRect().width,
            borderTop: style?.borderTopWidth,
            borderBottom: style?.borderBottomWidth,
            rowDisplay: rowStyle?.display,
            rowColumns: rowStyle?.gridTemplateColumns,
            textTransform: termStyle?.textTransform,
          };
        });
        if (documentMetaLayout.display !== "grid") {
          throw new Error("compliance document metadata is not a grid");
        }
        if (!documentMetaLayout.width || documentMetaLayout.width > 400) {
          throw new Error("compliance document metadata width is invalid");
        }
        if (
          documentMetaLayout.borderTop !== "1px" ||
          documentMetaLayout.borderBottom !== "1px"
        ) {
          throw new Error("compliance document metadata borders are missing");
        }
        if (
          documentMetaLayout.rowDisplay !== "grid" ||
          !documentMetaLayout.rowColumns ||
          documentMetaLayout.rowColumns === "none"
        ) {
          throw new Error(
            "compliance document metadata row columns are missing",
          );
        }
        if (documentMetaLayout.textTransform !== "uppercase") {
          throw new Error("compliance document metadata labels are not styled");
        }
      }

      if (test.name === "webinar" && !viewport.isMobile) {
        const scrollControlLayout = await page.evaluate(() => {
          const button = document.querySelector("#scrollRight");
          const icon = button?.querySelector(".fa-icon");
          const buttonBox = button?.getBoundingClientRect();
          const iconBox = icon?.getBoundingClientRect();
          const style = button ? getComputedStyle(button) : null;
          const iconStyle = icon ? getComputedStyle(icon) : null;
          return {
            display: style?.display,
            width: buttonBox?.width,
            height: buttonBox?.height,
            radius: style?.borderRadius,
            iconColor: iconStyle?.color,
            iconFill: iconStyle?.fill,
            iconCentered:
              buttonBox && iconBox
                ? Math.abs(
                    iconBox.x +
                      iconBox.width / 2 -
                      (buttonBox.x + buttonBox.width / 2),
                  ) < 1 &&
                  Math.abs(
                    iconBox.y +
                      iconBox.height / 2 -
                      (buttonBox.y + buttonBox.height / 2),
                  ) < 1
                : false,
          };
        });
        if (
          scrollControlLayout.display !== "flex" &&
          scrollControlLayout.display !== "inline-flex"
        ) {
          throw new Error("webinar scroll control is not a flex button");
        }
        if (
          scrollControlLayout.width !== 70 ||
          scrollControlLayout.height !== 70
        ) {
          throw new Error("webinar scroll control is not 70x70px");
        }
        if (
          scrollControlLayout.radius !== "50%" ||
          !scrollControlLayout.iconCentered
        ) {
          throw new Error(
            "webinar scroll control is not circular and centered",
          );
        }
        if (
          scrollControlLayout.iconColor !== "rgb(25, 95, 140)" ||
          scrollControlLayout.iconFill !== "rgb(25, 95, 140)"
        ) {
          throw new Error("webinar scroll control icon is not main blue");
        }
      }

      if (test.name === "webinar-episode") {
        const episodeLayout = await page.evaluate(() => {
          const icon = document.querySelector(
            ".video-container2 .play-button .fa-icon",
          );
          const row = document.querySelector(".webinarplaylist li");
          const circle = row ? getComputedStyle(row, "::before") : null;
          const arrow = row ? getComputedStyle(row, "::after") : null;
          return {
            iconColor: icon ? getComputedStyle(icon).color : null,
            iconFill: icon ? getComputedStyle(icon).fill : null,
            circleWidth: parseFloat(circle?.width || "0"),
            circleHeight: parseFloat(circle?.height || "0"),
            circleGap: parseFloat(circle?.marginRight || "0"),
            arrowWidth: parseFloat(arrow?.width || "0"),
            arrowHeight: parseFloat(arrow?.height || "0"),
          };
        });
        if (
          episodeLayout.iconColor !== "rgb(255, 255, 255)" ||
          episodeLayout.iconFill !== "rgb(255, 255, 255)"
        ) {
          throw new Error("webinar episode card play icon is not white");
        }
        if (
          episodeLayout.circleWidth !== 22 ||
          episodeLayout.circleHeight !== 22 ||
          episodeLayout.circleGap !== 12
        ) {
          throw new Error("webinar chapter play circle spacing is invalid");
        }
        if (episodeLayout.arrowWidth !== 6 || episodeLayout.arrowHeight !== 8) {
          throw new Error("webinar chapter play arrow size is invalid");
        }
      }

      if (viewport.isMobile) {
        const menuButton = page.locator("#mobileMenuBtn");
        await menuButton.click();
        if ((await menuButton.getAttribute("aria-expanded")) !== "true") {
          throw new Error("mobile menu did not open");
        }
        await menuButton.click();
      } else {
        await page.locator("#main-menu-link-platform").hover();
        await page.locator("#site-megamenu.show").waitFor();
        await page.waitForFunction(() => {
          const icon = document.querySelector(
            ".megamenu-main-service-card .cardicon",
          );
          const box = icon?.getBoundingClientRect();
          return box?.width === 40 && box?.height === 40;
        });
        const megaMenuLayout = await page.evaluate(() => {
          const card = document.querySelector(".megamenu-main-service-card");
          const title = card?.querySelector(".cardtitle");
          const icon = card?.querySelector(".cardicon");
          const svg = icon?.querySelector(".fa-icon");
          const iconBox = icon?.getBoundingClientRect();
          const svgBox = svg?.getBoundingClientRect();
          return {
            titleDisplay: title ? getComputedStyle(title).display : null,
            iconWidth: iconBox?.width,
            iconHeight: iconBox?.height,
            iconRadius: icon ? getComputedStyle(icon).borderRadius : null,
            iconCentered:
              iconBox && svgBox
                ? Math.abs(
                    svgBox.x +
                      svgBox.width / 2 -
                      (iconBox.x + iconBox.width / 2),
                  ) < 1 &&
                  Math.abs(
                    svgBox.y +
                      svgBox.height / 2 -
                      (iconBox.y + iconBox.height / 2),
                  ) < 1
                : false,
          };
        });
        if (megaMenuLayout.titleDisplay !== "flex") {
          throw new Error("desktop megamenu service title is not a flex row");
        }
        if (
          megaMenuLayout.iconWidth !== 40 ||
          megaMenuLayout.iconHeight !== 40
        ) {
          throw new Error("desktop megamenu service icon is not 40x40px");
        }
        if (
          megaMenuLayout.iconRadius !== "100px" ||
          !megaMenuLayout.iconCentered
        ) {
          throw new Error(
            "desktop megamenu service icon is not circular and centered",
          );
        }
        await page.keyboard.press("Escape");
      }

      if (test.name === "compute") {
        const computeComponentLayout = await page.evaluate(() => {
          const documentationHeading = [
            ...document.querySelectorAll(".card-heading"),
          ].find((element) =>
            (element.textContent || "").includes("Dokumentation"),
          );
          const nisCard = [
            ...document.querySelectorAll(
              ".safespring-horisontal-card-container",
            ),
          ].find((element) =>
            (element.textContent || "").includes("NIS 2 direktivet"),
          );
          const headingStyle = documentationHeading
            ? getComputedStyle(documentationHeading)
            : null;
          const readfileSummary = document.querySelector(".readfile-summary");
          const summaryStyle = readfileSummary
            ? getComputedStyle(readfileSummary)
            : null;
          return {
            cardBackground: nisCard
              ? getComputedStyle(nisCard).backgroundColor
              : null,
            headingColor: headingStyle?.color,
            headingFontSize: headingStyle?.fontSize,
            headingPaddingTop: headingStyle?.paddingTop,
            summaryBackground: summaryStyle?.backgroundColor,
            summaryDisplay: summaryStyle?.display,
            summaryMinHeight: summaryStyle?.minHeight,
            summaryRadius: summaryStyle?.borderRadius,
          };
        });
        if (
          computeComponentLayout.headingColor !== "rgb(25, 95, 140)" ||
          computeComponentLayout.headingFontSize !== "36px" ||
          computeComponentLayout.headingPaddingTop !== "30px"
        ) {
          throw new Error("Compute documentation heading style is missing");
        }
        if (computeComponentLayout.cardBackground !== "rgb(255, 255, 255)") {
          throw new Error("Compute horizontal card background is not white");
        }
        if (
          computeComponentLayout.summaryBackground !== "rgb(244, 103, 15)" ||
          computeComponentLayout.summaryDisplay !== "inline-flex" ||
          computeComponentLayout.summaryMinHeight !== "44px" ||
          computeComponentLayout.summaryRadius !== "50px"
        ) {
          throw new Error("Compute readfile summary style is missing");
        }

        const readfileDetails = page.locator(".readfile-details").first();
        if ((await readfileDetails.count()) > 0) {
          const readfileSummary = readfileDetails.locator(".readfile-summary");
          await readfileSummary.click();
          if ((await readfileDetails.getAttribute("open")) === null) {
            throw new Error("Compute readfile details did not open");
          }
          await readfileSummary.click();
        }

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

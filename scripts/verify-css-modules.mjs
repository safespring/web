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
    name: "boundary-table",
    path: "/deep-dive/forsta-safespring-kubernetes-engine-om-du-brukar-kora-kubernetes-sjalv/",
    selector: ".ss-boundary-table",
  },
  {
    name: "windows-hardening",
    path: "/deep-dive/automatisera-hardning-av-windows-server-pa-safespring-compute-fran-start-till-last-system/",
    selector: ".code-block-toolbar",
  },
  {
    name: "welkin-case",
    path: "/tjanster/elastisys-bygger-welkin-pa-safespring-compute/",
    selector: ".safespring-horisontal-card-container",
  },
  {
    name: "ai-disclaimer",
    path: "/deep-dive/forsta-safespring-kubernetes-engine-om-du-brukar-kora-kubernetes-sjalv/",
    selector: ".ai-disclaimer-container",
  },
  {
    name: "ai-disclaimer-test",
    path: "/ai-disclaimer-test/",
    selector: ".ai-notice-lab",
  },
  {
    name: "faq",
    path: "/vanliga-fragor/",
    selector: ".accordion-box",
  },
  {
    name: "knowledge-hub",
    path: "/kunskapshubb/",
    selector: ".knowledge-category-nav",
  },
  {
    name: "news-list",
    path: "/perspektiv/",
    selector: ".knowledge-category-nav",
  },
  {
    name: "deep-dive-list",
    path: "/deep-dive/",
    selector: ".knowledge-category-nav",
  },
  {
    name: "solution-brief-list",
    path: "/losningsfaktablad/",
    selector: ".knowledge-category-nav",
  },
  {
    name: "whitepaper-list",
    path: "/vitbok/",
    selector: ".knowledge-category-nav",
  },
  {
    name: "solution-brief-article",
    path: "/losningsfaktablad/objektlagring-med-protokollet-s3-ger-dig-oandlig-flexibilitet/",
    selector: ".knowledge-category-nav",
  },
  {
    name: "whitepaper-article",
    path: "/vitbok/cloud-act-fisa-702-och-gdpr-for-svenska-molntjanster/",
    selector: ".knowledge-category-nav",
  },
  {
    name: "news-author",
    path: "/perspektiv/digital-radighet-ar-inte-en-produkt/",
    selector: ".author-container",
  },
  {
    name: "sovereignty-timeline",
    path: "/perspektiv/eu-har-precis-definierat-det-suverana-molnet-har-ar-vart-resultat/",
    selector: ".content-timeline",
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
      hasTouch: viewport.isMobile,
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
            buttonFontFamily: buttonStyle?.fontFamily,
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
        if (
          !articleComponentLayout.buttonFontFamily
            ?.toLowerCase()
            .includes("montserrat")
        ) {
          throw new Error("copy-code button is not using Montserrat");
        }
      }

      if (test.name === "windows-hardening") {
        const codeBlockLayout = await page.evaluate(() => {
          const blocks = [...document.querySelectorAll("pre.code-block-enhanced")];
          const pre = blocks.find((block) => {
            const code = block.querySelector(":scope > code");
            return code && code.scrollWidth > code.clientWidth;
          });
          const code = pre?.querySelector(":scope > code");
          const toolbar = pre?.querySelector(".code-block-toolbar");
          const button = toolbar?.querySelector(".copy-code-button");
          const before = toolbar?.getBoundingClientRect();
          const buttonBefore = button?.getBoundingClientRect();
          const codeStyle = code ? getComputedStyle(code) : null;
          const toolbarHeight = toolbar?.getBoundingClientRect().height || 0;
          if (code) code.scrollLeft = Math.min(180, code.scrollWidth);
          const after = toolbar?.getBoundingClientRect();
          const buttonAfter = button?.getBoundingClientRect();
          return {
            foundOverflowingBlock: Boolean(pre),
            preOverflowX: pre ? getComputedStyle(pre).overflowX : null,
            codeOverflowX: code ? getComputedStyle(code).overflowX : null,
            codeScrollLeft: code?.scrollLeft || 0,
            codePadding: codeStyle
              ? {
                  top: parseFloat(codeStyle.paddingTop),
                  right: parseFloat(codeStyle.paddingRight),
                  bottom: parseFloat(codeStyle.paddingBottom),
                  left: parseFloat(codeStyle.paddingLeft),
                }
              : null,
            toolbarHeight,
            toolbarShift: before && after ? after.left - before.left : null,
            buttonShift:
              buttonBefore && buttonAfter
                ? buttonAfter.left - buttonBefore.left
                : null,
            toolbarBackground: toolbar
              ? getComputedStyle(toolbar).backgroundColor
              : null,
          };
        });
        if (
          !codeBlockLayout.foundOverflowingBlock ||
          codeBlockLayout.codeScrollLeft <= 0
        ) {
          throw new Error("no horizontally scrollable code block was found");
        }
        if (
          codeBlockLayout.preOverflowX !== "hidden" ||
          codeBlockLayout.codeOverflowX !== "auto"
        ) {
          throw new Error("code content does not own horizontal scrolling");
        }
        if (
          codeBlockLayout.toolbarShift !== 0 ||
          codeBlockLayout.buttonShift !== 0
        ) {
          throw new Error("code block toolbar moves with scrolled code");
        }
        if (
          !codeBlockLayout.codePadding ||
          codeBlockLayout.codePadding.top - codeBlockLayout.toolbarHeight < 16 ||
          codeBlockLayout.codePadding.right < 20 ||
          codeBlockLayout.codePadding.bottom < 16 ||
          codeBlockLayout.codePadding.left < 20
        ) {
          throw new Error("code block content padding is too small");
        }
        if (codeBlockLayout.toolbarBackground === "rgba(0, 0, 0, 0)") {
          throw new Error("code block toolbar background is missing");
        }
      }

      if (test.name === "welkin-case") {
        const horizontalCards = await page.evaluate(() =>
          [...document.querySelectorAll(".safespring-horisontal-card-container")]
            .map((card) => ({
              shadow: getComputedStyle(card).boxShadow,
              radius: getComputedStyle(card).borderRadius,
            })),
        );
        if (
          horizontalCards.length === 0 ||
          horizontalCards.some(
            (card) => card.shadow === "none" || card.radius !== "10px",
          )
        ) {
          throw new Error("horizontal card shadow or radius is missing");
        }
      }

      if (test.name === "news-list") {
        const listedContent = await page.evaluate(() => {
          const links = [
            ...document.querySelectorAll(
              ".main-default-single .content-container a[href]",
            ),
          ].map((link) => link.getAttribute("href"));
          return {
            count: links.length,
            deepDiveLinks: links.filter((href) => href?.startsWith("/deep-dive/")),
          };
        });
        if (listedContent.count === 0 || listedContent.deepDiveLinks.length) {
          throw new Error("perspectives list contains Deep Dive cards");
        }
      }

      if (test.name === "deep-dive-list") {
        const deepDiveLinks = await page.evaluate(() =>
          [...document.querySelectorAll(".main-default-single .content-container a[href]")]
            .map((link) => link.getAttribute("href")),
        );
        if (
          !deepDiveLinks.includes(
            "/deep-dive/2025-12-run-llm-in-safespring-container-platform/",
          )
        ) {
          throw new Error("Gabriel's LLM article is missing from Deep Dives");
        }
      }

      if (test.name === "sovereignty-timeline") {
        const timelineLayout = await page.evaluate(() => {
          const timeline = document.querySelector(".content-timeline");
          const items = [
            ...document.querySelectorAll(".content-timeline__item"),
          ];
          const firstItem = items[0];
          const marker = firstItem
            ? getComputedStyle(firstItem, "::before")
            : null;
          return {
            itemCount: items.length,
            noteCount: document.querySelectorAll(".note-dotted").length,
            cssLoaded: [...document.styleSheets].some((sheet) =>
              sheet.href?.includes("/css/content-timeline.min"),
            ),
            gridColumns: firstItem
              ? getComputedStyle(firstItem).gridTemplateColumns
                  .split(" ")
                  .filter(Boolean).length
              : 0,
            timelineWidth: timeline?.getBoundingClientRect().width || 0,
            markerColor: marker?.backgroundColor,
          };
        });
        if (timelineLayout.itemCount !== 8 || timelineLayout.noteCount !== 0) {
          throw new Error("sovereignty assessment is not an eight-item timeline");
        }
        if (!timelineLayout.cssLoaded) {
          throw new Error("content timeline stylesheet is missing");
        }
        const expectedColumns = viewport.isMobile ? 1 : 2;
        if (timelineLayout.gridColumns !== expectedColumns) {
          throw new Error(
            `timeline should use ${expectedColumns} grid column(s)`,
          );
        }
        if (
          !timelineLayout.timelineWidth ||
          timelineLayout.timelineWidth > viewport.width
        ) {
          throw new Error("timeline width exceeds the viewport");
        }
        if (timelineLayout.markerColor === "rgba(0, 0, 0, 0)") {
          throw new Error("timeline marker is not rendered");
        }
      }

      if (test.name === "ai-disclaimer") {
        const disclaimerLayout = await page.evaluate(() => {
          const disclaimer = document.querySelector(".ai-disclaimer-container");
          const header = disclaimer?.querySelector(".ai-disclaimer-header");
          const title = header?.querySelector("span");
          const icon = header?.querySelector(".fa-language");
          const panel = disclaimer?.querySelector(".ai-disclaimer-panel");
          const content = disclaimer?.parentElement;
          const intro = content
            ? [...content.children].find((element) => element.tagName === "P")
            : null;
          const disclaimerBox = disclaimer?.getBoundingClientRect();
          const contentBox = content?.getBoundingClientRect();
          const introBox = intro?.getBoundingClientRect();
          const titleBox = title?.getBoundingClientRect();
          const iconBox = icon?.getBoundingClientRect();
          const style = disclaimer ? getComputedStyle(disclaimer) : null;
          const panelStyle = panel ? getComputedStyle(panel) : null;
          return {
            collapsedHeight: disclaimerBox?.height || 0,
            cssFloat: style?.float,
            display: style?.display,
            contentLeft: contentBox?.left || 0,
            contentWidth: contentBox?.width || 0,
            expanded: header?.getAttribute("aria-expanded"),
            headerHeight: header?.getBoundingClientRect().height || 0,
            hasButton: Boolean(header),
            hasLanguageIcon: Boolean(
              disclaimer?.querySelector(".fa-solid.fa-language"),
            ),
            iconTitleAligned:
              titleBox && iconBox
                ? Math.abs(
                    titleBox.top + titleBox.height / 2 -
                      (iconBox.top + iconBox.height / 2),
                  ) < 1
                : false,
            panelVisibility: panelStyle?.visibility,
            position: style?.position,
            paddingLeft: parseFloat(style?.paddingLeft || "0"),
            paddingRight: parseFloat(style?.paddingRight || "0"),
            stylesheetLoaded: [...document.styleSheets].some((sheet) =>
              (sheet.href || "").includes("ai-disclaimer"),
            ),
            width: disclaimer?.getBoundingClientRect().width || 0,
            introLeft: introBox?.left || 0,
            introWidth: introBox?.width || 0,
          };
        });
        if (
          !disclaimerLayout.stylesheetLoaded ||
          !disclaimerLayout.hasLanguageIcon ||
          !disclaimerLayout.hasButton ||
          !disclaimerLayout.iconTitleAligned ||
          disclaimerLayout.headerHeight < 44 ||
          disclaimerLayout.collapsedHeight > 50 ||
          disclaimerLayout.expanded !== "false" ||
          disclaimerLayout.panelVisibility !== "hidden" ||
          disclaimerLayout.cssFloat !== "none" ||
          disclaimerLayout.position !== "relative" ||
          Math.abs(disclaimerLayout.introLeft - disclaimerLayout.contentLeft) > 1 ||
          Math.abs(disclaimerLayout.introWidth - disclaimerLayout.contentWidth) > 1 ||
          disclaimerLayout.width > Math.min(350, disclaimerLayout.contentWidth) + 1
        ) {
          throw new Error("collapsed AI translation disclosure is invalid");
        }

        const disclaimer = page.locator(".ai-disclaimer-container");
        const disclaimerToggle = page.locator(".ai-disclaimer-header");
        if (viewport.isMobile) {
          await disclaimerToggle.evaluate((button) => button.click());
        } else {
          await disclaimer.hover();
        }
        await page.waitForTimeout(350);
        const openLayout = await disclaimer.evaluate((element) => {
          const style = getComputedStyle(element);
          const lineStyle = getComputedStyle(element, "::after");
          const panel = element.querySelector(".ai-disclaimer-panel");
          const link = panel?.querySelector("a");
          return {
            expanded: element
              .querySelector(".ai-disclaimer-header")
              ?.getAttribute("aria-expanded"),
            linkHeight: link?.getBoundingClientRect().height || 0,
            backgroundColor: style.backgroundColor,
            lineColor: lineStyle.backgroundColor,
            lineLeft: lineStyle.left,
            lineOrigin: lineStyle.transformOrigin,
            lineTransform: lineStyle.transform,
            lineWidth: lineStyle.width,
            panelHeight: panel?.getBoundingClientRect().height || 0,
            panelVisibility: panel ? getComputedStyle(panel).visibility : null,
            paddingLeft: parseFloat(style.paddingLeft),
            paddingRight: parseFloat(style.paddingRight),
          };
        });
        if (
          openLayout.expanded !== "true" ||
          openLayout.backgroundColor !== "rgba(0, 0, 0, 0)" ||
          openLayout.linkHeight < 44 ||
          openLayout.lineColor === "rgba(0, 0, 0, 0)" ||
          openLayout.lineLeft !== "0px" ||
          !openLayout.lineOrigin.endsWith(" 0px") ||
          openLayout.lineTransform === "none" ||
          openLayout.lineTransform === "matrix(1, 0, 0, 0, 0, 0)" ||
          openLayout.lineWidth !== "2px" ||
          openLayout.panelHeight <= 0 ||
          openLayout.panelVisibility !== "visible" ||
          openLayout.paddingLeft !== disclaimerLayout.paddingLeft ||
          openLayout.paddingRight !== disclaimerLayout.paddingRight
        ) {
          throw new Error("expanded AI translation disclosure is invalid");
        }
        if (viewport.isMobile) {
          await disclaimerToggle.evaluate((button) => button.click());
          await page.waitForTimeout(350);
          const closedLayout = await disclaimer.evaluate((element) => ({
            expanded: element
              .querySelector(".ai-disclaimer-header")
              ?.getAttribute("aria-expanded"),
            panelVisibility: getComputedStyle(
              element.querySelector(".ai-disclaimer-panel"),
            ).visibility,
          }));
          if (
            closedLayout.expanded !== "false" ||
            closedLayout.panelVisibility !== "hidden"
          ) {
            throw new Error("touch AI translation disclosure does not close");
          }
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

      const knowledgeNavigationTests = {
        article: "/deep-dive/",
        "llm-article": "/deep-dive/",
        "windows-hardening": "/deep-dive/",
        "knowledge-hub": "/kunskapshubb/",
        "news-author": "/perspektiv/",
        "news-list": "/perspektiv/",
        "deep-dive-list": "/deep-dive/",
        "solution-brief-list": "/losningsfaktablad/",
        "solution-brief-article": "/losningsfaktablad/",
        "whitepaper-list": "/vitbok/",
        "whitepaper-article": "/vitbok/",
        webinar: "/webinar/",
      };
      if (knowledgeNavigationTests[test.name]) {
        const knowledgeNavigationLayout = await page.evaluate(() => {
          const navigation = document.querySelector(
            ".knowledge-category-nav__inner",
          );
          const links = [
            ...document.querySelectorAll(".knowledge-category-nav__link"),
          ];
          const activeLinks = links.filter(
            (link) => link.getAttribute("aria-current") === "page",
          );
          const navigationElement = navigation?.parentElement;
          const navigationBox = navigationElement?.getBoundingClientRect();
          const navigationStyle = navigationElement
            ? getComputedStyle(navigationElement)
            : null;
          const activeStyle = activeLinks[0]
            ? getComputedStyle(activeLinks[0])
            : null;
          const heroBox = document
            .querySelector(".heading-default-single")
            ?.getBoundingClientRect();
          return {
            activeCount: activeLinks.length,
            activeHref: activeLinks[0]?.getAttribute("href"),
            activeBorderColor: activeStyle?.borderBottomColor,
            activeBorderWidth: activeStyle?.borderBottomWidth,
            backgroundColor: navigationStyle?.backgroundColor,
            bodyOverflow:
              document.documentElement.scrollWidth >
              document.documentElement.clientWidth,
            display: navigation ? getComputedStyle(navigation).display : null,
            fontWeights: [...new Set(
              links.map((link) => getComputedStyle(link).fontWeight),
            )],
            linkCount: links.length,
            heroGap:
              navigationBox && heroBox
                ? navigationBox.top - heroBox.bottom
                : null,
            navigationWidth: navigationBox?.width || 0,
            navigationClientWidth: navigation?.clientWidth || 0,
            navigationScrollWidth: navigation?.scrollWidth || 0,
            viewportWidth: document.documentElement.clientWidth,
          };
        });
        if (
          knowledgeNavigationLayout.linkCount !== 6 ||
          knowledgeNavigationLayout.activeCount !== 1 ||
          knowledgeNavigationLayout.fontWeights.length !== 1 ||
          knowledgeNavigationLayout.fontWeights[0] !== "600" ||
          knowledgeNavigationLayout.activeHref !==
            knowledgeNavigationTests[test.name]
        ) {
          throw new Error("knowledge navigation links or active state are invalid");
        }
        if (knowledgeNavigationLayout.bodyOverflow) {
          throw new Error("knowledge navigation causes page overflow");
        }
        if (
          knowledgeNavigationLayout.backgroundColor !== "rgb(232, 239, 243)" ||
          knowledgeNavigationLayout.activeBorderWidth !== "2px" ||
          knowledgeNavigationLayout.activeBorderColor === "rgb(244, 103, 15)"
        ) {
          throw new Error("knowledge navigation visual treatment is invalid");
        }
        if (
          Math.abs(knowledgeNavigationLayout.heroGap || 0) > 1 ||
          knowledgeNavigationLayout.navigationWidth !==
            knowledgeNavigationLayout.viewportWidth
        ) {
          throw new Error(
            "knowledge navigation is not full-width directly below the hero",
          );
        }
        if (
          viewport.isMobile &&
          (knowledgeNavigationLayout.display !== "flex" ||
            knowledgeNavigationLayout.navigationScrollWidth <=
              knowledgeNavigationLayout.navigationClientWidth)
        ) {
          throw new Error("mobile knowledge navigation is not horizontally scrollable");
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

        if (test.name === "knowledge-hub") {
          await page.locator("#main-menu-link-current").hover();
          await page.locator("#site-content-megamenu.show").waitFor();
          const contentMegaMenuLayout = await page.evaluate(() => {
            const menu = document.querySelector("#site-content-megamenu");
            const platformMenu = document.querySelector("#site-megamenu");
            return {
              hidden: menu?.getAttribute("aria-hidden"),
              linkCount: menu?.querySelectorAll("a").length,
              primaryCount: menu?.querySelectorAll(
                ".megamenu-main-service > a",
              ).length,
              secondaryCount: menu?.querySelectorAll(
                ".megamenu-service-card-list a",
              ).length,
              platformOpen: platformMenu?.classList.contains("show"),
            };
          });
          if (
            contentMegaMenuLayout.hidden !== "false" ||
            contentMegaMenuLayout.linkCount !== 5 ||
            contentMegaMenuLayout.primaryCount !== 3 ||
            contentMegaMenuLayout.secondaryCount !== 2 ||
            contentMegaMenuLayout.platformOpen
          ) {
            throw new Error("content megamenu structure or state is invalid");
          }
          await page.keyboard.press("Escape");
        }
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

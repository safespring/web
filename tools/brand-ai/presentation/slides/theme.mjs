import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");

export const colors = {
  blue: "#195F8C",
  middleBlue: "#417DA5",
  clearBlue: "#3C9BCD",
  green: "#32CD32",
  webGreen: "#19F064",
  orange: "#FA690F",
  cloudBlue: "#E7EFF3",
  charcoal: "#323232",
  cloudWhite: "#FAFEFE",
  white: "#FFFFFF",
};

export const componentBackgrounds = {
  blue: "#E7EFF3",
  middleBlue: "#E7EFF3",
  clearBlue: "#E7EFF3",
  green: "#E7EFF3",
  webGreen: "#E7EFF3",
  orange: "#E7EFF3",
  charcoal: "#E7EFF3",
};

export const pairs = {
  blue: { bg: componentBackgrounds.blue, fg: colors.blue },
  middleBlue: { bg: componentBackgrounds.middleBlue, fg: colors.middleBlue },
  clearBlue: { bg: componentBackgrounds.clearBlue, fg: colors.clearBlue },
  green: { bg: componentBackgrounds.green, fg: colors.green },
  webGreen: { bg: componentBackgrounds.webGreen, fg: colors.webGreen },
  orange: { bg: componentBackgrounds.orange, fg: colors.orange },
  neutral: { bg: componentBackgrounds.charcoal, fg: colors.charcoal },
};

export const fonts = {
  heading: "Hind",
  body: "Montserrat",
  mono: "Safespring Mono",
};

export const logo = {
  blue: path.join(ROOT, "static/img/logos/safespring/png/safespring_logotype_blue_png.png"),
  white: path.join(ROOT, "static/img/logos/safespring/png/safespring_logotype_white_png.png"),
  symbolBlue: path.join(ROOT, "static/img/logos/safespring/png/safespring_symbol_blue_png.png"),
  symbolWhite: path.join(ROOT, "static/img/logos/safespring/png/safespring_symbol_white_png.png"),
  flag: path.join(ROOT, "static/brand/ai/assets/safespring-flag.png"),
};

export function background(ctx, slide, fill = colors.cloudWhite) {
  ctx.addShape(slide, {
    x: 0,
    y: 0,
    width: ctx.W,
    height: ctx.H,
    fill,
    line: ctx.line("#00000000", 0),
  });
}

export async function smallLogo(ctx, slide, variant = "blue") {
  await ctx.addImage(slide, {
    path: variant === "white" ? logo.white : logo.blue,
    x: 72,
    y: 48,
    width: 172,
    height: 42,
    fit: "contain",
    alt: "Safespring logo",
  });
}

export async function brandFlag(ctx, slide, x = 72, y = 0, height = 88) {
  await ctx.addImage(slide, {
    path: logo.flag,
    x,
    y,
    width: Math.round(height * 0.644),
    height,
    fit: "contain",
    alt: "Safespring flag",
  });
}

export function footer(ctx, slide, color = "#6A7B83") {
  ctx.addText(slide, {
    text: "Safespring AI Brand Kit",
    x: 72,
    y: 664,
    width: 280,
    height: 20,
    fontSize: 14,
    color,
    typeface: fonts.body,
  });
  ctx.addText(slide, {
    text: "safespring.com/brand/ai",
    x: 936,
    y: 664,
    width: 270,
    height: 20,
    fontSize: 14,
    color,
    typeface: fonts.mono,
    align: "right",
  });
}

export function label(ctx, slide, text, x, y, width, color = colors.clearBlue) {
  ctx.addText(slide, {
    text,
    x,
    y,
    width,
    height: 24,
    fontSize: 14,
    color,
    bold: true,
    typeface: fonts.body,
  });
}

export function title(ctx, slide, text, x, y, width, color = colors.blue, size = 64) {
  ctx.addText(slide, {
    text,
    x,
    y,
    width,
    height: size * 2,
    fontSize: size,
    color,
    typeface: fonts.heading,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

export function body(ctx, slide, text, x, y, width, height, color = colors.charcoal, size = 24) {
  ctx.addText(slide, {
    text,
    x,
    y,
    width,
    height,
    fontSize: size,
    color,
    typeface: fonts.body,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

export function componentBox(ctx, slide, pair, x, y, width, height) {
  ctx.addShape(slide, {
    geometry: "roundRect",
    x,
    y,
    width,
    height,
    fill: pair.bg,
    line: ctx.line("#C9DCE6", 1),
  });
}

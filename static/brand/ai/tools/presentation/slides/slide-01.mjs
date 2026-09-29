import { background, body, brandFlag, colors, fonts, logo, pairs } from "./theme.mjs";

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  background(ctx, slide, colors.cloudWhite);
  await brandFlag(ctx, slide);
  await ctx.addImage(slide, {
    path: logo.blue,
    x: 96,
    y: 286,
    width: 310,
    height: 126,
    fit: "contain",
    alt: "Safespring logo",
  });
  ctx.addShape(slide, {
    x: 548,
    y: 92,
    width: 2,
    height: 516,
    fill: colors.cloudBlue,
    line: ctx.line("#00000000", 0),
  });
  ctx.addText(slide, {
    text: "Presentation title",
    x: 612,
    y: 168,
    width: 560,
    height: 162,
    fontSize: 54,
    color: colors.blue,
    typeface: fonts.heading,
  });
  body(ctx, slide, "Subtitle or narrative claim goes here. Keep it specific, grounded, and evidence-led.", 616, 358, 500, 74, colors.charcoal, 20);
  ctx.addText(slide, {
    text: "NAME",
    x: 616,
    y: 492,
    width: 240,
    height: 22,
    fontSize: 15,
    color: colors.charcoal,
    bold: true,
    typeface: fonts.body,
  });
  ctx.addText(slide, {
    text: "Prepared for [audience]",
    x: 616,
    y: 518,
    width: 360,
    height: 24,
    fontSize: 16,
    color: "#6A7B83",
    typeface: fonts.body,
  });
  ctx.addText(slide, {
    text: "DATE",
    x: 616,
    y: 568,
    width: 120,
    height: 22,
    fontSize: 15,
    color: colors.charcoal,
    bold: true,
    typeface: fonts.body,
  });
  ctx.addText(slide, {
    text: "[date]",
    x: 616,
    y: 594,
    width: 160,
    height: 24,
    fontSize: 16,
    color: "#6A7B83",
    typeface: fonts.mono,
  });
  ctx.addShape(slide, {
    x: 96,
    y: 486,
    width: 310,
    height: 62,
    fill: pairs.blue.bg,
    line: ctx.line("#C9DCE6", 1),
  });
  body(ctx, slide, "Cloud-blue boxes only. Main colors are foreground colors.", 116, 505, 270, 28, colors.blue, 15);
  ctx.addShape(slide, {
    x: 96,
    y: 568,
    width: 310,
    height: 20,
    fill: colors.cloudBlue,
    line: ctx.line(colors.orange, 1),
  });
  return slide;
}

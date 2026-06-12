import { background, body, brandFlag, colors, fonts, pairs } from "./theme.mjs";

export async function slide06(presentation, ctx) {
  const slide = presentation.slides.add();
  background(ctx, slide, colors.cloudWhite);
  await brandFlag(ctx, slide);
  ctx.addText(slide, {
    text: "Closing thought or call to action",
    x: 116,
    y: 176,
    width: 760,
    height: 132,
    fontSize: 58,
    color: colors.blue,
    typeface: fonts.heading,
  });
  body(ctx, slide, "Use one clear action, one owner, and one date. Keep the last slide useful after it leaves the meeting.", 120, 340, 700, 72, "#52626A", 22);
  ctx.addShape(slide, { x: 120, y: 488, width: 430, height: 64, fill: pairs.orange.bg, line: ctx.line("#C9DCE6", 1) });
  body(ctx, slide, "safespring.com/brand/ai", 148, 508, 360, 28, pairs.orange.fg, 20);
  ctx.addShape(slide, { x: 120, y: 584, width: 650, height: 3, fill: colors.cloudBlue, line: ctx.line("#00000000", 0) });
  return slide;
}

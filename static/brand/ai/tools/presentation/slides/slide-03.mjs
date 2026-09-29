import { background, body, brandFlag, colors, fonts } from "./theme.mjs";

export async function slide03(presentation, ctx) {
  const slide = presentation.slides.add();
  background(ctx, slide, colors.cloudWhite);
  await brandFlag(ctx, slide);
  ctx.addText(slide, {
    text: "Section title",
    x: 150,
    y: 214,
    width: 820,
    height: 132,
    fontSize: 72,
    color: colors.clearBlue,
    typeface: fonts.heading,
  });
  body(ctx, slide, "Use section slides to reset the narrative and give the next chapter a clear job.", 154, 374, 650, 70, "#52626A", 24);
  ctx.addText(slide, {
    text: "01",
    x: 998,
    y: 252,
    width: 112,
    height: 70,
    fontSize: 52,
    color: colors.clearBlue,
    typeface: fonts.mono,
  });
  return slide;
}

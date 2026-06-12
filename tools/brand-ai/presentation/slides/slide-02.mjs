import { background, body, colors, componentBox, footer, label, pairs, smallLogo, title } from "./theme.mjs";

export async function slide02(presentation, ctx) {
  const slide = presentation.slides.add();
  background(ctx, slide);
  await smallLogo(ctx, slide);
  label(ctx, slide, "AGENDA", 72, 138, 240);
  title(ctx, slide, "Three-part story", 72, 170, 560, colors.blue, 58);
  const items = [
    [pairs.blue, "01", "Context", "What changed, why it matters, and what the audience needs to decide."],
    [pairs.clearBlue, "02", "Proof", "Architecture, evidence, requirements, or operating model that supports the claim."],
    [pairs.orange, "03", "Action", "Recommended next step, owner, timeline, and concrete decision point."],
  ];
  items.forEach(([pair, number, heading, text], index) => {
    const y = 348 + index * 92;
    componentBox(ctx, slide, pair, 72, y - 12, 1010, 74);
    ctx.addText(slide, {
      text: number,
      x: 96,
      y: y + 4,
      width: 56,
      height: 34,
      fontSize: 20,
      color: pair.fg,
      bold: true,
      typeface: "Safespring Mono",
    });
    ctx.addShape(slide, {
      x: 166,
      y: y + 1,
      width: 3,
      height: 44,
      fill: pair.fg,
      line: ctx.line("#00000000", 0),
    });
    body(ctx, slide, heading, 194, y, 230, 34, pair.fg, 25);
    body(ctx, slide, text, 442, y + 2, 586, 42, pair.fg, 16);
  });
  footer(ctx, slide);
  return slide;
}

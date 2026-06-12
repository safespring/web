import { background, body, brandFlag, colors, footer, label, pairs, title } from "./theme.mjs";

export async function slide05(presentation, ctx) {
  const slide = presentation.slides.add();
  background(ctx, slide);
  await brandFlag(ctx, slide);
  label(ctx, slide, "COMPARISON", 150, 130, 220);
  title(ctx, slide, "Use tables when the rows need comparison", 150, 164, 820, colors.clearBlue, 46);
  const x = 82;
  const y = 304;
  const widths = [270, 370, 370];
  const rows = [
    [pairs.blue, "Decision area", "Good Safespring treatment", "Avoid"],
    [pairs.middleBlue, "Security", "Specific controls, boundaries, and ownership.", "Generic lock icons or fear-based visuals."],
    [pairs.green, "Compliance", "Precise source-backed statements.", "Invented certifications or legal claims."],
    [pairs.orange, "Cloud", "Architecture, locations, and operational clarity.", "Abstract neon clouds or vague platform claims."],
  ];
  rows.forEach((row, rowIndex) => {
    const rowY = y + rowIndex * 62;
    let cursor = x;
    const pair = row[0];
    row.slice(1).forEach((text, colIndex) => {
      const fill = pair.bg;
      const textColor = pair.fg;
      ctx.addShape(slide, {
        x: cursor,
        y: rowY,
        width: widths[colIndex],
        height: 62,
        fill,
        line: ctx.line("#C9DCE6", 1),
      });
      body(ctx, slide, text, cursor + 16, rowY + 16, widths[colIndex] - 32, 38, textColor, rowIndex === 0 ? 16 : 14);
      cursor += widths[colIndex];
    });
  });
  footer(ctx, slide);
  return slide;
}

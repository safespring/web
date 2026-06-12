import { background, body, brandFlag, colors, componentBox, footer, label, pairs, title } from "./theme.mjs";

function node(ctx, slide, pair, x, y, width, heading, text) {
  componentBox(ctx, slide, pair, x, y, width, 136);
  ctx.addShape(slide, {
    x: x + 22,
    y: y + 20,
    width: 32,
    height: 32,
    fill: pair.fg,
    line: ctx.line("#00000000", 0),
  });
  body(ctx, slide, heading, x + 68, y + 17, width - 90, 48, pair.fg, 19);
  body(ctx, slide, text, x + 22, y + 76, width - 44, 42, pair.fg, 14);
}

export async function slide04(presentation, ctx) {
  const slide = presentation.slides.add();
  background(ctx, slide);
  await brandFlag(ctx, slide);
  label(ctx, slide, "ARCHITECTURE PATTERN", 150, 130, 270);
  title(ctx, slide, "Show real system relationships", 150, 164, 800, colors.clearBlue, 46);
  ctx.addShape(slide, {
    x: 62,
    y: 270,
    width: 1048,
    height: 274,
    fill: "#FAFEFE",
    line: ctx.line("#D7E5EB", 1),
  });
  node(ctx, slide, pairs.middleBlue, 92, 332, 270, "Customer workload", "Applications, datasets, and identity context.");
  node(ctx, slide, pairs.blue, 438, 300, 270, "Safespring cloud", "Compute, storage, backup, and network services.");
  node(ctx, slide, pairs.green, 784, 332, 270, "Operational controls", "Security, compliance, observability, and support.");
  ctx.addShape(slide, { x: 374, y: 394, width: 50, height: 3, fill: colors.clearBlue, line: ctx.line("#00000000", 0) });
  ctx.addShape(slide, { x: 720, y: 394, width: 50, height: 3, fill: colors.clearBlue, line: ctx.line("#00000000", 0) });
  ctx.addShape(slide, { x: 428, y: 390, width: 10, height: 10, fill: colors.orange, line: ctx.line("#00000000", 0) });
  ctx.addShape(slide, { x: 774, y: 390, width: 10, height: 10, fill: colors.orange, line: ctx.line("#00000000", 0) });
  ctx.addText(slide, {
    text: "Use cloud-blue backgrounds for every diagram node. Main colors are for text, icons, lines, and labels.",
    x: 94,
    y: 564,
    width: 820,
    height: 42,
    fontSize: 18,
    color: colors.blue,
    typeface: "Montserrat",
  });
  footer(ctx, slide);
  return slide;
}

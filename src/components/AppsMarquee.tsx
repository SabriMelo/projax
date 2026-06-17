import { Cube, Ruler, Buildings, Sun, PaintBrush, PenNib } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import type { CSSProperties } from "react";

const APPS: { name: string; Icon: Icon }[] = [
  { name: "AutoCAD", Icon: Ruler },
  { name: "Revit", Icon: Buildings },
  { name: "SketchUp", Icon: Cube },
  { name: "ArchiCAD", Icon: Buildings },
  { name: "Rhino", Icon: Cube },
  { name: "Lumion", Icon: Sun },
  { name: "Enscape", Icon: Sun },
  { name: "V-Ray", Icon: Sun },
  { name: "3ds Max", Icon: Cube },
  { name: "Photoshop", Icon: PaintBrush },
  { name: "Illustrator", Icon: PenNib },
];

const FADE: CSSProperties = {
  maskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
};

// Lives inside the hero now, on the warm dark field.
export default function AppsMarquee() {
  // Two copies so the -50% shift loops seamlessly
  const items = [...APPS, ...APPS];

  return (
    <div className="relative z-10 pb-7 pt-2">
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
        Gestão integrada às ferramentas que o seu escritório já usa
      </p>
      <div className="relative overflow-hidden" style={FADE}>
        <div className="animate-marquee flex w-max">
          {items.map((app, i) => {
            const Glyph = app.Icon;
            return (
              <div
                key={i}
                className="mr-12 flex shrink-0 items-center gap-2 text-neutral-300"
              >
                <Glyph size={22} weight="duotone" className="text-clay-soft" />
                <span className="whitespace-nowrap text-lg font-medium tracking-tight">
                  {app.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

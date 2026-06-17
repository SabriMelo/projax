import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";

type IconProps = { className?: string };

/* Kanban — three square cards drift laterally through the stages, looping. */
export function KanbanIcon({ className = "h-6 w-6" }: IconProps) {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      const squares = gsap.utils.toArray<SVGRectElement>(".kb-sq");
      const step = 7;
      const total = step * squares.length; // wrap span
      squares.forEach((sq, i) => {
        gsap.set(sq, { x: i * step });
        gsap.to(sq, {
          x: `+=${total}`,
          duration: 3.6,
          ease: "none",
          repeat: -1,
          modifiers: { x: gsap.utils.unitize(gsap.utils.wrap(0, total)) },
        });
      });
    },
    { scope: ref },
  );
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${className} overflow-hidden`}
      aria-hidden
    >
      <rect className="kb-sq" x="2" y="9.5" width="5" height="5" rx="1.3" />
      <rect className="kb-sq" x="2" y="9.5" width="5" height="5" rx="1.3" />
      <rect className="kb-sq" x="2" y="9.5" width="5" height="5" rx="1.3" />
    </svg>
  );
}

// Pie sector from the centre, starting at 12 o'clock, sweeping clockwise.
function sectorPath(r: number, sweepDeg: number) {
  const a = ((sweepDeg - 90) * Math.PI) / 180;
  const x = 12 + r * Math.cos(a);
  const y = 12 + r * Math.sin(a);
  const large = sweepDeg > 180 ? 1 : 0;
  return `M12,12L12,${12 - r}A${r},${r} 0 ${large} 1 ${x.toFixed(2)},${y.toFixed(2)}Z`;
}

/* Clock — a sector under the hand fills 2, 3 or 4 of 5 parts (never full),
   then vanishes and the loop continues. */
export function ClockIcon({ className = "h-6 w-6" }: IconProps) {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg) return;
      const sector = svg.querySelector<SVGPathElement>(".clk-sector");
      const hand = svg.querySelector<SVGLineElement>(".clk-hand");
      if (!sector || !hand) return;

      const R = 6.5;
      const parts = [2, 3, 4]; // never the full 5
      let tl: ReturnType<typeof gsap.timeline> | null = null;

      const run = () => {
        const sweep = parts[Math.floor(Math.random() * parts.length)] * 72;
        const proxy = { deg: 0 };
        sector.setAttribute("d", sectorPath(R, 0));
        gsap.set(sector, { opacity: 0.28 });
        gsap.set(hand, { rotation: 0, svgOrigin: "12 12" });

        tl = gsap.timeline({ onComplete: run });
        tl.to(proxy, {
          deg: sweep,
          duration: 0.9,
          ease: "power2.out",
          onUpdate: () => {
            sector.setAttribute("d", sectorPath(R, proxy.deg));
            gsap.set(hand, { rotation: proxy.deg, svgOrigin: "12 12" });
          },
        })
          .to(sector, { opacity: 0, duration: 0.4, ease: "power1.in" }, "+=0.6")
          .to(
            hand,
            { rotation: 0, svgOrigin: "12 12", duration: 0.4, ease: "power1.inOut" },
            "<",
          );
      };

      run();
      return () => tl?.kill();
    },
    { scope: ref },
  );

  return (
    <svg ref={ref} viewBox="0 0 24 24" className={className} aria-hidden>
      {/* Filled sector, sitting under the hand */}
      <path className="clk-sector" fill="currentColor" opacity="0" />
      {/* Face */}
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Five-part division ticks */}
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.4">
        <line x1="12" y1="3.5" x2="12" y2="7" />
        <line x1="12" y1="3.5" x2="12" y2="7" transform="rotate(72 12 12)" />
        <line x1="12" y1="3.5" x2="12" y2="7" transform="rotate(144 12 12)" />
        <line x1="12" y1="3.5" x2="12" y2="7" transform="rotate(216 12 12)" />
        <line x1="12" y1="3.5" x2="12" y2="7" transform="rotate(288 12 12)" />
      </g>
      {/* Hand */}
      <line
        className="clk-hand"
        x1="12"
        y1="12"
        x2="12"
        y2="5.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Centre */}
      <circle cx="12" cy="12" r="1.1" fill="currentColor" />
    </svg>
  );
}

/* Team — the figures fade in and out, staggered from the center. */
export function UsersIcon({ className = "h-6 w-6" }: IconProps) {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      gsap.to(".usr", {
        opacity: 0.22,
        duration: 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.3, from: "center" },
      });
    },
    { scope: ref },
  );
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <g className="usr">
        <circle cx="6.4" cy="9.6" r="2.2" />
        <path d="M2.4 18 a4 4 0 0 1 8 0 Z" />
      </g>
      <g className="usr">
        <circle cx="17.6" cy="9.6" r="2.2" />
        <path d="M13.6 18 a4 4 0 0 1 8 0 Z" />
      </g>
      <g className="usr">
        <circle cx="12" cy="8.4" r="2.7" />
        <path d="M6.8 19 a5.2 5.2 0 0 1 10.4 0 Z" />
      </g>
    </svg>
  );
}

// Four-point sparkle (star) centred at cx,cy with outer radius r.
function sparklePath(cx: number, cy: number, r: number) {
  const i = r * 0.34;
  return `M${cx},${cy - r}L${cx + i},${cy - i}L${cx + r},${cy}L${cx + i},${cy + i}L${cx},${cy + r}L${cx - i},${cy + i}L${cx - r},${cy}L${cx - i},${cy - i}Z`;
}

/* IA — the sparkles fade out and back one by one, like a loading. */
export function AiSparkleIcon({ className = "h-6 w-6" }: IconProps) {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      gsap.to(".ai-star", {
        opacity: 0.16,
        duration: 0.32,
        ease: "sine.inOut",
        stagger: { each: 0.2, repeat: -1, yoyo: true },
      });
    },
    { scope: ref },
  );
  return (
    <svg ref={ref} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path className="ai-star" d={sparklePath(10.5, 11, 6)} />
      <path className="ai-star" d={sparklePath(18.5, 6, 3)} />
      <path className="ai-star" d={sparklePath(18, 16.5, 2.4)} />
    </svg>
  );
}

/* Acabamentos — stacked horizontal drawers pulled up one by one, in a loop. */
export function DrawersIcon({ className = "h-6 w-6" }: IconProps) {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      gsap.to(".drawer", {
        y: -2.2,
        duration: 0.4,
        ease: "power2.out",
        stagger: { each: 0.22, repeat: -1, yoyo: true, repeatDelay: 0.5 },
      });
    },
    { scope: ref },
  );
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      {[3.2, 8.4, 13.6, 18.8].map((y, i) => (
        <g className="drawer" key={i}>
          <rect x="4" y={y} width="16" height="3.8" rx="1.1" />
          <line x1="10.4" y1={y + 1.9} x2="13.6" y2={y + 1.9} />
        </g>
      ))}
    </svg>
  );
}

import { useRef } from "react";
import type { CSSProperties } from "react";
import { gsap, useGSAP } from "../lib/gsap";

// Fade the drawing out toward the top, like a vanishing technical sheet.
const FADE: CSSProperties = {
  maskImage:
    "linear-gradient(to top, black 0%, black 30%, transparent 82%)",
  WebkitMaskImage:
    "linear-gradient(to top, black 0%, black 30%, transparent 82%)",
};

export default function CTABlueprint() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Marching-ants flow along every stroke
      gsap.to(".bp", {
        strokeDashoffset: -24,
        duration: 2.4,
        ease: "none",
        repeat: -1,
      });
      // Slow breathing fade of the whole sheet
      gsap.fromTo(
        ref.current,
        { opacity: 0.22 },
        { opacity: 0.45, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1 },
      );
      // Parallax: the sheet drifts vertically as the section scrolls through
      gsap.fromTo(
        ref.current,
        { yPercent: 10 },
        {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current?.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -bottom-24 z-0 text-clay"
      style={FADE}
    >
      <svg
        viewBox="0 0 1200 340"
        preserveAspectRatio="xMidYMax slice"
        className="h-[420px] w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="5 5"
      >
        {/* Ground */}
        <line className="bp" x1="0" y1="320" x2="1200" y2="320" />

        {/* Building 1 */}
        <rect className="bp" x="80" y="150" width="170" height="170" />
        <line className="bp" x1="80" y1="195" x2="250" y2="195" />
        <line className="bp" x1="80" y1="240" x2="250" y2="240" />
        <line className="bp" x1="80" y1="285" x2="250" y2="285" />
        <line className="bp" x1="137" y1="150" x2="137" y2="320" />
        <line className="bp" x1="193" y1="150" x2="193" y2="320" />

        {/* Building 2 — tall */}
        <rect className="bp" x="300" y="80" width="140" height="240" />
        <line className="bp" x1="300" y1="130" x2="440" y2="130" />
        <line className="bp" x1="300" y1="180" x2="440" y2="180" />
        <line className="bp" x1="300" y1="230" x2="440" y2="230" />
        <line className="bp" x1="300" y1="280" x2="440" y2="280" />
        <line className="bp" x1="370" y1="80" x2="370" y2="320" />

        {/* House with pitched roof */}
        <path className="bp" d="M510 320 L510 190 L610 120 L710 190 L710 320" />
        <path className="bp" d="M510 190 L610 120 L710 190" />
        <rect className="bp" x="585" y="250" width="50" height="70" />
        <rect className="bp" x="545" y="210" width="36" height="34" />
        <rect className="bp" x="639" y="210" width="36" height="34" />

        {/* Building 3 */}
        <rect className="bp" x="770" y="170" width="210" height="150" />
        <line className="bp" x1="770" y1="220" x2="980" y2="220" />
        <line className="bp" x1="770" y1="270" x2="980" y2="270" />
        <line className="bp" x1="840" y1="170" x2="840" y2="320" />
        <line className="bp" x1="910" y1="170" x2="910" y2="320" />

        {/* Building 4 — thin tower */}
        <rect className="bp" x="1030" y="110" width="100" height="210" />
        <line className="bp" x1="1030" y1="160" x2="1130" y2="160" />
        <line className="bp" x1="1030" y1="210" x2="1130" y2="210" />
        <line className="bp" x1="1030" y1="260" x2="1130" y2="260" />

        {/* Dimension line with arrowheads — technical-drawing detail */}
        <line className="bp" x1="300" y1="55" x2="440" y2="55" />
        <path className="bp" d="M308 50 L300 55 L308 60" />
        <path className="bp" d="M432 50 L440 55 L432 60" />
        <line className="bp" x1="300" y1="48" x2="300" y2="62" />
        <line className="bp" x1="440" y1="48" x2="440" y2="62" />
      </svg>
    </div>
  );
}

import { useRef } from "react";
import type { CSSProperties } from "react";
import { gsap, useGSAP } from "../lib/gsap";

// Gradient that fades the strokes out toward the corners (kept gentle so the
// cross still reads all the way to the edges).
const FADE: CSSProperties = {
  maskImage: "radial-gradient(82% 86% at 50% 50%, #000 46%, transparent 96%)",
  WebkitMaskImage: "radial-gradient(82% 86% at 50% 50%, #000 46%, transparent 96%)",
};

const C_MAIN = 2 * Math.PI * 340; // centre circle circumference
const C_SIDE = 2 * Math.PI * 210; // side circles circumference

export default function HeroIntro() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      gsap.set(".intro-square", { scale: 0, opacity: 0, transformOrigin: "center" });

      // Forms gently and stays — soft, slow easing.
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      tl.to(".intro-circle", { strokeDashoffset: 0, duration: 2.4, stagger: 0.3 }, 0)
        // cross draws out from the centre to the four edges
        .to(".intro-cross", { strokeDashoffset: 0, duration: 1.8 }, 1.4)
        .to(
          ".intro-square",
          { scale: 1, opacity: 0.7, duration: 0.7, ease: "power2.out", stagger: 0.15 },
          2.0,
        );
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden
      style={FADE}
    >
      {/* Cross — four half-lines drawing out from the centre to each edge */}
      <line className="intro-cross" x1="800" y1="450" x2="0" y2="450" stroke="#fff" strokeOpacity="0.26" strokeWidth="1" strokeDasharray="800" strokeDashoffset="800" />
      <line className="intro-cross" x1="800" y1="450" x2="1600" y2="450" stroke="#fff" strokeOpacity="0.26" strokeWidth="1" strokeDasharray="800" strokeDashoffset="800" />
      <line className="intro-cross" x1="800" y1="450" x2="800" y2="0" stroke="#fff" strokeOpacity="0.26" strokeWidth="1" strokeDasharray="450" strokeDashoffset="450" />
      <line className="intro-cross" x1="800" y1="450" x2="800" y2="900" stroke="#fff" strokeOpacity="0.26" strokeWidth="1" strokeDasharray="450" strokeDashoffset="450" />

      {/* Three complete circles — the middle one larger */}
      <circle className="intro-circle" cx="800" cy="450" r="340" stroke="#fff" strokeOpacity="0.5" strokeWidth="1" strokeDasharray={C_MAIN} strokeDashoffset={C_MAIN} />
      <circle className="intro-circle" cx="250" cy="450" r="210" stroke="#fff" strokeOpacity="0.4" strokeWidth="1" strokeDasharray={C_SIDE} strokeDashoffset={C_SIDE} />
      <circle className="intro-circle" cx="1350" cy="450" r="210" stroke="#fff" strokeOpacity="0.4" strokeWidth="1" strokeDasharray={C_SIDE} strokeDashoffset={C_SIDE} />

      {/* Small squares at the centre circle's two contact points */}
      <rect className="intro-square" x="453" y="443" width="14" height="14" fill="#fff" />
      <rect className="intro-square" x="1133" y="443" width="14" height="14" fill="#fff" />
    </svg>
  );
}

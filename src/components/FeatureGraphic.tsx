import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";

type Variant = "bars" | "line" | "progress" | "skeleton" | "templates";

const BAR_H = [38, 22, 46, 30, 50, 26, 42];
const PROG = [0.82, 0.55, 0.7];
const SK_ROWS = [14, 32, 50];
const TPL_ROWS = [12, 32, 52];

export default function FeatureGraphic({
  variant,
  className = "",
}: {
  variant: Variant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (variant === "bars") {
        gsap.to(".fg-bar", {
          scaleY: 0.45,
          transformOrigin: "center bottom",
          duration: 0.9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.12,
        });
      } else if (variant === "line") {
        gsap.fromTo(
          ".fg-line",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.7,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.5,
          },
        );
      } else if (variant === "progress") {
        gsap.fromTo(
          ".fg-fill",
          { scaleX: 0 },
          {
            scaleX: (i: number) => PROG[i],
            transformOrigin: "left center",
            duration: 1.2,
            ease: "power2.out",
            stagger: 0.14,
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.7,
          },
        );
      } else if (variant === "skeleton") {
        // Fields being filled by AI, one by one
        gsap.fromTo(
          ".sk-fill",
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 0.8,
            ease: "power1.inOut",
            stagger: 0.3,
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.5,
          },
        );
        // Spinning dots loader
        gsap.to(".ai-spin", {
          rotation: 360,
          svgOrigin: "174 32",
          duration: 1.1,
          ease: "none",
          repeat: -1,
        });
      } else if (variant === "templates") {
        // Checkboxes ticking, one by one
        gsap.fromTo(
          ".tpl-fill",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            ease: "power1.inOut",
            stagger: 0.32,
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.7,
          },
        );
        gsap.fromTo(
          ".tpl-tick",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 0.3,
            ease: "power1.inOut",
            stagger: 0.32,
            yoyo: true,
            repeat: -1,
            repeatDelay: 0.7,
          },
        );
      }
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className={`flex items-center justify-center overflow-hidden rounded-lg bg-clay/5 text-clay ${className}`}
    >
      {variant === "bars" && (
        <svg viewBox="0 0 200 64" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
          {BAR_H.map((h, i) => (
            <rect key={i} className="fg-bar" x={8 + i * 27} y={58 - h} width="16" height={h} rx="2.5" fill="currentColor" />
          ))}
        </svg>
      )}

      {variant === "line" && (
        <svg viewBox="0 0 200 64" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
          <path d="M10,50 L42,34 L74,42 L106,20 L138,28 L170,12 L192,18" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="2" />
          <path className="fg-line" d="M10,50 L42,34 L74,42 L106,20 L138,28 L170,12 L192,18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1} />
        </svg>
      )}

      {variant === "progress" && (
        <svg viewBox="0 0 200 64" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
          {[16, 32, 48].map((y, i) => (
            <g key={i}>
              <rect x="10" y={y - 4} width="180" height="7" rx="3.5" fill="currentColor" opacity="0.14" />
              <rect className="fg-fill" x="10" y={y - 4} width="180" height="7" rx="3.5" fill="currentColor" />
            </g>
          ))}
        </svg>
      )}

      {variant === "skeleton" && (
        <svg viewBox="0 0 200 64" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
          {SK_ROWS.map((y, i) => (
            <g key={i}>
              <rect x="10" y={y - 5} width="10" height="10" rx="2.5" fill="currentColor" opacity="0.16" />
              <rect x="26" y={y - 3.5} width="118" height="7" rx="3.5" fill="currentColor" opacity="0.1" />
              <rect className="sk-fill" x="26" y={y - 3.5} width="118" height="7" rx="3.5" fill="currentColor" />
            </g>
          ))}
          <g className="ai-spin">
            {Array.from({ length: 8 }).map((_, k) => {
              const a = (k / 8) * Math.PI * 2;
              return (
                <circle
                  key={k}
                  cx={174 + 8 * Math.cos(a)}
                  cy={32 + 8 * Math.sin(a)}
                  r="1.7"
                  fill="currentColor"
                  opacity={1 - k * 0.1}
                />
              );
            })}
          </g>
        </svg>
      )}

      {variant === "templates" && (
        <svg viewBox="0 0 200 64" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
          {TPL_ROWS.map((y, i) => (
            <g key={i}>
              <rect x="8" y={y - 8} width="184" height="16" rx="4" fill="currentColor" opacity="0.06" />
              <rect x="14" y={y - 4.5} width="9" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.5" />
              <rect className="tpl-fill" x="14" y={y - 4.5} width="9" height="9" rx="2" fill="currentColor" />
              <path
                className="tpl-tick"
                d={`M16.5,${y} l2,2.2 l3.4,-4.4`}
                fill="none"
                stroke="#fdf3ea"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
              />
              <rect x="30" y={y - 2.5} width="130" height="5" rx="2.5" fill="currentColor" opacity="0.13" />
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}

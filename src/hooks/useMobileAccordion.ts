import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";

/*
  Mobile-only scroll accordion. Within `scope`, every element matching
  `selector` gets `.is-open` toggled while it crosses the viewport centre, so it
  expands on the way in and retracts on the way out. Disabled (and cleaned up)
  above the `md` breakpoint, where the section keeps its desktop layout.
*/
export function useMobileAccordion(
  scope: RefObject<HTMLElement | null>,
  selector: string,
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => {
        const items = gsap.utils.toArray<HTMLElement>(selector, scope.current);
        const triggers = items.map((item) =>
          ScrollTrigger.create({
            trigger: item,
            start: "top 70%",
            end: "bottom 30%",
            onToggle: (self) => item.classList.toggle("is-open", self.isActive),
          }),
        );
        return () => {
          triggers.forEach((t) => t.kill());
          items.forEach((i) => i.classList.remove("is-open"));
        };
      });
      return () => mm.revert();
    },
    { scope },
  );
}

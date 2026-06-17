/*
  Central GSAP registration.
  Import { gsap, ScrollTrigger, Flip } from "@/lib/gsap" anywhere so plugins are
  registered exactly once. Use the useGSAP hook for React-scoped animations.
*/
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, Flip, Draggable, useGSAP);

export { gsap, ScrollTrigger, Flip, Draggable, useGSAP };

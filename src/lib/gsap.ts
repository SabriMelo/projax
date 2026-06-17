/*
  Central GSAP registration.
  Import { gsap, ScrollTrigger, Draggable } from "@/lib/gsap" anywhere so plugins
  are registered exactly once. Use the useGSAP hook for React-scoped animations.
*/
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, Draggable, useGSAP);

export { gsap, ScrollTrigger, Draggable, useGSAP };

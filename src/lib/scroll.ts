import type Lenis from "lenis";

/*
  Shared handle to the active Lenis instance, so isolated interactions (like
  dragging a hero task) can pause/resume smooth scrolling without prop drilling.
*/
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function lockScroll() {
  instance?.stop();
}

export function unlockScroll() {
  instance?.start();
}

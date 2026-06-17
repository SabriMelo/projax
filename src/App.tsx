import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, useGSAP, ScrollTrigger } from "./lib/gsap";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AppsMarquee from "./components/AppsMarquee";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import HowItWorks from "./sections/HowItWorks";
import Pricing from "./sections/Pricing";
import FAQ from "./sections/FAQ";
import CTA from "./sections/CTA";

export default function App() {
  const root = useRef<HTMLElement>(null);

  // Smooth (inertial) scrolling, driven by GSAP's ticker and kept in sync with
  // ScrollTrigger so the scrubbed/pinned animations stay accurate.
  useEffect(() => {
    // anchors: smooth-scroll in-page hash links, offset for the sticky nav
    const lenis = new Lenis({ anchors: { offset: -80 } });
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(onTick);
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP defaults
      lenis.destroy();
    };
  }, []);

  // Subtle fade-up reveal for anything tagged [data-reveal].
  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      items.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 26,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <main ref={root} className="w-full max-w-full overflow-x-hidden">
      <Nav />
      <Hero />
      <AppsMarquee />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

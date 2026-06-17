import { lazy, Suspense, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, useGSAP, ScrollTrigger } from "./lib/gsap";
import { setLenis } from "./lib/scroll";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import HowItWorks from "./sections/HowItWorks";
import Pricing from "./sections/Pricing";
import FAQ from "./sections/FAQ";
import CTA from "./sections/CTA";

// Secondary pages are split out of the landing bundle.
const Sobre = lazy(() => import("./pages/Sobre"));
const TimerDesktop = lazy(() => import("./pages/TimerDesktop"));
const AppMobile = lazy(() => import("./pages/AppMobile"));
const Ajuda = lazy(() => import("./pages/Ajuda"));
const Documentacao = lazy(() => import("./pages/Documentacao"));
const Status = lazy(() => import("./pages/Status"));
const Seguranca = lazy(() => import("./pages/Seguranca"));

function Landing() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}

export default function App() {
  const root = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname } = useLocation();

  // Smooth (inertial) scrolling, driven by GSAP's ticker and kept in sync with
  // ScrollTrigger so the scrubbed/pinned animations stay accurate.
  useEffect(() => {
    const lenis = new Lenis({ anchors: { offset: -80 } });
    lenisRef.current = lenis;
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(onTick);
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP defaults
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Start each route at the top.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  // Subtle fade-up reveal for anything tagged [data-reveal] (re-run per route).
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
    { scope: root, dependencies: [pathname] },
  );

  return (
    <main ref={root} className="w-full max-w-full overflow-x-hidden">
      <Nav />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/timer-desktop" element={<TimerDesktop />} />
          <Route path="/app-mobile" element={<AppMobile />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="/documentacao" element={<Documentacao />} />
          <Route path="/status" element={<Status />} />
          <Route path="/seguranca" element={<Seguranca />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </Suspense>
      <Footer />
    </main>
  );
}

import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { gsap, useGSAP } from "../lib/gsap";
import ProjectTasksBoard from "../components/ProjectTasksBoard";
import HeroIntro from "../components/HeroIntro";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      // Reveal the copy by importance — the headline leads, the rest follows.
      // Each line resolves out of a soft blur as it settles into place.
      gsap.set([".hero-rv-title", ".hero-rv"], {
        opacity: 0,
        y: 22,
        filter: "blur(8px)",
      });
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(
          ".hero-rv-title",
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
          0,
        )
        .to(
          ".hero-rv",
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.12 },
          0.25,
        );

      // Orange flare drifts horizontally only
      gsap.to(".hero-flare", {
        x: 70,
        duration: 7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Arrow: swipe right + fade out, snap back left (invisible), ease back in,
      // then breathe before repeating.
      if (arrowRef.current) {
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.9 })
          .to(arrowRef.current, { x: 10, opacity: 0, duration: 0.5, ease: "power2.in" })
          .set(arrowRef.current, { x: -9 })
          .to(arrowRef.current, { x: 0, opacity: 1, duration: 0.55, ease: "power3.out" });
      }
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative isolate w-full overflow-hidden"
    >
      {/* Background — only on the hero: a deep warm field so the white blueprint
          reads, with a soft optical flare glowing from the bottom. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #3d1c0e 0%, #5a3119 55%, #311810 100%)",
        }}
      />
      {/* Faded architecture photo, blended into the warm field (swap the seed
          URL for a real project shot anytime). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center opacity-50 mix-blend-luminosity"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1920&q=70)",
          maskImage: "linear-gradient(to right, transparent 6%, #000 55%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 6%, #000 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-3/4"
        style={{
          background:
            "radial-gradient(120% 85% at 50% 125%, rgba(224,138,93,0.30) 0%, rgba(224,138,93,0.10) 35%, transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="hero-flare pointer-events-none absolute -bottom-24 left-[calc(50%_-_360px)] z-0 h-[420px] w-[720px] rounded-full blur-[130px]"
        style={{ background: "rgba(224,138,93,0.22)" }}
      />
      <div
        aria-hidden
        className="hero-flare pointer-events-none absolute -bottom-12 left-[calc(38%_-_200px)] z-0 h-[240px] w-[400px] rounded-full blur-[110px]"
        style={{ background: "rgba(247,190,140,0.22)" }}
      />

      {/* Blueprint lines that form and stay behind the content */}
      <HeroIntro />

      {/* Content */}
      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1800px] items-center gap-8 px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-28 lg:grid-cols-[1fr_1fr] lg:gap-6 lg:px-16">
        {/* Copy + actions */}
        <div>
          <p className="hero-rv mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-clay-soft">
            Para escritórios de arquitetura
          </p>
          <h1 className="hero-rv-title mb-5 text-[clamp(1.75rem,5.4vw,3rem)] font-bold leading-[1.04] tracking-tight text-[#f7f3ec]">
            Gerencie projetos,
            <br />
            do briefing à entrega.
          </h1>
          <p className="hero-rv mb-8 max-w-md text-lg text-neutral-300">
            Projetos, obras, financeiro e equipe em um só lugar. O Projax cuida
            da gestão do escritório para você focar no que importa: projetar.
          </p>

          <div className="hero-rv flex flex-col gap-3 sm:flex-row">
            {/* Left: secondary (clean, no glass) */}
            <a
              href="#recursos"
              className="grad-border grad-border-glass inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-medium text-neutral-100 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5"
            >
              Ver recursos
            </a>
            {/* Right: primary with swiping arrow */}
            <a
              href="#precos"
              className="grad-border grad-border-clay-solid inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Começar agora
              <ArrowRight ref={arrowRef} size={17} weight="bold" />
            </a>
          </div>

          <p className="hero-rv mt-5 text-xs text-neutral-400">
            14 dias grátis · sem cartão de crédito
          </p>
        </div>

        {/* Simulated Projax app — tasks leap into "Concluído", once */}
        <ProjectTasksBoard />
      </div>
    </section>
  );
}

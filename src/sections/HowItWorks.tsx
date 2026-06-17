import { useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import { useMobileAccordion } from "../hooks/useMobileAccordion";

const STEPS: {
  n: string;
  title: string;
  body: string;
  photo: string;
  zoom?: boolean;
}[] = [
  {
    n: "01",
    title: "Crie seu projeto",
    body: "Cadastre o cliente, defina as fases e monte o quadro do projeto em minutos.",
    photo: "/steps/crie.webp",
    zoom: true,
  },
  {
    n: "02",
    title: "Organize as tarefas",
    body: "Atribua responsáveis, prazos e arraste os cartões conforme o trabalho avança.",
    photo: "/steps/organize.webp",
  },
  {
    n: "03",
    title: "Acompanhe e entregue",
    body: "Veja horas, progresso e mantenha o cliente informado até a entrega final.",
    photo: "/steps/acompanhe.webp",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  useMobileAccordion(ref, "[data-acc-item]");

  return (
    <section
      ref={ref}
      id="como"
      className="tech-grid border-t border-dashed border-clay/15 px-6 py-14 md:px-10 md:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        <SectionHeading eyebrow="Como funciona" title="Comece em três passos." />

        {/* Desktop: hover expands a step. Mobile: it expands as it scrolls
            through the viewport centre and retracts on the way out. */}
        <div className="mt-12 flex flex-col gap-3 md:flex-row">
          {STEPS.map((step) => (
            <div
              key={step.n}
              data-acc-item
              className="m-acc step-panel group relative overflow-hidden rounded-2xl bg-[#ece6db] transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-80 md:grow md:basis-0 md:hover:grow-[2.4]"
            >
              {/* Photo — fades in on hover (desktop) / on open (mobile) */}
              <div
                className="step-photo absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                style={{
                  backgroundImage: `url(${step.photo})`,
                  ...(step.zoom ? { backgroundSize: "150%" } : {}),
                }}
              />
              {/* Scrim so the text stays legible once the photo shows */}
              <div className="step-scrim absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* White circle, tucked into the top-left corner */}
              <span className="absolute left-3 top-3 z-10 h-3 w-3 rounded-full bg-white ring-2 ring-black/10" />

              <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <span className="step-text font-serif text-6xl leading-none text-clay transition-colors delay-100 duration-500 group-hover:text-white md:text-7xl">
                  {step.n}
                </span>
                <h3 className="step-text mt-4 text-lg font-semibold tracking-tight text-ink transition-colors delay-100 duration-500 group-hover:text-white">
                  {step.title}
                </h3>
                {/* Body — collapsible on mobile */}
                <div className="m-acc-body">
                  <div className="m-acc-inner">
                    <p className="step-text mt-2 max-w-sm text-sm text-neutral-600 transition-colors delay-100 duration-500 group-hover:text-white/85">
                      {step.body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from "@phosphor-icons/react";
import CTABlueprint from "../components/CTABlueprint";

export default function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-dashed border-clay/15 px-6 py-16 text-center md:px-10 md:py-24 lg:px-16">
      <CTABlueprint />

      <div className="relative z-10 mx-auto max-w-2xl">
        <p
          data-reveal
          className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-clay"
        >
          Para escritórios de arquitetura
        </p>
        <h2
          data-reveal
          className="mb-5 font-serif text-4xl tracking-tight text-ink md:text-5xl"
        >
          Pronto para organizar seu escritório?
        </h2>
        <p data-reveal className="mx-auto mb-10 max-w-md text-lg text-neutral-600">
          Junte-se a centenas de arquitetos que já gerenciam seus projetos com o
          Projax.
        </p>

        <div data-reveal className="relative inline-block">
          {/* Dashed line with arrow, pointing at the call to action */}
          <svg
            aria-hidden
            className="absolute -left-24 -top-10 hidden h-20 w-24 text-clay md:block"
            viewBox="0 0 96 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path
              d="M4 8 C 40 6, 78 18, 86 54"
              strokeDasharray="5 5"
              strokeLinecap="round"
            />
            <path
              d="M76 48 L87 56 L90 43"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <a
            href="#precos"
            className="grad-border grad-border-clay-solid inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3 text-base font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            Criar conta grátis
            <ArrowRight size={17} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
}

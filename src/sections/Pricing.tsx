import { useState } from "react";
import type { CSSProperties } from "react";
import { Check } from "@phosphor-icons/react";

type Plan = {
  name: string;
  audience: string;
  monthly: number | null;
  annual: number | null;
  custom?: string;
  features: string[];
  popular?: boolean;
  cta: string;
};

const PLANS: Plan[] = [
  {
    name: "Free",
    audience: "Para experimentar e tocar o primeiro projeto.",
    monthly: 0,
    annual: 0,
    features: [
      "1 usuário",
      "Até 10 projetos",
      "Até 5 clientes",
      "5 GB de armazenamento",
      "Gestão de projetos na web",
    ],
    cta: "Criar conta grátis",
  },
  {
    name: "Studio",
    audience: "Para o escritório que já roda vários projetos.",
    monthly: 55,
    annual: 46,
    popular: true,
    features: [
      "Até 5 usuários",
      "Até 30 projetos · 20 clientes",
      "50 GB de armazenamento",
      "Financeiro e cobranças (Asaas)",
      "Portal do cliente",
      "Assistente de IA (500k tokens/mês)",
      "Timer desktop",
      "Suporte por e-mail",
    ],
    cta: "Assinar Studio",
  },
  {
    name: "Business",
    audience: "Para escritórios em crescimento e equipes maiores.",
    monthly: 85,
    annual: 71,
    features: [
      "Até 15 usuários",
      "Projetos e clientes ilimitados",
      "200 GB de armazenamento",
      "Financeiro e cobranças (Asaas)",
      "Portal do cliente",
      "Assistente de IA (2M tokens/mês)",
      "Timer desktop",
      "Relatórios avançados",
      "Suporte prioritário",
    ],
    cta: "Assinar Business",
  },
  {
    name: "Enterprise",
    audience: "Para grandes operações com necessidades sob medida.",
    monthly: null,
    annual: null,
    custom: "Sob consulta",
    features: [
      "Usuários ilimitados",
      "Armazenamento ilimitado",
      "IA ilimitada",
      "Tudo do Business",
      "SSO e segurança avançada",
      "Onboarding dedicado",
      "Gerente de conta",
      "SLA garantido",
    ],
    cta: "Falar com vendas",
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<"mensal" | "anual">("mensal");

  return (
    <section
      id="precos"
      className="tech-grid border-y border-dashed border-clay/15 bg-white px-6 py-14 md:px-10 md:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        {/* Heading */}
        <p
          data-reveal
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-clay"
        >
          Planos
        </p>
        <h2
          data-reveal
          className="max-w-3xl font-serif text-4xl tracking-tight text-ink md:text-5xl"
        >
          Comece grátis. Cresça quando o escritório crescer.
        </h2>
        <p data-reveal className="mt-4 max-w-md text-lg text-neutral-600">
          Sem cartão para começar. Mude de plano a qualquer momento.
        </p>

        {/* Billing toggle */}
        <div data-reveal className="mt-8 flex items-center gap-3">
          <div
            className="grad-border inline-flex rounded-full p-1 text-sm"
            style={{ "--gb-bg": "#ffffff" } as CSSProperties}
          >
            <button
              type="button"
              onClick={() => setBilling("mensal")}
              className={`rounded-full px-4 py-1.5 transition-colors ${
                billing === "mensal"
                  ? "bg-clay font-medium text-white"
                  : "text-neutral-600 hover:text-ink"
              }`}
            >
              Mensal
            </button>
            <button
              type="button"
              onClick={() => setBilling("anual")}
              className={`rounded-full px-4 py-1.5 transition-colors ${
                billing === "anual"
                  ? "bg-clay font-medium text-white"
                  : "text-neutral-600 hover:text-ink"
              }`}
            >
              Anual
            </button>
          </div>
          <span className="rounded-full bg-clay/10 px-3 py-1 text-xs font-semibold text-clay">
            2 meses grátis
          </span>
        </div>

        {/* Plans */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              data-reveal
              className={`relative flex flex-col rounded-2xl p-6 ${
                plan.popular ? "grad-border grad-border-clay" : "grad-border"
              }`}
            >
              {plan.popular && (
                <span className="grad-border grad-border-clay-solid absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Mais popular
                </span>
              )}

              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {plan.name}
              </h3>
              <p className="mt-1 min-h-[2.75rem] text-sm text-neutral-500">
                {plan.audience}
              </p>

              <p className="mt-4 font-serif text-4xl tracking-tight text-ink">
                {plan.custom ? (
                  <span className="text-3xl">{plan.custom}</span>
                ) : (
                  <>
                    R${billing === "anual" ? plan.annual : plan.monthly}
                    <span className="text-base text-neutral-400">/mês</span>
                  </>
                )}
              </p>

              <a
                href="#"
                className="grad-border grad-border-clay-solid mt-6 block rounded-lg py-2.5 text-center text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                {plan.cta}
              </a>

              <ul className="mt-6 space-y-3 text-sm text-neutral-600">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      size={15}
                      weight="bold"
                      className="mt-0.5 shrink-0 text-clay"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

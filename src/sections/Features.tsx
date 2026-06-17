import { useRef, type ComponentType } from "react";
import { ChartLineUp, Check } from "@phosphor-icons/react";
import {
  KanbanIcon,
  ClockIcon,
  UsersIcon,
  AiSparkleIcon,
  DrawersIcon,
} from "../components/FeatureIcons";
import FeatureGraphic from "../components/FeatureGraphic";
import SectionHeading from "../components/SectionHeading";
import { useMobileAccordion } from "../hooks/useMobileAccordion";

type IconType = ComponentType<{ className?: string }>;
type Graphic = "bars" | "line" | "progress" | "skeleton" | "templates";

// Finance keeps a static duotone icon; the rest are animated
const FinanceIcon: IconType = (props) => <ChartLineUp weight="duotone" {...props} />;

type Feature = {
  Icon: IconType;
  title: string;
  legend: string;
  graphic: Graphic;
  bullets: string[];
};

const FEATURES: Feature[] = [
  {
    Icon: KanbanIcon,
    title: "Projetos e diário de obra",
    legend: "A central de cada projeto, do briefing à entrega.",
    graphic: "bars",
    bullets: ["Etapas, prazos e kanban", "Diário de obra com fotos", "Arquivos e anotações"],
  },
  {
    Icon: ClockIcon,
    title: "Controle de horas",
    legend: "Cada hora registrada, pronta para faturar.",
    graphic: "progress",
    bullets: ["Cronômetro por tarefa", "Horas por cliente e projeto", "Total acumulado sempre à mão"],
  },
  {
    Icon: FinanceIcon,
    title: "Financeiro com lucro real",
    legend: "Saiba o resultado real de cada projeto.",
    graphic: "line",
    bullets: ["Custo por hora com sua margem", "Receitas e despesas", "Cobrança automática"],
  },
  {
    Icon: UsersIcon,
    title: "Clientes e fornecedores",
    legend: "Todos os contatos do escritório organizados.",
    graphic: "line",
    bullets: ["Cadastro completo", "Projetos vinculados", "Contatos da equipe"],
  },
  {
    Icon: AiSparkleIcon,
    title: "IA integrada",
    legend: "Uma IA que conhece o seu escritório.",
    graphic: "skeleton",
    bullets: ["Templates preenchidos por IA", "Chat dos seus projetos", "Geração de documentos"],
  },
  {
    Icon: DrawersIcon,
    title: "Acabamentos e obras",
    legend: "Acabamentos e obras sempre à mão.",
    graphic: "templates",
    bullets: ["Catálogos das marcas", "Gestão de todas as obras", "Filtros por cliente e projeto"],
  },
];

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  useMobileAccordion(ref, "[data-acc-item]");

  return (
    <section
      ref={ref}
      id="recursos"
      className="tech-grid border-y border-dashed border-clay/15 bg-white px-6 py-14 md:px-10 md:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        <SectionHeading eyebrow="Recursos" title="Tudo que seu escritório precisa." />

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map(({ Icon, title, legend, graphic, bullets }) => (
            <div
              key={title}
              data-reveal
              data-acc-item
              className="m-acc grad-border flex flex-col rounded-2xl p-6 transition-transform duration-500 ease-out hover:-translate-y-1"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-clay/10 text-clay">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-2 text-base text-neutral-500">{legend}</p>

              {/* Collapsible on mobile (expands as it scrolls through centre) */}
              <div className="m-acc-body">
                <div className="m-acc-inner">
                  <FeatureGraphic variant={graphic} className="mt-5 h-24 w-full" />

                  <ul className="mt-5 space-y-2.5 text-sm text-neutral-600">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <Check size={15} weight="bold" className="shrink-0 text-clay" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Plus } from "@phosphor-icons/react";

const FAQS = [
  {
    q: "O timer do desktop conta as horas sozinho?",
    a: "Sim. O app de desktop cronometra o tempo em cada projeto automaticamente e sincroniza com a web — você não precisa lembrar de iniciar nada.",
  },
  {
    q: "Preciso instalar algo para usar?",
    a: "Não. O Projax roda 100% no navegador. O timer de desktop e o app mobile são opcionais, para registrar horas e acompanhar a obra de qualquer lugar.",
  },
  {
    q: "Posso trocar de plano depois?",
    a: "A qualquer momento. Faça upgrade ou downgrade quando quiser — o valor é ajustado de forma proporcional.",
  },
  {
    q: "Como funciona o controle de rentabilidade?",
    a: "Você define o custo por hora do escritório com a sua margem de lucro, e o Projax cruza isso com as horas registradas e os custos do projeto para mostrar o resultado real de cada trabalho.",
  },
  {
    q: "Meus dados ficam seguros?",
    a: "Sim. Os dados são criptografados, com backups automáticos, e cada escritório tem o seu ambiente isolado — inclusive a IA, que nunca usa informações de outro escritório.",
  },
  {
    q: "O Projax segue a LGPD?",
    a: "Seguimos. Tratamos os dados conforme a LGPD, com controles de acesso e a possibilidade de exportar ou excluir informações quando você precisar.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="tech-grid border-t border-dashed border-clay/15 px-6 py-14 md:px-10 md:py-20 lg:px-16"
    >
      <div className="mx-auto grid max-w-[1800px] gap-12 lg:grid-cols-[1fr_1.4fr]">
        {/* Heading */}
        <div>
          <p
            data-reveal
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-clay"
          >
            Dúvidas
          </p>
          <h2
            data-reveal
            className="font-serif text-4xl tracking-tight text-ink md:text-5xl"
          >
            Perguntas frequentes
          </h2>
          <p data-reveal className="mt-4 max-w-xs text-base text-neutral-600">
            Não achou o que procurava?{" "}
            <a
              href="#precos"
              className="text-clay underline-offset-2 hover:underline"
            >
              Fale com a gente.
            </a>
          </p>
        </div>

        {/* Accordion — opens on hover, pushing the others down */}
        <div data-reveal className="divide-y divide-black/10">
          {FAQS.map((item) => (
            <div key={item.q} className="group">
              <div className="flex items-center justify-between gap-4 py-5">
                <span className="text-base font-medium text-ink">{item.q}</span>
                <Plus
                  size={18}
                  weight="bold"
                  className="shrink-0 text-clay transition-transform duration-300 ease-out group-hover:rotate-45"
                />
              </div>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="max-w-xl pb-5 text-base text-neutral-500">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

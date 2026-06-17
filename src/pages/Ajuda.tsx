import PageShell, { InfoCard } from "./PageShell";

export default function Ajuda() {
  return (
    <PageShell
      eyebrow="Recursos"
      title="Central de ajuda"
      lead="Guias rápidos para tirar o máximo do Projax. Não achou o que procurava? Fale com o suporte."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <InfoCard title="Primeiros passos">
          Crie a conta, configure o escritório e monte o seu primeiro projeto.
        </InfoCard>
        <InfoCard title="Projetos e tarefas">
          Fases, kanban, prazos, responsáveis e o diário de obra.
        </InfoCard>
        <InfoCard title="Horas e financeiro">
          Timer, custo por hora, cobranças e relatórios de rentabilidade.
        </InfoCard>
        <InfoCard title="Conta e equipe">
          Usuários, permissões, planos e configurações de segurança.
        </InfoCard>
      </div>
      <p className="mt-10 text-center text-base text-neutral-600">
        Precisa de ajuda agora? Escreva para{" "}
        <a
          href="mailto:suporte@projax.com.br"
          className="font-medium text-clay underline-offset-2 hover:underline"
        >
          suporte@projax.com.br
        </a>
        .
      </p>
    </PageShell>
  );
}

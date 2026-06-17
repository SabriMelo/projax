import PageShell, { InfoCard } from "./PageShell";

export default function Documentacao() {
  return (
    <PageShell
      eyebrow="Recursos"
      title="Documentação"
      lead="Referência completa para configurar, integrar e automatizar o Projax no seu fluxo de trabalho."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard title="Conceitos">
          Como o Projax organiza projetos, fases, tarefas, horas e clientes.
        </InfoCard>
        <InfoCard title="Integrações">
          Cobrança via Asaas, timer de desktop e o app mobile.
        </InfoCard>
        <InfoCard title="Assistente de IA">
          Como usar templates preenchidos por IA e o chat dos seus projetos.
        </InfoCard>
        <InfoCard title="Financeiro">
          Custo por hora, margem, receitas, despesas e relatórios.
        </InfoCard>
        <InfoCard title="Equipe e permissões">
          Papéis, acessos e boas práticas para escritórios em crescimento.
        </InfoCard>
        <InfoCard title="Importação e exportação">
          Traga seus dados para o Projax e exporte quando quiser.
        </InfoCard>
      </div>
      <p className="mt-10 text-center text-sm text-neutral-500">
        A documentação completa está em constante atualização.
      </p>
    </PageShell>
  );
}

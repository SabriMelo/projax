import PageShell, { InfoCard } from "./PageShell";

export default function Seguranca() {
  return (
    <PageShell
      eyebrow="Recursos"
      title="Segurança e privacidade"
      lead="Os dados do seu escritório são seus. Protegemos cada projeto com criptografia, isolamento e práticas alinhadas à LGPD."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard title="Criptografia">
          Dados protegidos em trânsito e em repouso, com conexões seguras de
          ponta a ponta.
        </InfoCard>
        <InfoCard title="Backups automáticos">
          Cópias frequentes e redundância para que você nunca perca um
          trabalho.
        </InfoCard>
        <InfoCard title="Ambiente isolado">
          Cada escritório roda em um ambiente separado, inclusive a IA, que
          nunca usa dados de outro cliente.
        </InfoCard>
        <InfoCard title="Conformidade com a LGPD">
          Controles de acesso e a possibilidade de exportar ou excluir
          informações quando você precisar.
        </InfoCard>
      </div>
      <p className="mt-10 text-center text-base text-neutral-600">
        Dúvidas sobre segurança? Fale com{" "}
        <a
          href="mailto:contato@projax.com.br"
          className="font-medium text-clay underline-offset-2 hover:underline"
        >
          contato@projax.com.br
        </a>
        .
      </p>
    </PageShell>
  );
}

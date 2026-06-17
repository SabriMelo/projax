import PageShell, { InfoCard } from "./PageShell";

export default function Sobre() {
  return (
    <PageShell
      eyebrow="Empresa"
      title="Gestão de escritório feita por quem entende de arquitetura."
      lead="O Projax nasceu da rotina real de escritórios de arquitetura: muitos projetos, prazos apertados e ferramentas que não conversam entre si. Criamos uma plataforma única para organizar tudo, do briefing à entrega."
    >
      <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-neutral-600">
        Acreditamos que o seu tempo deve ir para o projeto — não para
        planilhas. Por isso reunimos projetos, obras, horas, financeiro e
        equipe em um só lugar, com a clareza que um escritório precisa para
        crescer com lucro.
      </p>
      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard title="Foco no projeto">
          Automatizamos a gestão para que arquitetos passem mais tempo
          projetando e menos tempo administrando.
        </InfoCard>
        <InfoCard title="Dados sob controle">
          Cada escritório tem o seu ambiente isolado, com segurança,
          backups e total propriedade dos dados.
        </InfoCard>
        <InfoCard title="Feito no Brasil">
          Desenvolvido para a realidade dos escritórios brasileiros, com
          cobrança integrada e conformidade com a LGPD.
        </InfoCard>
      </div>
    </PageShell>
  );
}

import PageShell, { InfoCard } from "./PageShell";

export default function TimerDesktop() {
  return (
    <PageShell
      eyebrow="Produto"
      title="Timer Desktop"
      lead="Um cronômetro discreto que roda na sua barra de tarefas e registra as horas em cada projeto automaticamente. Depois é só faturar."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard title="Cronometragem automática">
          Inicie o timer em um projeto e ele acompanha o seu trabalho sem que
          você precise lembrar de nada.
        </InfoCard>
        <InfoCard title="Sincronização em tempo real">
          Tudo o que é registrado no desktop aparece na web na hora, vinculado
          ao cliente e à tarefa certos.
        </InfoCard>
        <InfoCard title="Pronto para faturar">
          As horas viram base de cobrança e alimentam o cálculo de
          rentabilidade de cada projeto.
        </InfoCard>
      </div>
      <p className="mt-10 text-center text-sm text-neutral-500">
        Disponível para Windows e macOS. Incluído nos planos Studio e Business.
      </p>
    </PageShell>
  );
}

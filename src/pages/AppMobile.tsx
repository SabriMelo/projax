import { AppleLogo, GooglePlayLogo } from "@phosphor-icons/react";
import PageShell, { InfoCard } from "./PageShell";

function StoreBadge({
  Icon,
  top,
  bottom,
}: {
  Icon: typeof AppleLogo;
  top: string;
  bottom: string;
}) {
  return (
    <a
      href="#"
      aria-disabled
      className="inline-flex items-center gap-3 rounded-xl bg-ink px-5 py-3 text-white ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-0.5"
    >
      <Icon weight="fill" className="h-7 w-7" />
      <span className="text-left leading-tight">
        <span className="block text-[10px] uppercase tracking-wide text-white/70">
          {top}
        </span>
        <span className="block text-base font-semibold">{bottom}</span>
      </span>
    </a>
  );
}

export default function AppMobile() {
  return (
    <PageShell
      eyebrow="Produto"
      title="App Mobile"
      lead="Acompanhe projetos, registre horas e veja o andamento da obra de qualquer lugar — direto do seu celular."
    >
      {/* Store placeholders */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <StoreBadge Icon={AppleLogo} top="Baixar na" bottom="App Store" />
          <StoreBadge Icon={GooglePlayLogo} top="Disponível no" bottom="Google Play" />
        </div>
        <span className="rounded-full bg-clay/10 px-3 py-1 text-xs font-semibold text-clay">
          Em breve
        </span>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        <InfoCard title="Obra no bolso">
          Registre o diário de obra com fotos e anotações direto do canteiro.
        </InfoCard>
        <InfoCard title="Horas em qualquer lugar">
          Inicie e pause o cronômetro pelo celular — tudo sincroniza com a web.
        </InfoCard>
        <InfoCard title="Cliente sempre informado">
          Veja o progresso e responda o cliente sem precisar abrir o notebook.
        </InfoCard>
      </div>
    </PageShell>
  );
}

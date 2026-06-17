import PageShell, { InfoCard } from "./PageShell";

// Faded background photos of people (architecture studios / teams at work).
const HEADER_PHOTO =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=70";
const BAND_PHOTO =
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=70";

export default function Sobre() {
  return (
    <PageShell
      eyebrow="Empresa"
      title="Gestão de escritório feita por quem entende de arquitetura."
      lead="O Projax nasceu da rotina real dos escritórios: muitos projetos, prazos apertados e ferramentas que não conversam entre si."
      headerImage={HEADER_PHOTO}
    >
      <p className="mx-auto mb-12 max-w-2xl text-pretty text-center text-lg text-neutral-600">
        Acreditamos que o seu tempo deve ir para o projeto, não para planilhas.
        Por isso reunimos projetos, obras, horas, financeiro e equipe em um só
        lugar, com a clareza que um escritório precisa para crescer com lucro.
      </p>

      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard title="Foco no projeto">
          Automatizamos a gestão para que arquitetos passem mais tempo
          projetando e menos tempo administrando.
        </InfoCard>
        <InfoCard title="Dados sob controle">
          Cada escritório tem o seu ambiente isolado, com segurança, backups e
          total propriedade dos dados.
        </InfoCard>
        <InfoCard title="Feito no Brasil">
          Pensado para a realidade dos escritórios brasileiros, com cobrança
          integrada e conformidade com a LGPD.
        </InfoCard>
      </div>

      {/* People in the background, with a statement on top */}
      <div className="relative mt-12 overflow-hidden rounded-3xl px-6 py-16 text-center md:py-20">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BAND_PHOTO})` }}
        />
        <div aria-hidden className="absolute inset-0 bg-ink/75" />
        <p className="relative z-10 mx-auto max-w-2xl text-balance font-serif text-2xl leading-snug text-[#f7f3ec] md:text-3xl">
          Construímos o Projax ao lado de arquitetos, para que a gestão deixe de
          competir com o tempo de projetar.
        </p>
      </div>
    </PageShell>
  );
}

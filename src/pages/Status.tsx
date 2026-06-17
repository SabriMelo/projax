import PageShell from "./PageShell";

const SERVICES = [
  "Aplicação web",
  "API",
  "Timer de desktop",
  "App mobile",
  "Cobranças (Asaas)",
  "Assistente de IA",
];

export default function Status() {
  return (
    <PageShell
      eyebrow="Recursos"
      title="Status do sistema"
      lead="Acompanhe a disponibilidade dos serviços do Projax em tempo real."
    >
      <div className="grad-border flex items-center gap-3 rounded-2xl p-6">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
        </span>
        <span className="text-lg font-semibold text-ink">
          Todos os sistemas operacionais
        </span>
      </div>

      <ul className="mt-6 divide-y divide-black/10 overflow-hidden rounded-2xl ring-1 ring-black/5">
        {SERVICES.map((s) => (
          <li
            key={s}
            className="flex items-center justify-between gap-4 bg-white px-5 py-4"
          >
            <span className="text-base text-ink">{s}</span>
            <span className="flex items-center gap-2 text-sm font-medium text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Operacional
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-sm text-neutral-500">
        Incidentes e manutenções programadas são comunicados por e-mail aos
        administradores.
      </p>
    </PageShell>
  );
}

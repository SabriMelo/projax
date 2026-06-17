import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ContactModal from "./ContactModal";

type FooterLink = {
  label: string;
  to?: string;
  section?: string;
  contact?: boolean;
};

const COLS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Produto",
    links: [
      { label: "Timer Desktop", to: "/timer-desktop" },
      { label: "App Mobile", to: "/app-mobile" },
      { label: "Planos", section: "precos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", to: "/sobre" },
      { label: "Contato", contact: true },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Central de ajuda", to: "/ajuda" },
      { label: "Documentação", to: "/documentacao" },
      { label: "Status", to: "/status" },
      { label: "Segurança", to: "/seguranca" },
    ],
  },
];

const linkCls = "text-sm text-neutral-600 transition-colors hover:text-ink";

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false);
  const { pathname } = useLocation();
  const sectionHref = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);

  return (
    <footer className="border-t border-black/5 bg-white px-6 py-14 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo-icon.svg" alt="Projax" className="h-9 w-9 rounded-lg" />
              <span className="font-tera text-sm font-light tracking-tight text-ink">
                PROJAX
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-neutral-600">
              O ERP que organiza projetos e horas para escritórios de
              arquitetura — na web, no desktop e no celular.
            </p>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link to={l.to} className={linkCls}>
                        {l.label}
                      </Link>
                    ) : l.section ? (
                      <a href={sectionHref(l.section)} className={linkCls}>
                        {l.label}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setContactOpen(true)}
                        className={`${linkCls} text-left`}
                      >
                        {l.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-black/5 pt-6 text-center md:flex-row md:text-left">
          <p className="text-xs text-neutral-500">
            © 2026 Projax. Feito para arquitetos.
          </p>
          <p className="text-xs text-neutral-500">
            Desenvolvido por{" "}
            <a
              href="https://xprstudio.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-clay transition-colors hover:text-clay-deep"
            >
              XPR STUDIOS
            </a>
          </p>
        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </footer>
  );
}

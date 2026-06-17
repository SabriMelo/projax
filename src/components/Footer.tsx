export default function Footer() {
  return (
    <footer className="border-t border-black/5 px-6 py-10 md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1800px] flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <img src="/logo-icon.svg" alt="Projax" className="h-10 w-10 rounded-lg" />
          <span className="font-tera text-sm font-light tracking-tight text-ink">
            PROJAX
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center md:items-end md:text-right">
          <p className="text-sm text-neutral-400">
            © 2026 Projax. Feito para arquitetos.
          </p>
          <p className="text-xs text-neutral-400">
            Desenvolvido por{" "}
            <a
              href="https://xprstudio.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-clay transition-colors hover:text-clay-deep"
            >
              XPR Studios
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

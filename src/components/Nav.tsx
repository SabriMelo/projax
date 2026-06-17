import { ArrowRight } from "@phosphor-icons/react";

const links = [
  { href: "#recursos", label: "Recursos" },
  { href: "#como", label: "Como funciona" },
  { href: "#precos", label: "Preços" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-white/45 to-clay-soft/20 px-6 py-4 backdrop-blur-md md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 text-ink">
          <svg
            viewBox="798 483 760 1250"
            className="h-9 w-auto"
            fill="currentColor"
            aria-hidden
          >
            <path d="M926.508 485.556C1091.66 485.556 1249.32 540.28 1366.29 649.119C1484.01 758.661 1556.01 918.889 1556.01 1120.35H1430.01C1430.01 1069.8 1424.71 1023.16 1414.89 980.372L1160.41 1120.27H1429.8V1246.27H931.209L926.625 1248.79V1730.46L800.625 1730.46V611.388H926.508V485.556ZM994.331 1067.78L1371.18 860.618C1346.88 814.173 1316.03 774.461 1280.46 741.362C1246.79 710.034 1208.27 684.057 1166.09 663.782L994.331 1067.78ZM926.625 904.992L1046.26 623.596C1007.88 615.639 967.797 611.564 926.625 611.557V904.992Z" />
          </svg>
          <span className="font-tera text-sm font-light tracking-tight text-ink">
            PROJAX
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-neutral-600 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#precos"
            className="grad-border grad-border-clay-solid inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            Teste grátis
            <ArrowRight size={15} weight="bold" />
          </a>
        </div>
      </div>
    </nav>
  );
}

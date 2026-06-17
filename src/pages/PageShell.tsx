import type { ReactNode } from "react";
import CTA from "../sections/CTA";

/*
  Shared shell for the secondary pages: a dark, on-brand header (so the fixed
  nav reads), a content band, and the reused CTA. The global Nav + Footer wrap
  every route in App.tsx. An optional headerImage sits faded behind the header.
*/
export default function PageShell({
  eyebrow,
  title,
  lead,
  headerImage,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  headerImage?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <header
        className="relative isolate overflow-hidden px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-40 lg:px-16"
        style={{ background: "linear-gradient(180deg,#2a1209,#3d1c0e 60%,#20100a)" }}
      >
        {headerImage && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
            style={{ backgroundImage: `url(${headerImage})` }}
          />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#20100a]/60"
        />
        <div className="relative z-10 mx-auto max-w-[820px] text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-clay-soft">
            {eyebrow}
          </p>
          <h1 className="text-balance font-serif text-4xl leading-[1.08] tracking-tight text-[#f7f3ec] md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-neutral-300">
            {lead}
          </p>
        </div>
      </header>

      <section className="tech-grid bg-white px-6 py-14 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-[1100px]">{children}</div>
      </section>

      <CTA />
    </>
  );
}

export function InfoCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grad-border flex flex-col rounded-2xl p-6">
      <h3 className="text-lg font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 text-pretty text-base text-neutral-600">{children}</p>
    </div>
  );
}

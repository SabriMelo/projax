import { useEffect } from "react";
import { EnvelopeSimple, InstagramLogo, X } from "@phosphor-icons/react";

export default function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contato"
      className={`fixed inset-0 z-[70] flex items-center justify-center p-6 transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Blurred backdrop */}
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/40 backdrop-blur-md"
      />

      {/* Card */}
      <div
        className={`relative z-10 w-full max-w-sm rounded-2xl bg-white p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/10 transition-all duration-300 ${
          open ? "translate-y-0 scale-100" : "translate-y-2 scale-95"
        }`}
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-black/5 hover:text-ink"
        >
          <X size={18} weight="bold" />
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
          Contato
        </p>
        <h3 className="mt-2 font-serif text-2xl tracking-tight text-ink">
          Fale com a gente
        </h3>
        <p className="mt-2 text-sm text-neutral-600">
          Tire dúvidas, peça uma demo ou só diga oi. A gente responde rápido.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href="mailto:contato@projax.com.br"
            className="grad-border flex items-center gap-3 rounded-xl p-4 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-clay/10 text-clay">
              <EnvelopeSimple className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-medium uppercase tracking-wide text-neutral-500">
                E-mail
              </span>
              <span className="block truncate text-sm font-medium text-ink">
                contato@projax.com.br
              </span>
            </span>
          </a>

          <a
            href="https://instagram.com/projax"
            target="_blank"
            rel="noreferrer"
            className="grad-border flex items-center gap-3 rounded-xl p-4 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-clay/10 text-clay">
              <InstagramLogo className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-medium uppercase tracking-wide text-neutral-500">
                Instagram
              </span>
              <span className="block truncate text-sm font-medium text-ink">
                @projax
              </span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

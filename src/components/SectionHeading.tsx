type Props = {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
};

export default function SectionHeading({ eyebrow, title, align = "center" }: Props) {
  const left = align === "left";
  return (
    <div className={left ? "text-left" : "mb-14 text-center"}>
      <p
        data-reveal
        className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-clay"
      >
        {eyebrow}
      </p>
      <h2
        data-reveal
        className="font-serif text-4xl tracking-tight text-ink md:text-5xl"
      >
        {title}
      </h2>
    </div>
  );
}

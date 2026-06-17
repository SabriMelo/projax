import { useRef } from "react";
import {
  Bell,
  CalendarBlank,
  DotsSixVertical,
  DotsThree,
  FolderOpen,
  Lightbulb,
  ListChecks,
  Plus,
  Sparkle,
  SquaresFour,
  UsersThree,
} from "@phosphor-icons/react";
import { gsap, useGSAP, Draggable } from "../lib/gsap";

/*
  Hero module — a little simulation of the Projax app, parked on the "Tarefas do
  projeto" tab. On load the cards appear in their stages and then *leap* (a GSAP
  arc) into "Concluído". It plays exactly once: no loop. Afterwards the cards are
  draggable — pick one up and drop it on any column and it snaps in, with the
  column counters updating like the real board.
*/

type Tone = "neutral" | "blue" | "amber" | "green";

const COLUMNS: { key: string; name: string; tone: Tone }[] = [
  { key: "pendente", name: "Pendente", tone: "neutral" },
  { key: "andamento", name: "Em Andamento", tone: "blue" },
  { key: "revisao", name: "Em Revisão", tone: "amber" },
  { key: "concluido", name: "Concluído", tone: "green" },
];

const TONE: Record<
  Tone,
  { col: string; head: string; badge: string; plus: string }
> = {
  neutral: {
    col: "bg-black/[0.035]",
    head: "text-neutral-500",
    badge: "bg-black/5 text-neutral-500",
    plus: "text-neutral-400",
  },
  blue: {
    col: "bg-[#2563eb]/[0.06]",
    head: "text-[#2563eb]",
    badge: "bg-[#2563eb]/10 text-[#2563eb]",
    plus: "text-[#2563eb]",
  },
  amber: {
    col: "bg-[#c2710c]/[0.07]",
    head: "text-[#c2710c]",
    badge: "bg-[#c2710c]/10 text-[#c2710c]",
    plus: "text-[#c2710c]",
  },
  green: {
    col: "bg-[#16a34a]/[0.07]",
    head: "text-[#16a34a]",
    badge: "bg-[#16a34a]/10 text-[#16a34a]",
    plus: "text-[#16a34a]",
  },
};

type Task = {
  id: string;
  title: string;
  desc: string;
  tag: string;
  date: string;
  start: string;
  s: number;
};

const TASKS: Task[] = [
  { id: "t1", title: "Detalhar marcenaria", desc: "Cozinha e closet", tag: "Final", date: "06/08", start: "revisao", s: 0 },
  { id: "t2", title: "Render da sala", desc: "Ajustar iluminação", tag: "3D", date: "07/08", start: "andamento", s: 0 },
  { id: "t3", title: "Planta — Pav. 1", desc: "Revisar cotas e layout", tag: "CAD", date: "08/08", start: "pendente", s: 0 },
  { id: "t4", title: "Memorial descritivo", desc: "Acabamentos finais", tag: "Doc", date: "09/08", start: "pendente", s: 1 },
];

// Order the cards leap into Concluído (Pendente's bottom card before its top, so
// no gaps open up). The index is also the landing slot in Concluído.
const LEAP_ORDER = ["t1", "t2", "t4", "t3"];

const SIDEBAR = [
  { Icon: SquaresFour, active: false },
  { Icon: CalendarBlank, active: false },
  { Icon: FolderOpen, active: true },
  { Icon: ListChecks, active: false },
  { Icon: UsersThree, active: false },
  { Icon: Sparkle, active: false },
];

const TABS = ["Home", "Obra", "Arquivos", "Tarefas", "Anotações", "Cliente"];

const GAP = 8;
const PEAK = 34;

export default function ProjectTasksBoard() {
  const rootRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const dropRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const countRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useGSAP(
    () => {
      const board = boardRef.current;
      const firstDrop = dropRefs.current["pendente"];
      if (!board || !firstDrop) return;

      // --- Measure (re-runnable, so the board adapts when the window resizes) ---
      let cardW = 0;
      let H = 0;
      let bRect = board.getBoundingClientRect();
      const measure = () => {
        cardW = firstDrop.getBoundingClientRect().width;
        TASKS.forEach((t) => {
          const c = cardRefs.current[t.id];
          if (c) gsap.set(c, { width: cardW });
        });
        H = cardRefs.current["t1"]!.getBoundingClientRect().height;
        // Size every column's drop zone to hold all four cards stacked.
        const dropH = 4 * H + 3 * GAP;
        COLUMNS.forEach((c) => {
          const d = dropRefs.current[c.key];
          if (d) gsap.set(d, { height: dropH });
        });
        bRect = board.getBoundingClientRect();
      };
      measure();

      const slot = (colKey: string, index: number) => {
        const r = dropRefs.current[colKey]!.getBoundingClientRect();
        return {
          x: r.left - bRect.left,
          y: r.top - bRect.top + index * (H + GAP),
        };
      };

      // --- Model shared by the intro + the drag interaction ---
      const stacks: Record<string, string[]> = {
        pendente: [],
        andamento: [],
        revisao: [],
        concluido: [],
      };
      const colOf: Record<string, string> = {};
      const writeCounts = () => {
        COLUMNS.forEach((c) => {
          const el = countRefs.current[c.key];
          if (el) el.textContent = String(stacks[c.key].length);
        });
      };
      const relayout = (colKey: string, dur = 0.4) => {
        stacks[colKey].forEach((id, i) => {
          const p = slot(colKey, i);
          gsap.to(cardRefs.current[id], { x: p.x, y: p.y, duration: dur, ease: "power3.out" });
        });
      };

      // Park each card at its starting slot, invisible.
      TASKS.forEach((t) => {
        const card = cardRefs.current[t.id]!;
        const p = slot(t.start, t.s);
        gsap.set(card, { height: H, x: p.x, y: p.y, opacity: 0, scale: 0.92, transformOrigin: "50% 50%" });
      });

      // --- Drag interaction (enabled once the intro settles) ---
      const drags: Draggable[] = [];

      // Re-measure and re-seat every card when the window resizes, so the board
      // adapts subtly as it's compressed or expanded.
      let raf = 0;
      const onResize = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          measure();
          COLUMNS.forEach((c) => {
            stacks[c.key].forEach((id, i) => {
              const p = slot(c.key, i);
              gsap.set(cardRefs.current[id], { width: cardW, height: H, x: p.x, y: p.y });
            });
          });
          drags.forEach((d) => d.update(true));
        });
      };

      const drop = (id: string) => {
        const card = cardRefs.current[id]!;
        const cr = card.getBoundingClientRect();
        const cx = cr.left + cr.width / 2;
        let target = colOf[id];
        let best = Infinity;
        COLUMNS.forEach((c) => {
          const r = dropRefs.current[c.key]!.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - cx);
          if (d < best) {
            best = d;
            target = c.key;
          }
        });
        const from = colOf[id];
        if (from !== target) {
          stacks[from] = stacks[from].filter((x) => x !== id);
          stacks[target].push(id);
          colOf[id] = target;
        }
        relayout(from);
        relayout(target);
        writeCounts();
      };
      const enableDrag = () => {
        TASKS.forEach((t) => {
          const card = cardRefs.current[t.id]!;
          const [d] = Draggable.create(card, {
            type: "x,y",
            bounds: board,
            dragResistance: 0.05,
            onPress: function () {
              this.update();
              gsap.to(card, { scale: 1.05, boxShadow: "0 18px 30px rgba(0,0,0,0.22)", duration: 0.18 });
              card.style.zIndex = "40";
            },
            onDragEnd: () => drop(t.id),
            onRelease: () => {
              gsap.to(card, { scale: 1, boxShadow: "0 1px 2px rgba(0,0,0,0.06)", duration: 0.25 });
              card.style.zIndex = "";
            },
          });
          drags.push(d);
        });
        window.addEventListener("resize", onResize);
      };

      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Seed the model: cards begin spread across the stages.
      TASKS.forEach((t) => {
        stacks[t.start].push(t.id);
        colOf[t.id] = t.start;
      });
      stacks.pendente.sort((a, b) => {
        const sa = TASKS.find((t) => t.id === a)!.s;
        const sb = TASKS.find((t) => t.id === b)!.s;
        return sa - sb;
      });
      writeCounts();

      if (reduce) {
        // Skip to the finished state and allow dragging immediately.
        ["pendente", "andamento", "revisao"].forEach((k) => (stacks[k] = []));
        stacks.concluido = [...LEAP_ORDER];
        LEAP_ORDER.forEach((id, k) => {
          colOf[id] = "concluido";
          const p = slot("concluido", k);
          gsap.set(cardRefs.current[id], { x: p.x, y: p.y, opacity: 1, scale: 1 });
        });
        writeCounts();
        enableDrag();
        return () => {
        drags.forEach((d) => d.kill());
        window.removeEventListener("resize", onResize);
        if (raf) cancelAnimationFrame(raf);
      };
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: enableDrag });

      // 1) Appear, by stage.
      TASKS.forEach((t, i) => {
        tl.to(cardRefs.current[t.id], { opacity: 1, scale: 1, duration: 0.5 }, 0.2 + i * 0.1);
      });

      // 2) Leap, one after another, into Concluído.
      let at = 1.1;
      LEAP_ORDER.forEach((id, k) => {
        const t = TASKS.find((x) => x.id === id)!;
        const card = cardRefs.current[id]!;
        const from = slot(t.start, t.s);
        const to = slot("concluido", k);
        const peakY = Math.min(from.y, to.y) - PEAK;
        const HOP = 0.85;

        const sub = gsap.timeline({
          onStart: () => {
            stacks[t.start] = stacks[t.start].filter((x) => x !== id);
            writeCounts();
            card.style.zIndex = "30";
          },
          onComplete: () => {
            stacks.concluido.push(id);
            colOf[id] = "concluido";
            writeCounts();
            card.style.zIndex = "";
            const badge = countRefs.current["concluido"];
            if (badge)
              gsap.fromTo(badge, { scale: 1 }, { scale: 1.4, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" });
          },
        });

        sub
          .to(card, { x: to.x, duration: HOP, ease: "power1.inOut" }, 0)
          .to(card, { y: peakY, duration: HOP * 0.5, ease: "power2.out" }, 0)
          .to(card, { y: to.y, duration: HOP * 0.5, ease: "power2.in" }, HOP * 0.5)
          .fromTo(card, { rotation: -3 }, { rotation: 0, duration: HOP, ease: "power2.out" }, 0)
          .to(card, { scale: 1.05, duration: HOP * 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0)
          .to(card, { boxShadow: "0 16px 26px rgba(0,0,0,0.18)", duration: HOP * 0.5, ease: "power2.out" }, 0)
          .to(card, { boxShadow: "0 1px 2px rgba(0,0,0,0.06)", duration: HOP * 0.5, ease: "power2.in" }, HOP * 0.5);

        tl.add(sub, at);
        at += 0.55;
      });

      return () => {
        drags.forEach((d) => d.kill());
        window.removeEventListener("resize", onResize);
        if (raf) cancelAnimationFrame(raf);
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="w-full lg:ml-auto lg:max-w-[680px]">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_70px_-24px_rgba(0,0,0,0.55)] ring-1 ring-black/5">
        <div className="flex">
          {/* Slim app rail */}
          <aside className="hidden w-11 flex-col items-center gap-1 bg-[#211d1a] py-3 sm:flex">
            <span className="mb-2 flex h-6 w-6 items-center justify-center text-clay-soft">
              <svg viewBox="798 483 760 1250" className="h-4 w-auto" fill="currentColor" aria-hidden>
                <path d="M926.508 485.556C1091.66 485.556 1249.32 540.28 1366.29 649.119C1484.01 758.661 1556.01 918.889 1556.01 1120.35H1430.01C1430.01 1069.8 1424.71 1023.16 1414.89 980.372L1160.41 1120.27H1429.8V1246.27H931.209L926.625 1248.79V1730.46L800.625 1730.46V611.388H926.508V485.556ZM994.331 1067.78L1371.18 860.618C1346.88 814.173 1316.03 774.461 1280.46 741.362C1246.79 710.034 1208.27 684.057 1166.09 663.782L994.331 1067.78ZM926.625 904.992L1046.26 623.596C1007.88 615.639 967.797 611.564 926.625 611.557V904.992Z" />
              </svg>
            </span>
            {SIDEBAR.map(({ Icon, active }, i) => (
              <span
                key={i}
                className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                  active ? "bg-white/10 text-white" : "text-neutral-500"
                }`}
              >
                <Icon size={15} weight={active ? "fill" : "regular"} />
              </span>
            ))}
          </aside>

          {/* Main */}
          <div className="min-w-0 flex-1 bg-[#faf8f4]">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-black/5 bg-white px-4 py-2.5">
              <span className="text-[13px] font-semibold text-ink">Tarefas do Projeto</span>
              <div className="flex items-center gap-3 text-neutral-400">
                <Lightbulb size={15} />
                <span className="relative">
                  <Bell size={15} />
                  <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                </span>
              </div>
            </div>

            {/* Project header */}
            <div className="px-4 pt-3">
              <p className="text-[10px] font-medium uppercase tracking-wide text-neutral-500">PROJ-001</p>
              {/* Decorative app title — a <p>, not a heading, to keep the page's
                  heading order intact */}
              <p className="font-serif text-lg leading-tight text-ink">Beatriz e João</p>
              <p className="text-[11px] text-neutral-500">Studio B2</p>

              {/* Tabs */}
              <div className="mt-2.5 flex gap-4 border-b border-black/5 text-[11px]">
                {TABS.map((tab) => {
                  const active = tab === "Tarefas";
                  return (
                    <span
                      key={tab}
                      className={`-mb-px border-b-2 pb-1.5 ${
                        active ? "border-clay font-medium text-ink" : "border-transparent text-neutral-500"
                      }`}
                    >
                      {tab}
                    </span>
                  );
                })}
              </div>

              {/* Count + new */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500">4 tarefas</span>
                <span className="inline-flex items-center gap-1 rounded-lg bg-clay px-2.5 py-1 text-[11px] font-medium text-white">
                  <Plus size={11} weight="bold" />
                  Nova Tarefa
                </span>
              </div>
            </div>

            {/* Board */}
            <div ref={boardRef} className="relative px-3 pb-4 pt-3">
              <div className="flex gap-2">
                {COLUMNS.map((col) => {
                  const tone = TONE[col.tone];
                  return (
                    <div key={col.key} className={`flex min-w-0 flex-1 flex-col rounded-lg p-2 ${tone.col}`}>
                      <div className="mb-2 flex items-center gap-1.5 px-0.5">
                        <span className={`truncate text-[11px] font-semibold ${tone.head}`}>{col.name}</span>
                        <span
                          ref={(el) => {
                            countRefs.current[col.key] = el;
                          }}
                          className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-semibold ${tone.badge}`}
                        >
                          0
                        </span>
                        <Plus size={12} weight="bold" className={`ml-auto ${tone.plus}`} />
                      </div>
                      {/* Drop zone — measured for slot positions, sized in the effect */}
                      <div
                        ref={(el) => {
                          dropRefs.current[col.key] = el;
                        }}
                        className="relative h-[300px]"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Floating, draggable cards */}
              <div className="pointer-events-none absolute inset-0">
                {TASKS.map((t) => (
                  <div
                    key={t.id}
                    ref={(el) => {
                      cardRefs.current[t.id] = el;
                    }}
                    style={{ opacity: 0 }}
                    className="task-card pointer-events-auto absolute left-0 top-0 cursor-grab touch-none select-none overflow-hidden rounded-lg bg-white p-2.5 shadow-sm ring-1 ring-black/5 active:cursor-grabbing"
                  >
                    <div className="flex items-center gap-1.5">
                      <DotsSixVertical size={13} className="shrink-0 text-neutral-300" />
                      <p className="min-w-0 flex-1 truncate text-[11px] font-semibold leading-tight text-ink">{t.title}</p>
                      <DotsThree size={13} className="shrink-0 text-neutral-400" />
                    </div>
                    <p className="mt-1.5 truncate pl-[19px] text-[10px] leading-tight text-neutral-500">{t.desc}</p>
                    <div className="mt-2 flex items-center gap-2 pl-[19px]">
                      <span className="rounded bg-clay/10 px-1.5 py-0.5 text-[9px] font-medium text-clay-deep">{t.tag}</span>
                      <span className="flex items-center gap-1 text-[9px] text-neutral-500">
                        <CalendarBlank size={10} />
                        {t.date}
                      </span>
                      <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-clay/15 text-[7px] font-bold text-clay-deep">
                        SM
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

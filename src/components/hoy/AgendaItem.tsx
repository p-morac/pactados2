import { Check, Flame, Hourglass } from "lucide-react";

import { partirHora, plural } from "@/lib/hoy-utils";
import { cn } from "@/lib/utils";
import type { HabitoDelDia } from "@/types/habitos";

import { CategoriaChip } from "./CategoriaChip";

interface AgendaItemProps {
  habito: HabitoDelDia;
  onAlternar: (id: string) => void;
}

function Racha({ dias, className }: { dias: number; className?: string }) {
  return (
    <span className={cn("font-body items-center gap-1.5 text-sm font-semibold text-[#a86b3d]", className)}>
      <Flame className="h-4 w-4 text-[#ff6a00]" strokeWidth={2.3} aria-hidden="true" />
      Racha {dias} {plural(dias, "día")}
    </span>
  );
}

export function AgendaItem({ habito, onAlternar }: AgendaItemProps) {
  const { hora, periodo } = partirHora(habito.hora);
  const hecho = habito.completado;

  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-[1.6rem] border px-3 py-3.5 transition-colors sm:gap-4 sm:px-5 sm:py-4",
        hecho
          ? "border-[#e8dccb] bg-white/45"
          : "border-borde bg-[linear-gradient(180deg,rgba(255,251,245,0.96),rgba(255,240,218,0.86))] shadow-[0_14px_28px_rgba(171,91,27,0.08),inset_0_1px_0_rgba(255,255,255,0.78)]"
      )}
    >
      <button
        type="button"
        onClick={() => onAlternar(habito.id)}
        aria-pressed={hecho}
        aria-label={hecho ? `Desmarcar ${habito.nombre}` : `Marcar ${habito.nombre} como hecho`}
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-fuego/30",
          hecho
            ? "border-transparent bg-[linear-gradient(180deg,#ff8a2f,#ff681b)] text-white shadow-[0_8px_16px_rgba(232,113,39,0.3)]"
            : "border-[#f0b98a] bg-white/70 text-transparent hover:border-fuego hover:text-fuego/60"
        )}
      >
        <Check className="h-5 w-5" strokeWidth={3} />
      </button>

      <p className="w-[3.6rem] shrink-0 leading-none sm:w-[4.4rem]">
        <span className={cn("font-display block text-[1.7rem] sm:text-[1.9rem]", hecho ? "text-[#c4a58c]" : "text-brasa")}>
          {hora}
        </span>
        <span className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-etiqueta">{periodo}</span>
      </p>

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "font-body truncate text-[1rem] font-bold sm:text-[1.05rem]",
            hecho ? "text-[#9c8878] line-through decoration-fuego/50" : "text-[#2f2c2a]"
          )}
        >
          {habito.nombre}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <CategoriaChip categoria={habito.categoria} />
          {habito.pospuesto ? (
            <span className="font-body inline-flex items-center gap-1 rounded-full bg-[#ffe9d2] px-2.5 py-1 text-xs font-bold text-fuego-texto">
              <Hourglass className="h-3.5 w-3.5" strokeWidth={2.3} />
              Pospuesta
            </span>
          ) : null}
          <Racha dias={habito.rachaDias} className="inline-flex sm:hidden" />
        </div>
      </div>

      <Racha dias={habito.rachaDias} className="hidden shrink-0 sm:inline-flex" />
    </li>
  );
}
